"use client";

import { ArrowLeft, User, Mail, Bell, Shield } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SettingsPage() {
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
          <h1 className="text-xl font-semibold">Profile & Settings</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/30 border border-zinc-800 rounded-3xl p-6"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <User className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Nathan</h2>
              <p className="text-sm text-zinc-400">nathan@example.com</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-cyan-500/30 transition-all font-medium"
          >
            Edit Profile
          </motion.button>
        </motion.div>

        {/* Settings Options */}
        <div className="space-y-3">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl bg-zinc-900/30 hover:bg-zinc-900 transition-all text-left border border-zinc-800 hover:border-cyan-500/30"
          >
            <Mail className="w-5 h-5 text-cyan-400" />
            <div className="flex-1">
              <p className="font-medium">Email Preferences</p>
              <p className="text-xs text-zinc-500">Manage notifications</p>
            </div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl bg-zinc-900/30 hover:bg-zinc-900 transition-all text-left border border-zinc-800 hover:border-blue-500/30"
          >
            <Bell className="w-5 h-5 text-blue-400" />
            <div className="flex-1">
              <p className="font-medium">Notifications</p>
              <p className="text-xs text-zinc-500">Push & email alerts</p>
            </div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl bg-zinc-900/30 hover:bg-zinc-900 transition-all text-left border border-zinc-800 hover:border-indigo-500/30"
          >
            <Shield className="w-5 h-5 text-indigo-400" />
            <div className="flex-1">
              <p className="font-medium">Privacy & Security</p>
              <p className="text-xs text-zinc-500">Manage your data</p>
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
