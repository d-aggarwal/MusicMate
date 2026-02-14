"use client";

import { useState } from "react";

export function ShareButton({ creatorId }: { creatorId: string }) {
  const [copied, setCopied] = useState(false);

  function handleShare() {
    const url = `${window.location.origin}/dashboard?creatorId=${creatorId}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  return (
    <button
      onClick={handleShare}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        padding: "14px 24px",
        borderRadius: 14,
        border: copied
          ? "1px solid rgba(74, 222, 128, 0.4)"
          : "1px solid rgba(139, 92, 246, 0.3)",
        background: copied
          ? "rgba(74, 222, 128, 0.1)"
          : "rgba(139, 92, 246, 0.08)",
        color: copied ? "#4ade80" : "#a78bfa",
        fontWeight: 600,
        fontSize: "0.95rem",
        cursor: "pointer",
        transition: "all 0.3s ease",
      }}
    >
      {copied ? (
        <>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Link Copied!
        </>
      ) : (
        <>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
          Share with Fans
        </>
      )}
    </button>
  );
}
