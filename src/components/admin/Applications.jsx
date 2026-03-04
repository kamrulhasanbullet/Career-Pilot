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
  reviewed: "bg-blue-950   text-blue-400   border-blue-400/40",
  interviewed: "bg-violet-950 text-violet-400 border-violet-400/40",
  accepted: "bg-emerald-950 text-emerald-400 border-emerald-400/40",
  rejected: "bg-red-950    text-red-400    border-red-400/40",
};

const STATUSES = ["pending", "interviewed", "rejected"];

function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

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

function StatCard({ label, value, sub }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-sm px-5 py-4 flex flex-col gap-1">
      <span className="text-zinc-600 font-mono text-xs tracking-widest uppercase">
        {label}
      </span>
      <span className="text-zinc-100 font-mono text-2xl font-bold">
        {value}
      </span>
      {sub && <span className="text-zinc-600 text-xs">{sub}</span>}
    </div>
  );
}

function Skeleton() {
  return (
    <div className="flex flex-col gap-3 p-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-12 bg-zinc-800/60 rounded-sm animate-pulse" />
      ))}
    </div>
  );
}

export default function Applications() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [error, setError] = useState(null);

  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    fetch("/api/admin/applications")
      .then((r) => r.json())
      .then((d) => setApps(Array.isArray(d) ? d : []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = apps.filter((a) => {
    const q = debouncedSearch.toLowerCase().trim();
    const matchSearch =
      !q ||
      a.userName?.toLowerCase().includes(q) ||
      a.userEmail?.toLowerCase().includes(q);
    const matchStatus = statusFilter === "all" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  // stats
  const total = apps.length;
  const pending = apps.filter((a) => a.status === "pending").length;
  const accepted = apps.filter((a) => a.status === "accepted").length;
  const rejected = apps.filter((a) => a.status === "rejected").length;
  const interviewed = apps.filter((a) => a.status === "interviewed").length;
  const acceptRate = total ? Math.round((accepted / total) * 100) : 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-start flex-wrap gap-3">
        <h2 className="m-0 text-zinc-100 font-mono text-xl font-bold">
          {loading ? "Loading..." : `${filtered.length}`} Applications Found
        </h2>
        <div className="flex gap-2 flex-wrap">
          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-3 py-2 rounded-sm
              text-sm font-mono outline-none focus:border-amber-400/60 transition-colors cursor-pointer"
          >
            <option value="all">All Status</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          {/* Search */}
          <div className="relative">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-3 py-2 rounded-sm
                text-sm outline-none w-56 font-mono placeholder-zinc-700 focus:border-amber-400/60 transition-colors pr-7"
            />
          </div>
        </div>
      </div>

      {/* Stat cards */}
      {!loading && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard label="Total" value={total} sub="all applications" />
          <StatCard label="Pending" value={pending} sub="awaiting review" />
          <StatCard
            label="Interviewed"
            value={interviewed}
            sub={`${acceptRate}% accept rate`}
          />
          <StatCard
            label="Rejected"
            value={rejected}
            sub={`${total - accepted - pending - rejected - interviewed} other`}
          />
        </div>
      )}

      {error && (
        <div className="bg-red-950/50 border border-red-500/40 text-red-400 font-mono text-sm px-4 py-3 rounded-sm">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden">
        {loading ? (
          <Skeleton />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  {[
                    "Applicant",
                    "Position",
                    "Company",
                    "Salary",
                    "Status",
                    "Applied",
                  ].map((col) => (
                    <th
                      key={col}
                      className="px-4 py-3 text-left text-zinc-600 font-mono font-semibold
                        tracking-widest uppercase border-b border-zinc-800 whitespace-nowrap text-xs"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-10 text-center text-zinc-700 font-mono text-sm"
                    >
                      No applications found
                    </td>
                  </tr>
                ) : (
                  filtered.map((a) => (
                    <tr
                      key={a._id?.$oid ?? a._id}
                      className="border-b border-zinc-900 hover:bg-zinc-800/40 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <p className="text-zinc-200 font-mono text-sm m-0">
                          {a.userName || "?"}
                        </p>
                        <p className="text-zinc-600 text-xs m-0">
                          {a.userEmail}
                        </p>
                      </td>

                      <td className="px-4 py-3">
                        <span className="text-zinc-300 font-mono text-xs whitespace-nowrap">
                          {a.position ?? "?"}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <span className="text-zinc-500 font-mono text-xs">
                          {a.companyName ?? "?"}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <span className="text-amber-400/80 font-mono text-xs">
                          {a.salary ?? "?"}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <StatusBadge status={a.status} />
                      </td>

                      <td className="px-4 py-3">
                        <span className="text-zinc-600 text-xs">
                          {a.createdAt ? fmtDate(a.createdAt) : "?"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
