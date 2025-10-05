# Uploads Directory

This directory stores user-uploaded files locally for development/testing.

## Important Notes

- **Development Only**: This local storage solution is for development and testing purposes
- **Production**: In production, files should be stored in cloud storage (Cloudflare R2, AWS S3, etc.)
- **Git Ignored**: All files in this directory (except this README) are ignored by git
- **Public Access**: Files in this directory are publicly accessible via `/uploads/filename`

## Switching to Cloud Storage

When ready to use Cloudflare R2 or another cloud storage provider:

1. Set up your cloud storage account
2. Add the required environment variables to `.env`
3. Change imports in API routes from `@/lib/upload-file-local` to `@/lib/upload-file`
4. Restart your development server

### Required Environment Variables for Cloudflare R2:
```env
CLOUDFLARE_ACCOUNT_ID=your_account_id
R2_UPLOAD_IMAGE_ACCESS_KEY_ID=your_access_key
R2_UPLOAD_IMAGE_SECRET_ACCESS_KEY=your_secret_key
R2_UPLOAD_IMAGE_BUCKET_NAME=your_bucket_name
```
