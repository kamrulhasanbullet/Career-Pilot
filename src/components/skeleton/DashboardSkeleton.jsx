import React from "react";

export default function DashboardSkeleton() {
  return (
    <div className="min-h-screen w-full bg-[#05070a] text-white p-6 md:p-10 overflow-x-hidden relative">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative pt-24">
        {/* Header Skeleton */}
        <div className="mb-10 animate-pulse">
          <div className="h-10 w-64 bg-white/10 rounded-xl mb-4" />
          <div className="h-4 w-96 bg-white/5 rounded-lg" />
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-[#0d1117] border border-white/5 p-6 rounded-4xl animate-pulse"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl" />
                <div className="w-12 h-6 bg-white/5 rounded-lg" />
              </div>
              <div className="h-4 w-24 bg-white/5 rounded-md mb-2" />
              <div className="h-8 w-16 bg-white/10 rounded-lg" />
            </div>
          ))}
        </div>

        {/* Charts & Activity Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart Area */}
          <div className="lg:col-span-2 bg-[#0d1117] border border-white/5 p-8 rounded-[2.5rem] h-100 animate-pulse">
            <div className="flex justify-between items-center mb-12">
              <div className="h-6 w-48 bg-white/10 rounded-lg" />
              <div className="h-8 w-32 bg-white/5 rounded-xl" />
            </div>
            <div className="w-full h-64 bg-white/5 rounded-2xl relative overflow-hidden">
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
            </div>
          </div>

          {/* Recent Activity Area */}
          <div className="bg-[#0d1117] border border-white/5 p-8 rounded-[2.5rem] animate-pulse">
            <div className="h-6 w-32 bg-white/10 rounded-lg mb-8" />
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-4 items-center">
                  <div className="w-2 h-2 rounded-full bg-white/10" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-full bg-white/5 rounded-md" />
                    <div className="h-3 w-24 bg-white/5 rounded-md" />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 h-12 w-full bg-white/5 rounded-2xl border border-white/5" />
          </div>
        </div>
      </div>
    </div>
  );
}
