"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ViolationType, ViolationSeverity } from "@/lib/data";

interface ViolationsSectionProps {
  violationsByType: Record<ViolationType, number>;
  violationsBySeverity: Record<ViolationSeverity, number>;
  totalViolations: number;
}

export function ViolationsSection({ 
  violationsByType, 
  violationsBySeverity, 
  totalViolations 
}: ViolationsSectionProps) {
  const getSeverityColor = (severity: ViolationSeverity) => {
    switch (severity) {
      case "Critical": return "bg-red-500";
      case "High": return "bg-orange-500";
      case "Medium": return "bg-yellow-500";
      case "Low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getSeverityBadgeColor = (severity: ViolationSeverity) => {
    switch (severity) {
      case "Critical": return "bg-red-100 text-red-800 border-red-200";
      case "High": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeIcon = (type: ViolationType) => {
    switch (type) {
      case "Policy": return "📋";
      case "Content": return "📝";
      case "Advertising": return "📢";
      case "Privacy": return "🔒";
      case "Safety": return "🛡️";
      default: return "📊";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Violations by Type */}
      <Card className="border border-slate-200 hover:border-blue-300 transition-all hover:shadow-lg bg-white/90 backdrop-blur-sm">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50">
          <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">📊</span>
            </div>
            Violations by Type
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(violationsByType).map(([type, count]) => {
              const percentage = totalViolations > 0 ? (count / totalViolations) * 100 : 0;
              return (
                <div key={type} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                        <span className="text-sm">{getTypeIcon(type as ViolationType)}</span>
                      </div>
                      <span className="font-semibold text-slate-700">{type}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-slate-900">{count}</span>
                      <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-xs font-medium">
                        {percentage.toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                  <Progress 
                    value={percentage} 
                    className="h-2"
                  />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Violations by Severity */}
      <Card className="border border-slate-200 hover:border-blue-300 transition-all hover:shadow-lg bg-white/90 backdrop-blur-sm">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50">
          <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">🚨</span>
            </div>
            Violations by Severity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(violationsBySeverity).map(([severity, count]) => {
              const percentage = totalViolations > 0 ? (count / totalViolations) * 100 : 0;
              return (
                <div key={severity} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${getSeverityColor(severity as ViolationSeverity)}`}></div>
                      <span className="font-semibold text-slate-700">{severity}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-slate-900">{count}</span>
                      <Badge className={getSeverityBadgeColor(severity as ViolationSeverity)}>
                        {percentage.toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                  <Progress 
                    value={percentage} 
                    className="h-2"
                  />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}