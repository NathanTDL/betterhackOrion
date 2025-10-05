"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Image as ImageIcon,
  Video,
  FileText,
  Mic,
  Link as LinkIcon,
  Upload,
  X,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export type FileType = "image" | "video" | "voice" | "note" | "link";

interface FileUploaderProps {
  onUploadComplete?: (item: any) => void;
  onClose?: () => void;
}

const FILE_TYPE_CONFIG = {
  image: {
    icon: ImageIcon,
    color: "cyan",
    accept: "image/*",
    label: "Image",
    maxSize: "10MB",
  },
  video: {
    icon: Video,
    color: "blue",
    accept: "video/*",
    label: "Video",
    maxSize: "100MB",
  },
  voice: {
    icon: Mic,
    color: "teal",
    accept: "audio/*",
    label: "Voice",
    maxSize: "25MB",
  },
  note: {
    icon: FileText,
    color: "indigo",
    accept: "",
    label: "Note",
    maxSize: "",
  },
  link: {
    icon: LinkIcon,
    color: "sky",
    accept: "",
    label: "Link",
    maxSize: "",
  },
};

export default function FileUploader({
  onUploadComplete,
  onClose,
}: FileUploaderProps) {
  const [selectedType, setSelectedType] = useState<FileType | null>(null);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTypeSelect = (type: FileType) => {
    setSelectedType(type);
    // For file-based types, trigger file input
    if (["image", "video", "voice"].includes(type)) {
      setTimeout(() => fileInputRef.current?.click(), 100);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setTitle(selectedFile.name);
    }
  };

  const handleUpload = async () => {
    if (!selectedType) {
      toast.error("Please select a type");
      return;
    }

    // Validation
    if (["image", "video", "voice"].includes(selectedType) && !file) {
      toast.error("Please select a file");
      return;
    }

    if (["note", "link"].includes(selectedType) && !text.trim()) {
      toast.error(`Please enter ${selectedType === "note" ? "note content" : "a URL"}`);
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("type", selectedType);

      if (file) {
        formData.append("file", file);
      }

      if (text.trim()) {
        formData.append("text", text.trim());
      }

      if (title.trim()) {
        formData.append("title", title.trim());
      }

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Upload failed");
      }

      const data = await response.json();
      toast.success("Upload successful!");

      if (onUploadComplete) {
        onUploadComplete(data.item);
      }

      // Reset form
      setSelectedType(null);
      setFile(null);
      setText("");
      setTitle("");

      if (onClose) {
        onClose();
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(error.message || "Failed to upload");
    } finally {
      setUploading(false);
    }
  };

  const handleBack = () => {
    setSelectedType(null);
    setFile(null);
    setText("");
    setTitle("");
  };

  return (
    <div className="space-y-6">
      {!selectedType ? (
        <>
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold">Add to Vault</h3>
            {onClose && (
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-zinc-900 hover:bg-zinc-800 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {(Object.keys(FILE_TYPE_CONFIG) as FileType[]).map((type) => {
              const config = FILE_TYPE_CONFIG[type];
              const Icon = config.icon;
              return (
                <motion.button
                  key={type}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleTypeSelect(type)}
                  className={`flex flex-col items-center gap-3 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-${config.color}-500/30 transition-all ${
                    type === "link" ? "col-span-2" : ""
                  }`}
                >
                  <Icon className={`w-8 h-8 text-${config.color}-400`} />
                  <span className="font-medium">{config.label}</span>
                </motion.button>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={handleBack}
                className="w-10 h-10 rounded-full bg-zinc-900 hover:bg-zinc-800 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-2xl font-semibold">
                Upload {FILE_TYPE_CONFIG[selectedType].label}
              </h3>
            </div>
          </div>

          <div className="space-y-4">
            {/* File input for file-based types */}
            {["image", "video", "voice"].includes(selectedType) && (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={FILE_TYPE_CONFIG[selectedType].accept}
                  onChange={handleFileChange}
                  className="hidden"
                />

                {file ? (
                  <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Upload className="w-5 h-5 text-zinc-400" />
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-zinc-500">
                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setFile(null)}
                        className="text-zinc-400 hover:text-white"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full p-8 rounded-xl border-2 border-dashed border-zinc-800 hover:border-zinc-700 transition-colors flex flex-col items-center gap-2"
                  >
                    <Upload className="w-8 h-8 text-zinc-500" />
                    <p className="text-zinc-400">Click to select file</p>
                    <p className="text-xs text-zinc-600">
                      Max size: {FILE_TYPE_CONFIG[selectedType].maxSize}
                    </p>
                  </button>
                )}

                <Input
                  placeholder="Title (optional)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-zinc-900/50 border-zinc-800"
                />
              </>
            )}

            {/* Text input for note */}
            {selectedType === "note" && (
              <>
                <Input
                  placeholder="Note title (optional)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-zinc-900/50 border-zinc-800"
                />
                <Textarea
                  placeholder="Write your note here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="bg-zinc-900/50 border-zinc-800 min-h-[200px]"
                />
              </>
            )}

            {/* URL input for link */}
            {selectedType === "link" && (
              <>
                <Input
                  placeholder="Link title (optional)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-zinc-900/50 border-zinc-800"
                />
                <Input
                  placeholder="https://example.com"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="bg-zinc-900/50 border-zinc-800"
                  type="url"
                />
              </>
            )}

            <Button
              onClick={handleUpload}
              disabled={uploading}
              className="w-full bg-white hover:bg-gray-100 text-black font-medium py-6 rounded-xl"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5 mr-2" />
                  Upload {FILE_TYPE_CONFIG[selectedType].label}
                </>
              )}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
