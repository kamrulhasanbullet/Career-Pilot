// "use client";
// import React, { useEffect, useState } from "react";
// import {
//   MapPin,
//   Briefcase,
//   Globe,
//   ArrowUpRight,
//   Zap,
//   Edit3,
//   Trash2,
//   Plus,
//   X,
//   User,
//   Mail,
//   Calendar,
//   UserCheck,
//   UserX,
//   Save,
//   Loader2,
//   AlertTriangle,
// } from "lucide-react";
// import Link from "next/link";

// export default function MyJobsCard() {
//   const [jobs, setJobs] = useState([]);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [applicants, setApplicants] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // ─── Update Modal State ───────────────────────────────────────────────────
//   const [editingJob, setEditingJob] = useState(null);
//   const [editForm, setEditForm] = useState({});
//   const [updateLoading, setUpdateLoading] = useState(false);

//   // ─── Delete Confirm State ─────────────────────────────────────────────────
//   const [deletingJob, setDeletingJob] = useState(null);
//   const [deleteLoading, setDeleteLoading] = useState(false);

//   useEffect(() => {
//     fetch("/api/jobs?company=true")
//       .then((res) => res.json())
//       .then((data) => setJobs(data))
//       .catch((err) => console.error("Jobs fetch error:", err));
//   }, []);

//   // ─── Applicants Modal ─────────────────────────────────────────────────────
//   const openApplicantsModal = async (job) => {
//     const jobId = job._id?.$oid || job._id;
//     setSelectedJob(job);
//     setLoading(true);
//     setApplicants([]);
//     try {
//       const res = await fetch(`/api/applications/${encodeURIComponent(jobId)}`);
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to fetch applicants");
//       setApplicants(data);
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const closeModal = () => {
//     setSelectedJob(null);
//     setApplicants([]);
//   };

//   // ─── User Update Status ─────────────────────────────────────────────────────
//   const updateStatus = async (appId, newStatus) => {
//     if (!["interview", "rejected"].includes(newStatus)) return;

//     // appId may be { $oid: "..." } from MongoDB — resolve to plain string
//     const resolvedId = appId?.$oid || appId;

//     try {
//       const res = await fetch(`/api/applications/${resolvedId}/status`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status: newStatus }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Update failed");

//       // Compare resolved IDs — plain object comparison always fails
//       setApplicants((prev) =>
//         prev.map((app) => {
//           const id = app._id?.$oid || app._id;
//           return id === resolvedId ? { ...app, status: newStatus } : app;
//         }),
//       );
//     } catch (err) {
//       console.error("Status update error:", err);
//       alert("Status আপডেট করা যায়নি: " + err.message);
//     }
//   };

//   // ─── Update Handlers ──────────────────────────────────────────────────────
//   const openEditModal = (job) => {
//     setEditingJob(job);
//     setEditForm({
//       position: job.position || "",
//       companyName: job.companyName || "",
//       location: job.location || "",
//       salary: job.salary || "",
//       description: job.description || "",
//       type: job.type || "",
//     });
//   };

//   const closeEditModal = () => {
//     setEditingJob(null);
//     setEditForm({});
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     const jobId = editingJob._id?.$oid || editingJob._id;
//     setUpdateLoading(true);
//     try {
//       const res = await fetch(`/api/jobs/${encodeURIComponent(jobId)}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(editForm),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Update failed");

//       // Update local state
//       setJobs((prev) =>
//         prev.map((j) =>
//           (j._id?.$oid || j._id) === jobId ? { ...j, ...editForm } : j,
//         ),
//       );
//       closeEditModal();
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setUpdateLoading(false);
//     }
//   };

//   // ─── Delete Handlers ──────────────────────────────────────────────────────
//   const openDeleteConfirm = (job) => {
//     setDeletingJob(job);
//   };

//   const closeDeleteConfirm = () => {
//     setDeletingJob(null);
//   };

//   const handleDelete = async () => {
//     const jobId = deletingJob._id?.$oid || deletingJob._id;
//     setDeleteLoading(true);
//     try {
//       const res = await fetch(`/api/jobs/${encodeURIComponent(jobId)}`, {
//         method: "DELETE",
//       });
//       if (!res.ok) {
//         const data = await res.json();
//         throw new Error(data.error || "Delete failed");
//       }
//       // Remove from local state
//       setJobs((prev) => prev.filter((j) => (j._id?.$oid || j._id) !== jobId));
//       closeDeleteConfirm();
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setDeleteLoading(false);
//     }
//   };

//   // ─── Shared input style ───────────────────────────────────────────────────
//   const inputCls =
//     "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/60 transition-colors";

//   return (
//     <div className="min-h-screen w-full bg-[#030407] text-white px-4 sm:px-6 py-16 md:py-12 overflow-x-hidden relative font-sans">
//       {/* Background glows */}
//       <div className="absolute top-[-5%] right-[-5%] w-64 h-64 md:w-125 md:h-125 bg-indigo-600/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />
//       <div className="absolute bottom-[-5%] left-[-5%] w-48 h-48 md:w-100 md:h-100 bg-purple-600/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />

//       <div className="max-w-7xl mx-auto z-10 relative pt-8 md:pt-16">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-8">
//           <div className="space-y-4 w-full md:w-auto">
//             <div className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]">
//               <Zap size={14} className="fill-indigo-400" /> Company Dashboard
//             </div>
//             <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter bg-clip-text text-transparent bg-linear-to-b from-white to-white/40 leading-[1.1] pb-4">
//               Manage <span className="text-white">Postings.</span>
//             </h1>
//             <p className="text-gray-500 font-medium max-w-md text-sm md:text-base">
//               Review, update, or remove your active job listings.
//             </p>
//           </div>

//           <div className="flex gap-3 md:gap-4 items-center w-full md:w-auto">
//             <div className="flex-1 md:flex-none bg-white/5 backdrop-blur-md border border-white/10 p-3 md:p-4 px-6 md:px-8 rounded-2xl md:rounded-4xl text-center">
//               <p className="text-gray-500 text-[8px] md:text-[10px] uppercase font-black tracking-widest mb-1">
//                 Active Posts
//               </p>
//               <p className="text-2xl md:text-3xl font-mono font-bold text-indigo-400">
//                 {jobs.length}
//               </p>
//             </div>
//             <Link
//               href="/post-job"
//               className="h-14 w-14 md:h-16 md:w-16 bg-indigo-600 hover:bg-indigo-500 rounded-2xl md:rounded-4xl flex items-center justify-center transition-all hover:rotate-90 shadow-lg shadow-indigo-600/20"
//             >
//               <Plus className="w-6 h-6 md:w-7 md:h-7" strokeWidth={3} />
//             </Link>
//           </div>
//         </div>

//         {/* Job List */}
//         <div className="grid grid-cols-1 gap-6 pb-20">
//           {jobs.length === 0 ? (
//             <div className="text-center py-20 text-gray-400">
//               No job postings yet. Create one to get started!
//             </div>
//           ) : (
//             jobs.map((job) => (
//               <div
//                 key={job._id?.$oid || job._id}
//                 className="group relative bg-[#0a0c10] border border-white/5 p-px rounded-4xl md:rounded-[3rem] transition-all duration-500 hover:border-indigo-500/40"
//               >
//                 <div className="bg-[#0d1117] rounded-[1.9rem] md:rounded-[2.8rem] p-5 md:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 md:gap-8">
//                   {/* Job Info */}
//                   <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6 w-full lg:w-3/5">
//                     <div className="w-14 h-14 md:w-20 md:h-20 bg-linear-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl md:rounded-4xl flex items-center justify-center border border-white/10 shrink-0">
//                       <Briefcase className="text-indigo-400 w-6 h-6 md:w-8 md:h-8" />
//                     </div>
//                     <div className="space-y-2">
//                       <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight group-hover:text-indigo-300 transition-colors">
//                         {job.position}
//                       </h2>
//                       <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs md:text-sm font-medium text-gray-500">
//                         <span className="flex items-center gap-1.5">
//                           <Globe size={14} /> {job.companyName}
//                         </span>
//                         <span className="flex items-center gap-1.5">
//                           <MapPin size={14} /> {job.location}
//                         </span>
//                         <span className="text-indigo-400/80 font-bold uppercase">
//                           {job.salary}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Actions */}
//                   <div className="flex flex-row items-center gap-2 md:gap-3 w-full lg:w-auto pt-4 lg:pt-0 border-t border-white/5 lg:border-none justify-between sm:justify-end">
//                     <div className="flex items-center gap-2 md:gap-3 flex-1 sm:flex-none">
//                       {/* ── Update button ── */}
//                       <button
//                         onClick={() => openEditModal(job)}
//                         className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-indigo-500/10 hover:bg-indigo-500 border border-indigo-500/20 px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold transition-all group/btn cursor-pointer"
//                       >
//                         <Edit3 className="w-4 h-4 md:w-5 md:h-5 text-indigo-400 group-hover/btn:text-white" />
//                         <span className="text-xs md:text-sm text-indigo-400 group-hover/btn:text-white">
//                           Update
//                         </span>
//                       </button>

//                       {/* ── Delete button ── */}
//                       <button
//                         onClick={() => openDeleteConfirm(job)}
//                         className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500 border border-red-500/20 px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold transition-all group/del cursor-pointer"
//                       >
//                         <Trash2 className="w-4 h-4 md:w-5 md:h-5 text-red-400 group-hover/del:text-white" />
//                         <span className="text-xs md:text-sm text-red-400 group-hover/del:text-white">
//                           Delete
//                         </span>
//                       </button>
//                     </div>

//                     {/* Applicants button */}
//                     <button
//                       onClick={() => openApplicantsModal(job)}
//                       className="sm:flex p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/5 hover:bg-indigo-600/20 border border-white/5 hover:border-indigo-500/50 transition-all text-gray-400 hover:text-indigo-300 shadow-sm hover:shadow-indigo-500/20 cursor-pointer"
//                     >
//                       <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* APPLICANTS MODAL */}
//       {selectedJob && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
//           <div className="bg-[#0d1117] border border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
//             <div className="sticky top-0 bg-[#0d1117] border-b border-white/10 p-6 flex items-center justify-between z-10">
//               <div>
//                 <h2 className="text-2xl font-bold">{selectedJob.position}</h2>
//                 <p className="text-gray-400 mt-1">
//                   {applicants.length} Applicant
//                   {applicants.length !== 1 ? "s" : ""}
//                 </p>
//               </div>
//               <button
//                 onClick={closeModal}
//                 className="p-2 rounded-full hover:bg-white/10 transition-colors"
//               >
//                 <X size={28} />
//               </button>
//             </div>

//             <div className="p-6 space-y-6">
//               {loading ? (
//                 <div className="text-center py-12 text-gray-500">
//                   Loading applicants...
//                 </div>
//               ) : applicants.length === 0 ? (
//                 <div className="text-center py-12 text-gray-500">
//                   No applications received yet.
//                 </div>
//               ) : (
//                 applicants.map((app) => (
//                   <div
//                     key={app._id}
//                     className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-black/30 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all"
//                   >
//                     <div className="space-y-2 flex-1">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
//                           <User size={20} className="text-indigo-400" />
//                         </div>
//                         <div>
//                           <p className="font-medium text-lg">{app.userName}</p>
//                           <p className="text-sm text-gray-400 flex items-center gap-1.5">
//                             <Mail size={14} /> {app.userEmail}
//                           </p>
//                         </div>
//                       </div>
//                       <p className="text-xs text-gray-500 flex items-center gap-1.5">
//                         <Calendar size={14} /> Applied on{" "}
//                         {new Date(app.createdAt).toLocaleDateString("en-GB")}
//                       </p>
//                     </div>
//                     <div className="flex gap-3 mt-4 sm:mt-0">
//                       <button
//                         onClick={() => updateStatus(app._id, "interview")}
//                         disabled={app.status === "interview"}
//                         className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
//                           app.status === "interview"
//                             ? "bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 cursor-not-allowed"
//                             : "bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:text-white  cursor-pointer"
//                         }`}
//                       >
//                         <UserCheck size={18} /> Interview
//                       </button>
//                       <button
//                         onClick={() => updateStatus(app._id, "rejected")}
//                         disabled={app.status === "rejected"}
//                         className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
//                           app.status === "rejected"
//                             ? "bg-rose-600/30 text-rose-300 border border-rose-500/40 cursor-not-allowed"
//                             : "bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 hover:text-white cursor-pointer"
//                         }`}
//                       >
//                         <UserX size={18} /> Reject
//                       </button>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* UPDATE / EDIT MODAL */}
//       {editingJob && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
//           <div className="bg-[#0d1117] border border-white/10 rounded-3xl w-full max-w-lg relative">
//             {/* Header */}
//             <div className="border-b border-white/10 p-6 flex items-center justify-between">
//               <div>
//                 <h2 className="text-xl font-bold">Edit Job Posting</h2>
//                 <p className="text-gray-500 text-sm mt-0.5">
//                   Update the details below and save.
//                 </p>
//               </div>
//               <button
//                 onClick={closeEditModal}
//                 className="p-2 rounded-full hover:bg-white/10 transition-colors"
//               >
//                 <X size={24} />
//               </button>
//             </div>

//             {/* Form */}
//             <form onSubmit={handleUpdate} className="p-6 space-y-4">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div className="sm:col-span-2">
//                   <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
//                     Position *
//                   </label>
//                   <input
//                     required
//                     name="position"
//                     value={editForm.position}
//                     onChange={handleEditChange}
//                     placeholder="e.g. Senior Frontend Engineer"
//                     className={inputCls}
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
//                     Company Name *
//                   </label>
//                   <input
//                     required
//                     name="companyName"
//                     value={editForm.companyName}
//                     onChange={handleEditChange}
//                     placeholder="Acme Corp"
//                     className={inputCls}
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
//                     Location *
//                   </label>
//                   <input
//                     required
//                     name="location"
//                     value={editForm.location}
//                     onChange={handleEditChange}
//                     placeholder="Remote / City, Country"
//                     className={inputCls}
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
//                     Salary
//                   </label>
//                   <input
//                     name="salary"
//                     value={editForm.salary}
//                     onChange={handleEditChange}
//                     placeholder="$80k – $120k"
//                     className={inputCls}
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
//                     Job Type
//                   </label>
//                   <select
//                     name="type"
//                     value={editForm.type}
//                     onChange={handleEditChange}
//                     className={inputCls + " cursor-pointer"}
//                   >
//                     <option value="" className="bg-[#0d1117]">
//                       Select type
//                     </option>
//                     <option value="Full-time" className="bg-[#0d1117]">
//                       Full-time
//                     </option>
//                     <option value="Part-time" className="bg-[#0d1117]">
//                       Part-time
//                     </option>
//                     <option value="Contract" className="bg-[#0d1117]">
//                       Contract
//                     </option>
//                     <option value="Internship" className="bg-[#0d1117]">
//                       Internship
//                     </option>
//                     <option value="Freelance" className="bg-[#0d1117]">
//                       Freelance
//                     </option>
//                   </select>
//                 </div>

//                 <div className="sm:col-span-2">
//                   <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
//                     Description
//                   </label>
//                   <textarea
//                     name="description"
//                     value={editForm.description}
//                     onChange={handleEditChange}
//                     rows={4}
//                     placeholder="Describe the role, responsibilities, and requirements..."
//                     className={inputCls + " resize-none"}
//                   />
//                 </div>
//               </div>

//               {/* Footer buttons */}
//               <div className="flex gap-3 pt-2">
//                 <button
//                   type="button"
//                   onClick={closeEditModal}
//                   className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 transition-colors text-sm font-medium cursor-pointer"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={updateLoading}
//                   className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-sm font-bold cursor-pointer"
//                 >
//                   {updateLoading ? (
//                     <Loader2 size={18} className="animate-spin" />
//                   ) : (
//                     <Save size={18} />
//                   )}
//                   {updateLoading ? "Saving..." : "Save Changes"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* DELETE CONFIRMATION MODAL */}
//       {deletingJob && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
//           <div className="bg-[#0d1117] border border-red-500/20 rounded-3xl w-full max-w-md p-8 text-center relative">
//             {/* Close */}
//             <button
//               onClick={closeDeleteConfirm}
//               className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-gray-500"
//             >
//               <X size={20} />
//             </button>

//             {/* Icon */}
//             <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-5">
//               <AlertTriangle className="text-red-400 w-8 h-8" />
//             </div>

//             <h2 className="text-xl font-bold mb-2">Delete Job Posting?</h2>
//             <p className="text-gray-400 text-sm mb-1">
//               You're about to permanently delete:
//             </p>
//             <p className="text-indigo-300 font-semibold text-base mb-6">
//               "{deletingJob.position}"
//             </p>
//             <p className="text-gray-500 text-xs mb-8">
//               This action cannot be undone. All associated applications will
//               also be removed.
//             </p>

//             <div className="flex gap-3">
//               <button
//                 onClick={closeDeleteConfirm}
//                 className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 transition-colors text-sm font-medium cursor-pointer"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDelete}
//                 disabled={deleteLoading}
//                 className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-sm font-bold cursor-pointer"
//               >
//                 {deleteLoading ? (
//                   <Loader2 size={18} className="animate-spin" />
//                 ) : (
//                   <Trash2 size={18} />
//                 )}
//                 {deleteLoading ? "Deleting..." : "Yes, Delete"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";
import React, { useEffect, useState } from "react";
import {
  MapPin,
  Briefcase,
  Globe,
  ArrowUpRight,
  Zap,
  Edit3,
  Trash2,
  Plus,
  X,
  User,
  Mail,
  Calendar,
  UserCheck,
  UserX,
  Save,
  Loader2,
  AlertTriangle,
  PlusCircle,
  FileText,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";

// ─── Inline Resume View ──────────────
function ResumeView({ data, loading }) {
  if (loading) {
    return (
      <div className="animate-pulse space-y-6 p-6">
        <div>
          <div className="h-7 w-48 bg-white/10 rounded mb-2" />
          <div className="h-4 w-32 bg-white/5 rounded mb-4" />
          <div className="h-3 w-40 bg-white/5 rounded" />
        </div>
        <div>
          <div className="h-5 w-28 bg-white/10 rounded mb-3" />
          <div className="space-y-2">
            <div className="h-3 w-full bg-white/5 rounded" />
            <div className="h-3 w-full bg-white/5 rounded" />
            <div className="h-3 w-4/5 bg-white/5 rounded" />
          </div>
        </div>
        <div>
          <div className="h-5 w-20 bg-white/10 rounded mb-3" />
          <div className="flex gap-2 flex-wrap">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-7 w-20 bg-white/5 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center px-6">
        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
          <FileText className="text-gray-500 w-7 h-7" />
        </div>
        <p className="text-gray-400 font-medium">No resume found</p>
        <p className="text-gray-600 text-sm mt-1">
          This user hasn't created a resume yet.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-7">
      {/* Header */}
      <header className="border-b border-cyan-500/30 pb-6">
        <h2 className="text-3xl font-black uppercase tracking-tighter text-white">
          {data.name || "—"}
        </h2>
        <p className="text-cyan-400 font-bold text-base mt-1 tracking-widest">
          {data.title || "—"}
        </p>
        <div className="flex gap-4 mt-3 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <Mail size={13} className="text-cyan-500/70" />
            {data.email || "—"}
          </span>
        </div>
      </header>

      {/* Experience */}
      <section>
        <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-gray-400 border-l-2 border-cyan-500 pl-3 mb-3">
          <Briefcase size={14} className="text-cyan-400" /> Experience
        </h3>
        <p className="text-gray-300 leading-relaxed text-sm whitespace-pre-line">
          {data.experience || "No experience listed."}
        </p>
      </section>

      {/* Skills */}
      <section>
        <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-gray-400 border-l-2 border-cyan-500 pl-3 mb-3">
          <PlusCircle size={14} className="text-cyan-400" /> Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {(data.skills || "")
            .split(",")
            .filter(Boolean)
            .map((skill, i) => (
              <span
                key={i}
                className="bg-white/5 border border-white/10 text-gray-300 px-3 py-1 rounded-full text-xs font-semibold"
              >
                {skill.trim()}
              </span>
            ))}
        </div>
      </section>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function MyJobsCard() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);

  // Edit modal
  const [editingJob, setEditingJob] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [updateLoading, setUpdateLoading] = useState(false);

  // Delete confirm
  const [deletingJob, setDeletingJob] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // ── Resume modal ─────────────────────────────────────────────────────────
  const [resumeUser, setResumeUser] = useState(null); // { name, email }
  const [resumeData, setResumeData] = useState(null);
  const [resumeLoading, setResumeLoading] = useState(false);

  useEffect(() => {
    fetch("/api/jobs?company=true")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error("Jobs fetch error:", err));
  }, []);

  // ─── Applicants Modal ─────────────────────────────────────────────────────
  const openApplicantsModal = async (job) => {
    const jobId = job._id?.$oid || job._id;
    setSelectedJob(job);
    setLoading(true);
    setApplicants([]);
    try {
      const res = await fetch(`/api/applications/${encodeURIComponent(jobId)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch applicants");
      setApplicants(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedJob(null);
    setApplicants([]);
  };

  // ─── Status Update ────────────────────────────────────────────────────────
  const updateStatus = async (appId, newStatus) => {
    if (!["interview", "rejected"].includes(newStatus)) return;
    const resolvedId = appId?.$oid || appId;
    try {
      const res = await fetch(`/api/applications/${resolvedId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");
      setApplicants((prev) =>
        prev.map((app) => {
          const id = app._id?.$oid || app._id;
          return id === resolvedId ? { ...app, status: newStatus } : app;
        }),
      );
    } catch (err) {
      alert("Status আপডেট করা যায়নি: " + err.message);
    }
  };

  // ─── Resume Modal ─────────────────────────────────────────────────────────
  const openResumeModal = async (app) => {
    setResumeUser({ name: app.userName, email: app.userEmail });
    setResumeData(null);
    setResumeLoading(true);
    try {
      const res = await fetch(
        `/api/resume/by-email?email=${encodeURIComponent(app.userEmail)}`,
      );
      if (res.status === 404) {
        setResumeData(null);
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Resume fetch failed");
      setResumeData(data.resume);
    } catch (err) {
      console.error("Resume fetch error:", err);
      setResumeData(null);
    } finally {
      setResumeLoading(false);
    }
  };

  const closeResumeModal = () => {
    setResumeUser(null);
    setResumeData(null);
  };

  // ─── Edit Handlers ────────────────────────────────────────────────────────
  const openEditModal = (job) => {
    setEditingJob(job);
    setEditForm({
      position: job.position || "",
      companyName: job.companyName || "",
      location: job.location || "",
      salary: job.salary || "",
      description: job.description || "",
      type: job.type || "",
    });
  };

  const closeEditModal = () => {
    setEditingJob(null);
    setEditForm({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const jobId = editingJob._id?.$oid || editingJob._id;
    setUpdateLoading(true);
    try {
      const res = await fetch(`/api/jobs/${encodeURIComponent(jobId)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");
      setJobs((prev) =>
        prev.map((j) =>
          (j._id?.$oid || j._id) === jobId ? { ...j, ...editForm } : j,
        ),
      );
      closeEditModal();
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdateLoading(false);
    }
  };

  // ─── Delete Handlers ──────────────────────────────────────────────────────
  const openDeleteConfirm = (job) => setDeletingJob(job);
  const closeDeleteConfirm = () => setDeletingJob(null);
  const handleDelete = async () => {
    const jobId = deletingJob._id?.$oid || deletingJob._id;
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/jobs/${encodeURIComponent(jobId)}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Delete failed");
      }
      setJobs((prev) => prev.filter((j) => (j._id?.$oid || j._id) !== jobId));
      closeDeleteConfirm();
    } catch (err) {
      alert(err.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  const inputCls =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/60 transition-colors";

  return (
    <div className="min-h-screen w-full bg-[#030407] text-white px-4 sm:px-6 py-16 md:py-12 overflow-x-hidden relative font-sans">
      {/* Background glows */}
      <div className="absolute top-[-5%] right-[-5%] w-64 h-64 md:w-125 md:h-125 bg-indigo-600/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-5%] left-[-5%] w-48 h-48 md:w-100 md:h-100 bg-purple-600/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative pt-8 md:pt-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-8">
          <div className="space-y-4 w-full md:w-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]">
              <Zap size={14} className="fill-indigo-400" /> Company Dashboard
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter bg-clip-text text-transparent bg-linear-to-b from-white to-white/40 leading-[1.1] pb-4">
              Manage <span className="text-white">Postings.</span>
            </h1>
            <p className="text-gray-500 font-medium max-w-md text-sm md:text-base">
              Review, update, or remove your active job listings.
            </p>
          </div>

          <div className="flex gap-3 md:gap-4 items-center w-full md:w-auto">
            <div className="flex-1 md:flex-none bg-white/5 backdrop-blur-md border border-white/10 p-3 md:p-4 px-6 md:px-8 rounded-2xl md:rounded-4xl text-center">
              <p className="text-gray-500 text-[8px] md:text-[10px] uppercase font-black tracking-widest mb-1">
                Active Posts
              </p>
              <p className="text-2xl md:text-3xl font-mono font-bold text-indigo-400">
                {jobs.length}
              </p>
            </div>
            <Link
              href="/post-job"
              className="h-14 w-14 md:h-16 md:w-16 bg-indigo-600 hover:bg-indigo-500 rounded-2xl md:rounded-4xl flex items-center justify-center transition-all hover:rotate-90 shadow-lg shadow-indigo-600/20"
            >
              <Plus className="w-6 h-6 md:w-7 md:h-7" strokeWidth={3} />
            </Link>
          </div>
        </div>

        {/* Job List */}
        <div className="grid grid-cols-1 gap-6 pb-20">
          {jobs.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              No job postings yet. Create one to get started!
            </div>
          ) : (
            jobs.map((job) => (
              <div
                key={job._id?.$oid || job._id}
                className="group relative bg-[#0a0c10] border border-white/5 p-px rounded-4xl md:rounded-[3rem] transition-all duration-500 hover:border-indigo-500/40"
              >
                <div className="bg-[#0d1117] rounded-[1.9rem] md:rounded-[2.8rem] p-5 md:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 md:gap-8">
                  <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6 w-full lg:w-3/5">
                    <div className="w-14 h-14 md:w-20 md:h-20 bg-linear-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl md:rounded-4xl flex items-center justify-center border border-white/10 shrink-0">
                      <Briefcase className="text-indigo-400 w-6 h-6 md:w-8 md:h-8" />
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight group-hover:text-indigo-300 transition-colors">
                        {job.position}
                      </h2>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs md:text-sm font-medium text-gray-500">
                        <span className="flex items-center gap-1.5">
                          <Globe size={14} /> {job.companyName}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin size={14} /> {job.location}
                        </span>
                        <span className="text-indigo-400/80 font-bold uppercase">
                          {job.salary}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row items-center gap-2 md:gap-3 w-full lg:w-auto pt-4 lg:pt-0 border-t border-white/5 lg:border-none justify-between sm:justify-end">
                    <div className="flex items-center gap-2 md:gap-3 flex-1 sm:flex-none">
                      <button
                        onClick={() => openEditModal(job)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-indigo-500/10 hover:bg-indigo-500 border border-indigo-500/20 px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold transition-all group/btn cursor-pointer"
                      >
                        <Edit3 className="w-4 h-4 md:w-5 md:h-5 text-indigo-400 group-hover/btn:text-white" />
                        <span className="text-xs md:text-sm text-indigo-400 group-hover/btn:text-white">
                          Update
                        </span>
                      </button>
                      <button
                        onClick={() => openDeleteConfirm(job)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500 border border-red-500/20 px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold transition-all group/del cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4 md:w-5 md:h-5 text-red-400 group-hover/del:text-white" />
                        <span className="text-xs md:text-sm text-red-400 group-hover/del:text-white">
                          Delete
                        </span>
                      </button>
                    </div>
                    <button
                      onClick={() => openApplicantsModal(job)}
                      className="sm:flex p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/5 hover:bg-indigo-600/20 border border-white/5 hover:border-indigo-500/50 transition-all text-gray-400 hover:text-indigo-300 shadow-sm hover:shadow-indigo-500/20 cursor-pointer"
                    >
                      <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ── APPLICANTS MODAL ─────────────────────────────────────────────────── */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-[#0d1117] border border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
            <div className="sticky top-0 bg-[#0d1117] border-b border-white/10 p-6 flex items-center justify-between z-10">
              <div>
                <h2 className="text-2xl font-bold">{selectedJob.position}</h2>
                <p className="text-gray-400 mt-1">
                  {applicants.length} Applicant
                  {applicants.length !== 1 ? "s" : ""}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X size={28} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {loading ? (
                <div className="text-center py-12 text-gray-500">
                  Loading applicants...
                </div>
              ) : applicants.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No applications received yet.
                </div>
              ) : (
                applicants.map((app) => (
                  <div
                    key={app._id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-black/30 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0">
                          <User size={20} className="text-indigo-400" />
                        </div>
                        <div>
                          {/* ── Clickable name → resume modal ── */}
                          <button
                            onClick={() => openResumeModal(app)}
                            className="font-medium text-lg hover:text-indigo-300 transition-colors text-left underline underline-offset-2 decoration-indigo-500/40 hover:decoration-indigo-400 cursor-pointer"
                          >
                            {app.userName}
                          </button>
                          <p className="text-sm text-gray-400 flex items-center gap-1.5">
                            <Mail size={14} /> {app.userEmail}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 flex items-center gap-1.5">
                        <Calendar size={14} /> Applied on{" "}
                        {new Date(app.createdAt).toLocaleDateString("en-GB")}
                      </p>
                    </div>
                    <div className="flex gap-3 mt-4 sm:mt-0">
                      <button
                        onClick={() => updateStatus(app._id, "interview")}
                        disabled={app.status === "interview"}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                          app.status === "interview"
                            ? "bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 cursor-not-allowed"
                            : "bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:text-white cursor-pointer"
                        }`}
                      >
                        <UserCheck size={18} /> Interview
                      </button>
                      <button
                        onClick={() => updateStatus(app._id, "rejected")}
                        disabled={app.status === "rejected"}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                          app.status === "rejected"
                            ? "bg-rose-600/30 text-rose-300 border border-rose-500/40 cursor-not-allowed"
                            : "bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 hover:text-white cursor-pointer"
                        }`}
                      >
                        <UserX size={18} /> Reject
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── RESUME MODAL (z-60 → sits above applicants modal) ────────────────── */}
      {resumeUser && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-[#0d1117] border border-cyan-500/20 rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative">
            {/* Header */}
            <div className="sticky top-0 bg-[#0d1117] border-b border-white/10 p-5 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                {/* Back button to go back to applicants (just close resume) */}
                <button
                  onClick={closeResumeModal}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white cursor-pointer"
                >
                  <ChevronLeft size={22} />
                </button>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-0.5">
                    Resume
                  </p>
                  <h2 className="text-lg font-bold leading-tight">
                    {resumeUser.name}
                  </h2>
                </div>
              </div>
              <button
                onClick={() => {
                  closeResumeModal();
                  closeModal();
                }}
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 cursor-pointer"
              >
                <X size={22} />
              </button>
            </div>

            {/* Resume Content */}
            <ResumeView data={resumeData} loading={resumeLoading} />
          </div>
        </div>
      )}

      {/* ── UPDATE / EDIT MODAL ────────────────────────────────────────────────── */}
      {editingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-[#0d1117] border border-white/10 rounded-3xl w-full max-w-lg relative">
            <div className="border-b border-white/10 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Edit Job Posting</h2>
                <p className="text-gray-500 text-sm mt-0.5">
                  Update the details below and save.
                </p>
              </div>
              <button
                onClick={closeEditModal}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
                    Position *
                  </label>
                  <input
                    required
                    name="position"
                    value={editForm.position}
                    onChange={handleEditChange}
                    placeholder="e.g. Senior Frontend Engineer"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
                    Company Name *
                  </label>
                  <input
                    required
                    name="companyName"
                    value={editForm.companyName}
                    onChange={handleEditChange}
                    placeholder="Acme Corp"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
                    Location *
                  </label>
                  <input
                    required
                    name="location"
                    value={editForm.location}
                    onChange={handleEditChange}
                    placeholder="Remote / City, Country"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
                    Salary
                  </label>
                  <input
                    name="salary"
                    value={editForm.salary}
                    onChange={handleEditChange}
                    placeholder="$80k – $120k"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
                    Job Type
                  </label>
                  <select
                    name="type"
                    value={editForm.type}
                    onChange={handleEditChange}
                    className={inputCls + " cursor-pointer"}
                  >
                    <option value="" className="bg-[#0d1117]">
                      Select type
                    </option>
                    <option value="Full-time" className="bg-[#0d1117]">
                      Full-time
                    </option>
                    <option value="Part-time" className="bg-[#0d1117]">
                      Part-time
                    </option>
                    <option value="Contract" className="bg-[#0d1117]">
                      Contract
                    </option>
                    <option value="Internship" className="bg-[#0d1117]">
                      Internship
                    </option>
                    <option value="Freelance" className="bg-[#0d1117]">
                      Freelance
                    </option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={editForm.description}
                    onChange={handleEditChange}
                    rows={4}
                    placeholder="Describe the role, responsibilities, and requirements..."
                    className={inputCls + " resize-none"}
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 transition-colors text-sm font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateLoading}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-sm font-bold cursor-pointer"
                >
                  {updateLoading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Save size={18} />
                  )}
                  {updateLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRMATION MODAL ─────────────────────────────────────────── */}
      {deletingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#0d1117] border border-red-500/20 rounded-3xl w-full max-w-md p-8 text-center relative">
            <button
              onClick={closeDeleteConfirm}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-gray-500"
            >
              <X size={20} />
            </button>
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-5">
              <AlertTriangle className="text-red-400 w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold mb-2">Delete Job Posting?</h2>
            <p className="text-gray-400 text-sm mb-1">
              You're about to permanently delete:
            </p>
            <p className="text-indigo-300 font-semibold text-base mb-6">
              "{deletingJob.position}"
            </p>
            <p className="text-gray-500 text-xs mb-8">
              This action cannot be undone. All associated applications will
              also be removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={closeDeleteConfirm}
                className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 transition-colors text-sm font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-sm font-bold cursor-pointer"
              >
                {deleteLoading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Trash2 size={18} />
                )}
                {deleteLoading ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
