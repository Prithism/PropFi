"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ConnectWalletButton } from "@/features/auth/components/ConnectWalletButton";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 selection:bg-indigo-500/30">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 backdrop-blur-md sticky top-0 z-50 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold">
            P
          </div>
          <span className="text-xl font-bold tracking-tight">PropFi</span>
        </div>
        <div className="flex items-center space-x-6 text-sm font-medium text-neutral-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#registry" className="hover:text-white transition-colors">Registry</a>
          <a href="#docs" className="hover:text-white transition-colors">Docs</a>
        </div>
        <div className="flex items-center space-x-4">
          <ConnectWalletButton />
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative flex flex-col items-center justify-center px-6 pt-32 pb-40 text-center overflow-hidden">
        
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-indigo-300 mb-8 z-10 backdrop-blur-sm animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          <span>Polygon Mainnet Live</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl z-10">
          Real Estate,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            Tokenized.
          </span>
        </h1>
        
        <p className="mt-6 text-lg md:text-xl text-neutral-400 max-w-2xl z-10 leading-relaxed">
          The decentralized property registry for the modern era. Mint, transfer, and verify real-world assets on-chain with military-grade security.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 z-10">
          <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 py-6 text-lg font-medium shadow-[0_0_40px_rgba(79,70,229,0.3)] transition-all hover:shadow-[0_0_60px_rgba(79,70,229,0.5)] hover:-translate-y-1">
            Register Property
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg font-medium border-white/10 hover:bg-white/5 text-neutral-300 transition-all hover:-translate-y-1 bg-transparent">
            View Registry
          </Button>
        </div>

        {/* Dashboard Preview / Glassmorphism Mockup */}
        <div className="mt-24 w-full max-w-5xl relative z-10 perspective-1000">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 shadow-2xl overflow-hidden transform rotateX-6 scale-95 hover:scale-100 hover:rotate-0 transition-all duration-700 ease-out">
            <div className="flex items-center space-x-2 mb-4 px-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-1 border border-white/10 bg-white/5 rounded-xl p-6">
                <h3 className="text-sm font-medium text-neutral-400 mb-2">Total Value Locked</h3>
                <p className="text-3xl font-bold">$42.5M</p>
                <div className="mt-4 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 w-2/3" />
                </div>
              </div>
              <div className="col-span-2 border border-white/10 bg-white/5 rounded-xl p-6">
                 <div className="flex justify-between items-center mb-6">
                    <h3 className="text-sm font-medium text-neutral-400">Recent Transactions</h3>
                    <span className="text-xs text-indigo-400">View All</span>
                 </div>
                 <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0 last:pb-0">
                        <div className="flex items-center space-x-3">
                           <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 text-xs">NFT</div>
                           <div>
                             <p className="text-sm font-medium">123 Ocean Avenue</p>
                             <p className="text-xs text-neutral-500">Minted • 2 mins ago</p>
                           </div>
                        </div>
                        <div className="text-right">
                           <p className="text-sm font-medium font-mono text-green-400">Confirmed</p>
                           <p className="text-xs text-neutral-500 font-mono">0x4a...f92b</p>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
