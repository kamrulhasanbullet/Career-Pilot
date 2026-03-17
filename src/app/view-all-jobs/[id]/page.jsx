"use client";
import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  Globe,
  ArrowUpRight,
  Zap,
  Clock,
  DollarSign,
  Users,
  CheckCircle2,
  Building2,
  Calendar,
  Share2,
  BookmarkPlus,
  ChevronRight,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Link from "next/link";

// ─── Skeleton ────────────────────────────────────────────────────────────────
function DetailsSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="h-10 w-40 bg-white/5 rounded-2xl" />
      <div className="bg-white/5 rounded-[2.5rem] p-10 space-y-6">
        <div className="flex gap-6 items-center">
          <div className="w-24 h-24 bg-white/10 rounded-[1.8rem]" />
          <div className="space-y-3 flex-1">
            <div className="h-8 w-64 bg-white/10 rounded-xl" />
            <div className="h-4 w-40 bg-white/5 rounded-xl" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 bg-white/5 rounded-2xl" />
          ))}
        </div>
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 bg-white/5 rounded-xl w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function JobDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/jobs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setJob(data);
        setLoading(false);

        if (data?.position) {
          document.title = `${data.position} at ${data.companyName} | CareerPilot`;
        }
      })
      .catch(() => {
        toast.error("Failed to load job details.");
        setLoading(false);
      });
  }, [id]);

  const handleApply = async () => {
    setApplying(true);
    const res = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobId: id }),
    });
    const data = await res.json();
    setApplying(false);

    if (!res.ok) {
      toast.error(data.message);
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Application Submitted",
      text: "Your application has been submitted successfully.",
      background: "#08090a",
      color: "#fff",
      confirmButtonColor: "#6366f1",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const tabs = ["overview", "responsibilities", "requirements", "benefits"];

  return (
    <div className="min-h-screen w-full bg-[#05070a] text-white p-4 md:p-8 overflow-x-hidden relative">
      {/* ── Background Glows ── */}
      <div className="fixed top-[-10%] left-[-5%] w-[50%] h-[50%] bg-indigo-600/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 pt-20 pb-28">
        {/* ── Back Button ── */}
        <button
          onClick={() => router.back()}
          className="group flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all mb-10 text-sm font-semibold cursor-pointer"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
          Back to Jobs
        </button>

        {loading ? (
          <DetailsSkeleton />
        ) : !job ? (
          <div className="text-center py-40 text-gray-500">
            <Briefcase size={48} className="mx-auto mb-4 opacity-20" />
            <p className="text-lg font-medium">Job not found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-8">
            {/* LEFT COLUMN */}
            <div className="space-y-6">
              {/* ── Hero Card ── */}
              <div className="group relative p-px rounded-[2.5rem] overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-linear-to-br from-indigo-500/20 via-transparent to-purple-500/20" />
                <div className="relative bg-[#08090a]/90 backdrop-blur-3xl rounded-[2.5rem] p-6 md:p-10">
                  {/* Inner glow */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1/2 bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />

                  <div className="relative z-10">
                    {/* Top row: logo + title + actions */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-8">
                      <div className="flex items-center gap-5">
                        <div className="relative shrink-0">
                          <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 rounded-[1.8rem]" />
                          <div className="w-16 h-16 md:w-20 md:h-20 bg-linear-to-br from-white/10 to-white/2 border border-white/10 rounded-[1.8rem] flex items-center justify-center">
                            <Briefcase className="text-indigo-400" size={30} />
                          </div>
                        </div>
                        <div>
                          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter text-white leading-tight mb-2">
                            {job.position}
                          </h1>
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="text-indigo-400 font-semibold text-base">
                              {job.companyName}
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-white/20 hidden sm:block" />
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                              <Globe size={12} className="text-indigo-500" />
                              {job.type || "Remote"}
                            </div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[11px] font-bold uppercase tracking-widest">
                              <Zap size={12} /> Hiring
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={handleShare}
                          className="p-3 rounded-2xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                        >
                          <Share2 size={18} />
                        </button>
                        <button
                          onClick={() => setSaved(!saved)}
                          className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                            saved
                              ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-400"
                              : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          <BookmarkPlus size={18} />
                        </button>
                      </div>
                    </div>

                    {/* ── Quick Stats Row ── */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                      {[
                        {
                          icon: (
                            <DollarSign
                              size={16}
                              className="text-emerald-400"
                            />
                          ),
                          label: "Salary",
                          value: `${job.salary}/m`,
                          bg: "bg-emerald-500/5 border-emerald-500/10",
                        },
                        {
                          icon: <MapPin size={16} className="text-blue-400" />,
                          label: "Location",
                          value: job.location,
                          bg: "bg-blue-500/5 border-blue-500/10",
                        },
                        {
                          icon: <Clock size={16} className="text-amber-400" />,
                          label: "Type",
                          value: job.type || "Full-time",
                          bg: "bg-amber-500/5 border-amber-500/10",
                        },
                        {
                          icon: (
                            <Calendar size={16} className="text-purple-400" />
                          ),
                          label: "Posted",
                          value: job.createdAt
                            ? new Date(job.createdAt).toLocaleDateString(
                                "en-US",
                                { month: "short", day: "numeric" },
                              )
                            : "Recent",
                          bg: "bg-purple-500/5 border-purple-500/10",
                        },
                      ].map(({ icon, label, value, bg }) => (
                        <div
                          key={label}
                          className={`${bg} border rounded-2xl p-4 space-y-1`}
                        >
                          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                            {icon} {label}
                          </div>
                          <p className="text-white font-bold text-sm truncate">
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* ── Tags ── */}
                    {job.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {job.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-4 py-2 bg-white/3 hover:bg-white/8 border border-white/5 rounded-2xl text-xs font-medium text-gray-400 hover:text-indigo-300 transition-all cursor-default"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ── Tab Navigation ── */}
              <div className="flex flex-wrap gap-1 p-1.5 bg-white/5 border border-white/10 rounded-2xl w-full sm:w-fit">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 sm:flex-none px-3 sm:px-5 py-2.5 rounded-xl text-[10px] sm:text-xs font-bold tracking-widest transition-all cursor-pointer capitalize ${
                      activeTab === tab
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                        : "text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* ── Tab Content Card ── */}
              <div className="relative p-px rounded-4xl overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent" />
                <div className="relative bg-[#08090a]/90 backdrop-blur-3xl rounded-4xl p-6 md:p-10">
                  {activeTab === "overview" && (
                    <div className="space-y-5">
                      <SectionHeading>About This Role</SectionHeading>
                      <p className="text-gray-400 leading-relaxed text-base font-light">
                        {job.description || "No description provided."}
                      </p>
                      {job.about && (
                        <p className="text-gray-400 leading-relaxed text-base font-light">
                          {job.about}
                        </p>
                      )}
                    </div>
                  )}

                  {activeTab === "responsibilities" && (
                    <div className="space-y-5">
                      <SectionHeading>Key Responsibilities</SectionHeading>
                      <BulletList
                        items={
                          job.responsibilities || [
                            "Responsibilities not specified.",
                          ]
                        }
                      />
                    </div>
                  )}

                  {activeTab === "requirements" && (
                    <div className="space-y-5">
                      <SectionHeading>Requirements</SectionHeading>
                      <BulletList
                        items={
                          job.requirements || ["Requirements not specified."]
                        }
                      />
                    </div>
                  )}

                  {activeTab === "benefits" && (
                    <div className="space-y-5">
                      <SectionHeading>What We Offer</SectionHeading>
                      <BulletList
                        items={job.benefits || ["Benefits not specified."]}
                        icon="check"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN  */}
            <div className="space-y-5">
              {/* ── Apply CTA Card ── */}
              <div className="sticky top-24 space-y-5">
                <div className="relative p-px rounded-4xl overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-br from-indigo-500/30 via-transparent to-purple-500/20" />
                  <div className="relative bg-[#08090a]/90 backdrop-blur-3xl rounded-4xl p-7 space-y-6">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-indigo-500/8 blur-[80px] rounded-full pointer-events-none" />

                    <div className="relative z-10 space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                        Estimated Salary
                      </p>
                      <div className="flex items-end gap-1">
                        <span className="text-5xl font-black tracking-tighter text-white">
                          {job.salary}
                        </span>
                        <span className="text-indigo-500 text-2xl mb-1">
                          /m
                        </span>
                      </div>
                    </div>

                    <div className="relative z-10 space-y-3">
                      <button
                        onClick={handleApply}
                        disabled={applying}
                        className="w-full relative flex items-center justify-center gap-3 bg-white text-black py-4 px-6 rounded-2xl font-black transition-all hover:bg-indigo-500 hover:text-white active:scale-95 shadow-[0_20px_40px_-15px_rgba(255,255,255,0.15)] hover:shadow-indigo-500/40 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden group"
                      >
                        {applying ? (
                          <span className="flex items-center gap-2 text-sm uppercase tracking-tighter italic">
                            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            Submitting...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2 text-sm uppercase tracking-tighter italic">
                            Apply Now
                            <ArrowUpRight size={18} strokeWidth={3} />
                          </span>
                        )}
                      </button>

                      <button
                        onClick={() => setSaved(!saved)}
                        className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-bold text-sm transition-all active:scale-95 border cursor-pointer ${
                          saved
                            ? "bg-indigo-500/20 border-indigo-500/30 text-indigo-300"
                            : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        <BookmarkPlus size={16} />
                        {saved ? "Saved" : "Save for Later"}
                      </button>
                    </div>

                    <div className="relative z-10 pt-4 border-t border-white/5 space-y-3">
                      {[
                        {
                          icon: <Building2 size={14} />,
                          label: "Company",
                          value: job.companyName,
                        },
                        {
                          icon: <MapPin size={14} />,
                          label: "Location",
                          value: job.location,
                        },
                        {
                          icon: <Globe size={14} />,
                          label: "Job Type",
                          value: job.type || "Remote",
                        },
                        {
                          icon: <Users size={14} />,
                          label: "Team",
                          value: job.team || "Engineering",
                        },
                      ].map(({ icon, label, value }) => (
                        <div
                          key={label}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2 text-gray-500 text-xs">
                            {icon}
                            <span className="uppercase tracking-widest font-bold">
                              {label}
                            </span>
                          </div>
                          <span className="text-gray-300 text-xs font-semibold text-right max-w-[55%] truncate">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── Similar Jobs Teaser ── */}
                <div className="relative p-px rounded-4xl overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent" />
                  <div className="relative bg-[#08090a]/80 rounded-4xl p-6">
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">
                        Similar Positions
                      </h3>
                      <Link
                        href="/view-all-jobs"
                        onClick={() => router.push("/jobs")}
                        className="flex items-center gap-1 text-indigo-400 text-xs font-bold hover:text-indigo-300 transition-colors cursor-pointer"
                      >
                        View All <ChevronRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function SectionHeading({ children }) {
  return (
    <h2 className="text-xl font-black tracking-tighter text-white flex items-center gap-3">
      <span className="w-1 h-5 bg-indigo-500 rounded-full" />
      {children}
    </h2>
  );
}

function BulletList({ items, icon }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-3 text-gray-400 text-sm leading-relaxed"
        >
          {icon === "check" ? (
            <CheckCircle2
              size={16}
              className="text-emerald-500 mt-0.5 shrink-0"
            />
          ) : (
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
          )}
          {item}
        </li>
      ))}
    </ul>
  );
}
