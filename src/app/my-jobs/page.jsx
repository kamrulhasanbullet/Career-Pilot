import React from "react";
import {
  MapPin,
  Briefcase,
  Globe,
  ArrowUpRight,
  Zap,
  Edit3,
  Trash2,
  Plus,
} from "lucide-react";
import Link from "next/link";

const DUMMY_LISTINGS = [
  {
    id: 1,
    company: "Vercel",
    position: "Senior Frontend Engineer",
    location: "Remote",
    salary: "$120k - $160k",
    tags: ["React", "Next.js", "Tailwind"],
  },
  {
    id: 2,
    company: "Stripe",
    position: "Backend Developer",
    location: "San Francisco, CA",
    salary: "$140k - $190k",
    tags: ["Node.js", "PostgreSQL", "API"],
  },
];

export default function MyJobsPage() {
  return (
    <div className="min-h-screen w-full bg-[#030407] text-white px-4 sm:px-6 py-16 md:py-12 overflow-x-hidden relative font-sans">
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
              <p className="text-gray-500 text-[8px] md:text-[10px] uppercase font-black tracking-widest mb-1">Active Posts</p>
              <p className="text-2xl md:text-3xl font-mono font-bold text-indigo-400">08</p>
            </div>
            <Link
              href={"/post-job"}
              className="h-14 w-14 md:h-16 md:w-16 bg-indigo-600 hover:bg-indigo-500 rounded-2xl md:rounded-4xl flex items-center justify-center transition-all hover:rotate-90 shadow-lg shadow-indigo-600/20"
            >
              <Plus className="w-6 h-6 md:w-7 md:h-7" strokeWidth={3} />
            </Link>
          </div>
        </div>

        {/* List */}
        <div className="grid grid-cols-1 gap-6 pb-20">
          {DUMMY_LISTINGS.map((job) => (
            <div key={job.id} className="group relative bg-[#0a0c10] border border-white/5 p-px rounded-4xl md:rounded-[3rem] transition-all duration-500 hover:border-indigo-500/40">
              <div className="bg-[#0d1117] rounded-[1.9rem] md:rounded-[2.8rem] p-5 md:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 md:gap-8">
                
                <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6 w-full lg:w-3/5">
                  <div className="w-14 h-14 md:w-20 md:h-20 bg-linear-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl md:rounded-4xl flex items-center justify-center border border-white/10 shrink-0">
                    <Briefcase className="text-indigo-400 w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight group-hover:text-indigo-300 transition-colors">{job.position}</h2>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs md:text-sm font-medium text-gray-500">
                      <span className="flex items-center gap-1.5"><Globe size={14} /> {job.company}</span>
                      <span className="flex items-center gap-1.5"><MapPin size={14} /> {job.location}</span>
                      <span className="text-indigo-400/80 font-bold uppercase">{job.salary}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row items-center gap-2 md:gap-3 w-full lg:w-auto pt-4 lg:pt-0 border-t border-white/5 lg:border-none justify-between sm:justify-end">
                  <div className="flex items-center gap-2 md:gap-3 flex-1 sm:flex-none">
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-indigo-500/10 hover:bg-indigo-500 border border-indigo-500/20 px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold transition-all group/btn">
                      <Edit3 className="w-4 h-4 md:w-5 md:h-5 text-indigo-400 group-hover/btn:text-white" />
                      <span className="text-xs md:text-sm text-indigo-400 group-hover/btn:text-white">Update</span>
                    </button>
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500 border border-red-500/20 px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold transition-all group/del">
                      <Trash2 className="w-4 h-4 md:w-5 md:h-5 text-red-400 group-hover/del:text-white" />
                      <span className="text-xs md:text-sm text-red-400 group-hover/del:text-white">Delete</span>
                    </button>
                  </div>
                  <button className="hidden sm:flex p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-gray-400 hover:text-white">
                    <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
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