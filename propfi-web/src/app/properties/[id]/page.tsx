"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, ShieldCheck, MapPin } from "lucide-react";
import Link from "next/link";
import { ConnectWalletButton } from "@/features/auth/components/ConnectWalletButton";

export default function PropertyDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="flex flex-col min-h-screen bg-neutral-950">
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/properties" className="text-neutral-400 hover:text-white transition-colors flex items-center text-sm font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Properties
          </Link>
          <ConnectWalletButton />
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Left Column - Image & Quick Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="rounded-2xl overflow-hidden border border-white/10 h-80 relative">
              <img 
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200" 
                alt="Property" 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                 <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-300 border border-green-500/30 backdrop-blur-md flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Tokenized & Verified
                 </span>
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                123 Ocean Avenue
              </h1>
              <p className="text-neutral-400 mt-2 flex items-center gap-1">
                <MapPin className="w-4 h-4" /> Miami, FL 33139
              </p>
            </div>

            <Card className="bg-white/5 border-white/10 text-white">
              <CardHeader>
                <CardTitle>On-Chain Data</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-neutral-400">Token ID</span>
                  <span className="font-mono text-indigo-300">#4092</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-neutral-400">Smart Contract</span>
                  <span className="font-mono text-indigo-300 hover:underline cursor-pointer flex items-center gap-1">
                    0x8a1...9b2c <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-neutral-400">Current Owner</span>
                  <span className="font-mono text-indigo-300">0x4a...f92b</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-neutral-400">IPFS Metadata</span>
                  <span className="font-mono text-indigo-300 hover:underline cursor-pointer flex items-center gap-1">
                    ipfs://QmXy... <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Actions */}
          <div className="space-y-6">
            <Card className="bg-white/5 border-white/10 text-white">
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <p className="text-sm text-neutral-400 mb-1">Estimated Value</p>
                  <p className="text-4xl font-bold text-white">$1,250,000</p>
                </div>
                
                <div className="space-y-3">
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                    Transfer Ownership
                  </Button>
                  <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/5">
                    View Legal Documents
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 text-white">
              <CardHeader>
                <CardTitle className="text-sm">History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative pl-4 border-l border-white/10">
                    <div className="absolute w-2 h-2 bg-indigo-500 rounded-full -left-[5px] top-1.5" />
                    <p className="text-sm font-medium">Verified by Oracle</p>
                    <p className="text-xs text-neutral-500">Oct 12, 2026</p>
                  </div>
                  <div className="relative pl-4 border-l border-white/10">
                    <div className="absolute w-2 h-2 bg-neutral-600 rounded-full -left-[5px] top-1.5" />
                    <p className="text-sm font-medium">Minted on Polygon</p>
                    <p className="text-xs text-neutral-500">Oct 14, 2026</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>
    </div>
  );
}
