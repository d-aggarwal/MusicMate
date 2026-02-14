<div align="center">

# 🎵 MusicMate

### Let Your Fans Choose the Beat

A real-time collaborative music streaming platform where creators share their queue and fans vote on what plays next.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=for-the-badge&logo=prisma)](https://prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)

---

**[Report Bug](https://github.com/d-aggarwal/MusicMate/issues) · [Request Feature](https://github.com/d-aggarwal/MusicMate/issues)**

</div>

<br/>

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎶 **YouTube Integration** | Paste any YouTube link to add songs to the queue |
| 🗳️ **Fan Voting** | Fans upvote/downvote songs — the most popular plays next |
| 🔗 **Shareable Links** | Creators share a link so fans can join and vote in real-time |
| 🔄 **Live Sync** | Now-playing state & votes sync across all viewers every 2 seconds |
| ▶️ **Auto-Advance** | When a song ends, the next highest-voted track plays automatically |
| 🔐 **Auth** | Google OAuth & email/password sign-in via NextAuth.js |

<br/>

## 🏗️ Tech Stack

```
Frontend       →  Next.js 16 (App Router) + React 19
Styling        →  CSS Variables + Inline Styles (dark theme)
Auth           →  NextAuth.js (Google + Credentials providers)
Database       →  PostgreSQL + Prisma ORM
Video Player   →  YouTube IFrame Player API
Language       →  TypeScript
```

<br/>

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **PostgreSQL** running locally or a hosted instance
- **Google OAuth credentials** from [Google Cloud Console](https://console.cloud.google.com/)

### 1. Clone the repo

```bash
git clone https://github.com/d-aggarwal/MusicMate.git
cd MusicMate/next-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the `next-app` directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/musicmate"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Initialize the database

```bash
npx prisma db push
npx prisma generate
```

### 5. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and you're live! 🎉

<br/>

## 📁 Project Structure

```
next-app/
├── app/
│   ├── api/
│   │   ├── auth/          # NextAuth endpoints
│   │   ├── streams/       # CRUD, upvote, downvote, active, next
│   │   └── user/          # Get current user
│   ├── components/
│   │   ├── AddSong.tsx    # YouTube URL input + preview
│   │   ├── Appbar.tsx     # Navigation bar
│   │   ├── NowPlaying.tsx # YouTube player + auto-advance
│   │   ├── ShareButton.tsx# Copy shareable dashboard link
│   │   └── SongQueue.tsx  # Votable song queue
│   ├── dashboard/         # Creator & viewer dashboard
│   ├── lib/               # DB client, auth config
│   └── page.tsx           # Landing page
├── prisma/
│   └── schema.prisma      # Database schema
└── package.json
```

<br/>

## 🔄 How It Works

```
┌──────────────┐     share link     ┌──────────────┐
│   Creator    │ ──────────────────► │    Viewer    │
│              │                     │              │
│  ▶ Plays     │  ◄── polls /2s ──► │  🗳️ Votes    │
│  ▶ Skips     │                     │  ➕ Adds     │
│  ➕ Adds     │                     │  👀 Watches  │
└──────┬───────┘                     └──────┬───────┘
       │                                    │
       └────────────┐    ┌──────────────────┘
                    ▼    ▼
              ┌─────────────────┐
              │   PostgreSQL    │
              │  + Prisma ORM   │
              │                 │
              │  streams, votes │
              │  activeStreamId │
              └─────────────────┘
```

<br/>

---

<div align="center">

**Built with ❤️ by [Drish Aggarwal](https://github.com/d-aggarwal)**

⭐ Star this repo if you find it useful!

</div>
