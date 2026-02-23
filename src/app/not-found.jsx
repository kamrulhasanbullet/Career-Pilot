import { Search, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30 overflow-hidden flex items-center justify-center py-12">
      {/* Animated Background Gradients */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-purple-600/10 blur-3xl rounded-full animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 blur-3xl rounded-full animate-pulse" />

      {/* Content */}
      <div className="relative z-10 px-6 py-12 text-center max-w-lg">
        {/* Icon Container */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full animate-pulse" />
            <div className="relative bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full p-6 backdrop-blur-sm">
              <Search className="w-12 h-12 text-purple-400" />
            </div>
          </div>
        </div>

        {/* 404 Display */}
        <div className="mb-6">
          <h1 className="text-8xl md:text-9xl font-black bg-gradient-to-b from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent tracking-tighter">
            404
          </h1>
        </div>

        {/* Error Message */}
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 text-white">
          Page Not Found
        </h2>

        <p className="text-gray-400 mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        {/* Suggestions */}
        <div className="mb-8 p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
          <p className="text-sm text-purple-300">
            ✨ Try searching or navigate to a different page using the links below.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200 hover:shadow-lg hover:shadow-blue-600/50"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium transition-all duration-200 hover:shadow-lg hover:shadow-gray-800/50 border border-gray-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-xs text-gray-500 mb-4">Quick Links</p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link
              href="/"
              className="text-xs px-3 py-1 rounded-full bg-gray-800/50 hover:bg-gray-700 text-gray-300 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/view-all-jobs"
              className="text-xs px-3 py-1 rounded-full bg-gray-800/50 hover:bg-gray-700 text-gray-300 transition-colors"
            >
              Jobs
            </Link>
            <Link
              href="/user-dashboard"
              className="text-xs px-3 py-1 rounded-full bg-gray-800/50 hover:bg-gray-700 text-gray-300 transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
