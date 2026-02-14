"use client";

import { useEffect, useRef, useState, useCallback } from "react";


declare namespace YT {
  interface PlayerOptions {
    videoId?: string | null;
    playerVars?: Record<string, unknown>;
    events?: Record<string, (event: OnStateChangeEvent) => void>;
  }
  interface OnStateChangeEvent {
    data: number;
    target: Player;
  }
  class Player {
    constructor(id: string | HTMLElement, options?: PlayerOptions);
    destroy(): void;
  }
}

declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

export function NowPlaying({
  videoId,
  title,
  onPlayNext,
}: {
  videoId: string | null;
  title: string;
  onPlayNext: () => void;
}) {
  const playerRef = useRef<YT.Player | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [ended, setEnded] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Load YouTube IFrame API script once
  useEffect(() => {
    if (window.YT) return;
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  }, []);

  // Create / update the player when videoId changes
  useEffect(() => {
    if (!videoId) return;

    setEnded(false);
    setCountdown(10);
    if (countdownRef.current) clearInterval(countdownRef.current);

    function createPlayer() {
      // Destroy previous player
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }

      playerRef.current = new window.YT.Player("yt-player", {
        videoId,
        playerVars: {
          autoplay: 1,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          origin: window.location.origin,
        },
        events: {
          onStateChange: (event: YT.OnStateChangeEvent) => {
            // YT.PlayerState.ENDED === 0
            if (event.data === 0) {
              setEnded(true);
            }
          },
        },
      });
    }

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      window.onYouTubeIframeAPIReady = createPlayer;
    }

    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [videoId]);

  // Keep a stable ref to onPlayNext so the countdown effect doesn't re-trigger
  const onPlayNextRef = useRef(onPlayNext);
  onPlayNextRef.current = onPlayNext;

  // Auto-advance countdown when a song ends
  useEffect(() => {
    if (!ended) return;

    setCountdown(10);
    let count = 10;
    countdownRef.current = setInterval(() => {
      count -= 1;
      setCountdown(count);
      if (count <= 0) {
        if (countdownRef.current) clearInterval(countdownRef.current);
        setEnded(false);
        // Defer to next tick so we're not updating parent during render
        setTimeout(() => onPlayNextRef.current(), 0);
      }
    }, 1000);

    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [ended]);

  const handlePlayNext = useCallback(() => {
    setEnded(false);
    setCountdown(10);
    if (countdownRef.current) clearInterval(countdownRef.current);
    onPlayNext();
  }, [onPlayNext]);

  // Empty state
  if (!videoId) {
    return (
      <div
        style={{
          position: "relative",
          borderRadius: 24,
          overflow: "hidden",
          background: "rgba(22, 22, 31, 0.7)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(139, 92, 246, 0.15)",
        }}
      >
        <div style={{ padding: "80px 40px", textAlign: "center" }}>
          <div style={{ fontSize: "3.5rem", marginBottom: 20, opacity: 0.8 }}>🎧</div>
          <p style={{ color: "#f0f0f5", fontSize: "1.2rem", fontWeight: 600, marginBottom: 8 }}>
            No song playing
          </p>
          <p style={{ color: "#5a5a72", fontSize: "0.9rem" }}>
            Add songs to the queue and upvote to play
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: "relative" }}>
      {/* Static glow */}
      <div
        style={{
          position: "absolute",
          inset: -4,
          borderRadius: 28,
          background:
            "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(217,70,239,0.15), rgba(34,211,238,0.1))",
          filter: "blur(20px)",
          opacity: 0.6,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          borderRadius: 24,
          overflow: "hidden",
          background: "#0a0a0f",
          border: "1px solid rgba(139, 92, 246, 0.25)",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 20px",
            background: "rgba(22, 22, 31, 0.9)",
            borderBottom: "1px solid rgba(139, 92, 246, 0.1)",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: ended ? "#9a9ab0" : "#ef4444",
              boxShadow: ended ? "none" : "0 0 6px rgba(239, 68, 68, 0.5)",
              transition: "all 0.3s",
            }}
          />
          <span
            style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              background: "linear-gradient(135deg, #a78bfa, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {ended ? "Song Ended" : "Now Playing"}
          </span>
          <span
            style={{
              marginLeft: "auto",
              fontSize: "0.8rem",
              color: "#9a9ab0",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "50%",
            }}
          >
            {title}
          </span>
        </div>

        {/* YouTube Player */}
        <div
          ref={containerRef}
          style={{ position: "relative", paddingBottom: "56.25%", height: 0, background: "#000" }}
        >
          <div
            id="yt-player"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          />
        </div>

        {/* Play Next Button + Countdown */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 20px",
            background: "rgba(22, 22, 31, 0.9)",
            borderTop: "1px solid rgba(139, 92, 246, 0.1)",
          }}
        >
          {ended && (
            <span style={{ fontSize: "0.8rem", color: "#9a9ab0" }}>
              Next song in <span style={{ color: "#a78bfa", fontWeight: 700 }}>{countdown}s</span>
            </span>
          )}
          {!ended && <span />}

          <button
            onClick={handlePlayNext}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 18px",
              borderRadius: 10,
              border: "1px solid rgba(139, 92, 246, 0.3)",
              background: ended
                ? "linear-gradient(135deg, #8b5cf6, #d946ef)"
                : "rgba(139, 92, 246, 0.08)",
              color: ended ? "white" : "#a78bfa",
              fontWeight: 600,
              fontSize: "0.85rem",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="5 4 15 12 5 20 5 4" />
              <line x1="19" y1="5" x2="19" y2="19" />
            </svg>
            Play Next
          </button>
        </div>
      </div>
    </div>
  );
}
