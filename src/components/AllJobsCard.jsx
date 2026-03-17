"use client";
import React, { useEffect, useState, useMemo } from "react";
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
import Link from "next/link";

export default function AllJobsCard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const JOBS_PER_PAGE = 10;

  // --- Filter State ---
  const [searchQuery, setSearchQuery] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      });
  }, []);

  // --- Filter change e page reset ---
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, positionFilter, typeFilter]);

  // --- Derived: Filtered Jobs ---
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const query = searchQuery.toLowerCase();

      const matchesSearch =
        !query ||
        job.position?.toLowerCase().includes(query) ||
        job.companyName?.toLowerCase().includes(query);

      const matchesPosition =
        !positionFilter ||
        job.position?.toLowerCase().includes(positionFilter.toLowerCase());

      const matchesType =
        !typeFilter || job.type?.toLowerCase() === typeFilter.toLowerCase();

      return matchesSearch && matchesPosition && matchesType;
    });
  }, [jobs, searchQuery, positionFilter, typeFilter]);

  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);

  const visibleJobs = useMemo(() => {
    const start = (currentPage - 1) * JOBS_PER_PAGE;
    return filteredJobs.slice(start, start + JOBS_PER_PAGE);
  }, [filteredJobs, currentPage]);

  // --- Clear All Filters ---
  const handleClearFilters = () => {
    setSearchQuery("");
    setPositionFilter("");
    setTypeFilter("");
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isFiltering = searchQuery || positionFilter || typeFilter;

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
    <div className="min-h-screen w-full bg-[#05070a] text-white px-6 pt-12 pb-20 md:py-20 overflow-x-hidden relative">
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
                {isFiltering ? "Matching Jobs" : "Total Jobs"}
              </p>
              <p className="text-xl text-center font-mono">
                {isFiltering ? filteredJobs.length : jobs.length}
              </p>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white/5 p-2 rounded-2xl border border-white/10 backdrop-blur-md mb-12 space-y-2 md:space-y-0">
          <div className="flex flex-col md:flex-row gap-2">
            {/* Search Input */}
            <div className="flex-2 relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
              <select
                value={positionFilter}
                onChange={(e) => setPositionFilter(e.target.value)}
                className="w-full bg-white/5 border border-white/5 rounded-xl py-2.5 pl-10 pr-8 outline-none text-gray-400 appearance-none text-sm cursor-pointer hover:bg-white/10 transition-all"
              >
                <option value="">Position</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Fullstack">Fullstack</option>
                <option value="Internship">Internship</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
                size={16}
              />
            </div>

            {/* Type Filter */}
            <div className="flex-1 relative">
              <MapPin
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={16}
              />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full bg-white/5 border border-white/5 rounded-xl py-2.5 pl-10 pr-8 outline-none text-gray-400 appearance-none text-sm cursor-pointer hover:bg-white/10 transition-all"
              >
                <option value="">Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="On-site">On-site</option>
                <option value="Remote">Remote</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
                size={16}
              />
            </div>

            <button
              onClick={handleClearFilters}
              disabled={!isFiltering}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed px-6 py-2.5 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-indigo-600/20 text-sm cursor-pointer"
            >
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
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-20 text-gray-500 flex flex-col items-center justify-center">
              <Briefcase size={48} className="mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">
                {isFiltering ? "No jobs match your filters" : "No jobs found"}
              </p>
              {isFiltering && (
                <button
                  onClick={handleClearFilters}
                  className="mt-4 text-indigo-400 hover:text-indigo-300 text-sm underline underline-offset-4"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-8">
                {visibleJobs.map((job) => (
                  <div
                    key={job._id}
                    className="group relative p-px rounded-[2.5rem] transition-all duration-500 hover:scale-[1.01] active:scale-[0.99] overflow-hidden shadow-2xl"
                  >
                    {/* Animated Border Gradient */}
                    <div className="absolute inset-0 bg-linear-to-br from-indigo-500/20 via-transparent to-purple-500/20 opacity-100 group-hover:from-indigo-500 group-hover:to-purple-500 transition-all duration-700" />

                    {/* Main Container */}
                    <div className="relative bg-[#08090a]/90 backdrop-blur-3xl rounded-[2.5rem] p-4 md:p-10 h-full">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />
                      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-purple-500/5 blur-[80px] rounded-full pointer-events-none" />

                      <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-10">
                        {/* Left Side */}
                        <div className="flex-1 space-y-8">
                          <div className="flex items-center gap-6">
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
                              <div className="flex flex-wrap items-center gap-3">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter text-white/90 group-hover:text-white transition-colors leading-tight">
                                  {job.position}
                                </h2>
                              </div>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                                <span className="text-base md:text-lg font-semibold text-indigo-400/90 whitespace-nowrap">
                                  {job.companyName}
                                </span>
                                <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-white/20" />
                                <div className="flex items-center gap-1.5 w-fit px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-widest backdrop-blur-md">
                                  <Globe
                                    size={12}
                                    className="text-indigo-500"
                                  />
                                  <span>{job.type || "Remote"}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl font-light line-clamp-2">
                            {job.description}
                          </p>

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

                        {/* Right Side */}
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
                            <Link
                              href={`/view-all-jobs/${job._id}`}
                              className="flex-1 sm:flex-none px-8 py-4 rounded-2xl font-bold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all active:scale-95"
                            >
                              Details
                            </Link>
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

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 py-16 flex-wrap">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-5 py-3 rounded-xl font-bold bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 cursor-pointer"
                  >
                    ← Prev
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 rounded-xl font-bold text-sm transition-all active:scale-95 border cursor-pointer ${
                          currentPage === page
                            ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                            : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-5 py-3 rounded-xl font-bold bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 cursor-pointer"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
