"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import ResumeOutput from "./ResumeOutput";

export default function ProfileCard() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 pt-28 pb-12">
      {/* Profile Card */}
      {loading ? (
        <div className="px-6">
          <div className="max-w-lg mx-auto bg-slate-800/50 border border-slate-700 rounded-3xl p-4 md:p-8 flex items-center gap-6 animate-pulse">
            <div className="w-20 h-20 rounded-full bg-slate-700 border-2 border-cyan-500/20 shrink-0"></div>

            <div className="flex-1">
              <div className="h-8 w-3/4 bg-slate-700 rounded-lg mb-2"></div>

              <div className="h-4 w-1/2 bg-slate-700/60 rounded-lg mt-1"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-6">
          <div className="max-w-lg mx-auto bg-slate-800/50 border border-slate-700 rounded-3xl p-4 md:p-8 flex items-center gap-6">
            {session?.user?.image && (
              <Image
                src={session.user.image}
                alt="avatar"
                width={80}
                height={80}
                className="rounded-full border-2 border-cyan-500"
              />
            )}
            <div>
              <h2 className="text-2xl font-bold text-white">
                {session?.user?.name || "Anonymous"}
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                {session?.user?.email}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Resume Card */}
      <div className="px-6">
        <div className="max-w-2xl mx-auto bg-white mt-16 text-slate-900 md:p-10 p-6 rounded-xl">
          <ResumeOutput />
        </div>
      </div>
    </div>
  );
}
