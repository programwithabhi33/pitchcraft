"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Trash2, Mail, CheckCheck } from "lucide-react";
import useSWR from "swr";
import DeleteConfirmModal from "./DeleteConfirmModal";

const fetcher = (url) => fetch(url).then((res) => res.json());

const typeConfig = {
  cold_email: {
    label: "Cold Email",
    icon: Mail,
    badgeClass: "badge-violet",
    color: "#7C3AED",
  },
};

function OutputCard({ output, index, mutate, onDeleteClick }) {
  const [copied, setCopied] = useState(false);
  const config = typeConfig[output.type] || typeConfig.cold_email;
  const Icon = config.icon;

  const handleCopy = () => {
    navigator.clipboard?.writeText(output.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedDate = new Date(output.generatedAt).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
    },
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      className="group relative bg-[#18181B] border border-[#27272A] rounded-2xl p-5 hover:border-[#3F3F46] transition-all duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex flex-col gap-3"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: `${config.color}18`, color: config.color }}
          >
            <Icon size={15} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#F4F4F5] truncate">
              {output.inputs?.clientName || "Generated Output"}
            </p>
            <p className="text-xs text-[#52525B] truncate">
              {output.inputs?.service}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className={`badge ${config.badgeClass} text-[9px]`}>
            {config.label}
          </span>
        </div>
      </div>

      <p className="text-xs text-[#71717A] leading-relaxed line-clamp-2 border-l-2 border-[#27272A] pl-3">
        {output.content}
      </p>

      <div className="flex items-center justify-between mt-auto pt-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#52525B] font-medium">
            {formattedDate}
          </span>
          {output.tone && (
            <>
              <span className="text-[#27272A]">·</span>
              <span className="text-[10px] text-[#52525B] font-medium capitalize">
                {output.tone}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-1 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleCopy}
            title="Copy content"
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
              copied
                ? "bg-[#10B981]/20 text-[#10B981]"
                : "bg-[#27272A] text-[#71717A] hover:text-[#F4F4F5] hover:bg-[#3F3F46]"
            }`}
          >
            {copied ? <CheckCheck size={12} /> : <Copy size={12} />}
          </button>
          <button
            onClick={() => onDeleteClick(output._id)}
            title="Delete"
            className="w-7 h-7 rounded-lg bg-[#27272A] text-[#71717A] hover:text-[#F43F5E] hover:bg-[#F43F5E]/10 flex items-center justify-center transition-all cursor-pointer"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="col-span-full flex flex-col items-center justify-center py-20 text-center space-y-5"
    >
      <div className="relative">
        <div className="w-20 h-20 rounded-3xl bg-[#1E1033] border border-[#7C3AED]/20 flex items-center justify-center">
          <Mail className="w-9 h-9 text-[#7C3AED]/60" />
        </div>
      </div>

      <div className="space-y-1.5 max-w-xs">
        <h3 className="text-lg font-bold text-[#F4F4F5]">No outputs yet</h3>
        <p className="text-sm text-[#52525B] leading-relaxed">
          Generate your first cold email and it will appear here.
        </p>
      </div>

      <a
        href="/dashboard/generator"
        className="btn-violet text-sm px-6 py-2.5 flex items-center gap-2 cursor-pointer"
      >
        <Mail size={14} />
        <span>Generate Your First Email</span>
      </a>
    </motion.div>
  );
}

export default function RecentOutputs() {
  const { data: outputs, isLoading, mutate } = useSWR("/api/outputs", fetcher);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    id: null,
    isDeleting: false,
  });

  const handleDeleteClick = (id) => {
    setDeleteModal({ isOpen: true, id, isDeleting: false });
  };

  const confirmDelete = async () => {
    setDeleteModal((prev) => ({ ...prev, isDeleting: true }));
    try {
      const res = await fetch(`/api/outputs/${deleteModal.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await mutate();
        setDeleteModal({ isOpen: false, id: null, isDeleting: false });
      } else {
        alert("Failed to delete email");
        setDeleteModal((prev) => ({ ...prev, isDeleting: false }));
      }
    } catch (error) {
      console.error("Delete error:", error);
      setDeleteModal((prev) => ({ ...prev, isDeleting: false }));
    }
  };

  if (isLoading) {
    return (
      <div className="grid sm:grid-cols-2 gap-4 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-32 bg-[#18181B] border border-[#27272A] rounded-2xl"
          />
        ))}
      </div>
    );
  }

  const list = (outputs || []).slice(0, 4);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <h2 className="text-base font-bold text-[#F4F4F5]">Recent Outputs</h2>
        </div>
        {outputs?.length > 0 && (
          <a
            href="/dashboard/saved"
            className="text-xs text-[#7C3AED] hover:text-[#A78BFA] font-medium transition-colors cursor-pointer"
          >
            View Library →
          </a>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {list.length === 0 ? (
            <EmptyState key="empty" />
          ) : (
            list.map((output, i) => (
              <OutputCard
                key={output._id}
                output={output}
                index={i}
                mutate={mutate}
                onDeleteClick={handleDeleteClick}
              />
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Reusable Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteModal.isOpen && (
          <DeleteConfirmModal
            isOpen={deleteModal.isOpen}
            isDeleting={deleteModal.isDeleting}
            onClose={() =>
              setDeleteModal({ isOpen: false, id: null, isDeleting: false })
            }
            onConfirm={confirmDelete}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
