"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/features/auth/hooks/useWallet';
import { Loader2, AlertTriangle } from 'lucide-react';

export function ConnectWalletButton() {
  const { address, isConnecting, isWrongNetwork, error, connect, switchNetwork, disconnect } = useWallet();

  const handleConnect = async () => {
    await connect();
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isWrongNetwork && address) {
    return (
      <div className="flex flex-col items-end">
        <Button 
          onClick={switchNetwork} 
          variant="destructive"
          className="min-w-[160px] shadow-[0_0_15px_rgba(239,68,68,0.4)]"
        >
          <AlertTriangle className="mr-2 h-4 w-4" />
          Switch to Polygon
        </Button>
        {error && (
          <span className="text-xs text-red-500 mt-2 font-medium max-w-[200px] text-right">
            {error.message}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end">
      <Button 
        onClick={address ? disconnect : handleConnect} 
        disabled={isConnecting}
        variant={address ? "outline" : "default"}
        className="min-w-[160px]"
      >
        {isConnecting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Connecting...
          </>
        ) : address ? (
          `Connected: ${formatAddress(address)}`
        ) : (
          "Connect Wallet"
        )}
      </Button>
      
      {error && !isWrongNetwork && (
        <span className="text-xs text-red-500 mt-2 font-medium max-w-[200px] text-right">
          {error.message}
        </span>
      )}
    </div>
  );
}
