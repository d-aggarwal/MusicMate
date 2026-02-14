"use client";

import { useState } from "react";

const YT_URL_REGEX = /^(https?:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;

function extractVideoId(url: string): string | null {
  // Handle youtube.com/watch?v=ID
  const match1 = url.match(/[?&]v=([^&]+)/);
  if (match1) return match1[1];
  // Handle youtu.be/ID
  const match2 = url.match(/youtu\.be\/([^?&]+)/);
  if (match2) return match2[1];
  return null;
}

export function AddSong({
  creatorId,
  onSongAdded,
}: {
  creatorId: string;
  onSongAdded: () => void;
}) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const videoId = extractVideoId(url);
  const isValid = YT_URL_REGEX.test(url);

  async function handleSubmit() {
    if (!isValid || !videoId) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/streams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ creatorId, url }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Failed to add song");
      } else {
        setUrl("");
        onSongAdded();
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        background: "rgba(22, 22, 31, 0.7)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(139, 92, 246, 0.15)",
        borderRadius: 20,
        padding: 24,
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <h3
        style={{
          fontSize: "1.1rem",
          fontWeight: 700,
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ fontSize: "1.3rem" }}>🎵</span> Add a Song
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input
          type="text"
          placeholder="Paste a YouTube link..."
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: 12,
            border: "1px solid rgba(139, 92, 246, 0.2)",
            background: "rgba(255, 255, 255, 0.05)",
            color: "#f0f0f5",
            fontSize: "0.9rem",
            outline: "none",
            transition: "border-color 0.3s",
            boxSizing: "border-box",
          }}
        />
        <button
          onClick={handleSubmit}
          disabled={!isValid || loading}
          style={{
            width: "100%",
            padding: "12px 24px",
            borderRadius: 12,
            border: "none",
            background:
              isValid && !loading
                ? "linear-gradient(135deg, #8b5cf6, #d946ef)"
                : "rgba(255, 255, 255, 0.1)",
            color: isValid && !loading ? "white" : "rgba(255,255,255,0.3)",
            fontWeight: 600,
            fontSize: "0.9rem",
            cursor: isValid && !loading ? "pointer" : "not-allowed",
            transition: "all 0.3s",
          }}
        >
          {loading ? "Adding..." : "Add to Queue"}
        </button>
      </div>

      {error && (
        <p style={{ color: "#f87171", fontSize: "0.8rem", marginTop: 10 }}>
          {error}
        </p>
      )}

      {/* Video Preview */}
      {url && isValid && videoId && (
        <div
          style={{
            marginTop: 16,
            borderRadius: 14,
            overflow: "hidden",
            border: "1px solid rgba(139, 92, 246, 0.15)",
            background: "rgba(0,0,0,0.3)",
          }}
        >
          <img
            src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
            alt="Video preview"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
          />
        </div>
      )}
    </div>
  );
}
