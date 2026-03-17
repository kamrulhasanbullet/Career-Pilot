"use client";
import React, { useState } from "react";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  Image as ImageIcon,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { postUser } from "@/actions/server/userAuth";
import { toast } from "react-toastify";

// Cloudinary config 
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export default function RegisterForm() {
  const router = useRouter();

  // CHANGED: photoUrl state remove from form
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Photo related states
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // File select handler — preview 
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // File size check (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2MB");
      return;
    }

    setPhotoFile(file);

    // Local preview
    const reader = new FileReader();
    reader.onloadend = () => setPhotoPreview(reader.result);
    reader.readAsDataURL(file);
  };

  //  Cloudinary upload function
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData },
    );

    const data = await res.json();
    return data.secure_url;
  };

  //  CHANGED: submit Cloudinary upload
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let photoUrl = "";
      if (photoFile) {
        photoUrl = await uploadToCloudinary(photoFile);
      }

      // CHANGED: photoUrl convert to Cloudinary URL
      const result = await postUser({ ...form, photoUrl });

      if (result?.success) {
        toast.success("Account created successfully");
        router.push("/login");
      }
    } catch (error) {
      toast.error("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#05070a] selection:bg-indigo-500/30 p-4 overflow-hidden relative">
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-md p-8 bg-[#0d1117]/80 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] shadow-2xl z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-500/10 rounded-2xl mb-4 border border-indigo-500/20">
            <UserPlus className="text-indigo-400" size={28} />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-1">
            Create Account
          </h1>
          <p className="text-gray-400 text-sm">
            Join us to start tracking your jobs
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div className="space-y-1">
            <div className="relative group">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors"
                size={18}
              />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full bg-white/3 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all text-sm"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-1">
            <div className="relative group">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors"
                size={18}
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full bg-white/3 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all text-sm"
              />
            </div>
          </div>

          {/* CHANGED: URL input → File upload input */}
          <div className="space-y-1">
            <label className="relative group flex items-center w-full bg-white/3 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 cursor-pointer hover:border-indigo-500/40 transition-all">
              {/* Preview otherwise icon */}
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="absolute left-3 w-7 h-7 rounded-full object-cover border border-indigo-500/40"
                />
              ) : (
                <ImageIcon
                  className="absolute left-4 text-gray-500 group-hover:text-indigo-400 transition-colors"
                  size={18}
                />
              )}

              {/*  File name or placeholder */}
              <span className="text-sm text-gray-600 truncate">
                {photoFile ? photoFile.name : "Upload Profile Photo"}
              </span>

              {/* Hidden file input */}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Upload icon */}
              <Upload className="absolute right-4 text-gray-600" size={16} />
            </label>
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <div className="relative group">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors"
                size={18}
              />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full bg-white/3 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all text-sm"
              />
            </div>
          </div>

          {/* CHANGED: uploading state on button */}
          <button
            type="submit"
            disabled={uploading}
            className="cursor-pointer w-full mt-4 py-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 border border-white/5"
          >
            {/* Uploading state text */}
            {uploading ? "Uploading..." : "Get Started"}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-white/5 text-center">
          <p className="text-gray-500 text-sm">
            Already have an account?
            <Link
              href="/login"
              className="text-indigo-400 hover:text-indigo-300 ml-2 font-semibold transition-colors"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
