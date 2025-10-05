import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export type FileType = "image" | "video" | "voice" | "note" | "link";

export interface UploadResult {
  url: string;
  type: FileType;
  size: number;
  filename: string;
}

// Get content type based on file extension and type
function getContentType(filename: string, fileType: FileType): string {
  const ext = filename.split(".").pop()?.toLowerCase();
  
  if (fileType === "image") {
    const imageTypes: Record<string, string> = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
      webp: "image/webp",
      svg: "image/svg+xml",
    };
    return imageTypes[ext || ""] || "image/*";
  }
  
  if (fileType === "video") {
    const videoTypes: Record<string, string> = {
      mp4: "video/mp4",
      webm: "video/webm",
      mov: "video/quicktime",
      avi: "video/x-msvideo",
    };
    return videoTypes[ext || ""] || "video/*";
  }
  
  if (fileType === "voice") {
    const audioTypes: Record<string, string> = {
      mp3: "audio/mpeg",
      wav: "audio/wav",
      ogg: "audio/ogg",
      m4a: "audio/mp4",
      webm: "audio/webm",
    };
    return audioTypes[ext || ""] || "audio/*";
  }
  
  return "application/octet-stream";
}

/**
 * Upload file to local public directory (for development/testing)
 * In production, this should be replaced with actual cloud storage
 */
export const uploadFile = async (
  buffer: Buffer,
  filename: string,
  fileType: FileType
): Promise<string> => {
  try {
    // Create uploads directory in public folder if it doesn't exist
    const uploadsDir = join(process.cwd(), "public", "uploads");
    
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Write file to public/uploads directory
    const filePath = join(uploadsDir, filename);
    await writeFile(filePath, buffer);

    // Return public URL (accessible via Next.js static file serving)
    const publicUrl = `/uploads/${filename}`;
    return publicUrl;
  } catch (error) {
    console.error("Error uploading file locally:", error);
    throw new Error("Failed to upload file");
  }
};

// Keep the old function for backward compatibility
export const uploadImageAssets = async (buffer: Buffer, key: string) => {
  return uploadFile(buffer, key, "image");
};
