"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { XCircle, Building2, Trash2, AlertCircle } from "lucide-react";

// --- Fixed Skeleton Card Component ---
const SkeletonCard = () => (
  <div className="bg-[#0f1117] border border-slate-800 rounded-2xl p-6 animate-pulse">
    <div className="flex justify-between items-start mb-6">
      <div className="w-12 h-12 bg-slate-800 rounded-xl"></div>
      <div className="w-20 h-6 bg-slate-800 rounded-full"></div>
    </div>
    <div className="space-y-4">
      <div className="h-7 bg-slate-800 rounded-md w-3/4"></div>{" "}
      <div className="h-4 bg-slate-800 rounded-md w-1/2"></div>{" "}
      <div className="pt-2">
        <div className="h-16 bg-slate-900/50 rounded-lg border border-slate-800/50 w-full"></div>{" "}
      </div>
      <div className="pt-4 flex items-center justify-between border-t border-slate-800/50 mt-4">
        <div className="h-4 bg-slate-800 rounded w-16"></div>{" "}
      </div>
    </div>
  </div>
);

export default function RejectedPage() {
  const [rejectedApps, setRejectedApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    document.title = "Rejected | CareerPilot";
  }, []);

  useEffect(() => {
    if (!session?.user) return;

    setLoading(true);
    fetch("/api/user/applications")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((app) => app.status === "rejected");
        setRejectedApps(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [session]);

  return (
    <div className="min-h-screen bg-[#05070a] text-slate-200 p-6 md:p-12 selection:bg-rose-500/30">
      <div className="max-w-6xl mx-auto pt-20">
        {/* Header Section */}
        <div className="mb-12 space-y-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Archived{" "}
            <span className="bg-linear-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent">
              Applications
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            {loading
              ? "Loading history..."
              : `You have ${rejectedApps.length} closed applications.`}
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? // Pre-defined number of skeleton cards for better UX
              [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
            : rejectedApps.map((app) => (
                <div
                  key={app._id}
                  className="group relative bg-[#0f1117] border border-slate-800 rounded-2xl p-6 hover:border-rose-500/40 transition-all duration-500 opacity-80 hover:opacity-100"
                >
                  {/* Rose Glow Effect */}
                  <div className="absolute inset-0 bg-linear-to-br from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700 group-hover:bg-rose-500/10 group-hover:border-rose-500/20 transition-all duration-300">
                        <XCircle className="w-6 h-6 text-rose-500" />
                      </div>
                      <span className="flex items-center gap-1.5 px-3 py-1 bg-rose-500/10 text-rose-500 text-[10px] font-bold uppercase tracking-widest rounded-full border border-rose-500/20">
                        Rejected
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-slate-300 group-hover:text-white transition-colors duration-300 capitalize flex items-center gap-2">
                          {app.position}
                        </h3>
                        <div className="flex items-center gap-2 text-slate-500 mt-1">
                          <Building2 className="w-4 h-4" />
                          <span className="font-medium">{app.companyName}</span>
                        </div>
                      </div>

                      <div className="space-y-3 pt-2">
                        <div className="flex items-start gap-3 text-sm text-slate-400 bg-rose-950/10 p-3 rounded-lg border border-rose-500/10 italic">
                          <AlertCircle className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                          <span>
                            This position is no longer accepting applications
                            from your profile.
                          </span>
                        </div>
                      </div>

                      <div className="pt-4 flex items-center justify-between border-t border-slate-800/50 mt-4">
                        <button className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-rose-400 transition-colors cursor-pointer">
                          <Trash2 className="w-3.5 h-3.5" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* Empty State */}
        {!loading && rejectedApps.length === 0 && (
          <div className="text-center py-24 bg-[#0a0c10] rounded-3xl border border-slate-800 border-dashed">
            <div className="inline-flex p-4 bg-slate-900 rounded-full mb-4">
              <XCircle className="w-8 h-8 text-slate-700" />
            </div>
            <p className="text-slate-500 text-lg">
              No rejected applications found.
            </p>
            <p className="text-slate-600 text-sm mt-1">
              That's a good sign! Keep applying.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
