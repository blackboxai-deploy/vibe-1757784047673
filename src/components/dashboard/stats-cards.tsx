"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StatsCardsProps {
  stats: {
    totalViolations: number;
    activeViolations: number;
    resolvedViolations: number;
    criticalViolations: number;
    complianceRate: number;
    pagesWithViolations: number;
    cleanPages: number;
  };
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: "Compliance Rate",
      value: `${stats.complianceRate}%`,
      description: "Pages without violations",
      trend: stats.complianceRate >= 85 ? "positive" : stats.complianceRate >= 70 ? "neutral" : "negative",
      icon: "📊"
    },
    {
      title: "Total Violations",
      value: stats.totalViolations.toLocaleString(),
      description: "Across all pages",
      trend: "neutral",
      icon: "⚠️"
    },
    {
      title: "Active Violations",
      value: stats.activeViolations.toLocaleString(),
      description: "Requiring immediate attention",
      trend: "negative",
      icon: "🔴"
    },
    {
      title: "Resolved Violations",
      value: stats.resolvedViolations.toLocaleString(),
      description: "Successfully addressed",
      trend: "positive",
      icon: "✅"
    },
    {
      title: "Critical Issues",
      value: stats.criticalViolations.toLocaleString(),
      description: "High priority violations",
      trend: stats.criticalViolations === 0 ? "positive" : "negative",
      icon: "🚨"
    },
    {
      title: "Clean Pages",
      value: stats.cleanPages.toLocaleString(),
      description: "No violations detected",
      trend: "positive",
      icon: "🟢"
    }
  ];

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "positive": return "text-blue-600";
      case "negative": return "text-slate-900";
      default: return "text-slate-700";
    }
  };

  const getTrendBadgeColor = (trend: string) => {
    switch (trend) {
      case "positive": return "bg-blue-100 text-blue-800 border-blue-200";
      case "negative": return "bg-slate-100 text-slate-800 border-slate-300";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => (
        <Card key={index} className="hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-blue-300 bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
              {card.title}
            </CardTitle>
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <span className="text-lg">{card.icon}</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold mb-3 ${getTrendColor(card.trend)}`}>
              {card.value}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600 font-medium">
                {card.description}
              </p>
              <Badge className={getTrendBadgeColor(card.trend)}>
                {card.trend === "positive" ? "Good" : card.trend === "negative" ? "Alert" : "Info"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}