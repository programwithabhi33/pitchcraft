"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  List,
  LayoutGrid,
  Trash2,
  Copy,
  Mail,
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import useSWR from "swr";
import DashboardHeader from "@/app/components/dashboard/DashboardHeader";
import DeleteConfirmModal from "@/app/components/dashboard/DeleteConfirmModal";

const fetcher = (url) => fetch(url).then((res) => res.json());

const TYPE_CONFIG = {
  cold_email: {
    label: "Cold Email",
    icon: Mail,
    badge: "badge-violet",
    color: "#7C3AED",
  },
};

export default function SavedOutputsPage() {
  const {
    data: outputs,
    error,
    mutate,
    isLoading,
  } = useSWR("/api/outputs", fetcher);

  const [viewMode, setViewMode] = useState("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [selectedIds, setSelectedIds] = useState([]);
  const [copiedId, setCopiedId] = useState(null);

  // Modal state
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    id: null,
    isDeleting: false,
    bulk: false,
  });

  // Derived list
  const list = outputs || [];

  // Filter application
  const filteredOutputs = list.filter((out) => {
    const matchesSearch =
      (out.inputs?.clientName || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (out.content || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredOutputs.length / itemsPerPage);
  const paginatedOutputs = filteredOutputs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Actions
  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const openSingleDelete = (id) => {
    setDeleteModal({ isOpen: true, id, isDeleting: false, bulk: false });
  };

  const openBulkDelete = () => {
    setDeleteModal({ isOpen: true, id: null, isDeleting: false, bulk: true });
  };

  const confirmDelete = async () => {
    setDeleteModal((prev) => ({ ...prev, isDeleting: true }));
    try {
      if (deleteModal.bulk) {
        // Bulk delete logic
        await Promise.all(
          selectedIds.map((id) =>
            fetch(`/api/outputs/${id}`, { method: "DELETE" }),
          ),
        );
        setSelectedIds([]);
      } else {
        // Single delete logic
        const res = await fetch(`/api/outputs/${deleteModal.id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to delete");
      }

      await mutate();
      setDeleteModal({
        isOpen: false,
        id: null,
        isDeleting: false,
        bulk: false,
      });
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete items");
      setDeleteModal((prev) => ({ ...prev, isDeleting: false }));
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedOutputs.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedOutputs.map((o) => o._id));
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* Integrated Dashboard Header for Mobile Menu Support */}
      <DashboardHeader
        title="Email Library"
        subtitle="Manage and access your previously generated cold emails"
      />

      {/* Toolbar - Sticky below the header */}
      <div className="bg-[#09090B] border-b border-[#27272A] px-6 py-6 sticky top-[64px] z-20">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#18181B] p-3 rounded-2xl border border-[#27272A]">
          <div className="flex w-full sm:w-auto items-center gap-3 flex-1">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52525B]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search emails…"
                className="w-full bg-[#09090B] border border-[#27272A] rounded-xl pl-9 pr-4 py-2 text-sm text-[#F4F4F5] placeholder-[#52525B] focus:outline-none focus:border-[#7C3AED] transition-colors"
              />
            </div>

            <div className="flex items-center bg-[#09090B] p-1 rounded-xl border border-[#27272A] ml-auto">
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === "list" ? "bg-[#27272A] text-[#F4F4F5] shadow-sm" : "text-[#71717A] hover:text-[#A1A1AA]"} cursor-pointer`}
              >
                <List size={16} />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === "grid" ? "bg-[#27272A] text-[#F4F4F5] shadow-sm" : "text-[#71717A] hover:text-[#A1A1AA]"} cursor-pointer`}
              >
                <LayoutGrid size={16} />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {selectedIds.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-2 w-full sm:w-auto"
              >
                <div className="text-xs font-semibold text-[#A78BFA] px-2 whitespace-nowrap">
                  {selectedIds.length} selected
                </div>
                <button
                  onClick={openBulkDelete}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-[#F43F5E]/10 text-[#F43F5E] hover:bg-[#F43F5E]/20 transition-colors cursor-pointer"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Main Content Area ── */}
      <div className="flex-1 p-6 overflow-y-auto bg-[#09090B]">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-[#7C3AED] animate-spin mb-4" />
              <p className="text-sm text-[#52525B]">Loading library...</p>
            </div>
          ) : filteredOutputs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#1E1033] border border-[#7C3AED]/20 flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-[#A78BFA]/60" />
              </div>
              <h3 className="text-lg font-bold text-[#F4F4F5]">
                No emails found
              </h3>
              <p className="text-sm text-[#A1A1AA] mt-1 max-w-sm">
                {searchQuery
                  ? "Try adjusting your search query."
                  : "You haven't generated any emails yet."}
              </p>
            </div>
          ) : (
            <>
              {viewMode === "list" ? (
                /* LIST VIEW */
                <div className="bg-[#18181B] border border-[#27272A] rounded-2xl overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                      <thead>
                        <tr className="bg-[#27272A]/30 border-b border-[#27272A] text-xs font-bold text-[#A1A1AA] uppercase tracking-wider">
                          <th className="py-3 px-4 w-12 text-center">
                            <input
                              type="checkbox"
                              className="w-4 h-4 rounded border-[#3F3F46] bg-[#09090B] focus:ring-[#7C3AED] focus:ring-offset-0 text-[#7C3AED] cursor-pointer"
                              checked={
                                selectedIds.length ===
                                  paginatedOutputs.length &&
                                paginatedOutputs.length > 0
                              }
                              onChange={toggleSelectAll}
                            />
                          </th>
                          <th className="py-3 px-4">Content</th>
                          <th className="py-3 px-4 w-32">Date</th>
                          <th className="py-3 px-4 w-28 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#27272A]">
                        <AnimatePresence mode="popLayout">
                          {paginatedOutputs.map((out, idx) => {
                            const isSelected = selectedIds.includes(out._id);
                            const config = TYPE_CONFIG.cold_email;
                            const isCopied = copiedId === out._id;

                            return (
                              <motion.tr
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{
                                  duration: 0.2,
                                  delay: idx * 0.03,
                                }}
                                key={out._id}
                                className={`group transition-colors ${isSelected ? "bg-[#7C3AED]/5" : "hover:bg-[#27272A]/20"}`}
                              >
                                <td className="py-4 px-4 text-center">
                                  <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded border-[#3F3F46] bg-[#09090B] focus:ring-[#7C3AED] focus:ring-offset-0 text-[#7C3AED] cursor-pointer"
                                    checked={isSelected}
                                    onChange={() => toggleSelect(out._id)}
                                  />
                                </td>
                                <td className="py-4 px-4 min-w-0">
                                  <div className="flex items-center gap-3">
                                    <div
                                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                      style={{
                                        background: `${config.color}18`,
                                        color: config.color,
                                      }}
                                    >
                                      <config.icon size={15} />
                                    </div>
                                    <div className="min-w-0 pr-4">
                                      <p className="text-sm font-semibold text-[#F4F4F5] truncate">
                                        {out.inputs?.clientName ||
                                          "Untitled Email"}
                                      </p>
                                      <p className="text-xs text-[#71717A] truncate mt-0.5">
                                        {out.content}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-4 px-4 text-xs text-[#A1A1AA] font-medium whitespace-nowrap">
                                  {new Date(out.generatedAt).toLocaleDateString(
                                    "en-US",
                                    { month: "short", day: "numeric" },
                                  )}
                                </td>
                                <td className="py-4 px-4 whitespace-nowrap text-right">
                                  <div className="flex items-center justify-end gap-1 group-hover:opacity-100 transition-opacity">
                                    <button
                                      onClick={() =>
                                        handleCopy(out._id, out.content)
                                      }
                                      className={`p-1.5 rounded-lg transition-colors ${isCopied ? "text-[#10B981]" : "text-[#71717A] hover:bg-[#3F3F46] hover:text-[#F4F4F5]"} cursor-pointer`}
                                    >
                                      {isCopied ? (
                                        <CheckCheck size={14} />
                                      ) : (
                                        <Copy size={14} />
                                      )}
                                    </button>
                                    <button
                                      onClick={() => openSingleDelete(out._id)}
                                      className="p-1.5 rounded-lg text-[#71717A] hover:bg-[#F43F5E]/10 hover:text-[#F43F5E] transition-colors cursor-pointer"
                                    >
                                      <Trash2 size={14} />
                                    </button>
                                  </div>
                                </td>
                              </motion.tr>
                            );
                          })}
                        </AnimatePresence>
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                /* GRID VIEW */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  <AnimatePresence mode="popLayout">
                    {paginatedOutputs.map((out, idx) => {
                      const isSelected = selectedIds.includes(out._id);
                      const config = TYPE_CONFIG.cold_email;
                      const isCopied = copiedId === out._id;

                      return (
                        <motion.div
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.2, delay: idx * 0.03 }}
                          key={out._id}
                          className={`group flex flex-col bg-[#18181B] border rounded-2xl p-5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all cursor-default relative ${
                            isSelected
                              ? "border-[#7C3AED]"
                              : "border-[#27272A] hover:border-[#3F3F46]"
                          }`}
                          onClick={() => toggleSelect(out._id)}
                        >
                          <div className="flex items-center gap-3 mb-3 pr-6">
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                              style={{
                                background: `${config.color}18`,
                                color: config.color,
                              }}
                            >
                              <config.icon size={18} />
                            </div>
                            <div className="min-w-0">
                              <h3 className="text-sm font-bold text-[#F4F4F5] truncate leading-tight">
                                {out.inputs?.clientName || "Untitled"}
                              </h3>
                              <p className="text-[10px] text-[#A1A1AA] uppercase tracking-wider mt-0.5">
                                {out.inputs?.industry || "General"}
                              </p>
                            </div>
                          </div>

                          <p className="text-sm text-[#71717A] leading-relaxed line-clamp-3 mb-5 flex-1">
                            {out.content}
                          </p>

                          <div className="flex items-center justify-between border-t border-[#27272A] pt-4 mt-auto">
                            <span className="text-[10px] text-[#52525B] font-medium">
                              {new Date(out.generatedAt).toLocaleDateString(
                                "en-US",
                                { month: "short", day: "numeric" },
                              )}
                            </span>

                            <div
                              className="flex items-center gap-1 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                onClick={() => handleCopy(out._id, out.content)}
                                className={`p-1.5 rounded-lg transition-colors ${isCopied ? "bg-[#10B981]/20 text-[#10B981]" : "bg-[#27272A] text-[#71717A] hover:bg-[#3F3F46] hover:text-[#F4F4F5]"} cursor-pointer`}
                              >
                                {isCopied ? (
                                  <CheckCheck size={12} />
                                ) : (
                                  <Copy size={12} />
                                )}
                              </button>
                              <button
                                onClick={() => openSingleDelete(out._id)}
                                className="p-1.5 rounded-lg bg-[#27272A] text-[#71717A] hover:text-[#F43F5E] hover:bg-[#F43F5E]/10 transition-colors cursor-pointer"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}

              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-between border-t border-[#27272A] pt-6">
                  <p className="text-xs text-[#52525B]">
                    Showing{" "}
                    <span className="text-[#A1A1AA]">
                      {(currentPage - 1) * itemsPerPage + 1}
                    </span>{" "}
                    to{" "}
                    <span className="text-[#A1A1AA]">
                      {Math.min(
                        currentPage * itemsPerPage,
                        filteredOutputs.length,
                      )}
                    </span>{" "}
                    of{" "}
                    <span className="text-[#A1A1AA]">
                      {filteredOutputs.length}
                    </span>{" "}
                    results
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg border border-[#27272A] text-[#71717A] hover:text-[#F4F4F5] hover:bg-[#27272A] transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <ChevronLeft size={16} />
                    </button>

                    <div className="flex items-center gap-1">
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`w-9 h-9 rounded-lg text-xs font-bold transition-all ${
                            currentPage === i + 1
                              ? "bg-[#7C3AED] text-white"
                              : "text-[#71717A] hover:text-[#F4F4F5] hover:bg-[#27272A]"
                          } cursor-pointer`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg border border-[#27272A] text-[#71717A] hover:text-[#F4F4F5] hover:bg-[#27272A] transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {deleteModal.isOpen && (
          <DeleteConfirmModal
            isOpen={deleteModal.isOpen}
            isDeleting={deleteModal.isDeleting}
            onClose={() =>
              setDeleteModal({
                isOpen: false,
                id: null,
                isDeleting: false,
                bulk: false,
              })
            }
            onConfirm={confirmDelete}
            title={
              deleteModal.bulk
                ? `Delete ${selectedIds.length} emails?`
                : "Delete this email?"
            }
            message={
              deleteModal.bulk
                ? "Are you sure you want to remove these items? This action cannot be undone."
                : "This email will be permanently removed from your library."
            }
          />
        )}
      </AnimatePresence>
    </div>
  );
}
