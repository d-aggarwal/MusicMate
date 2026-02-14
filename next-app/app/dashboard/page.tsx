"use client";

import { Suspense, useEffect, useState, useCallback, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Appbar } from "../components/Appbar";
import { AddSong } from "../components/AddSong";
import { SongQueue } from "../components/SongQueue";
import { NowPlaying } from "../components/NowPlaying";
import { ShareButton } from "../components/ShareButton";

interface StreamItem {
  id: string;
  title: string;
  smallImg: string;
  bigImg: string;
  extractedId: string;
  url: string;
  _count: { upvotes: number };
  upvotes: { userId: string }[];
}

function DashboardContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlCreatorId = searchParams.get("creatorId");

  const [userId, setUserId] = useState<string | null>(null);
  const [streams, setStreams] = useState<StreamItem[]>([]);
  const [nowPlaying, setNowPlaying] = useState<StreamItem | null>(null);
  const [userLoading, setUserLoading] = useState(true);

  const creatorId = urlCreatorId || userId;
  const isOwner = !urlCreatorId || urlCreatorId === userId;

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  // Fetch logged-in user's own ID
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/user");
        if (res.ok) {
          const data = await res.json();
          setUserId(data.id);
        } else {
          console.error("Failed to fetch user:", res.status);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setUserLoading(false);
      }
    }
    if (status === "authenticated") {
      fetchUser();
    }
  }, [status]);

  // Fetch streams + active stream
  const nowPlayingRef = useRef(nowPlaying);
  nowPlayingRef.current = nowPlaying;

  const fetchData = useCallback(async () => {
    if (!creatorId) return;
    try {
      const [streamsRes, activeRes] = await Promise.all([
        fetch(`/api/streams?creatorId=${creatorId}`),
        fetch(`/api/streams/active?creatorId=${creatorId}`),
      ]);

      if (streamsRes.ok) {
        const data = await streamsRes.json();
        setStreams(data);
      }

      if (activeRes.ok) {
        const activeData = await activeRes.json();
        if (activeData.stream) {
          // Only update if the active stream changed
          if (!nowPlayingRef.current || nowPlayingRef.current.id !== activeData.stream.id) {
            setNowPlaying(activeData.stream);
          }
        }
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }, [creatorId]);

  useEffect(() => {
    if (creatorId) {
      fetchData();
      const interval = setInterval(fetchData, 2000);
      return () => clearInterval(interval);
    }
  }, [creatorId, fetchData]);

  // When creator plays next, update DB
  async function handlePlayNext(nextStream: StreamItem) {
    setNowPlaying(nextStream);

    if (isOwner) {
      try {
        await fetch("/api/streams/next", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ streamId: nextStream.id }),
        });
      } catch (e) {
        console.error("Error updating active stream", e);
      }
    }
  }

  if (status === "loading" || userLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "var(--bg-primary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>🎵</div>
          <p style={{ color: "#9a9ab0", fontSize: "1rem" }}>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const queuedStreams = streams.filter((s) => s.id !== nowPlaying?.id);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)" }}>
      <Appbar />

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "140px 32px 60px",
        }}
      >
        {/* Page Header */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            marginBottom: 40,
          }}
        >
          <div>
            <h1 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: 4 }}>
              {isOwner ? "Your Stream " : ""}
              <span className="gradient-text">Dashboard</span>
            </h1>
            <p style={{ color: "#9a9ab0", fontSize: "0.9rem" }}>
              {isOwner
                ? "Manage your queue. Let fans vote. Play what they love."
                : "Vote for the songs you want to hear next!"}
            </p>
          </div>
          {isOwner && userId && (
            <div style={{ width: 220 }}>
              <ShareButton creatorId={userId} />
            </div>
          )}
        </div>

        {/* Two Column Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 420px",
            gap: 28,
            alignItems: "start",
          }}
        >
          {/* Left Column — Now Playing */}
          <div style={{ position: "sticky", top: 100 }}>
            <NowPlaying
              videoId={nowPlaying?.extractedId || null}
              title={nowPlaying?.title || ""}
              onPlayNext={() => {
                if (queuedStreams.length > 0) {
                  const sorted = [...queuedStreams].sort(
                    (a, b) => b._count.upvotes - a._count.upvotes
                  );
                  handlePlayNext(sorted[0]);
                }
              }}
            />
          </div>

          {/* Right Column — Add Song + Queue */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {creatorId && (
              <AddSong creatorId={creatorId} onSongAdded={fetchData} />
            )}
            <SongQueue
              streams={queuedStreams}
              currentUserId={userId || ""}
              onVote={fetchData}
              onPlayNext={(stream) => handlePlayNext(stream)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            background: "var(--bg-primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>🎵</div>
            <p style={{ color: "#9a9ab0", fontSize: "1rem" }}>Loading your dashboard...</p>
          </div>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}