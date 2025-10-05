import {
  S3Client,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

const r2 = new S3Client({
  region: "auto", // required for R2
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_UPLOAD_IMAGE_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_UPLOAD_IMAGE_SECRET_ACCESS_KEY!,
  },
});

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

export const uploadFile = async (
  buffer: Buffer,
  filename: string,
  fileType: FileType
): Promise<string> => {
  const contentType = getContentType(filename, fileType);
  
  await r2.send(
    new PutObjectCommand({
      Bucket: process.env.R2_UPLOAD_IMAGE_BUCKET_NAME!,
      Key: filename,
      Body: buffer,
      ContentType: contentType,
      ACL: "public-read", // optional if bucket is public
    })
  );

  const publicUrl = `https://pub-6f0cf05705c7412b93a792350f3b3aa5.r2.dev/${filename}`;
  return publicUrl;
};

// Keep the old function for backward compatibility
export const uploadImageAssets = async (buffer: Buffer, key: string) => {
  return uploadFile(buffer, key, "image");
};
