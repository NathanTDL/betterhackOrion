"use client";

import { ArrowLeft, CreditCard, Zap } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PaymentPage() {
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
          <h1 className="text-xl font-semibold">Subscription & Billing</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Current Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-semibold">Free Plan</h2>
          </div>
          <p className="text-zinc-400 mb-6">You're currently on the free plan</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 font-medium shadow-lg shadow-cyan-500/20 transition-all"
          >
            Upgrade to Pro
          </motion.button>
        </motion.div>

        {/* Billing Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-zinc-900/30 border border-zinc-800 rounded-3xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <CreditCard className="w-6 h-6 text-blue-400" />
            <h2 className="text-lg font-semibold">Payment Method</h2>
          </div>
          <p className="text-zinc-400 text-sm">No payment method added</p>
        </motion.div>
      </div>
    </div>
  );
}
