"use client";
import { useEffect, useState } from "react";

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const STATUS_CLS = {
  pending: "bg-amber-950  text-amber-400  border-amber-400/40",
  interviewed: "bg-violet-950 text-violet-400 border-violet-400/40",
  accepted: "bg-emerald-950 text-emerald-400 border-emerald-400/40",
  rejected: "bg-red-950    text-red-400    border-red-400/40",
};

const ROLE_CLS = {
  super_admin: "bg-amber-950  text-amber-400  border-amber-400/40",
  admin: "bg-violet-950 text-violet-400 border-violet-400/40",
  company: "bg-emerald-950 text-emerald-400 border-emerald-400/40",
  user: "bg-zinc-800   text-zinc-400   border-zinc-700",
};

function StatusBadge({ status }) {
  const cls = STATUS_CLS[status] ?? STATUS_CLS.pending;
  return (
    <span
      className={`px-2 py-0.5 rounded-sm text-xs font-mono font-semibold tracking-wider uppercase border ${cls}`}
    >
      {status ?? "pending"}
    </span>
  );
}

function RoleBadge({ role }) {
  const cls = ROLE_CLS[role] ?? ROLE_CLS.user;
  return (
    <span
      className={`px-2 py-0.5 rounded-sm text-xs font-mono font-semibold tracking-wider uppercase border ${cls}`}
    >
      {role ?? "user"}
    </span>
  );
}

function StatCard({ label, value, sub, accent }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-sm px-5 py-4 flex flex-col gap-1">
      <span className="text-zinc-600 font-mono text-xs tracking-widest uppercase">
        {label}
      </span>
      <span
        className={`font-mono text-2xl font-bold ${accent ?? "text-zinc-100"}`}
      >
        {value}
      </span>
      {sub && <span className="text-zinc-600 text-xs">{sub}</span>}
    </div>
  );
}

function SectionHeader({ title }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <h3 className="m-0 text-zinc-400 font-mono text-xs font-semibold tracking-widest uppercase">
        {title}
      </h3>
      <div className="flex-1 h-px bg-zinc-800" />
    </div>
  );
}

function Skeleton({ rows = 4 }) {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-10 bg-zinc-800/60 rounded-sm animate-pulse" />
      ))}
    </div>
  );
}

export default function Overview() {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/users").then((r) => r.json()),
      fetch("/api/jobs").then((r) => r.json()),
      fetch("/api/admin/applications").then((r) => r.json()),
    ])
      .then(([u, j, a]) => {
        setUsers(Array.isArray(u) ? u : []);
        setJobs(Array.isArray(j) ? j : []);
        setApps(Array.isArray(a) ? a : []);
      })
      .finally(() => setLoading(false));
  }, []);

  // ── derived stats ──
  const totalUsers = users.length;
  const totalJobs = jobs.length;
  const totalApps = apps.length;
  const pendingApps = apps.filter((a) => a.status === "pending").length;
  const acceptedApps = apps.filter((a) => a.status === "accepted").length;
  const rejectedApps = apps.filter((a) => a.status === "rejected").length;
  const acceptRate = totalApps
    ? Math.round((acceptedApps / totalApps) * 100)
    : 0;

  const companyUsers = users.filter((u) => u.role === "company").length;
  const regularUsers = users.filter((u) => u.role === "user").length;

  const thisMonth = (arr, field = "createdAt") => {
    const now = new Date();
    return arr.filter((x) => {
      const d = new Date(x[field]);
      return (
        d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      );
    }).length;
  };

  const newUsersThisMonth = thisMonth(users);
  const newJobsThisMonth = thisMonth(jobs);
  const newAppsThisMonth = thisMonth(apps);

  // recent 5
  const recentUsers = [...users]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const recentJobs = [...jobs]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const recentApps = [...apps]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  // top companies by job count
  const companyCounts = jobs.reduce((acc, j) => {
    acc[j.companyName] = (acc[j.companyName] ?? 0) + 1;
    return acc;
  }, {});
  const topCompanies = Object.entries(companyCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // job type breakdown
  const typeCounts = jobs.reduce((acc, j) => {
    acc[j.type] = (acc[j.type] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-8">
      {/* ── Top stat cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          label="Total Users"
          value={loading ? "—" : totalUsers}
          sub={`+${newUsersThisMonth} this month`}
        />
        <StatCard
          label="Total Jobs"
          value={loading ? "—" : totalJobs}
          sub={`+${newJobsThisMonth} this month`}
        />
        <StatCard
          label="Applications"
          value={loading ? "—" : totalApps}
          sub={`+${newAppsThisMonth} this month`}
        />
        <StatCard
          label="Accept Rate"
          value={loading ? "—" : `${acceptRate}%`}
          sub={`${acceptedApps} accepted`}
          accent="text-emerald-400"
        />
      </div>

      {/* ── Second row ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          label="Pending"
          value={loading ? "—" : pendingApps}
          sub="applications"
          accent="text-amber-400"
        />
        <StatCard
          label="Rejected"
          value={loading ? "—" : rejectedApps}
          sub="applications"
          accent="text-red-400"
        />
        <StatCard
          label="Companies"
          value={loading ? "—" : companyUsers}
          sub="registered"
        />
        <StatCard
          label="Job Seekers"
          value={loading ? "—" : regularUsers}
          sub="registered users"
        />
      </div>

      {/* ── Main 3-col grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Users */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-5">
          <SectionHeader title="Recent Users" />
          {loading ? (
            <Skeleton />
          ) : (
            <div className="flex flex-col divide-y divide-zinc-800">
              {recentUsers.map((u) => (
                <div
                  key={u._id?.$oid ?? u._id}
                  className="flex items-center justify-between py-2.5 gap-3"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {u.photoUrl ? (
                      <img
                        src={u.photoUrl}
                        alt={u.name}
                        className="w-7 h-7 rounded-full object-cover shrink-0 border border-zinc-700"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 font-mono text-xs shrink-0">
                        {u.name?.[0]?.toUpperCase() ?? "?"}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-zinc-300 font-mono text-xs m-0 truncate">
                        {u.name ?? "?"}
                      </p>
                      <p className="text-zinc-600 text-xs m-0 truncate">
                        {u.email}
                      </p>
                    </div>
                  </div>
                  <RoleBadge role={u.role} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Applications */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-5">
          <SectionHeader title="Recent Applications" />
          {loading ? (
            <Skeleton />
          ) : (
            <div className="flex flex-col divide-y divide-zinc-800">
              {recentApps.map((a) => (
                <div
                  key={a._id?.$oid ?? a._id}
                  className="flex items-center justify-between py-2.5 gap-3"
                >
                  <div className="min-w-0">
                    <p className="text-zinc-300 font-mono text-xs m-0 truncate">
                      {a.userName || "?"}
                    </p>
                    <p className="text-zinc-600 text-xs m-0 truncate">
                      {a.position} @ {a.companyName}
                    </p>
                  </div>
                  <StatusBadge status={a.status} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Jobs */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-5">
          <SectionHeader title="Recent Jobs" />
          {loading ? (
            <Skeleton />
          ) : (
            <div className="flex flex-col divide-y divide-zinc-800">
              {recentJobs.map((j) => (
                <div
                  key={j._id?.$oid ?? j._id}
                  className="flex items-center justify-between py-2.5 gap-3"
                >
                  <div className="min-w-0">
                    <p className="text-zinc-300 font-mono text-xs m-0 truncate">
                      {j.position}
                    </p>
                    <p className="text-zinc-600 text-xs m-0 truncate">
                      {j.companyName} · {j.location}
                    </p>
                  </div>
                  <span className="text-amber-400/80 font-mono text-xs shrink-0">
                    {j.salary}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Bottom 2-col grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Companies */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-5">
          <SectionHeader title="Top Companies by Jobs" />
          {loading ? (
            <Skeleton rows={5} />
          ) : (
            <div className="flex flex-col gap-2.5">
              {topCompanies.map(([name, count], i) => {
                const pct = Math.round((count / totalJobs) * 100);
                return (
                  <div key={name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-zinc-300 font-mono text-xs">
                        {name}
                      </span>
                      <span className="text-zinc-600 font-mono text-xs">
                        {count} jobs · {pct}%
                      </span>
                    </div>
                    <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400/60 rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Job Type Breakdown */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-5">
          <SectionHeader title="Job Type Breakdown" />
          {loading ? (
            <Skeleton rows={4} />
          ) : (
            <div className="flex flex-col gap-2.5">
              {Object.entries(typeCounts)
                .sort((a, b) => b[1] - a[1])
                .map(([type, count]) => {
                  const pct = Math.round((count / totalJobs) * 100);
                  return (
                    <div key={type}>
                      <div className="flex justify-between mb-1">
                        <span className="text-zinc-300 font-mono text-xs capitalize">
                          {type}
                        </span>
                        <span className="text-zinc-600 font-mono text-xs">
                          {count} · {pct}%
                        </span>
                      </div>
                      <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-violet-400/60 rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
