'use client';

import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30 overflow-hidden flex items-center justify-center">
          {/* Animated Background Gradients */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 blur-3xl rounded-full animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 blur-3xl rounded-full animate-pulse" />

          {/* Content */}
          <div className="relative z-10 px-6 py-12 text-center max-w-lg">
            {/* Icon Container */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full animate-pulse" />
                <div className="relative bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-full p-6 backdrop-blur-sm">
                  <AlertTriangle className="w-12 h-12 text-red-400" />
                </div>
              </div>
            </div>

            {/* Error Message */}
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
              Oops!
            </h1>

            <h2 className="text-xl md:text-2xl font-semibold text-gray-300 mb-3">
              Something went wrong
            </h2>

            <p className="text-gray-400 mb-8 leading-relaxed">
              We encountered an unexpected error while processing your request. Our team has been notified. Please try again or return to the homepage.
            </p>

            {/* Error Details (In Development) */}
            {process.env.NODE_ENV === 'development' && error.message && (
              <div className="mb-8 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-left">
                <p className="text-xs font-mono text-red-300 break-words">
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
                Go Home
              </Link>
            </div>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-gray-800">
              <p className="text-sm text-gray-500">
                Error ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
