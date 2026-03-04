"use client";
import { useEffect, useState } from "react";

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const ROLE_CLS = {
  super_admin: "bg-amber-950  text-amber-400  border-amber-400/40",
  admin: "bg-violet-950 text-violet-400 border-violet-400/40",
  employer: "bg-emerald-950 text-emerald-400 border-emerald-400/40",
  user: "bg-zinc-800   text-zinc-400   border-zinc-700",
};

const ROLES = ["user", "company", "super_admin"];

function Badge({ role }) {
  const cls = ROLE_CLS[role] ?? ROLE_CLS.user;
  return (
    <span
      className={`px-2 py-0.5 rounded-sm text-xs font-mono font-semibold tracking-wider uppercase border ${cls}`}
    >
      {role}
    </span>
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

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [saving, setSaving] = useState(false);

  // TODO: protect /api/admin/users — only super_admin should access
  useEffect(() => {
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then((d) => setUsers(Array.isArray(d) ? d : []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const openModal = (user) => {
    setNewRole(user.role ?? "user");
    setModal(user);
  };

  // TODO: create PATCH /api/admin/users/:id  body: { role }
  const updateRole = async () => {
    setSaving(true);
    try {
      const id = modal._id?.$oid ?? modal._id;
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      if (!res.ok) throw new Error("Failed to update role");
      setUsers((prev) =>
        prev.map((u) =>
          (u._id?.$oid ?? u._id) === id ? { ...u, role: newRole } : u,
        ),
      );
      setModal(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      !q ||
      u.name?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-start flex-wrap gap-3">
        <div>
          <h2 className="m-0 text-zinc-100 font-mono text-xl font-bold">
            {loading ? "Loading..." : `${filtered.length}`} Users Found
          </h2>
        </div>
        <div className="relative">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="bg-zinc-900 border border-zinc-800 text-zinc-300 pl-8 pr-3 py-2 rounded-sm
              text-sm outline-none w-64 font-mono placeholder-zinc-700 focus:border-amber-400/60 transition-colors"
          />
        </div>
      </div>

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
                    "User",
                    "Provider",
                    "Role",
                    "Joined",
                    "Last Updated",
                    "Actions",
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
                      No users found
                    </td>
                  </tr>
                ) : (
                  filtered.map((u) => (
                    <tr
                      key={u._id?.$oid ?? u._id}
                      className="border-b border-zinc-900 hover:bg-zinc-800/40 transition-colors"
                    >
                      {/* Avatar + name + email */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {u.photoUrl ? (
                            <img
                              src={u.photoUrl}
                              alt={u.name}
                              className="w-8 h-8 rounded-full object-cover shrink-0 border border-zinc-700"
                            />
                          ) : (
                            <div
                              className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700
                            flex items-center justify-center text-zinc-400 font-mono text-xs shrink-0"
                            >
                              {u.name?.[0]?.toUpperCase() ?? "?"}
                            </div>
                          )}
                          <div>
                            <p className="text-zinc-200 font-mono text-sm m-0">
                              {u.name ?? "?"}
                            </p>
                            <p className="text-zinc-600 text-xs m-0">
                              {u.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <span className="text-zinc-500 text-xs font-mono capitalize">
                          {u.provider ?? "?"}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <Badge role={u.role ?? "user"} />
                      </td>

                      <td className="px-4 py-3">
                        <span className="text-zinc-600 text-xs">
                          {u.createdAt ? fmtDate(u.createdAt) : "?"}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <span className="text-zinc-600 text-xs">
                          {u.updatedAt ? fmtDate(u.updatedAt) : "?"}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <button
                          onClick={() => openModal(u)}
                          className="px-3 py-1.5 text-xs font-mono font-semibold rounded-sm border
                          bg-transparent text-zinc-500 border-zinc-800
                          hover:text-amber-400 hover:border-amber-400/50 transition-colors cursor-pointer"
                        >
                          Change Role
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Role update modal */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setModal(null)}
        >
          <div className="bg-zinc-950 border border-zinc-800 rounded-sm p-8 w-full max-w-sm mx-4 shadow-2xl">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="m-0 text-zinc-100 font-mono text-base font-bold">
                  Change Role
                </h3>
                <p className="m-0 mt-1 text-zinc-600 text-xs">{modal.email}</p>
              </div>
              <button
                onClick={() => setModal(null)}
                className="text-zinc-600 hover:text-zinc-300 text-xl bg-transparent border-none cursor-pointer"
              >
                x
              </button>
            </div>

            {/* Current role -> new role preview */}
            <div className="flex items-center gap-3 mb-5">
              <Badge role={modal.role ?? "user"} />
              <span className="text-zinc-700 font-mono text-xs">to</span>
              <Badge role={newRole} />
            </div>

            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 px-3 py-2 rounded-sm
                text-sm font-mono outline-none focus:border-amber-400/60 transition-colors cursor-pointer"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>

            <div className="flex gap-2.5 justify-end mt-6">
              <button
                onClick={() => setModal(null)}
                className="px-3.5 py-1.5 text-xs font-mono font-semibold rounded-sm border
                  bg-transparent text-zinc-500 border-zinc-800 hover:text-zinc-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={updateRole}
                disabled={saving || newRole === modal.role}
                className="px-3.5 py-1.5 text-xs font-mono font-semibold rounded-sm border
                  bg-amber-400 text-zinc-950 border-amber-400 hover:opacity-90
                  disabled:opacity-40 disabled:cursor-default cursor-pointer transition-opacity"
              >
                {saving ? "Saving..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
