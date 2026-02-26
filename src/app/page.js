"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Briefcase,
  FileText,
  PieChart,
  ArrowRight,
  Search,
  Zap,
  CheckCircle,
  Globe,
} from "lucide-react";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  const { data: session, status } = useSession();
  const role = session?.user?.role;

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 overflow-x-hidden relative">
      {/* 1. Ultra-Modern Background (Grid + Glow) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            size: "40px 40px",
            backgroundSize: "40px 40px",
          }}
        ></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-200 bg-blue-600/10 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-32">
        {/* 2. Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-32"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xs font-semibold mb-8 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            CareerPilot is now live
          </motion.div>

          <h1 className="text-6xl md:text-9xl font-extrabold tracking-tight mb-8 bg-linear-to-b from-white via-white to-white/30 bg-clip-text text-transparent leading-[1.05]">
            Your Career on <br className="hidden md:block" />
            <span className="text-blue-500 drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]">
              Autopilot.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            Stop losing track of applications. Automate your job search
            workflow, build ATS-proof resumes, and visualize your path to
            success with precision.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <Link
              href="/view-all-jobs"
              className="group relative px-10 py-4 rounded-full bg-blue-600 hover:bg-blue-500 font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_30px_rgba(37,99,235,0.4)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* 3. Dashboard Preview Card (Improved Design) */}
        <motion.div {...fadeInUp} className="mb-32 relative group">
          <div className="absolute -inset-1 bg-linear-to-r from-blue-500 to-purple-600 rounded-[2.6rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
          <div className="relative bg-[#0c0c0c]/80 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-12 border border-white/10">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 space-y-6 text-left">
                <div className="inline-block p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                  <Zap className="text-blue-400 w-6 h-6" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  Everything you need <br /> in one cockpit.
                </h2>
                <div className="space-y-4">
                  {[
                    "Real-time application tracking",
                    "AI-driven resume optimization",
                    "Interview performance analytics",
                  ].map((text, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-gray-400"
                    >
                      <CheckCircle className="text-blue-500 w-5 h-5" />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Static Mockup Element */}
              <div className="flex-1 w-full grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm">
                  <p className="text-gray-500 text-xs uppercase mb-2">
                    Success Rate
                  </p>
                  <h4 className="text-3xl font-bold text-emerald-400">78%</h4>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm">
                  <p className="text-gray-500 text-xs uppercase mb-2">
                    Applications
                  </p>
                  <h4 className="text-3xl font-bold text-blue-400">142</h4>
                </div>
                <div className="col-span-2 bg-linear-to-r from-blue-600/10 to-transparent border border-white/10 p-6 rounded-3xl">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium">Activity</span>
                    <Globe className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="flex items-end gap-1 h-20">
                    {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        className="flex-1 bg-blue-500/30 rounded-t-sm border-t border-blue-500/50"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 4. Features Bento Grid (Added Floating Animation) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          {[
            {
              title: "Smart Tracking",
              icon: <Briefcase className="text-blue-400" />,
              desc: "Automated Kanban boards. Sync with your calendar and never miss a deadline.",
              color: "blue",
            },
            {
              title: "ATS Optimizer",
              icon: <FileText className="text-emerald-400" />,
              desc: "Create AI-enhanced resumes that bypass filters and reach recruiters faster.",
              color: "emerald",
            },
            {
              title: "Insightful Data",
              icon: <PieChart className="text-purple-400" />,
              desc: "Deep dive into your search performance. Find what actually works for you.",
              color: "purple",
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="group p-8 rounded-[2.5rem] bg-white/3 border border-white/10 hover:border-blue-500/30 hover:bg-white/6 transition-all duration-500"
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-${feature.color}-500/10 flex items-center justify-center mb-8 border border-${feature.color}-500/20 group-hover:scale-110 transition-transform`}
              >
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {role === "company" ? (
          /* --- Company/Employer Section --- */
          <motion.div
            {...fadeInUp}
            className="relative overflow-hidden p-8 md:p-12 rounded-[3rem] bg-linear-to-br from-blue-500/10 to-transparent border border-blue-500/20"
          >
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-left">
              <div className="max-w-md text-center md:text-left">
                <h3 className="text-3xl font-bold mb-4 flex items-center justify-center md:justify-start gap-3">
                  <Globe className="w-8 h-8 text-blue-400" /> Hiring Suite
                </h3>
                <p className="text-gray-400">
                  Manage your job postings, track candidates, and find the
                  perfect match for your team with our streamlined employer
                  dashboard.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/post-job">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-2xl bg-blue-600 text-white text-sm font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 cursor-pointer"
                  >
                    Post a New Job
                    <ArrowRight size={16} />
                  </motion.span>
                </Link>
              </div>
            </div>
          </motion.div>
        ) : (
          /* --- Candidate/User Section (Unified Search) --- */
          <motion.div
            {...fadeInUp}
            className="relative overflow-hidden p-8 md:p-12 rounded-[3rem] bg-linear-to-br from-white/5 to-transparent border border-white/10"
          >
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full group-hover:bg-blue-500/20 transition-all"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-left">
              <div className="max-w-md text-center md:text-left">
                <h3 className="text-3xl font-bold mb-4 flex items-center justify-center md:justify-start gap-3">
                  <Search className="w-8 h-8 text-blue-500" /> Unified Search
                </h3>
                <p className="text-gray-400">
                  Find any application or company history instantly. Precise
                  filtering for the modern job seeker.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                {[
                  {
                    label: "Applied",
                    href: "/user-dashboard/total-applied",
                    bg: "bg-blue-500/10",
                    border: "border-blue-500/20",
                    text: "text-blue-400",
                  },
                  {
                    label: "Interviewing",
                    href: "/user-dashboard/interviews",
                    bg: "bg-emerald-500/10",
                    border: "border-emerald-500/20",
                    text: "text-emerald-400",
                  },
                  {
                    label: "Rejected",
                    href: "/user-dashboard/rejected",
                    bg: "bg-red-500/10",
                    border: "border-red-500/20",
                    text: "text-red-400",
                  },
                ].map((btn, i) => (
                  <Link key={i} href={btn.href}>
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-3 rounded-2xl ${btn.bg} border ${btn.border} ${btn.text} text-sm font-semibold flex items-center gap-2 backdrop-blur-sm cursor-pointer hover:bg-opacity-20 transition-all`}
                    >
                      {btn.label}
                    </motion.span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
