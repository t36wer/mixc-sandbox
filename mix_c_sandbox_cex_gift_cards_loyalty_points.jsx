"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

/*
 BINANCE-STYLE MIxC SANDBOX
 Dark-mode, CEX-grade UI
 Sandbox only – no real funds
*/

const assets = [
  { symbol: "AMZN", name: "Amazon Gift Card", price: 50, change: "+1.2%" },
  { symbol: "WMT", name: "Walmart Gift Card", price: 25, change: "+0.8%" },
  { symbol: "COST", name: "Costco Gift Card", price: 100, change: "+2.1%" },
  { symbol: "APL", name: "Apple Gift Card", price: 100, change: "+1.6%" },
  { symbol: "NKE", name: "Nike Gift Card", price: 50, change: "+0.9%" },
  { symbol: "UA", name: "United Miles", price: 10, change: "+1.1%" },
  { symbol: "DL", name: "Delta SkyMiles", price: 10, change: "+1.4%" },
  { symbol: "MR", name: "Marriott Points", price: 10, change: "+1.7%" },
];

const currencies = [
  { code: "USD", label: "USD $ – United States" },
  { code: "CNY", label: "CNY ¥ – China" },
  { code: "HKD", label: "HKD $ – Hong Kong" },
  { code: "TTD", label: "TTD $ – Trinidad & Tobago" },
];

export default function Page() {
  const [asset, setAsset] = useState(assets[0]);
  const [amount, setAmount] = useState(1);
  const [currency, setCurrency] = useState("USD");
  const [kyc, setKyc] = useState(false);

  const dailyLimit = kyc ? 980 : 250;

  return (
    <div className="min-h-screen bg-[#0b0e11] text-gray-200">

      {/* TOP NAV */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
        <div className="text-xl font-bold text-yellow-400">MIxC</div>
        <nav className="flex gap-6 text-sm">
          <span className="text-yellow-400">Market</span>
          <span>Trade</span>
          <span>Wallet</span>
          <span>Orders</span>
        </nav>
        <div className="flex gap-3 items-center">
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className="w-44 bg-[#161a1e] border-gray-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currencies.map(c => (
                <SelectItem key={c.code} value={c.code}>{c.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button size="sm" variant="secondary">Login</Button>
          <Button size="sm">Register</Button>
        </div>
      </header>

      {/* STATUS BAR */}
      <div className="px-6 py-2 text-xs bg-[#161a1e] border-b border-gray-800 flex justify-between">
        <span>Sandbox Simulation Only</span>
        <span className={kyc ? "text-green-400" : "text-yellow-400"}>
          {kyc ? "KYC Verified – $980/day" : "No‑KYC Account – $250/day"}
        </span>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-12 gap-4 p-6">

        {/* MARKET LIST */}
        <Card className="col-span-3 bg-[#161a1e] border-gray-800">
          <CardContent className="p-3">
            <h3 className="text-sm mb-2">Market</h3>
            <div className="space-y-2 text-sm">
              {assets.map(a => (
                <div
                  key={a.symbol}
                  onClick={() => setAsset(a)}
                  className="flex justify-between cursor-pointer hover:bg-[#1e2329] p-2 rounded"
                >
                  <span>{a.symbol}</span>
                  <span>${a.price}</span>
                  <span className="text-green-400">{a.change}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* PRICE PANEL */}
        <Card className="col-span-6 bg-[#161a1e] border-gray-800">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold">{asset.name}</h2>
            <p className="text-3xl mt-2">${asset.price}.00</p>
            <div className="mt-4 h-40 bg-[#0b0e11] flex items-center justify-center text-gray-500">
              Price Chart (Sandbox)
            </div>
          </CardContent>
        </Card>

        {/* TRADE BOX */}
        <Card className="col-span-3 bg-[#161a1e] border-gray-800">
          <CardContent className="p-4 space-y-3">
            <Tabs defaultValue="buy">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="buy">Buy</TabsTrigger>
                <TabsTrigger value="sell">Sell</TabsTrigger>
              </TabsList>
              <TabsContent value="buy" className="space-y-3">
                <Input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} />
                <div className="text-sm">Total: ${amount * asset.price}</div>
                <Button className="w-full bg-yellow-400 text-black">Buy</Button>
              </TabsContent>
              <TabsContent value="sell" className="space-y-3">
                <Input type="number" />
                <Button variant="outline" className="w-full">Sell</Button>
              </TabsContent>
            </Tabs>
            <div className="text-xs text-gray-500">Google Pay • Visa • Mastercard</div>
            <Button size="sm" variant="secondary" onClick={() => setKyc(!kyc)}>
              {kyc ? "Revert KYC" : "Complete KYC (Sandbox)"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* FOOTER */}
      <footer className="text-center text-xs text-gray-500 py-4 border-t border-gray-800">
        MIxC Sandbox Exchange • Gift Cards, Mobile Top‑Ups & Loyalty Points
      </footer>

    </div>
  );
}
