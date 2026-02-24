"use client";
import React, { useEffect, useState } from "react";
import { Loader2, Mail, Briefcase, PlusCircle } from "lucide-react";

export default function ProfileCard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await fetch("/api/resume/me");
        const json = await res.json();
        console.log(json);
        if (!res.ok) throw new Error(json.error || "Failed to load resume");
        setData(json.resume);
        setTimeout(() => setVisible(true), 150);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, []);

  const formData = data || {};

  if (loading) {
    return (
      <div className="min-h-screen bg-[#05070a] flex flex-col items-center justify-center gap-6">
        <div className="relative">
          <div className="absolute inset-0 blur-2xl bg-cyan-500/30 animate-pulse rounded-full"></div>
          <Loader2
            size={48}
            className="text-cyan-400 animate-spin relative z-10"
          />
        </div>
        <p className="text-cyan-400/60 text-xs font-bold tracking-[0.3em] uppercase animate-pulse">
          Initializing Engine
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#0f172a] text-slate-200 pt-28 pb-12">
      <div className="profile-card mx-auto bg-amber-300"></div>

      <div className="resume-card mx-auto bg-white mt-28 text-slate-900 md:p-10 p-6">
        <header className="border-b-4 border-cyan-500 pb-6 mb-8">
          <h1 className="text-4xl font-black uppercase tracking-tighter">
            {formData.name || "Your Name"}
          </h1>
          <p className="text-cyan-600 font-bold text-lg mt-1 tracking-widest">
            {formData.title || "Professional Title"}
          </p>
          <div className="flex gap-4 mt-4 text-sm text-slate-500 italic">
            <span className="flex items-center gap-1">
              <Mail size={14} /> {formData.email || "email@example.com"}
            </span>
          </div>
        </header>

        <section className="mb-8">
          <h3 className="flex items-center gap-2 text-xl font-bold border-l-4 border-cyan-500 pl-3 mb-4">
            <Briefcase size={20} className="text-cyan-600" /> EXPERIENCE
          </h3>
          <p className="text-slate-700 leading-relaxed whitespace-pre-line">
            {formData.experience || "Tell the world about your achievements..."}
          </p>
        </section>

        <section>
          <h3 className="flex items-center gap-2 text-xl font-bold border-l-4 border-cyan-500 pl-3 mb-4">
            <PlusCircle size={20} className="text-cyan-600" /> SKILLS
          </h3>
          <div className="flex flex-wrap gap-2">
            {(formData.skills || "React, Node.js, Tailwind")
              .split(",")
              .map((skill, i) => (
                <span
                  key={i}
                  className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-semibold border border-slate-200"
                >
                  {skill.trim()}
                </span>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}
