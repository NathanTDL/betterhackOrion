import { uploadFile, FileType } from "@/lib/upload-file-local";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { vaultItems } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { nanoid } from "nanoid";

export const config = {
  api: { bodyParser: false },
};

// MIME type validation
const ALLOWED_MIME_TYPES: Record<FileType, string[]> = {
  image: [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
  ],
  video: [
    "video/mp4",
    "video/webm",
    "video/quicktime",
    "video/x-msvideo",
    "video/mpeg",
  ],
  voice: [
    "audio/mpeg",
    "audio/wav",
    "audio/ogg",
    "audio/mp4",
    "audio/webm",
    "audio/x-m4a",
  ],
  note: [], // Notes are text-based, no file upload
  link: [], // Links are text-based, no file upload
};

// File size limits (in bytes)
const MAX_FILE_SIZES: Record<FileType, number> = {
  image: 10 * 1024 * 1024, // 10MB
  video: 100 * 1024 * 1024, // 100MB
  voice: 25 * 1024 * 1024, // 25MB
  note: 1 * 1024 * 1024, // 1MB (if uploaded as file)
  link: 0, // No file upload
};

export async function POST(req: NextRequest) {
  try {
    // Get authenticated user (optional for now)
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    // Allow uploads without authentication for demo purposes
    const userId = session?.user?.id || null;

    const formData = await req.formData();
    const type = formData.get("type") as FileType | null;
    const file = formData.get("file") as File | null;
    const text = formData.get("text") as string | null;
    const title = formData.get("title") as string | null;

    if (!type) {
      return NextResponse.json(
        { error: "Type is required" },
        { status: 400 }
      );
    }

    // Validate type
    if (!["image", "video", "voice", "note", "link"].includes(type)) {
      return NextResponse.json(
        { error: "Invalid type. Must be: image, video, voice, note, or link" },
        { status: 400 }
      );
    }

    let contentUrl: string | null = null;
    let contentText: string | null = text;
    let itemTitle: string | null = title;

    // Handle file uploads (image, video, voice)
    if (["image", "video", "voice"].includes(type)) {
      if (!file) {
        return NextResponse.json(
          { error: `File is required for ${type} type` },
          { status: 400 }
        );
      }

      // Validate MIME type
      const allowedMimeTypes = ALLOWED_MIME_TYPES[type];
      if (!allowedMimeTypes.includes(file.type)) {
        return NextResponse.json(
          {
            error: `Invalid file type. Allowed types for ${type}: ${allowedMimeTypes.join(", ")}`,
          },
          { status: 400 }
        );
      }

      // Validate file size
      const maxSize = MAX_FILE_SIZES[type];
      if (file.size > maxSize) {
        return NextResponse.json(
          {
            error: `File too large. Maximum size for ${type}: ${maxSize / (1024 * 1024)}MB`,
          },
          { status: 400 }
        );
      }

      // Convert file to buffer
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Generate unique filename
      const fileExt = file.name.split(".").pop() || "";
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(7);
      const filename = `${type}-${timestamp}-${randomStr}.${fileExt}`;

      // Upload the file
      contentUrl = await uploadFile(buffer, filename, type);
      
      // Use original filename as title if not provided
      if (!itemTitle) {
        itemTitle = file.name;
      }
    }

    // Handle text-based content (note, link)
    if (type === "note" || type === "link") {
      if (!text) {
        return NextResponse.json(
          { error: `Text content is required for ${type} type` },
          { status: 400 }
        );
      }
      
      // For links, validate URL format
      if (type === "link") {
        try {
          new URL(text);
        } catch {
          return NextResponse.json(
            { error: "Invalid URL format" },
            { status: 400 }
          );
        }
      }
    }

    // Determine category based on type
    const categoryMap: Record<FileType, string> = {
      image: "Media",
      video: "Media",
      voice: "Media",
      note: "Notes",
      link: "Links",
    };

    // Create vault item in database
    const [vaultItem] = await db
      .insert(vaultItems)
      .values({
        id: nanoid(),
        userId: userId,
        type,
        contentUrl,
        text: contentText,
        title: itemTitle,
        category: categoryMap[type],
        tags: null,
        summary: null,
      })
      .returning();

    return NextResponse.json({
      success: true,
      item: vaultItem,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to process upload" },
      { status: 500 }
    );
  }
}
