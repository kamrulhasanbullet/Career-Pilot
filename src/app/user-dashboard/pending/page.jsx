"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  Clock,
  Building2,
  Mail,
  DollarSign,
  Briefcase,
  ArrowUpRight,
} from "lucide-react";

// --- Skeleton Component ---
const SkeletonCard = () => (
  <div className="bg-[#0f1117] border border-slate-800 rounded-2xl p-6 animate-pulse">
    <div className="flex justify-between items-start mb-6">
      <div className="w-12 h-12 bg-slate-800 rounded-xl"></div>
      <div className="w-20 h-6 bg-slate-800 rounded-full"></div>
    </div>
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="h-6 bg-slate-800 rounded-md w-3/4"></div>
        <div className="h-4 bg-slate-800 rounded-md w-1/2"></div>
      </div>
      <div className="space-y-3 pt-2">
        <div className="h-10 bg-slate-900/50 rounded-lg border border-slate-800/50 w-full"></div>
        <div className="h-4 bg-slate-800 rounded-md w-2/3 ml-2"></div>
      </div>
    </div>
  </div>
);

export default function PendingPage() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    document.title = "Pending | CareerPilot";
  }, []);

  useEffect(() => {
    if (!session?.user) return;

    setLoading(true);
    fetch("/api/user/applications")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((app) => app.status === "pending");
        setApps(filtered);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [session]);

  return (
    <div className="min-h-screen bg-[#05070a] text-slate-200 p-6 md:p-12 selection:bg-blue-500/30">
      <div className="max-w-6xl mx-auto pt-20">
        {/* Header Section */}
        <div className="mb-12 space-y-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Pending{" "}
            <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Applications
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            {loading
              ? "Fetching your applications..."
              : `You currently have ${apps.length} applications waiting for a response.`}
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? // Show 6 Skeletons while loading
              Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : apps.map((app) => (
                <div
                  key={app._id}
                  className="group relative bg-[#0f1117] border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-500 hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.2)]"
                >
                  {/* Glow Effect on Hover */}
                  <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700 group-hover:scale-110 group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition-all duration-300">
                        <Briefcase className="w-6 h-6 text-blue-400" />
                      </div>
                      <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-500 text-[10px] font-bold uppercase tracking-widest rounded-full border border-amber-500/20">
                        <Clock className="w-3 h-3" />
                        {app.status}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300 capitalize flex items-center gap-2">
                          {app.position}
                          <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </h3>
                        <div className="flex items-center gap-2 text-slate-400 mt-1">
                          <Building2 className="w-4 h-4 text-slate-500" />
                          <span className="font-medium">{app.companyName}</span>
                        </div>
                      </div>

                      <div className="space-y-2 pt-2">
                        <div className="flex items-center gap-3 text-sm text-slate-400 bg-slate-900/50 p-2 rounded-lg border border-slate-800/50">
                          <DollarSign className="w-4 h-4 text-emerald-500" />
                          <span className="text-slate-300">
                            {app.salary}{" "}
                            <span className="text-slate-500">/ month</span>
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-sm text-slate-400 px-2">
                          <Mail className="w-4 h-4 text-slate-500" />
                          <span className="truncate opacity-80">
                            {app.userEmail}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* Empty State */}
        {!loading && apps.length === 0 && (
          <div className="text-center py-24 bg-[#0a0c10] rounded-3xl border border-slate-800 border-dashed">
            <div className="inline-flex p-4 bg-slate-900 rounded-full mb-4">
              <Briefcase className="w-8 h-8 text-slate-700" />
            </div>
            <p className="text-slate-500 text-lg">
              No pending applications found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
