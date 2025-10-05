"use client";

import { motion } from "framer-motion";
import { 
  Brain, 
  Lock, 
  Zap, 
  Database, 
  MessageSquare, 
  Share2,
  FileText,
  Image as ImageIcon,
  Video,
  Link as LinkIcon
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Classification",
    description: "Automatically categorizes your content into Notes, Media, Tasks, and Links using advanced AI.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: MessageSquare,
    title: "Contextual AI Twin",
    description: "Chat with an AI assistant that knows all your content. Get insights, summaries, and answers instantly.",
    gradient: "from-pink-500 to-rose-500"
  },
  {
    icon: Database,
    title: "Smart Storage",
    description: "Everything stored securely in Neon PostgreSQL with vector embeddings for lightning-fast retrieval.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Share2,
    title: "Shareable Twin Links",
    description: "Generate temporary links to let others interact with your AI Twin. Perfect for demos and portfolios.",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: Zap,
    title: "Instant Upload",
    description: "Drag and drop notes, screenshots, images, videos, and links. Upload in seconds, organized in milliseconds.",
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    icon: Lock,
    title: "Secure & Private",
    description: "Your data is encrypted and stored securely. Only you and your AI Twin have access.",
    gradient: "from-indigo-500 to-purple-500"
  }
];

const contentTypes = [
  { icon: FileText, label: "Notes", color: "text-blue-400" },
  { icon: ImageIcon, label: "Images", color: "text-green-400" },
  { icon: Video, label: "Videos", color: "text-red-400" },
  { icon: LinkIcon, label: "Links", color: "text-purple-400" }
];

export default function FeaturesSection() {
  return (
    <section className="relative bg-black text-white py-24 px-4 sm:px-6 lg:px-8">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Everything You Need
            </span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            A complete life vault with AI superpowers
          </p>
        </motion.div>

        {/* Content Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6 mb-20"
        >
          {contentTypes.map((type, index) => (
            <motion.div
              key={type.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <type.icon className={`w-5 h-5 ${type.color}`} />
              <span className="font-medium">{type.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
              
              <div className="relative">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} p-[1px] mb-4`}>
                  <div className="w-full h-full rounded-xl bg-black flex items-center justify-center">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-zinc-400 text-lg">
            Built with{" "}
            <span className="text-purple-400 font-semibold">Next.js</span>,{" "}
            <span className="text-pink-400 font-semibold">Vercel AI SDK</span>, and{" "}
            <span className="text-blue-400 font-semibold">Neon PostgreSQL</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
