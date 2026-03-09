"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  FileUser,
  LogOut,
  Menu,
  X,
  LogIn,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const role = session?.user?.role;
  const router = useRouter();

  const signOutFunc = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  const USER_NAV = [
    {
      name: "Dashboard",
      href: "/user-dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "View All Jobs",
      href: "/view-all-jobs",
      icon: <BriefcaseBusiness size={18} />,
    },
    { name: "Resume", href: "/resume", icon: <FileUser size={18} /> },
  ];

  const COMPANY_NAV = [
    {
      name: "Post Job",
      href: "/post-job",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "My Jobs",
      href: "/my-jobs",
      icon: <BriefcaseBusiness size={18} />,
    },
  ];

  const SUPER_ADMIN_NAV = [
    {
      name: "Admin Dashboard",
      href: "/admin-dashboard",
      icon: <ShieldCheck size={18} />,
    },
  ];

  const getNavLinks = () => {
    if (role === "super_admin") return SUPER_ADMIN_NAV;
    if (role === "company") return COMPANY_NAV;
    return USER_NAV;
  };

  const navLinks = getNavLinks();

  // For Super Admin Another Navbar
  if (role === "super_admin") {
    return (
      <nav className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
        <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 flex items-center justify-between gap-3 shadow-2xl">
          {/* Super Admin Badge */}
          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-purple-600/20 border border-purple-500/30 text-purple-400 text-xs font-semibold whitespace-nowrap">
            <ShieldCheck size={12} />
            <span className="hidden sm:inline">Super Admin</span>
          </span>

          {/* Admin Dashboard NavLink */}
          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/5">
            <Link
              href="/admin-dashboard"
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                pathname === "/admin-dashboard"
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <ShieldCheck size={16} />
              <span className="hidden xs:inline">Admin Dashboard</span>
            </Link>
          </div>

          {/* Logout */}
          <button
            onClick={() => signOutFunc()}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-white text-black text-sm font-bold hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </nav>
    );
  }

  // Normal Navbar (user & company)
  return (
    <nav className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
      <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3 flex items-center justify-between shadow-2xl">
        {/* Logo Section */}
        <Link href="/">
          <span className="text-xl font-bold bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent sm:block">
            CareerPilot
          </span>
        </Link>

        {/* Desktop Navigation */}
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

        {/* Profile & Auth Section */}
        <div className="flex items-center gap-3">
          <div className="h-6 w-px bg-white/10 mx-2 hidden md:block" />

          {status === "authenticated" ? (
            <>
              {session?.user?.image && (
                <Link href="/profile">
                  <Image
                    src={session.user.image}
                    alt="User avatar"
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                </Link>
              )}
              <button
                onClick={() => signOutFunc()}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black text-sm font-bold hover:bg-gray-200 transition-colors cursor-pointer"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <Link
              href={"/login"}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black text-sm font-bold hover:bg-gray-200 transition-colors"
            >
              <LogIn size={16} />
              <span className="hidden sm:inline">Login</span>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
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
              // className="flex items-center gap-3 p-4 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all"
              className={`flex items-center gap-3 p-4 rounded-xl transition-all ${
                pathname === link.href
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
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
