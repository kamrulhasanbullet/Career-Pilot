"use client";
import React, { useEffect, useState } from "react";
import {
  MapPin,
  Briefcase,
  Globe,
  ArrowUpRight,
  Zap,
  Edit3,
  Trash2,
  Plus,
  X,
  User,
  Mail,
  Calendar,
  UserCheck,
  UserX,
} from "lucide-react";
import Link from "next/link";

export default function MyJobsCard() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/jobs?company=true")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error("Jobs fetch error:", err));
  }, []);

  // Modal open func → applicants fetch
  const openApplicantsModal = async (job) => {
    // get the right job._id
    const jobId = job._id?.$oid || job._id;

    setSelectedJob(job);
    setLoading(true);
    setApplicants([]);

    try {
      // URL encode jobId
      const encodedJobId = encodeURIComponent(jobId);
      const url = `/api/applications/${encodedJobId}`;

      const res = await fetch(url);

      const data = await res.json();
      console.log("Response data:", data);

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch applicants");
      }

      setApplicants(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedJob(null);
    setApplicants([]);
  };

  return (
    <div className="min-h-screen w-full bg-[#030407] text-white px-4 sm:px-6 py-16 md:py-12 overflow-x-hidden relative font-sans">
      {/* Background glows */}
      <div className="absolute top-[-5%] right-[-5%] w-64 h-64 md:w-125 md:h-125 bg-indigo-600/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-5%] left-[-5%] w-48 h-48 md:w-100 md:h-100 bg-purple-600/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto z-10 relative pt-8 md:pt-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-8">
          <div className="space-y-4 w-full md:w-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]">
              <Zap size={14} className="fill-indigo-400" /> Company Dashboard
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter bg-clip-text text-transparent bg-linear-to-b from-white to-white/40 leading-[1.1] pb-4">
              Manage <span className="text-white">Postings.</span>
            </h1>
            <p className="text-gray-500 font-medium max-w-md text-sm md:text-base">
              Review, update, or remove your active job listings.
            </p>
          </div>

          <div className="flex gap-3 md:gap-4 items-center w-full md:w-auto">
            <div className="flex-1 md:flex-none bg-white/5 backdrop-blur-md border border-white/10 p-3 md:p-4 px-6 md:px-8 rounded-2xl md:rounded-4xl text-center">
              <p className="text-gray-500 text-[8px] md:text-[10px] uppercase font-black tracking-widest mb-1">
                Active Posts
              </p>
              <p className="text-2xl md:text-3xl font-mono font-bold text-indigo-400">
                {jobs.length}
              </p>
            </div>
            <Link
              href="/post-job"
              className="h-14 w-14 md:h-16 md:w-16 bg-indigo-600 hover:bg-indigo-500 rounded-2xl md:rounded-4xl flex items-center justify-center transition-all hover:rotate-90 shadow-lg shadow-indigo-600/20"
            >
              <Plus className="w-6 h-6 md:w-7 md:h-7" strokeWidth={3} />
            </Link>
          </div>
        </div>

        {/* Job List */}
        <div className="grid grid-cols-1 gap-6 pb-20">
          {jobs.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              No job postings yet. Create one to get started!
            </div>
          ) : (
            jobs.map((job) => (
              <div
                key={job._id}
                className="group relative bg-[#0a0c10] border border-white/5 p-px rounded-4xl md:rounded-[3rem] transition-all duration-500 hover:border-indigo-500/40"
              >
                <div className="bg-[#0d1117] rounded-[1.9rem] md:rounded-[2.8rem] p-5 md:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 md:gap-8">
                  {/* Job Info */}
                  <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6 w-full lg:w-3/5">
                    <div className="w-14 h-14 md:w-20 md:h-20 bg-linear-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl md:rounded-4xl flex items-center justify-center border border-white/10 shrink-0">
                      <Briefcase className="text-indigo-400 w-6 h-6 md:w-8 md:h-8" />
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight group-hover:text-indigo-300 transition-colors">
                        {job.position}
                      </h2>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs md:text-sm font-medium text-gray-500">
                        <span className="flex items-center gap-1.5">
                          <Globe size={14} /> {job.companyName}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin size={14} /> {job.location}
                        </span>
                        <span className="text-indigo-400/80 font-bold uppercase">
                          {job.salary}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-row items-center gap-2 md:gap-3 w-full lg:w-auto pt-4 lg:pt-0 border-t border-white/5 lg:border-none justify-between sm:justify-end">
                    <div className="flex items-center gap-2 md:gap-3 flex-1 sm:flex-none">
                      <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-indigo-500/10 hover:bg-indigo-500 border border-indigo-500/20 px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold transition-all group/btn">
                        <Edit3 className="w-4 h-4 md:w-5 md:h-5 text-indigo-400 group-hover/btn:text-white" />
                        <span className="text-xs md:text-sm text-indigo-400 group-hover/btn:text-white">
                          Update
                        </span>
                      </button>
                      <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500 border border-red-500/20 px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold transition-all group/del">
                        <Trash2 className="w-4 h-4 md:w-5 md:h-5 text-red-400 group-hover/del:text-white" />
                        <span className="text-xs md:text-sm text-red-400 group-hover/del:text-white">
                          Delete
                        </span>
                      </button>
                    </div>

                    {/* Arrow button → Modal open */}
                    <button
                      onClick={() => {
                        openApplicantsModal(job);
                      }}
                      className="sm:flex p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/5 hover:bg-indigo-600/20 border border-white/5 hover:border-indigo-500/50 transition-all text-gray-400 hover:text-indigo-300 shadow-sm hover:shadow-indigo-500/20"
                    >
                      <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Applicants Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-[#0d1117] border border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
            {/* Modal Header */}
            <div className="sticky top-0 bg-[#0d1117] border-b border-white/10 p-6 flex items-center justify-between z-10">
              <div>
                <h2 className="text-2xl font-bold">{selectedJob.position}</h2>
                <p className="text-gray-400 mt-1">
                  {applicants.length} Applicant
                  {applicants.length !== 1 ? "s" : ""}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X size={28} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {loading ? (
                <div className="text-center py-12 text-gray-500">
                  Loading applicants...
                </div>
              ) : applicants.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No applications received yet.
                </div>
              ) : (
                applicants.map((app) => (
                  <div
                    key={app._id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-black/30 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                          <User size={20} className="text-indigo-400" />
                        </div>
                        <div>
                          <p className="font-medium text-lg">{app.userName}</p>
                          <p className="text-sm text-gray-400 flex items-center gap-1.5">
                            <Mail size={14} /> {app.userEmail}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 flex items-center gap-1.5">
                        <Calendar size={14} /> Applied on{" "}
                        {new Date(app.createdAt).toLocaleDateString("en-GB")}
                      </p>
                    </div>

                    {/* Status Buttons */}
                    <div className="flex gap-3 mt-4 sm:mt-0">
                      <button
                        onClick={() => updateStatus(app._id, "interview")}
                        disabled={app.status === "interview"}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                          app.status === "interview"
                            ? "bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 cursor-not-allowed"
                            : "bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:text-white"
                        }`}
                      >
                        <UserCheck size={18} />
                        Interview
                      </button>

                      <button
                        onClick={() => updateStatus(app._id, "rejected")}
                        disabled={app.status === "rejected"}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                          app.status === "rejected"
                            ? "bg-rose-600/30 text-rose-300 border border-rose-500/40 cursor-not-allowed"
                            : "bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 hover:text-white"
                        }`}
                      >
                        <UserX size={18} />
                        Reject
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
