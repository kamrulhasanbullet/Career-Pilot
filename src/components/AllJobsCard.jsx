"use client";
import React, { useEffect, useState } from "react";
import {
  Search,
  MapPin,
  DollarSign,
  Briefcase,
  Globe,
  ArrowUpRight,
  Zap,
  ChevronDown,
  Tags,
} from "lucide-react";

export default function AllJobsCard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);

  const handleApply = async (jobId) => {
    const res = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobId }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("Applied Successfully");
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
              <p className="text-xl font-mono">{jobs.length}</p>
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
                <option>Location</option>
                <option>Remote</option>
                <option>On-site</option>
                <option>Hybrid</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
                size={16}
              />
            </div>

            {/* Tags Filter */}
            <div className="flex-1 relative">
              <Tags
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={16}
              />
              <select className="w-full bg-white/5 border border-white/5 rounded-xl py-2.5 pl-10 pr-8 outline-none text-gray-400 appearance-none text-sm cursor-pointer hover:bg-white/10 transition-all">
                <option>All Tags</option>
                <option>React</option>
                <option>Node.js</option>
                <option>Python</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
                size={16}
              />
            </div>

            <button className="bg-indigo-600 hover:bg-indigo-500 px-6 py-2.5 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-indigo-600/20 text-sm">
              Search
            </button>
          </div>
        </div>

        {/* Job Listings Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-20">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="group bg-[#0d1117] border border-white/5 p-8 rounded-[2.5rem] hover:bg-[#121822] hover:border-indigo-500/30 transition-all duration-500 shadow-xl"
            >
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                      <Briefcase className="text-indigo-400" size={28} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold group-hover:text-indigo-400 transition-colors">
                        {job.position}
                      </h2>
                      <p className="text-gray-400 font-medium flex items-center gap-2">
                        {job.companyName}{" "}
                        <Globe size={14} className="text-gray-600" />
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-400 line-clamp-2 leading-relaxed text-sm">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[11px] font-medium text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-between items-end gap-6">
                  <div className="text-right space-y-2">
                    <div className="flex items-center gap-2 text-gray-400 text-sm justify-end">
                      <MapPin size={14} /> {job.location}
                    </div>
                    <div className="flex items-center gap-2 text-indigo-400 font-bold text-lg justify-end">
                      <DollarSign size={18} /> {job.salary}
                    </div>
                  </div>

                  <button
                    onClick={() => handleApply(job._id)}
                    className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-400 transition-colors active:scale-95 text-sm cursor-pointer"
                  >
                    Apply Now <ArrowUpRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
