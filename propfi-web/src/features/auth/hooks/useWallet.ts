"use client";

import { useState, useEffect, useCallback } from 'react';
import { BrowserProvider, JsonRpcSigner } from 'ethers';
import type { ProviderRpcError, EthereumProvider } from '@/types/ethereum';

export interface WalletError {
  code: string | number;
  message: string;
}

// Target network configuration (Polygon Mainnet)
const TARGET_CHAIN_ID_HEX = '0x89'; // 137 in hex
const TARGET_CHAIN_ID_DECIMAL = '137';
const TARGET_NETWORK_CONFIG = {
  chainId: TARGET_CHAIN_ID_HEX,
  chainName: 'Polygon Mainnet',
  nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
  rpcUrls: ['https://polygon-rpc.com/'],
  blockExplorerUrls: ['https://polygonscan.com/']
};

interface UseWalletReturn {
  address: string | null;
  chainId: string | null;
  isConnecting: boolean;
  isWrongNetwork: boolean;
  error: WalletError | null;
  provider: BrowserProvider | null;
  signer: JsonRpcSigner | null;
  connect: () => Promise<void>;
  switchNetwork: () => Promise<void>;
  disconnect: () => void;
}

export function useWallet(): UseWalletReturn {
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [isWrongNetwork, setIsWrongNetwork] = useState<boolean>(false);
  const [error, setError] = useState<WalletError | null>(null);
  
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);

  const getRawProvider = (): EthereumProvider | undefined => {
    if (typeof window === 'undefined') return undefined;
    if (window.ethereum?.providers) {
      return window.ethereum.providers.find((p) => p.isMetaMask) ?? window.ethereum.providers[0];
    }
    return window.ethereum;
  };

  const mapRpcError = (err: unknown): WalletError => {
    const rpcError = err as ProviderRpcError;
    const isRejected = rpcError.code === 4001 || (err as any).info?.error?.code === 4001;
    
    if (isRejected) {
      return { code: 4001, message: "Request was rejected by the user." };
    }
    if (rpcError.code === -32002) {
      return { code: -32002, message: "A connection request is already pending. Please open your wallet." };
    }
    if (rpcError.code === 4902) {
      return { code: 4902, message: "The required network is not configured in your wallet." };
    }
    
    // Fallback for timeout or other network-level errors
    if (rpcError.message?.includes('timeout') || rpcError.message?.includes('network')) {
       return { code: 'NETWORK_ERROR', message: "Network connection failed. Check your internet or RPC node." };
    }
    
    return { 
      code: rpcError.code || 'UNKNOWN', 
      message: rpcError.message || "An unexpected error occurred." 
    };
  };

  // --- Edge Case: Handle Network Switching ---
  const switchNetwork = async () => {
    const rawProvider = getRawProvider();
    if (!rawProvider) return;
    
    setError(null);
    try {
      // Attempt to switch to the target network
      await rawProvider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: TARGET_CHAIN_ID_HEX }],
      });
      setIsWrongNetwork(false);
    } catch (switchError: any) {
      // Edge Case: The network has not been added to MetaMask (Error 4902)
      if (switchError.code === 4902) {
        try {
          await rawProvider.request({
            method: 'wallet_addEthereumChain',
            params: [TARGET_NETWORK_CONFIG],
          });
          setIsWrongNetwork(false);
        } catch (addError: any) {
          setError(mapRpcError(addError));
        }
      } else {
        setError(mapRpcError(switchError));
      }
    }
  };

  const handleAccountsChanged = useCallback(async (accounts: unknown[]) => {
    if (accounts.length === 0) {
      setAddress(null);
      setSigner(null);
      setProvider(null);
      setError(null);
    } else if (typeof accounts[0] === 'string') {
      setAddress(accounts[0]);
      setError(null);
      
      const rawProvider = getRawProvider();
      if (rawProvider) {
        try {
          const ethersProvider = new BrowserProvider(rawProvider as any);
          const newSigner = await ethersProvider.getSigner().catch(() => null);
          setProvider(ethersProvider);
          setSigner(newSigner);
        } catch (e) {
          console.error("Failed to re-initialize signer on account change", e);
        }
      }
    }
  }, []);

  const handleChainChanged = useCallback((newChainId: unknown) => {
    if (typeof newChainId === 'string') {
      setChainId(newChainId);
      
      // Determine if they switched to the wrong network
      const currentChainDec = parseInt(newChainId, 16).toString();
      setIsWrongNetwork(currentChainDec !== TARGET_CHAIN_ID_DECIMAL);
      
      // Refresh state per MetaMask recommendations
      setTimeout(() => window.location.reload(), 500); 
    }
  }, []);

  const handleDisconnect = useCallback((providerError: unknown) => {
    const rpcError = providerError as ProviderRpcError;
    console.warn("Wallet disconnected:", rpcError);
    setAddress(null);
    setChainId(null);
    setSigner(null);
    setProvider(null);
  }, []);

  useEffect(() => {
    const rawProvider = getRawProvider();
    
    if (rawProvider && rawProvider.on) {
      rawProvider.on('accountsChanged', handleAccountsChanged);
      rawProvider.on('chainChanged', handleChainChanged);
      rawProvider.on('disconnect', handleDisconnect);
    }

    return () => {
      if (rawProvider && rawProvider.removeListener) {
        rawProvider.removeListener('accountsChanged', handleAccountsChanged);
        rawProvider.removeListener('chainChanged', handleChainChanged);
        rawProvider.removeListener('disconnect', handleDisconnect);
      }
    };
  }, [handleAccountsChanged, handleChainChanged, handleDisconnect]);

  const connect = async () => {
    const rawProvider = getRawProvider();

    if (!rawProvider) {
      setError({ code: 'NO_PROVIDER', message: "No Web3 wallet detected. Please install MetaMask." });
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      const ethersProvider = new BrowserProvider(rawProvider as any);
      await ethersProvider.send("eth_requestAccounts", []);
      
      const newSigner = await ethersProvider.getSigner();
      const currentAddress = await newSigner.getAddress();
      const network = await ethersProvider.getNetwork();
      
      const connectedChainId = network.chainId.toString();

      setProvider(ethersProvider);
      setSigner(newSigner);
      setAddress(currentAddress);
      setChainId(connectedChainId);
      
      // Edge Case: Validate network immediately upon connection
      if (connectedChainId !== TARGET_CHAIN_ID_DECIMAL) {
        setIsWrongNetwork(true);
        setError({ code: 'WRONG_NETWORK', message: "You are connected to the wrong network. Please switch to Polygon." });
        // Optionally auto-prompt the network switch:
        // await switchNetwork(); 
      } else {
        setIsWrongNetwork(false);
      }

    } catch (err) {
      console.error("[useWallet] Connection error:", err);
      setError(mapRpcError(err));
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setAddress(null);
    setChainId(null);
    setError(null);
    setProvider(null);
    setSigner(null);
    setIsWrongNetwork(false);
  };

  return {
    address,
    chainId,
    isConnecting,
    isWrongNetwork,
    error,
    provider,
    signer,
    connect,
    switchNetwork,
    disconnect
  };
}
