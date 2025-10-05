
# Ark

Purpose:
A compact, developer-ready specification for the 24–72 hour MVP/PWA of the Life Vault + AI Twin project (hackathon-ready). This doc defines requirements, architecture, data handling, and testing so developers can implement immediately.

---

## 1. High-level Overview

A Progressive Web App (PWA) that lets users dump all kinds of content — notes, screenshots, images, short videos, and links — into a smart vault.
The app uses AI to automatically classify and organize that content (like Notes / Media / Tasks).
Each user can also chat with their AI Twin — an assistant contextualized with their vault data.
A shareable twin link lets others interact with that AI twin for demos or social use.

### Primary goals (MVP):

* Upload arbitrary content to Neon DB storage layer (via Drizzle ORM + Next.js API routes).
* Auto-classify (Notes / Media / Tasks) using Vercel AI SDK.
* Provide a chat UI for the AI Twin with RAG (Retrieval-Augmented Generation) using stored embeddings.
* Generate shareable twin link https://app/ark/:id with limited demo access.
* Auth via BetterAuth, deployed on Vercel using Next.js + next-pwa.

### Non-goals (MVP):

* Full-scale privacy/compliance (HIPAA/GDPR), enterprise SSO, detailed analytics dashboards.

---

## 2. Tech Stack (MVP)

| Layer                  | Technology                                                       |
| ---------------------- | ---------------------------------------------------------------- |
| Frontend           | Next.js (TypeScript) + Tailwind + next-pwa for PWA support       |
| Backend            | Vercel Serverless Functions + Drizzle ORM for Neon               |
| Database / Storage | Neon (PostgreSQL) with Drizzle ORM                               |
| Auth               | BetterAuth (custom integration with Drizzle models)              |
| AI                 | Vercel AI SDK for chat, classification, and embedding generation |
| Deployment         | Vercel (CI/CD auto-deploy)                                       |
| CI/CD              | GitHub Actions (optional) + Vercel auto builds                   |

---

## 3. Minimal Feature Set & User Flows

### 3.1 User Flows (MVP)

#### 1. Sign up / Sign in

* Auth handled by BetterAuth.
* On first sign-in, user is automatically provisioned with an empty vault in Neon (via Drizzle ORM).

#### 2. Upload Content

* User clicks “Add” → selects text, image, or video.
* File is uploaded to a file storage service (e.g. Vercel Blob / Supabase Storage).
* A vault_items record is created in Neon:

TypeScript


{
  id: string,
  userId: string,
  type: 'note' | 'image' | 'video' | 'link',
  contentUrl?: string,
  text?: string,
  createdAt: Date,
  tags?: string[],
  summary?: string
}

#### 3. Auto-classify

* After upload, a serverless function calls Vercel AI SDK for classification.
* The function updates the vault_items entry with:

  * category (Notes, Media, Tasks, Links)
  * summary
  * tags[]

#### 4. Index / Embed

* For text content, store embeddings directly in the embeddings table.
* For media, use OCR or transcription (if time allows) before embedding.

TypeScript


{
  id: string,
  itemId: string,
  userId: string,
  embedding: number[],
  text: string
}

#### 5. Chat with Twin

* User opens chat page.
* Chat API route calls Drizzle query to:

  * Fetch top-K embeddings for query.
  * Build context prompt.
  * Call Vercel AI SDK chat model.
* Messages are logged to chats table for continuity.

#### 6. Share Link

* User clicks “Share My Twin” → generates a temporary token stored in share_tokens.
* Public route /twin/:id allows limited chat access using that token.
* Token expires after 24h or X messages.

---

### 3.2 Admin / Demo Flows

* Demo mode: single “demo” user preloaded with fake content.
* Share links expire automatically after 24h or N messages.
* Optional rate limiting via API route middleware.

---

## 4. Data Model (Neon + Drizzle ORM)
| Table            | Purpose                   | Key Fields                                                                                 |
| ---------------- | ------------------------- | ------------------------------------------------------------------------------------------ |
| users        | User profiles             | id, email, name, authProvider                                                      |
| vault_items  | All user content          | id, userId, type, contentUrl, text, category, tags[], summary, createdAt |
| embeddings   | Vector data for retrieval | id, itemId, userId, embedding, text                                              |
| chats        | Chat logs                 | id, userId, messages[], createdAt                                                  |
| share_tokens | Temporary demo links      | id, userId, token, expiresAt, limit                                              |

---

Would you like me to add a Drizzle schema example (TypeScript code) for these tables so your team can copy-paste it into 