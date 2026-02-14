"use client";

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

export function SongQueue({
  streams,
  currentUserId,
  onVote,
  onPlayNext,
}: {
  streams: StreamItem[];
  currentUserId: string;
  onVote: () => void;
  onPlayNext: (stream: StreamItem) => void;
}) {
  const sorted = [...streams].sort(
    (a, b) => b._count.upvotes - a._count.upvotes
  );

  async function handleUpvote(streamId: string) {
    try {
      await fetch("/api/streams/upvote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ streamId }),
      });
      onVote();
    } catch {}
  }

  async function handleDownvote(streamId: string) {
    try {
      await fetch("/api/streams/downvote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ streamId }),
      });
      onVote();
    } catch {}
  }

  if (sorted.length === 0) {
    return (
      <div
        style={{
          background: "rgba(22, 22, 31, 0.7)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(139, 92, 246, 0.15)",
          borderRadius: 20,
          padding: 40,
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "2rem", marginBottom: 12 }}>🎶</p>
        <p style={{ color: "#9a9ab0", fontSize: "0.95rem" }}>
          No songs in the queue yet. Add one above!
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "rgba(22, 22, 31, 0.7)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(139, 92, 246, 0.15)",
        borderRadius: 20,
        padding: 28,
      }}
    >
      <h3
        style={{
          fontSize: "1.1rem",
          fontWeight: 700,
          marginBottom: 20,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ fontSize: "1.3rem" }}>📋</span> Up Next
        <span
          style={{
            marginLeft: "auto",
            fontSize: "0.8rem",
            fontWeight: 500,
            color: "#9a9ab0",
          }}
        >
          {sorted.length} song{sorted.length !== 1 ? "s" : ""}
        </span>
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {sorted.map((stream, i) => {
          const hasVoted = stream.upvotes.some(
            (u) => u.userId === currentUserId
          );

          return (
            <div
              key={stream.id}
              className="song-row"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "10px 14px",
                borderRadius: 14,
                background: "rgba(255,255,255,0.03)",
                cursor: "pointer",
              }}
              onClick={() => onPlayNext(stream)}
            >
              {/* Rank */}
              <span
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: i === 0 ? "#a78bfa" : "#5a5a72",
                  minWidth: 20,
                  textAlign: "center",
                }}
              >
                {i + 1}
              </span>

              {/* Thumbnail */}
              <div
                style={{
                  width: 56,
                  height: 42,
                  borderRadius: 8,
                  overflow: "hidden",
                  flexShrink: 0,
                  background: "rgba(0,0,0,0.4)",
                }}
              >
                <img
                  src={stream.smallImg || `https://img.youtube.com/vi/${stream.extractedId}/mqdefault.jpg`}
                  alt={stream.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>

              {/* Title */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {stream.title}
                </p>
              </div>

              {/* Vote Controls */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  flexShrink: 0,
                }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (hasVoted) {
                      handleDownvote(stream.id);
                    } else {
                      handleUpvote(stream.id);
                    }
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "6px 12px",
                    borderRadius: 10,
                    border: hasVoted
                      ? "1px solid rgba(139, 92, 246, 0.5)"
                      : "1px solid rgba(255,255,255,0.1)",
                    background: hasVoted
                      ? "rgba(139, 92, 246, 0.15)"
                      : "rgba(255,255,255,0.05)",
                    color: hasVoted ? "#a78bfa" : "#9a9ab0",
                    cursor: "pointer",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    transition: "all 0.2s",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill={hasVoted ? "#a78bfa" : "none"}
                    stroke={hasVoted ? "#a78bfa" : "currentColor"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
                    <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                  </svg>
                  {stream._count.upvotes}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
