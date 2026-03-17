import React from "react";

export default function JobCardSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 pb-20">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="relative p-px rounded-[2.5rem] bg-white/5 overflow-hidden animate-pulse"
        >
          {/* Main Skeleton Container - Matching original card padding & background */}
          <div className="relative bg-[#08090a]/90 backdrop-blur-3xl rounded-[2.5rem] p-4 md:p-10 h-full">
            <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-10">
              {/* --- Left Side Skeleton --- */}
              <div className="flex-1 space-y-8">
                <div className="flex items-center gap-6">
                  {/* Logo Skeleton - Matching w-16 md:w-20 */}
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 rounded-[1.8rem] shrink-0" />

                  <div className="space-y-3 flex-1">
                    {/* Position Name Skeleton - Matching text-2xl to 4xl height */}
                    <div className="h-8 sm:h-9 md:h-10 bg-white/10 rounded-xl w-3/4" />

                    {/* Company Info & Tags Skeleton - Matching responsive flex */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                      <div className="h-5 bg-indigo-500/10 rounded-lg w-32" />
                      <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-white/10" />
                      <div className="h-6 bg-white/5 rounded-full w-20" />
                    </div>
                  </div>
                </div>

                {/* Description Skeleton - Matching text-base md:text-lg */}
                <div className="space-y-3 max-w-2xl">
                  <div className="h-4 bg-white/5 rounded-md w-full" />
                  <div className="h-4 bg-white/5 rounded-md w-2/3" />
                </div>

                {/* Tags Skeleton */}
                <div className="flex flex-wrap gap-3">
                  <div className="h-9 w-20 bg-white/5 rounded-2xl" />
                  <div className="h-9 w-24 bg-white/5 rounded-2xl" />
                  <div className="h-9 w-16 bg-white/5 rounded-2xl" />
                </div>
              </div>

              {/* --- Right Side Skeleton --- */}
              <div className="flex flex-col justify-between items-start lg:items-end gap-8 shrink-0">
                <div className="lg:text-right space-y-4 w-full sm:w-auto">
                  {/* Location Skeleton */}
                  <div className="h-8 w-32 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl lg:ml-auto" />

                  {/* Salary Skeleton - Matching text-4xl height */}
                  <div className="space-y-2">
                    <div className="h-3 w-24 bg-white/5 rounded lg:ml-auto uppercase" />
                    <div className="h-10 w-36 bg-white/10 rounded-xl lg:ml-auto" />
                  </div>
                </div>

                {/* Button Skeletons - Matching original responsive gap and sizing */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  {/* Details Button Skeleton */}
                  <div className="h-13 sm:h-14 w-full sm:w-28 bg-white/5 rounded-2xl" />
                  {/* Apply Button Skeleton */}
                  <div className="h-13 sm:h-14 w-full sm:w-44 bg-white/10 rounded-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
