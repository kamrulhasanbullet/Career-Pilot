"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  Calendar,
  Building2,
  Mail,
  ArrowUpRight,
  Video,
  MapPin,
} from "lucide-react";

// --- Fixed Skeleton Card Component for Interviews ---
const SkeletonCard = () => (
  <div className="bg-[#0f1117] border border-slate-800 rounded-2xl p-6 animate-pulse">
    <div className="flex justify-between items-start mb-6">
      <div className="w-12 h-12 bg-slate-800 rounded-xl"></div>
      <div className="w-20 h-6 bg-slate-800 rounded-full"></div>
    </div>
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="h-7 bg-slate-800 rounded-md w-3/4"></div>{" "}
        <div className="h-4 bg-slate-800 rounded-md w-1/2"></div>{" "}
      </div>
      <div className="pt-2">
        <div className="h-14 bg-indigo-950/10 rounded-lg border border-slate-800/50 w-full"></div>{" "}
      </div>
      <div className="h-4 bg-slate-800 rounded-md w-2/3 mt-4"></div>{" "}
      <div className="mt-8 pt-4 border-t border-slate-800/50 flex justify-between items-center">
        <div className="h-3 bg-slate-800 rounded w-16"></div>{" "}
        <div className="h-3 bg-slate-800 rounded w-20"></div>{" "}
      </div>
    </div>
  </div>
);

export default function InterviewsPage() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    document.title = "Interviews | CareerPilot";
  }, []);

  useEffect(() => {
    if (!session?.user) return;

    setLoading(true);
    fetch("/api/user/applications")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((app) => app.status === "interview");
        setInterviews(filtered);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [session]);

  return (
    <div className="min-h-screen bg-[#05070a] text-slate-200 p-6 md:p-12 selection:bg-indigo-500/30">
      <div className="max-w-6xl mx-auto pt-20">
        {/* Header Section */}
        <div className="mb-12 space-y-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Upcoming{" "}
            <span className="bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Interviews
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            {loading
              ? "Preparing your schedule..."
              : `You have ${interviews.length} interview(s) scheduled.`}
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? // Displaying 6 skeletons for a full grid feel
              [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
            : interviews.map((app) => (
                <div
                  key={app._id}
                  className="group relative bg-[#0f1117] border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 transition-all duration-500 hover:shadow-[0_0_30px_-10px_rgba(99,102,241,0.2)]"
                >
                  {/* Indigo Glow Effect */}
                  <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700 group-hover:scale-110 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/30 transition-all duration-300">
                        <Video className="w-6 h-6 text-indigo-400" />
                      </div>
                      <span className="flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase tracking-widest rounded-full border border-indigo-500/20">
                        <Calendar className="w-3 h-3" />
                        Interview
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors duration-300 capitalize flex items-center gap-2">
                          {app.position}
                          <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </h3>
                        <div className="flex items-center gap-2 text-slate-400 mt-1">
                          <Building2 className="w-4 h-4 text-slate-500" />
                          <span className="font-medium">{app.companyName}</span>
                        </div>
                      </div>

                      <div className="space-y-2 pt-2">
                        <div className="flex items-center gap-3 text-sm text-slate-400 bg-indigo-950/20 p-3 rounded-lg border border-indigo-500/10">
                          <Video className="w-4 h-4 text-indigo-400" />
                          <span className="text-indigo-200 font-medium">
                            Link will be sent via mail
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-sm text-slate-400 px-2 mt-4">
                          <Mail className="w-4 h-4 text-slate-500" />
                          <span className="truncate opacity-80">
                            {app.userEmail}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-slate-800/50 flex justify-between items-center text-[11px] font-mono text-slate-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{app.type}</span>
                      </div>
                      <span>
                        {new Date(app.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* Empty State */}
        {!loading && interviews.length === 0 && (
          <div className="text-center py-24 bg-[#0a0c10] rounded-3xl border border-slate-800 border-dashed">
            <div className="inline-flex p-4 bg-slate-900 rounded-full mb-4">
              <Calendar className="w-8 h-8 text-slate-700" />
            </div>
            <p className="text-slate-500 text-lg">
              No interviews scheduled yet.
            </p>
            <p className="text-slate-600 text-sm mt-1">
              Check your pending applications for updates.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
