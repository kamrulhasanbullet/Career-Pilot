"use client";
import React, { useEffect, useState } from "react";
import {
  Search,
  MapPin,
  Briefcase,
  Globe,
  ArrowUpRight,
  Zap,
  ChevronDown,
} from "lucide-react";
import JobCardSkeleton from "./skeleton/JobCardSkeleton";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function AllJobsCard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      });
  }, []);

  const handleApply = async (jobId) => {
    const res = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobId }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Application Submitted",
      text: "Your application has been submitted successfully.",
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#05070a] text-white p-6 overflow-x-hidden relative">
      {/* Aesthetic Background Glow */}
      <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto z-10 relative pt-20">
        {/* Header with Stats */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">
              <Zap size={14} /> New Opportunities
            </div>
            <h1 className="text-5xl font-extrabold tracking-tighter">
              Explore Jobs
            </h1>
          </div>

          <div className="bg-white/5 border border-white/10 p-3 px-5 rounded-2xl flex items-center gap-4">
            <div>
              <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">
                Total Jobs
              </p>
              <p className="text-xl text-center font-mono">{jobs.length}</p>
            </div>
          </div>
        </div>

        {/* Modern Compact Search & Filter Bar */}
        <div className="bg-white/5 p-2 rounded-2xl border border-white/10 backdrop-blur-md mb-12 space-y-2 md:space-y-0">
          <div className="flex flex-col md:flex-row gap-2">
            {/* Search Input - Height Reduced */}
            <div className="flex-2 relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />
              <input
                type="text"
                placeholder="Job title or company..."
                className="w-full bg-white/5 border border-white/5 rounded-xl py-2.5 pl-11 pr-4 outline-none text-white placeholder-gray-600 focus:bg-white/10 transition-all text-sm"
              />
            </div>

            {/* Position Filter */}
            <div className="flex-1 relative">
              <Briefcase
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={16}
              />
              <select className="w-full bg-white/5 border border-white/5 rounded-xl py-2.5 pl-10 pr-8 outline-none text-gray-400 appearance-none text-sm cursor-pointer hover:bg-white/10 transition-all">
                <option>Position</option>
                <option>Frontend</option>
                <option>Backend</option>
                <option>Fullstack</option>
                <option>Internship</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
                size={16}
              />
            </div>

            {/* Location Filter */}
            <div className="flex-1 relative">
              <MapPin
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={16}
              />
              <select className="w-full bg-white/5 border border-white/5 rounded-xl py-2.5 pl-10 pr-8 outline-none text-gray-400 appearance-none text-sm cursor-pointer hover:bg-white/10 transition-all">
                <option>Type</option>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>On-site</option>
                <option>Remote</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
                size={16}
              />
            </div>

            <button className="bg-indigo-600 hover:bg-indigo-500 px-6 py-2.5 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-indigo-600/20 text-sm cursor-pointer">
              Clear Filters
            </button>
          </div>
        </div>

        {/* Job Listings Grid */}
        <div>
          {loading ? (
            <div>
              <JobCardSkeleton />
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-20 text-gray-500 flex flex-col items-center justify-center">
              <Briefcase size={48} className="mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">No jobs found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 pb-20">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="group relative p-px rounded-[2.5rem] transition-all duration-500 hover:scale-[1.01] active:scale-[0.99] overflow-hidden shadow-2xl"
                >
                  {/* 1. Ultra-Thin Animated Border Gradient */}
                  <div className="absolute inset-0 bg-linear-to-br from-indigo-500/20 via-transparent to-purple-500/20 opacity-100 group-hover:from-indigo-500 group-hover:to-purple-500 transition-all duration-700" />

                  {/* 2. Main Container with Deep Glass Effect */}
                  <div className="relative bg-[#08090a]/90 backdrop-blur-3xl rounded-[2.5rem] p-4 md:p-10 h-full">
                    {/* Background Glows (Subtle Mesh) */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-purple-500/5 blur-[80px] rounded-full pointer-events-none" />

                    <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-10">
                      {/* --- Left Side: Branding & Role --- */}
                      <div className="flex-1 space-y-8">
                        <div className="flex items-center gap-6">
                          {/* Logo with Outer Ring */}
                          <div className="relative shrink-0">
                            <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-0 group-hover:opacity-20 transition-opacity" />
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-linear-to-br from-white/10 to-white/2 border border-white/10 rounded-[1.8rem] flex items-center justify-center shadow-inner group-hover:border-indigo-500/30 transition-all duration-500">
                              <Briefcase
                                className="text-white group-hover:text-indigo-400 transition-colors"
                                size={32}
                              />
                            </div>
                          </div>
                          <div className="space-y-3">
                            {/* Job Position - Scaling text for mobile */}
                            <div className="flex flex-wrap items-center gap-3">
                              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter text-white/90 group-hover:text-white transition-colors leading-tight">
                                {job.position}
                              </h2>
                            </div>

                            {/* Company Info & Tags - Responsive Layout */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                              {/* Company Name */}
                              <span className="text-base md:text-lg font-semibold text-indigo-400/90 whitespace-nowrap">
                                {job.companyName}
                              </span>

                              <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-white/20" />

                              {/* Job Type Tag */}
                              <div className="flex items-center gap-1.5 w-fit px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-widest backdrop-blur-md">
                                <Globe size={12} className="text-indigo-500" />
                                <span>{job.type || "Remote"}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Description with Gradient Mask */}
                        <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl font-light line-clamp-2">
                          {job.description}
                        </p>

                        {/* Floating Tags */}
                        <div className="flex flex-wrap gap-3">
                          {job.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-4 py-2 bg-white/3 hover:bg-white/8 border border-white/5 rounded-2xl text-xs font-medium text-gray-400 hover:text-indigo-300 transition-all cursor-default"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* --- Right Side: Details & CTA --- */}
                      <div className="flex flex-col justify-between items-start lg:items-end gap-8 shrink-0">
                        <div className="lg:text-right space-y-3">
                          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-bold">
                            <MapPin size={16} /> {job.location}
                          </div>

                          <div className="block">
                            <span className="text-sm text-gray-500 font-medium block uppercase tracking-widest mb-1">
                              Estimated Salary
                            </span>
                            <span className="text-4xl font-black text-white tracking-tighter">
                              {job.salary}
                            </span>
                            <span className="text-indigo-500 text-xl ml-1">
                              /m
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 w-full sm:w-auto">
                          {/* Details Button - Minimalist */}
                          <button className="flex-1 sm:flex-none px-8 py-4 rounded-2xl font-bold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all active:scale-95">
                            Details
                          </button>

                          {/* Apply Button - The 'Wow' Element */}
                          <button
                            onClick={() => handleApply(job._id)}
                            className="flex-1 sm:flex-none relative group/btn flex items-center justify-center gap-2 sm:gap-3 bg-white text-black px-5 py-5 sm:px-10 sm:py-4 rounded-2xl font-black transition-all hover:bg-indigo-500 hover:text-white active:scale-95 shadow-[0_20px_40px_-15px_rgba(255,255,255,0.1)] hover:shadow-indigo-500/40 overflow-hidden cursor-pointer"
                          >
                            <span className="relative z-10 flex items-center gap-2 uppercase tracking-tighter italic text-xs sm:text-sm md:text-base whitespace-nowrap">
                              Apply Now
                              <ArrowUpRight
                                size={18}
                                strokeWidth={3}
                                className="shrink-0"
                              />
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
