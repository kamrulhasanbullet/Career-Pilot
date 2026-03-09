"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";

const initialState = {
  position: "",
  company: "",
  location: "",
  salary: "",
  type: "Full-time",
  tags: "",
  description: "",
};

export default function JobPostCard() {
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm(initialState);
      Swal.fire({
        icon: "success",
        title: "Job Posted!",
        text: "Your job has been published successfully.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#05070a] text-white px-2 pt-16 flex items-center justify-center">
      <div className="max-w-3xl mx-auto bg-[#0d1117] border border-white/10 rounded-3xl px-4 py-8">
        <h1 className="text-3xl font-extrabold mb-6">Post a New Job</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="position"
            value={form.position} 
            placeholder="Job Position"
            className="w-full bg-white/5 p-3 rounded-xl outline-none"
            onChange={handleChange}
            required
          />

          <input
            name="company"
            value={form.company} 
            placeholder="Company Name"
            className="w-full bg-white/5 p-3 rounded-xl outline-none"
            onChange={handleChange}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              name="location"
              value={form.location}
              placeholder="Location"
              className="bg-white/5 p-3 rounded-xl outline-none"
              onChange={handleChange}
              required
            />
            <input
              name="salary"
              value={form.salary}
              placeholder="Salary Range"
              className="bg-white/5 p-3 rounded-xl outline-none"
              onChange={handleChange}
              required
            />
          </div>

          <select
            name="type"
            value={form.type}
            className="w-full bg-white/5 p-3 rounded-xl outline-none"
            onChange={handleChange}
            required
          >
            <option className="text-black">Full-time</option>
            <option className="text-black">Part-time</option>
            <option className="text-black">Remote</option>
            <option className="text-black">Internship</option>
          </select>

          <input
            name="tags"
            value={form.tags}
            placeholder="Tags (React, Node, MongoDB)"
            className="w-full bg-white/5 p-3 rounded-xl outline-none"
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            value={form.description}
            rows="4"
            placeholder="Job Description"
            className="w-full bg-white/5 p-3 rounded-xl outline-none"
            onChange={handleChange}
            required
          />

          <button className="w-full bg-indigo-600 py-3 rounded-xl font-bold hover:bg-indigo-500 transition cursor-pointer">
            Publish Job
          </button>
        </form>
      </div>
    </div>
  );
}
