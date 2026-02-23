import React from "react";
import Link from "next/link";
import { PlaneTakeoff, Home, Headset } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-[#05070a] text-white flex items-center justify-center relative overflow-hidden font-sans">
      {/* Background Glows - Dashboard match */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[35%] h-[35%] bg-rose-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 text-center flex flex-col items-center gap-8 max-w-2xl px-6">
        {/* Animated Icon Section */}
        <div className="relative">
          <div className="text-6xl font-black text-white/5 select-none leading-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-indigo-500/10 p-6 rounded-full border border-indigo-500/20 animate-pulse">
              <PlaneTakeoff size={64} className="text-indigo-400" />
            </div>
          </div>
        </div>

        {/* Copy */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Off the Radar
          </h1>
          <p className="text-gray-400 text-lg max-w-md mx-auto leading-relaxed">
            Your requested destination has drifted out of coverage. Let's get
            your career flight back on the right flight path.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex sm:flex-row gap-4 w-full justify-center items-center">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 transition-all px-12 py-4 rounded-2xl font-bold text-sm shadow-lg shadow-indigo-500/20 whitespace-nowrap"
          >
            <Home size={18} />
            Back to Dashboard
          </Link>
        </div>

        {/* Bottom Quote - Matches Dashboard style */}
        <div className="pt-8 border-t border-white/5 w-full">
          <p className="text-gray-600 text-xs italic tracking-widest uppercase">
            "A wrong turn is just a detour to a new opportunity."
          </p>
        </div>
      </div>
    </div>
  );
}
