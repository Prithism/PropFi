"use client";

import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ConnectWalletButton } from "@/features/auth/components/ConnectWalletButton";

const mockProperties = [
  {
    id: "1",
    address: "123 Ocean Avenue",
    city: "Miami",
    status: "Verified",
    value: "$1,250,000",
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "2",
    address: "456 Tech Boulevard",
    city: "San Francisco",
    status: "Pending",
    value: "$2,100,000",
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "3",
    address: "789 Alpine Drive",
    city: "Denver",
    status: "Verified",
    value: "$850,000",
    imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800",
  }
];

export default function PropertiesListingPage() {
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
              <Link href="/properties" className="text-white">My Properties</Link>
              <Link href="/verification" className="hover:text-white transition-colors">Verification</Link>
            </nav>
          </div>
          <ConnectWalletButton />
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">My Properties</h1>
            <p className="text-neutral-400 mt-1">View and manage your tokenized assets.</p>
          </div>
          <Link href="/properties/register">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Register New</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProperties.map((property) => (
            <Card key={property.id} className="bg-white/5 border-white/10 text-white overflow-hidden group hover:border-indigo-500/50 transition-colors">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={property.imageUrl} 
                  alt={property.address} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium backdrop-blur-md ${
                    property.status === 'Verified' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                  }`}>
                    {property.status}
                  </span>
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-neutral-400" />
                  {property.address}
                </CardTitle>
                <p className="text-neutral-400 text-sm">{property.city}</p>
              </CardHeader>
              <CardContent>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-sm text-neutral-500">Est. Value</span>
                  <span className="font-bold text-lg text-indigo-300">{property.value}</span>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Link href={`/properties/${property.id}`} className="w-full">
                  <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 group-hover:bg-indigo-600 group-hover:border-indigo-600 group-hover:text-white transition-all">
                    View Details <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
