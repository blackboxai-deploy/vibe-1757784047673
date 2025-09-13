"use client";

import { Card } from "@/components/ui/card";

export function DashboardHeader() {
  return (
    <div className="w-full bg-gradient-to-r from-slate-900 via-blue-900 to-black text-white shadow-2xl border-b border-blue-800">
      <div className="container mx-auto px-8 py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="text-center lg:text-left mb-6 lg:mb-0">
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <div className="text-2xl font-bold text-white">PS</div>
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-white">
                  PINKY SHOPCO
                </h1>
                <p className="text-lg font-semibold text-blue-300 mt-1">
                  BY GUS
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-300 mt-3 font-medium">
              META Page Reports Dashboard - Professional Analytics Suite
            </p>
          </div>
          
          <div className="text-center lg:text-right">
            <Card className="bg-black/30 backdrop-blur-md border-blue-700/50 p-6">
              <div className="text-2xl font-bold text-blue-300">
                September 13, 2025
              </div>
              <div className="text-sm text-gray-300 mt-2">
                Report Generation Date
              </div>
            </Card>
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-black/20 backdrop-blur-md border-blue-700/30 p-6 text-center hover:bg-black/30 transition-all">
            <div className="text-4xl font-bold text-blue-400 mb-2">18,790</div>
            <div className="text-sm text-gray-300 font-medium">Total Page Reports</div>
          </Card>
          
          <Card className="bg-black/20 backdrop-blur-md border-blue-700/30 p-6 text-center hover:bg-black/30 transition-all">
            <div className="text-4xl font-bold text-blue-300 mb-2">META</div>
            <div className="text-sm text-gray-300 font-medium">Platform Analytics</div>
          </Card>
          
          <Card className="bg-black/20 backdrop-blur-md border-blue-700/30 p-6 text-center hover:bg-black/30 transition-all">
            <div className="text-4xl font-bold text-green-400 mb-2">ACTIVE</div>
            <div className="text-sm text-gray-300 font-medium">System Status</div>
          </Card>
        </div>
      </div>
    </div>
  );
}