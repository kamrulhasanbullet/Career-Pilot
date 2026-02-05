import React from "react";
import { Mail, Lock, LogIn } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#05070a] selection:bg-indigo-500/30 p-4 overflow-hidden relative">
      {/* Background Glows - pointer-events-none added to prevent interference */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-md p-8 bg-[#0d1117]/80 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] shadow-2xl z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-500/10 rounded-2xl mb-4 border border-indigo-500/20">
            <LogIn className="text-indigo-400" size={30} />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-400 text-sm">
            Login to access your job tracker dashboard
          </p>
        </div>

        <form className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-500 ml-1 uppercase tracking-widest">
              Email Address
            </label>
            <div className="relative group">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors"
                size={18}
              />
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full bg-white/3 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-500 ml-1 uppercase tracking-widest">
              Password
            </label>
            <div className="relative group">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors"
                size={18}
              />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-white/3 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all"
              />
            </div>
          </div>

          <button className="w-full mt-4 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 border border-white/5">
            <LogIn size={20} />
            Sign In
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-gray-500 text-sm">
            Don't have an account?
            <Link
              href="/register"
              className="text-indigo-400 hover:text-indigo-300 ml-2 font-semibold transition-colors"
            >
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
