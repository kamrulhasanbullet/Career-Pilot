"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  FileUser,
  LogOut,
  Menu,
  X,
  Search,
  LogIn,
} from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    }, //
    { name: "My Jobs", href: "/jobs", icon: <BriefcaseBusiness size={18} /> }, //
    { name: "Resume", href: "/resume", icon: <FileUser size={18} /> }, //
  ];

  return (
    <nav className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
      <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3 flex items-center justify-between shadow-2xl">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 flex items-center justify-center font-bold text-white">
            <Image
              src="/Logo.png"
              alt="CareerPilot Logo"
              width={50}
              height={50}
              priority
              className="rounded-4xl"
            />
          </div>
          <span className="text-xl font-bold bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent hidden sm:block">
            CareerPilot
          </span>
        </Link>

        {/* Desktop Navigation  */}
        <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                pathname === link.href
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </div>

        {/* Search & Profile Section   */}
        <div className="flex items-center gap-3">
          <div className="h-6 w-px bg-white/10 mx-2 hidden md:block" />

          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black text-sm font-bold hover:bg-gray-200 transition-colors cursor-pointer">
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
          <Link href={'/login'} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black text-sm font-bold hover:bg-gray-200 transition-colors">
            <LogIn size={16} />
            <span className="hidden sm:inline">Login</span>
          </Link>

          {/* Mobile Menu Toggle  */}
          <button
            className="md:hidden p-2 text-gray-400"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-black/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 flex flex-col gap-2 md:hidden animate-in fade-in zoom-in duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-4 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all"
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
