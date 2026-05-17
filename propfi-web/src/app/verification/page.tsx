"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, FileText, AlertCircle } from "lucide-react";
import Link from "next/link";
import { ConnectWalletButton } from "@/features/auth/components/ConnectWalletButton";

const pendingVerifications = [
  {
    id: "1",
    address: "999 Mountain View",
    owner: "0x12...89ef",
    submittedAt: "2 hours ago",
    status: "Pending Review",
  },
  {
    id: "2",
    address: "742 Evergreen Terrace",
    owner: "0x34...abcd",
    submittedAt: "5 hours ago",
    status: "Pending Review",
  }
];

export default function VerificationPage() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-950">
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="font-bold text-xl tracking-tight text-white flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-indigo-500 flex items-center justify-center text-xs">P</div>
              PropFi
            </Link>
            <nav className="hidden md:flex gap-6 text-sm font-medium text-neutral-400">
              <Link href="/dashboard" className="hover:text-white transition-colors">Overview</Link>
              <Link href="/properties" className="hover:text-white transition-colors">My Properties</Link>
              <Link href="/verification" className="text-white">Verification</Link>
            </nav>
          </div>
          <ConnectWalletButton />
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8 border-b border-white/10 pb-6">
          <div className="flex items-center gap-2 text-yellow-500 mb-2">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium text-sm">Admin / Oracle Dashboard</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Verification Queue</h1>
          <p className="text-neutral-400 mt-1">Review legal documents and approve properties for on-chain tokenization.</p>
        </div>

        <div className="space-y-4">
          {pendingVerifications.map((item) => (
            <Card key={item.id} className="bg-white/5 border-white/10 text-white flex flex-col md:flex-row md:items-center justify-between p-6">
              <div className="flex-1 mb-4 md:mb-0">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <FileText className="w-5 h-5 text-neutral-400" />
                  {item.address}
                </h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-neutral-400">
                  <span className="font-mono bg-white/5 px-2 py-1 rounded">Owner: {item.owner}</span>
                  <span>Submitted {item.submittedAt}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button variant="outline" className="border-white/10 hover:bg-white/5 text-white">
                  View Documents
                </Button>
                <div className="flex items-center gap-2 border-l border-white/10 pl-4 ml-2">
                  <Button size="icon" className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 h-10 w-10">
                    <XCircle className="w-5 h-5" />
                  </Button>
                  <Button size="icon" className="bg-green-500 hover:bg-green-600 text-white h-10 w-10 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                    <CheckCircle2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
          
          {pendingVerifications.length === 0 && (
             <div className="text-center py-20 border border-dashed border-white/10 rounded-xl bg-white/[0.02]">
                <CheckCircle2 className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white">All caught up!</h3>
                <p className="text-neutral-500">There are no properties pending verification.</p>
             </div>
          )}
        </div>
      </main>
    </div>
  );
}
