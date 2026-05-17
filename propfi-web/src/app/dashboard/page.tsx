"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Home, Activity, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { ConnectWalletButton } from "@/features/auth/components/ConnectWalletButton";

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="font-bold text-xl tracking-tight text-white flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-indigo-500 flex items-center justify-center text-xs">P</div>
              PropFi
            </span>
            <nav className="hidden md:flex gap-6 text-sm font-medium text-neutral-400">
              <Link href="/dashboard" className="text-white">Overview</Link>
              <Link href="/properties" className="hover:text-white transition-colors">My Properties</Link>
              <Link href="/verification" className="hover:text-white transition-colors">Verification</Link>
            </nav>
          </div>
          <ConnectWalletButton />
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
            <p className="text-neutral-400 mt-1">Manage your digital real estate portfolio.</p>
          </div>
          <Link href="/properties/register">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-[0_0_15px_rgba(79,70,229,0.3)]">
              <Plus className="w-4 h-4 mr-2" />
              Register Property
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="bg-white/5 border-white/10 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-neutral-400">Total Properties</CardTitle>
              <Home className="w-4 h-4 text-neutral-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">4</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-neutral-400">Verified Assets</CardTitle>
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">3</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-neutral-400">Pending Transactions</CardTitle>
              <Activity className="w-4 h-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1</div>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-xl font-bold tracking-tight text-white mb-4">Recent Activity</h2>
        <Card className="bg-white/5 border-white/10">
          <div className="divide-y divide-white/5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Home className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">123 Ocean Avenue</p>
                    <p className="text-xs text-neutral-500">Property Minted on Polygon</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                    Confirmed
                  </span>
                  <p className="text-xs text-neutral-500 mt-1 font-mono">Tx: 0x4a...f92b</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
}
