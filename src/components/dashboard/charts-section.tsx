"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

interface ChartsSectionProps {
  chartData: {
    monthlyViolations: Array<{
      month: string;
      violations: number;
      resolved: number;
      active: number;
    }>;
    performanceData: Array<{
      name: string;
      views: number;
      engagement: number;
      violations: number;
    }>;
  };
  violationsByType: Record<string, number>;
}

export function ChartsSection({ chartData, violationsByType }: ChartsSectionProps) {
  const COLORS = ['#1e293b', '#334155', '#475569', '#64748b', '#2563eb'];
  
  const pieData = Object.entries(violationsByType).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Monthly Violations Trend */}
      <Card className="border border-slate-200 hover:border-blue-300 transition-all hover:shadow-lg bg-white/90 backdrop-blur-sm">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50">
          <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">📈</span>
            </div>
            Monthly Violations Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.monthlyViolations}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="violations" fill="#1e293b" name="Total" />
              <Bar dataKey="resolved" fill="#2563eb" name="Resolved" />
              <Bar dataKey="active" fill="#64748b" name="Active" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Page Performance vs Violations */}
      <Card className="border border-slate-200 hover:border-blue-300 transition-all hover:shadow-lg bg-white/90 backdrop-blur-sm">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50">
          <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">📊</span>
            </div>
            Performance vs Violations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData.performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line 
                yAxisId="left" 
                type="monotone" 
                dataKey="views" 
                stroke="#2563eb" 
                name="Views"
                strokeWidth={3}
              />
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="violations" 
                stroke="#1e293b" 
                name="Violations"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Violations Distribution */}
      <Card className="border border-slate-200 hover:border-blue-300 transition-all hover:shadow-lg bg-white/90 backdrop-blur-sm">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50">
          <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">🥧</span>
            </div>
            Violations Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Engagement Metrics */}
      <Card className="border border-slate-200 hover:border-blue-300 transition-all hover:shadow-lg bg-white/90 backdrop-blur-sm">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50">
          <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">💡</span>
            </div>
            Engagement Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData.performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="engagement" 
                stroke="#2563eb" 
                name="Engagement Rate"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}