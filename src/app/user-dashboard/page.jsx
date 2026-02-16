"use client";
import React from "react";
import {
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  Briefcase,
  CheckCircle2,
  Clock,
  XCircle,
  TrendingUp,
  Users,
  Target,
} from "lucide-react";

// Day 4 Roadmap Data [cite: 16, 17]
const STATS = [
  {
    id: 1,
    label: "Total Jobs",
    value: "156",
    icon: Briefcase,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    id: 2,
    label: "Pending",
    value: "42",
    icon: Clock,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    id: 3,
    label: "Interviews",
    value: "12",
    icon: Users,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    id: 4,
    label: "Rejected",
    value: "28",
    icon: XCircle,
    color: "text-rose-400",
    bg: "bg-rose-500/10",
  },
];

const CHART_DATA = [
  { name: "Jan", apps: 20 },
  { name: "Feb", apps: 35 },
  { name: "Mar", apps: 60 },
  { name: "Apr", apps: 45 },
  { name: "May", apps: 75 },
  { name: "Jun", apps: 90 },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen w-full bg-[#05070a] text-white p-6 md:p-10 overflow-x-hidden relative">
      {/* Background Aesthetic Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto z-10 relative pt-24">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">
            Analytics Overview
          </h1>
          <p className="text-gray-400">
            Track your application performance and conversion.
          </p>
        </div>

        {/* Stats Grid  */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {STATS.map((stat) => (
            <div
              key={stat.id}
              className="bg-[#0d1117] border border-white/5 p-6 rounded-4xl hover:border-indigo-500/30 transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`${stat.bg} p-3 rounded-2xl`}>
                  <stat.icon className={stat.color} size={24} />
                </div>
                <span className="text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded-lg flex items-center gap-1">
                  <TrendingUp size={12} /> +12%
                </span>
              </div>
              <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">
                {stat.label}
              </p>
              <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* Charts Section  */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Area Chart */}
          <div className="lg:col-span-2 bg-[#0d1117] border border-white/5 p-8 rounded-[2.5rem] h-100">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Target className="text-indigo-400" size={20} /> Application
                Growth
              </h3>
              <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs outline-none cursor-pointer">
                <option className="text-black">Last 6 Months</option>
                <option className="text-black">Last Year</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height="80%">
              <AreaChart data={CHART_DATA}>
                <defs>
                  <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#161b22",
                    border: "1px solid #30363d",
                    borderRadius: "12px",
                  }}
                  itemStyle={{ color: "#fff" }}
                />
                <Area
                  type="monotone"
                  dataKey="apps"
                  stroke="#6366f1"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorApps)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Actions / Activity Feed */}
          <div className="bg-[#0d1117] border border-white/5 p-8 rounded-[2.5rem]">
            <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex gap-4 items-center group cursor-pointer"
                >
                  <div className="w-2 h-2 rounded-full bg-indigo-500 group-hover:scale-150 transition-all"></div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">Applied to Google</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                  <CheckCircle2 size={16} className="text-gray-600" />
                </div>
              ))}
            </div>
            <button className="w-full mt-10 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all text-sm">
              View All History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
