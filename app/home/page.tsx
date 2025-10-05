"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Menu, 
  Plus, 
  Sparkles,
  Image as ImageIcon,
  FileText,
  Video,
  Link as LinkIcon,
  Mic,
  User,
  CreditCard,
  Share2,
  LogOut,
  X
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import FileUploader from "@/components/upload/file-uploader";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [menuOpen, setMenuOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [vaultItems, setVaultItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Good Morning" : currentHour < 18 ? "Good Afternoon" : "Good Evening";

  // Fetch vault items
  useEffect(() => {
    fetchVaultItems();
  }, []);

  const fetchVaultItems = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/vault-items");
      if (response.ok) {
        const data = await response.json();
        setVaultItems(data.items || []);
      }
    } catch (error) {
      console.error("Error fetching vault items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadComplete = (item: any) => {
    console.log("Upload complete:", item);
    // Add the new item to the list
    setVaultItems((prev) => [item, ...prev]);
  };

  // Filter items based on selected category
  const filteredItems = vaultItems.filter((item) => {
    if (selectedCategory === "all") return true;
    
    // Map category IDs to item types
    const categoryTypeMap: Record<string, string[]> = {
      images: ["image"],
      videos: ["video"],
      notes: ["note"],
      voice: ["voice"],
      links: ["link"],
    };
    
    const allowedTypes = categoryTypeMap[selectedCategory] || [];
    return allowedTypes.includes(item.type);
  });

  // Calculate dynamic category counts
  const getCategoryCount = (categoryId: string): number => {
    if (categoryId === "all") return vaultItems.length;
    
    const categoryTypeMap: Record<string, string[]> = {
      images: ["image"],
      videos: ["video"],
      notes: ["note"],
      voice: ["voice"],
      links: ["link"],
    };
    
    const allowedTypes = categoryTypeMap[categoryId] || [];
    return vaultItems.filter((item) => allowedTypes.includes(item.type)).length;
  };

  // Update categories with dynamic counts
  const categories = [
    { id: "all", name: "All", icon: FileText, count: getCategoryCount("all") },
    { id: "images", name: "Images", icon: ImageIcon, count: getCategoryCount("images") },
    { id: "videos", name: "Videos", icon: Video, count: getCategoryCount("videos") },
    { id: "notes", name: "Notes", icon: FileText, count: getCategoryCount("notes") },
    { id: "voice", name: "Voice", icon: Mic, count: getCategoryCount("voice") },
    { id: "links", name: "Links", icon: LinkIcon, count: getCategoryCount("links") },
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-32 overflow-y-auto custom-scrollbar">
      {/* Header with gradient background */}
      <div className="sticky top-0 z-40 bg-gradient-to-b from-black via-black/95 to-black/80 backdrop-blur-xl border-b border-zinc-800/50">
        <div className="px-4 pt-6 pb-4">
          {/* Top bar with logo and menu */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <span className="text-xl font-bold">A</span>
              </div>
              <h1 className="text-xl font-semibold text-white">Ark</h1>
            </div>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-10 h-10 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 flex items-center justify-center transition-all border border-zinc-800 hover:border-cyan-500/30"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <p className="text-sm text-zinc-500 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
              Daily Brief • {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-1">
              {greeting}
            </h2>
            <p className="text-xl font-medium text-zinc-400">Nathan</p>
          </motion.div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <Input
              type="text"
              placeholder="Search your vault..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-zinc-900/50 border-zinc-800 rounded-xl text-white placeholder:text-zinc-500 focus:bg-zinc-900/70 focus:border-cyan-500/50 transition-all shadow-lg shadow-black/20"
            />
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* Vertical scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgba(6, 182, 212, 0.6), rgba(59, 130, 246, 0.6));
          border-radius: 10px;
          box-shadow: 0 0 6px rgba(6, 182, 212, 0.3);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, rgba(6, 182, 212, 0.8), rgba(59, 130, 246, 0.8));
          box-shadow: 0 0 8px rgba(6, 182, 212, 0.5);
        }

        /* Horizontal scrollbar */
        .custom-scrollbar-horizontal::-webkit-scrollbar {
          height: 4px;
        }
        .custom-scrollbar-horizontal::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar-horizontal::-webkit-scrollbar-thumb {
          background: #1a1a1a;
          border-radius: 4px;
        }
        .custom-scrollbar-horizontal::-webkit-scrollbar-thumb:hover {
          background: #2a2a2a;
        }
      `}</style>

      {/* Categories */}
      <div className="px-4 py-6">
        <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar-horizontal">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20"
                  : "bg-zinc-900/50 text-zinc-500 hover:bg-zinc-900/70"
              }`}
            >
              <category.icon className="w-4 h-4" />
              <span className="font-medium">{category.name}</span>
              <span className="text-xs opacity-75">({category.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Files Grid */}
      <div className="px-4">
        <h3 className="text-lg font-semibold mb-4 text-zinc-300">
          {selectedCategory === "all" ? "Your Vault" : categories.find(c => c.id === selectedCategory)?.name}
        </h3>
        {loading ? (
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl bg-zinc-900/30 border border-zinc-800 animate-pulse"
              />
            ))}
          </div>
        ) : vaultItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-zinc-500 mb-4">Your vault is empty</p>
            <button
              onClick={() => setUploadModalOpen(true)}
              className="text-cyan-400 hover:text-cyan-300 font-medium"
            >
              Upload your first item
            </button>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-zinc-500 mb-4">
              No {categories.find(c => c.id === selectedCategory)?.name.toLowerCase()} found
            </p>
            <button
              onClick={() => setSelectedCategory("all")}
              className="text-cyan-400 hover:text-cyan-300 font-medium"
            >
              View all items
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative aspect-square rounded-2xl bg-zinc-900/30 border border-zinc-800 overflow-hidden hover:border-cyan-500/30 transition-all cursor-pointer"
              >
                {item.contentUrl && (item.type === "image" || item.type === "video") ? (
                  item.type === "image" ? (
                    <img
                      src={item.contentUrl}
                      alt={item.title || item.type}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={item.contentUrl}
                      className="w-full h-full object-cover"
                      muted
                    />
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    {item.type === "note" && <FileText className="w-12 h-12 text-cyan-400" />}
                    {item.type === "voice" && <Mic className="w-12 h-12 text-teal-400" />}
                    {item.type === "link" && <LinkIcon className="w-12 h-12 text-sky-400" />}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform">
                  <p className="font-semibold text-sm mb-1 truncate">
                    {item.title || item.type}
                  </p>
                  <p className="text-xs text-zinc-400">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation - Stunning Liquid Glass UI */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
          className="relative"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20 blur-xl rounded-full"></div>
          
          {/* Glassmorphic container */}
          <div className="relative flex items-center gap-4 px-8 py-2.5 rounded-full bg-zinc-900/70 backdrop-blur-2xl border border-zinc-800/80 shadow-2xl">
            {/* Add Button */}
            <motion.button
              onClick={() => setUploadModalOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-11 h-11 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 flex items-center justify-center transition-all shadow-lg shadow-cyan-500/30"
            >
              <Plus className="w-5 h-5 text-white" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
            </motion.button>

            {/* Divider */}
            <div className="w-px h-6 bg-gradient-to-b from-transparent via-zinc-700 to-transparent"></div>

            {/* AI Twin Button */}
            <Link href="/home/chat">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 flex items-center justify-center transition-all shadow-lg shadow-blue-500/30"
              >
                <Sparkles className="w-5 h-5 text-white" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Hamburger Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-zinc-950/95 backdrop-blur-xl border-l border-zinc-800 z-50 p-6"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-semibold">Menu</h3>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-10 h-10 rounded-full bg-zinc-900 hover:bg-zinc-800 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <Link href="/home/settings">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 transition-all text-left border border-zinc-800 hover:border-cyan-500/30"
                  >
                    <User className="w-5 h-5 text-cyan-400" />
                    <span className="font-medium">Profile & Settings</span>
                  </motion.button>
                </Link>

                <Link href="/home/payment">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 transition-all text-left border border-zinc-800 hover:border-blue-500/30"
                  >
                    <CreditCard className="w-5 h-5 text-blue-400" />
                    <span className="font-medium">Subscription & Billing</span>
                  </motion.button>
                </Link>

                <Link href="/home/share-twin">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 transition-all text-left border border-zinc-800 hover:border-indigo-500/30"
                  >
                    <Share2 className="w-5 h-5 text-indigo-400" />
                    <span className="font-medium">Share My Twin</span>
                  </motion.button>
                </Link>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl bg-zinc-900/50 hover:bg-red-500/10 hover:text-red-400 transition-all text-left mt-4 border border-zinc-800 hover:border-red-500/30"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Upload Modal */}
      <AnimatePresence>
        {uploadModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setUploadModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
            >
              <div className="bg-zinc-950/95 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 mx-4">
                <FileUploader
                  onUploadComplete={handleUploadComplete}
                  onClose={() => setUploadModalOpen(false)}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
