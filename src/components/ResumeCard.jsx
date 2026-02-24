"use client";
import React, { useState } from "react";
import { Download, PlusCircle, Mail, Briefcase } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function ResumeCard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: "",
    experience: "",
    title: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSave = async () => {
    if (status !== "authenticated") {
      setError("You must be logged in to save a resume.");
      return;
    }

    if (!formData.name || !formData.email) {
      setError("Name and Email are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          userId: session.user.id || session.user.email, // NextAuth e id thakle id, na thakle email
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong");

      alert("✅ Resume created successfully!");
      router.push("/profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 md:px-8 px-2 pt-28 pb-14 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT SIDE: Editor */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 md:p-8 p-4 rounded-3xl shadow-2xl">
          <h2 className="text-3xl font-bold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6">
            Create Your Masterpiece
          </h2>

          <div className="space-y-6">
            <div className="group">
              <label className="block text-sm font-medium text-slate-400 mb-2 group-focus-within:text-cyan-400 transition-colors">
                Full Name
              </label>
              <input
                name="name"
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Job Title
                </label>
                <input
                  name="title"
                  onChange={handleChange}
                  placeholder="Software Engineer"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Email Address
                </label>
                <input
                  name="email"
                  onChange={handleChange}
                  placeholder="hello@example.com"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                Skills (Comma separated)
              </label>
              <textarea
                name="skills"
                onChange={handleChange}
                className="w-full h-24 bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                Experience Summary
              </label>
              <textarea
                name="experience"
                onChange={handleChange}
                className="w-full h-32 bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                {error}
              </p>
            )}

            <button
              onClick={handleSave}
              disabled={loading || status === "loading"}
              className="w-full bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                "Saving..."
              ) : (
                <>
                  <Download size={20} /> Save & Generate PDF
                </>
              )}
            </button>
          </div>
        </div>

        {/* RIGHT SIDE: Real-time Preview */}
        <div className="sticky top-8">
          <div className="bg-white text-slate-900 md:p-10 p-6 rounded-xl shadow-0_20px_50px_rgba(8,_112,_184,_0.7) min-h-175 flex flex-col transform hover:scale-[1.01] transition-transform">
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
      </div>
    </div>
  );
}