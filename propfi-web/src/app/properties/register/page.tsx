"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, UploadCloud } from "lucide-react";
import Link from "next/link";
import { ConnectWalletButton } from "@/features/auth/components/ConnectWalletButton";

const propertySchema = z.object({
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City is required"),
  zipCode: z.string().min(4, "Invalid ZIP code"),
  propertyType: z.string().min(1, "Property type is required"),
  value: z.string().min(1, "Value is required").refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Value must be greater than 0"),
});

type PropertyFormValues = z.infer<typeof propertySchema>;

export default function RegisterPropertyPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
  });

  const onSubmit = async (data: PropertyFormValues) => {
    // In production: Send data to FastAPI, get IPFS hash, prompt MetaMask to sign tx
    console.log("Submitting property:", data);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
    alert("Property submitted for verification!");
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutral-950">
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="text-neutral-400 hover:text-white transition-colors flex items-center text-sm font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
          </Link>
          <ConnectWalletButton />
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">Register Property</h1>
          <p className="text-neutral-400 mt-2">Submit your property details for on-chain verification and tokenization.</p>
        </div>

        <Card className="bg-white/5 border-white/10 text-white shadow-xl">
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
            <CardDescription className="text-neutral-400">All fields are required for the verification oracle.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="address">Physical Address</Label>
                <Input 
                  id="address" 
                  placeholder="123 Ocean Avenue" 
                  className="bg-black/50 border-white/10 focus:border-indigo-500"
                  {...register("address")} 
                />
                {errors.address && <p className="text-xs text-red-400">{errors.address.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input 
                    id="city" 
                    placeholder="Miami" 
                    className="bg-black/50 border-white/10 focus:border-indigo-500"
                    {...register("city")} 
                  />
                  {errors.city && <p className="text-xs text-red-400">{errors.city.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input 
                    id="zipCode" 
                    placeholder="33139" 
                    className="bg-black/50 border-white/10 focus:border-indigo-500"
                    {...register("zipCode")} 
                  />
                  {errors.zipCode && <p className="text-xs text-red-400">{errors.zipCode.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="propertyType">Property Type</Label>
                  <Input 
                    id="propertyType" 
                    placeholder="Residential" 
                    className="bg-black/50 border-white/10 focus:border-indigo-500"
                    {...register("propertyType")} 
                  />
                  {errors.propertyType && <p className="text-xs text-red-400">{errors.propertyType.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="value">Estimated Value (USD)</Label>
                  <Input 
                    id="value" 
                    type="number"
                    placeholder="500000" 
                    className="bg-black/50 border-white/10 focus:border-indigo-500"
                    {...register("value")} 
                  />
                  {errors.value && <p className="text-xs text-red-400">{errors.value.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Legal Documents (Deed, Proof of Ownership)</Label>
                <div className="border-2 border-dashed border-white/10 rounded-lg p-8 text-center hover:bg-white/5 transition-colors cursor-pointer">
                  <UploadCloud className="w-8 h-8 text-neutral-400 mx-auto mb-3" />
                  <p className="text-sm text-neutral-300 font-medium">Click to upload or drag and drop</p>
                  <p className="text-xs text-neutral-500 mt-1">PDF, JPG, or PNG (max. 10MB)</p>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-12 text-md shadow-[0_0_15px_rgba(79,70,229,0.2)]"
              >
                {isSubmitting ? "Processing..." : "Submit for Verification"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
