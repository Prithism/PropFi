"use client";

import { useState, useEffect, useCallback } from 'react';
import type { ProviderRpcError, EthereumProvider } from '@/types/ethereum';

export interface WalletError {
  code: string | number;
  message: string;
}

interface UseWalletReturn {
  address: string | null;
  chainId: string | null;
  isConnecting: boolean;
  error: WalletError | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

export function useWallet(): UseWalletReturn {
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [error, setError] = useState<WalletError | null>(null);

  // Helper to safely get the primary provider (handling cases with multiple extensions)
  const getProvider = (): EthereumProvider | undefined => {
    if (typeof window === 'undefined') return undefined;
    if (window.ethereum?.providers) {
      // If multiple extensions injected providers, prefer MetaMask
      return window.ethereum.providers.find((p) => p.isMetaMask) ?? window.ethereum.providers[0];
    }
    return window.ethereum;
  };

  const handleAccountsChanged = useCallback((accounts: unknown[]) => {
    if (accounts.length === 0) {
      // User disconnected their wallet via the extension UI
      setAddress(null);
      setError(null);
    } else if (typeof accounts[0] === 'string') {
      setAddress(accounts[0]);
      setError(null);
    }
  }, []);

  const handleChainChanged = useCallback((newChainId: unknown) => {
    if (typeof newChainId === 'string') {
      setChainId(newChainId);
      // Official recommendation from MetaMask is to reload the page on chain change
      window.location.reload();
    }
  }, []);

  const handleDisconnect = useCallback((providerError: unknown) => {
    const rpcError = providerError as ProviderRpcError;
    console.warn("Wallet disconnected:", rpcError);
    setAddress(null);
    setChainId(null);
  }, []);

  useEffect(() => {
    const provider = getProvider();
    
    if (provider && provider.on) {
      provider.on('accountsChanged', handleAccountsChanged);
      provider.on('chainChanged', handleChainChanged);
      provider.on('disconnect', handleDisconnect);
    }

    return () => {
      if (provider && provider.removeListener) {
        provider.removeListener('accountsChanged', handleAccountsChanged);
        provider.removeListener('chainChanged', handleChainChanged);
        provider.removeListener('disconnect', handleDisconnect);
      }
    };
  }, [handleAccountsChanged, handleChainChanged, handleDisconnect]);

  const mapRpcError = (err: unknown): WalletError => {
    const rpcError = err as ProviderRpcError;
    
    if (rpcError.code === 4001) {
      return { code: 4001, message: "Connection request was rejected by the user." };
    }
    if (rpcError.code === -32002) {
      return { code: -32002, message: "A connection request is already pending. Please open your wallet." };
    }
    
    return { 
      code: rpcError.code || 'UNKNOWN', 
      message: rpcError.message || "An unexpected error occurred while connecting." 
    };
  };

  const connect = async () => {
    const provider = getProvider();

    if (!provider) {
      setError({ code: 'NO_PROVIDER', message: "No Web3 wallet detected. Please install MetaMask." });
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      // Request accounts
      const accounts = await provider.request({ method: 'eth_requestAccounts' }) as string[];
      if (accounts && accounts.length > 0) {
        setAddress(accounts[0]);
      } else {
        throw new Error("No accounts found.");
      }

      // Fetch the current chain ID right after connecting
      const currentChainId = await provider.request({ method: 'eth_chainId' }) as string;
      setChainId(currentChainId);

    } catch (err) {
      console.error("[useWallet] Connection error:", err);
      setError(mapRpcError(err));
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    // Dapps cannot force-disconnect from MetaMask programmatically.
    // Clearing the state simulates a local app-level logout.
    setAddress(null);
    setChainId(null);
    setError(null);
  };

  return {
    address,
    chainId,
    isConnecting,
    error,
    connect,
    disconnect
  };
}
