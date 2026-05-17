"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/features/auth/hooks/useWallet';
import { Loader2 } from 'lucide-react';

export function ConnectWalletButton() {
  const { address, isConnecting, error, connect, disconnect } = useWallet();

  const handleConnect = async () => {
    await connect();
  };

  const handleDisconnect = () => {
    disconnect();
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="flex flex-col items-end">
      <Button 
        onClick={address ? handleDisconnect : handleConnect} 
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
      
      {error && (
        <span className="text-xs text-red-500 mt-2 font-medium">
          {error.message}
        </span>
      )}
    </div>
  );
}
