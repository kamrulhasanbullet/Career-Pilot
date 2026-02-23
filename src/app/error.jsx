'use client';

import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Error caught by error.jsx:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30 overflow-hidden flex items-center justify-center py-12">
      {/* Animated Background Gradients */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-yellow-600/10 blur-3xl rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-blue-600/10 blur-3xl rounded-full animate-pulse" />

      {/* Content */}
      <div className="relative z-10 px-6 max-w-md mx-auto text-center">
        {/* Icon Container */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full animate-pulse" />
            <div className="relative bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full p-6 backdrop-blur-sm">
              <AlertCircle className="w-12 h-12 text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
          Error
        </h1>

        <h2 className="text-lg md:text-xl font-semibold text-gray-300 mb-3">
          Page Error
        </h2>

        <p className="text-gray-400 mb-8 leading-relaxed">
          Something went wrong on this page. Please try again or navigate to another page.
        </p>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="mb-8 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-left max-h-24 overflow-auto">
            <p className="text-xs font-mono text-yellow-300 break-words">
              {error.message}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200 hover:shadow-lg hover:shadow-blue-600/50"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium transition-all duration-200 hover:shadow-lg hover:shadow-gray-800/50 border border-gray-700"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
