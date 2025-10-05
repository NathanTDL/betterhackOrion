"use client";

import { motion } from "framer-motion";
import { Upload, Sparkles, MessageSquare, Share2 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload Everything",
    description: "Drag and drop notes, images, videos, and links into your vault",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    number: "02",
    icon: Sparkles,
    title: "AI Auto-Organizes",
    description: "Our AI classifies, tags, and summarizes your content automatically",
    gradient: "from-pink-500 to-rose-500"
  },
  {
    number: "03",
    icon: MessageSquare,
    title: "Chat with Your Twin",
    description: "Ask questions and get insights from your personalized AI assistant",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    number: "04",
    icon: Share2,
    title: "Share Your Twin",
    description: "Generate shareable links for demos, portfolios, or collaboration",
    gradient: "from-green-500 to-emerald-500"
  }
];

export default function HowItWorks() {
  return (
    <section className="relative bg-zinc-950 text-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-xl text-zinc-400">Four simple steps to your AI-powered life vault</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${step.gradient} p-[1px]`}>
                  <div className="w-full h-full rounded-2xl bg-zinc-950 flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-5xl font-bold text-white/10 mb-2">{step.number}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-zinc-400">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-[2px] bg-gradient-to-r from-white/20 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
