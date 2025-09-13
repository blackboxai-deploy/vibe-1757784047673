"use client";

import { useMemo } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { ViolationsSection } from "@/components/dashboard/violations-section";
import { ChartsSection } from "@/components/dashboard/charts-section";
import { ReportsTable } from "@/components/dashboard/reports-table";
import { generatePageReports, getViolationStats, getChartData } from "@/lib/data";

export default function Dashboard() {
  const reports = useMemo(() => generatePageReports(18790), []);
  const violationStats = useMemo(() => getViolationStats(reports), [reports]);
  const chartData = useMemo(() => getChartData(reports), [reports]);

  return (
    <div className="min-h-screen">
      <DashboardHeader />
      
      <main className="container mx-auto px-8 py-10">
        {/* Statistics Overview */}
        <section className="mb-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">📊</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-800">Violations Overview</h2>
          </div>
          <StatsCards stats={violationStats} />
        </section>

        {/* Violations Analysis */}
        <section className="mb-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">🔍</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-800">Violations Analysis</h2>
          </div>
          <ViolationsSection
            violationsByType={violationStats.violationsByType}
            violationsBySeverity={violationStats.violationsBySeverity}
            totalViolations={violationStats.totalViolations}
          />
        </section>

        {/* Data Visualization */}
        <section className="mb-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">📈</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-800">Analytics & Trends</h2>
          </div>
          <ChartsSection
            chartData={chartData}
            violationsByType={violationStats.violationsByType}
          />
        </section>

        {/* Detailed Reports */}
        <section className="mb-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">📋</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-800">Detailed Page Reports</h2>
          </div>
          <ReportsTable reports={reports} />
        </section>

        {/* Footer */}
        <footer className="mt-16 text-center py-10 border-t border-slate-200 bg-slate-50/50 rounded-lg">
          <div className="text-slate-700">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">PS</span>
              </div>
              <p className="text-xl font-bold text-slate-800">PINKY SHOPCO BY GUS</p>
            </div>
            <p className="text-sm mt-3 font-medium">
              META Page Reports Dashboard • Generated on September 13, 2025
            </p>
            <div className="mt-4 flex justify-center items-center gap-6 text-xs font-medium text-slate-600">
              <span>Total Reports: {reports.length.toLocaleString()}</span>
              <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
              <span>Active Violations: {violationStats.activeViolations}</span>
              <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
              <span>Compliance Rate: {violationStats.complianceRate}%</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}