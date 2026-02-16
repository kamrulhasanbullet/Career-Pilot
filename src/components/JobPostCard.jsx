"use client";
import React, { useState } from "react";
import { Briefcase, MapPin, DollarSign, Tags } from "lucide-react";

export default function JobPostCard() {
  const [form, setForm] = useState({
    position: "",
    company: "",
    location: "",
    salary: "",
    type: "Full-time",
    tags: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    // 👉 call POST /api/jobs
  };

  return (
    <div className="min-h-screen bg-[#05070a] text-white p-8 flex items-center justify-center">
      <div className="max-w-3xl mx-auto bg-[#0d1117] border border-white/10 rounded-3xl p-8">
        <h1 className="text-3xl font-extrabold mb-6">
          Post a New Job
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="position"
            placeholder="Job Position"
            className="w-full bg-white/5 p-3 rounded-xl outline-none"
            onChange={handleChange}
          />

          <input
            name="company"
            placeholder="Company Name"
            className="w-full bg-white/5 p-3 rounded-xl outline-none"
            onChange={handleChange}
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              name="location"
              placeholder="Location"
              className="bg-white/5 p-3 rounded-xl outline-none"
              onChange={handleChange}
            />
            <input
              name="salary"
              placeholder="Salary Range"
              className="bg-white/5 p-3 rounded-xl outline-none"
              onChange={handleChange}
            />
          </div>

          <select
            name="type"
            className="w-full bg-white/5 p-3 rounded-xl outline-none"
            onChange={handleChange}
          >
            <option className="text-black">Full-time</option>
            <option className="text-black">Part-time</option>
            <option className="text-black">Remote</option>
            <option className="text-black">Internship</option>
          </select>

          <input
            name="tags"
            placeholder="Tags (React, Node, MongoDB)"
            className="w-full bg-white/5 p-3 rounded-xl outline-none"
            onChange={handleChange}
          />

          <textarea
            name="description"
            rows="4"
            placeholder="Job Description"
            className="w-full bg-white/5 p-3 rounded-xl outline-none"
            onChange={handleChange}
          />

          <button className="w-full bg-indigo-600 py-3 rounded-xl font-bold hover:bg-indigo-500 transition">
            Publish Job
          </button>
        </form>
      </div>
    </div>
  );
}
