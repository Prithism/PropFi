"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ConnectWalletButton } from "@/features/auth/components/ConnectWalletButton";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-950 items-center justify-center relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <Link href="/" className="absolute top-8 left-8 text-neutral-400 hover:text-white transition-colors flex items-center text-sm font-medium z-10">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
      </Link>

      <div className="z-10 w-full max-w-md px-4">
        <div className="flex justify-center mb-6">
           <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-2xl shadow-[0_0_30px_rgba(79,70,229,0.5)]">
             P
           </div>
        </div>
        
        <Card className="bg-white/5 border-white/10 text-white backdrop-blur-xl shadow-2xl">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
            <CardDescription className="text-neutral-400">
              No passwords needed. Your wallet is your identity.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center justify-center py-4 space-y-4">
               <ConnectWalletButton />
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-3">
                 <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                 <div>
                   <p className="text-sm font-medium text-white">Military-grade Security</p>
                   <p className="text-xs text-neutral-400 mt-1">We never have access to your private keys.</p>
                 </div>
              </div>
            </div>
            
            <div className="text-center text-sm text-neutral-400 pt-4 border-t border-white/10">
              Already have an account?{" "}
              <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
                Log in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
