"use client";

import { ArrowLeft, Share2, Copy, Clock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function ShareTwinPage() {
  const [shareLink] = useState("https://ark.app/twin/abc123");

  const copyLink = () => {
    navigator.clipboard.writeText(shareLink);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-black/95 backdrop-blur-xl border-b border-zinc-800/50 px-4 py-4">
        <div className="flex items-center gap-4">
          <Link href="/home">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 flex items-center justify-center transition-all border border-zinc-800 hover:border-cyan-500/30"
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
          </Link>
          <h1 className="text-xl font-semibold">Share My Twin</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-3xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Share2 className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-semibold">Share Your AI Twin</h2>
          </div>
          <p className="text-zinc-400 mb-6">
            Let others chat with your AI Twin. They'll be able to ask questions based on your vault content.
          </p>
          
          {/* Share Link */}
          <div className="bg-zinc-900/50 rounded-2xl p-4 mb-4 border border-zinc-800">
            <p className="text-sm text-zinc-500 mb-2">Your share link</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-sm text-cyan-400 truncate">{shareLink}</code>
              <motion.button
                onClick={copyLink}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-cyan-500/30 transition-all"
              >
                <Copy className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {/* Expiry Info */}
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <Clock className="w-4 h-4" />
            <span>Link expires in 24 hours</span>
          </div>
        </motion.div>

        {/* Generate New Link */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 font-medium shadow-lg shadow-blue-500/20 transition-all"
        >
          Generate New Link
        </motion.button>
      </div>
    </div>
  );
}
