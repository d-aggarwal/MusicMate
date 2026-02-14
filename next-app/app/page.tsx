import { Appbar } from "./components/Appbar";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)" }}>
      <Appbar />

      {/* ===== HERO SECTION ===== */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          paddingTop: "80px",
        }}
      >
        {/* Background Effects */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div
            className="animate-pulse-glow"
            style={{
              position: "absolute",
              top: "20%",
              left: "20%",
              width: 500,
              height: 500,
              borderRadius: "50%",
              background: "rgba(139, 92, 246, 0.12)",
              filter: "blur(120px)",
            }}
          />
          <div
            className="animate-pulse-glow"
            style={{
              position: "absolute",
              bottom: "20%",
              right: "20%",
              width: 400,
              height: 400,
              borderRadius: "50%",
              background: "rgba(217, 70, 239, 0.1)",
              filter: "blur(100px)",
              animationDelay: "1.5s",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600,
              height: 600,
              borderRadius: "50%",
              background: "rgba(34, 211, 238, 0.05)",
              filter: "blur(140px)",
            }}
          />
        </div>

        {/* Floating Music Notes */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          <span
            className="animate-float"
            style={{
              position: "absolute",
              top: "15%",
              left: "10%",
              fontSize: "2.5rem",
              opacity: 0.15,
            }}
          >
            ♪
          </span>
          <span
            className="animate-float-delayed"
            style={{
              position: "absolute",
              top: "25%",
              right: "15%",
              fontSize: "3rem",
              opacity: 0.12,
            }}
          >
            ♫
          </span>
          <span
            className="animate-float-delayed"
            style={{
              position: "absolute",
              bottom: "30%",
              left: "20%",
              fontSize: "2rem",
              opacity: 0.15,
            }}
          >
            ♬
          </span>
          <span
            className="animate-float"
            style={{
              position: "absolute",
              top: "60%",
              right: "10%",
              fontSize: "2.5rem",
              opacity: 0.12,
            }}
          >
            ♩
          </span>
        </div>

        {/* Grid Pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: 0.03,
            backgroundImage:
              "linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Hero Content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            maxWidth: 900,
            margin: "0 auto",
            padding: "0 24px",
            textAlign: "center",
          }}
        >
          {/* Badge */}
          <div
            className="glass animate-slide-up"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 20px",
              borderRadius: 100,
              marginBottom: 32,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#4ade80",
                display: "inline-block",
                animation: "pulse-glow 2s ease-in-out infinite",
              }}
            />
            <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
              Fan-powered music streaming is here
            </span>
          </div>

          {/* Headline */}
          <h1
            className="animate-slide-up"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: 24,
              animationDelay: "0.1s",
            }}
          >
            Let Your Fans{" "}
            <span className="gradient-text">Choose the Music</span>
          </h1>

          {/* Subtitle */}
          <p
            className="animate-slide-up"
            style={{
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              color: "var(--text-secondary)",
              maxWidth: 620,
              margin: "0 auto 48px",
              lineHeight: 1.7,
              animationDelay: "0.2s",
            }}
          >
            The ultimate platform where creators and fans connect through music.
            Share your stream, let your audience vote, and play what they love
            —{" "}
            <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>
              in real time
            </span>
            .
          </p>

          {/* CTA Buttons */}
          <div
            className="animate-slide-up"
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              marginBottom: 72,
              animationDelay: "0.3s",
            }}
          >
            <button className="btn-primary" style={{ fontSize: "1.1rem", padding: "16px 36px" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Start Streaming
            </button>
            <button className="btn-secondary" style={{ fontSize: "1.1rem", padding: "16px 36px" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" />
              </svg>
              Watch Demo
            </button>
          </div>

          {/* Hero Visual — Player Preview */}
          <div
            className="animate-slide-up"
            style={{ position: "relative", maxWidth: 720, margin: "0 auto", animationDelay: "0.4s" }}
          >
            <div
              className="glass"
              style={{
                borderRadius: 20,
                padding: "28px 32px",
                boxShadow: "0 25px 80px rgba(139, 92, 246, 0.15)",
              }}
            >
              {/* Player Top Bar */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontSize: "0.9rem", fontWeight: 600 }}>Now Playing</p>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      Voted by 2.3k fans
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: 3,
                        background: "linear-gradient(to top, #8b5cf6, #22d3ee)",
                        borderRadius: 4,
                        height: `${12 + i * 4}px`,
                        animation: `equalizer ${0.6 + i * 0.12}s ease-in-out infinite alternate`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Song Queue */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { title: "Blinding Lights", artist: "The Weeknd", votes: 847, c1: "#f97316", c2: "#ef4444" },
                  { title: "Bohemian Rhapsody", artist: "Queen", votes: 623, c1: "#8b5cf6", c2: "#3b82f6" },
                  { title: "Shape of You", artist: "Ed Sheeran", votes: 412, c1: "#22c55e", c2: "#14b8a6" },
                ].map((song, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 16px",
                      borderRadius: 14,
                      background: "rgba(255,255,255,0.03)",
                      transition: "background 0.3s",
                      cursor: "pointer",
                    }}
                    className="song-row"
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 10,
                          background: `linear-gradient(135deg, ${song.c1}, ${song.c2})`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontSize: "0.8rem",
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        {i + 1}
                      </div>
                      <div>
                        <p style={{ fontSize: "0.875rem", fontWeight: 500 }}>{song.title}</p>
                        <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{song.artist}</p>
                      </div>
                    </div>
                    <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--accent-purple-light)" }}>
                      ▲ {song.votes}
                    </span>
                  </div>
                ))}
              </div>

              {/* Progress Bar */}
              <div style={{ marginTop: 24 }}>
                <div style={{ height: 4, borderRadius: 4, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                  <div
                    className="animate-gradient"
                    style={{
                      height: "100%",
                      width: "65%",
                      borderRadius: 4,
                      background: "linear-gradient(90deg, #8b5cf6, #ec4899, #22d3ee)",
                    }}
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  <span>2:34</span>
                  <span>3:52</span>
                </div>
              </div>
            </div>

            {/* Glow behind player */}
            <div
              style={{
                position: "absolute",
                inset: -20,
                borderRadius: 28,
                background: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(217,70,239,0.12), rgba(34,211,238,0.1))",
                filter: "blur(60px)",
                zIndex: -1,
              }}
            />
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section
        style={{
          padding: "80px 0",
          borderTop: "1px solid var(--border-color)",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <div className="section-container">
          <div className="stats-grid">
            {[
              { value: "10K+", label: "Active Creators", icon: "👩‍🎤" },
              { value: "2M+", label: "Songs Played", icon: "🎵" },
              { value: "500K+", label: "Fan Votes Daily", icon: "🗳️" },
              { value: "99.9%", label: "Uptime", icon: "⚡" },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.8rem", marginBottom: 8 }}>{stat.icon}</div>
                <div
                  className="gradient-text"
                  style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, marginBottom: 4 }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section id="features" className="section-spacing-lg">
        <div className="section-container">
          <div className="section-header">
            <span className="section-label">Features</span>
            <h2 className="section-title">
              Everything You Need to <span className="gradient-text">Go Live</span>
            </h2>
            <p className="section-subtitle">
              Powerful tools for creators. Seamless experience for fans.
            </p>
          </div>

          <div className="features-grid">
            {[
              {
                icon: "👍",
                title: "Fan Voting",
                desc: "Fans upvote their favorite songs in real-time. The most popular track plays next — pure democracy.",
                gradient: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(217,70,239,0.08))",
                iconBg: "linear-gradient(135deg, #8b5cf6, #d946ef)",
              },
              {
                icon: "📋",
                title: "Live Queue",
                desc: "A dynamic, real-time queue that updates as fans vote. Watch the playlist evolve with your community.",
                gradient: "linear-gradient(135deg, rgba(217,70,239,0.15), rgba(236,72,153,0.08))",
                iconBg: "linear-gradient(135deg, #d946ef, #ec4899)",
              },
              {
                icon: "📊",
                title: "Analytics Dashboard",
                desc: "Deep insights into what your fans love. Track voting trends, peak engagement times, and top requests.",
                gradient: "linear-gradient(135deg, rgba(34,211,238,0.15), rgba(139,92,246,0.08))",
                iconBg: "linear-gradient(135deg, #22d3ee, #8b5cf6)",
              },
            ].map((feature, i) => (
              <div key={i} className="glow-card">
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    background: feature.gradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                    marginBottom: 24,
                  }}
                >
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: 12 }}>
                  {feature.title}
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.7 }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="section-spacing-lg">
        {/* Background accent */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            width: 800,
            height: 400,
            borderRadius: "50%",
            background: "rgba(139, 92, 246, 0.04)",
            filter: "blur(150px)",
            pointerEvents: "none",
          }}
        />

        <div className="section-container" style={{ position: "relative" }}>
          <div className="section-header">
            <span className="section-label">How It Works</span>
            <h2 className="section-title">
              Three Steps to <span className="gradient-text">Music Democracy</span>
            </h2>
            <p className="section-subtitle">
              Get started in minutes. No complicated setup required.
            </p>
          </div>

          <div className="features-grid" style={{ position: "relative" }}>
            {/* Connecting line */}
            <div
              style={{
                display: "none",
                position: "absolute",
                top: 48,
                left: "22%",
                right: "22%",
                height: 2,
                background: "linear-gradient(90deg, rgba(139,92,246,0.3), rgba(217,70,239,0.3), rgba(34,211,238,0.3))",
                borderRadius: 2,
              }}
              className="connecting-line"
            />

            {[
              {
                step: "01",
                title: "Create Your Stream",
                desc: "Sign in with Google, name your stream, and you're live. It takes less than 30 seconds.",
                c1: "#8b5cf6",
                c2: "#7c3aed",
              },
              {
                step: "02",
                title: "Share With Fans",
                desc: "Send your unique stream link to your audience via social media, Discord, or anywhere.",
                c1: "#ec4899",
                c2: "#db2777",
              },
              {
                step: "03",
                title: "Fans Vote & Enjoy",
                desc: "Your fans submit YouTube links and upvote songs. The top-voted track plays next automatically.",
                c1: "#22d3ee",
                c2: "#0891b2",
              },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                {/* Step badge */}
                <div style={{ position: "relative", display: "inline-flex", marginBottom: 28 }}>
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: 18,
                      background: `linear-gradient(135deg, ${item.c1}, ${item.c2})`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "1.3rem",
                      fontWeight: 800,
                      boxShadow: `0 12px 40px ${item.c1}40`,
                      transition: "transform 0.4s ease",
                    }}
                  >
                    {item.step}
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      inset: -8,
                      borderRadius: 22,
                      background: `linear-gradient(135deg, ${item.c1}, ${item.c2})`,
                      opacity: 0.2,
                      filter: "blur(16px)",
                    }}
                  />
                </div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: 10 }}>
                  {item.title}
                </h3>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.95rem",
                    lineHeight: 1.7,
                    maxWidth: 280,
                    margin: "0 auto",
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section
        id="testimonials"
        className="section-spacing-lg"
        style={{ borderTop: "1px solid var(--border-color)" }}
      >
        <div className="section-container">
          <div className="section-header">
            <span className="section-label">Testimonials</span>
            <h2 className="section-title">
              Loved by <span className="gradient-text">Creators</span>
            </h2>
            <p className="section-subtitle">
              See what streamers and fans are saying about MusicMate.
            </p>
          </div>

          <div className="features-grid">
            {[
              {
                name: "Alex Rivera",
                role: "Twitch Streamer • 50K Followers",
                text: "MusicMate completely changed how I run my streams. My viewers are so much more engaged now — they love picking the music!",
                avatar: "A",
                c1: "#8b5cf6",
                c2: "#ec4899",
              },
              {
                name: "Priya Sharma",
                role: "YouTube Creator • 120K Subs",
                text: "The voting system is genius. My live sessions went from 200 concurrent viewers to 800+ after I started using MusicMate.",
                avatar: "P",
                c1: "#ec4899",
                c2: "#f97316",
              },
              {
                name: "Marcus Chen",
                role: "DJ & Content Creator",
                text: "As a DJ, letting the crowd choose is everything. MusicMate brings that festival energy to my online sets. Absolutely essential.",
                avatar: "M",
                c1: "#22d3ee",
                c2: "#8b5cf6",
              },
            ].map((t, i) => (
              <div key={i} className="glow-card">
                {/* Stars */}
                <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} width="18" height="18" viewBox="0 0 24 24" fill="#FBBF24">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>

                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.95rem",
                    lineHeight: 1.8,
                    marginBottom: 28,
                    fontStyle: "italic",
                  }}
                >
                  &ldquo;{t.text}&rdquo;
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${t.c1}, ${t.c2})`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "0.9rem",
                      fontWeight: 700,
                    }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p style={{ fontSize: "0.95rem", fontWeight: 600 }}>{t.name}</p>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="section-spacing-lg" style={{ position: "relative", overflow: "hidden" }}>
        {/* Glow */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600,
              height: 600,
              borderRadius: "50%",
              background: "rgba(139, 92, 246, 0.12)",
              filter: "blur(120px)",
            }}
          />
        </div>

        <div className="section-container" style={{ position: "relative", textAlign: "center" }}>
          <div
            className="glass"
            style={{
              borderRadius: 28,
              padding: "clamp(48px, 6vw, 80px) clamp(24px, 4vw, 64px)",
              maxWidth: 760,
              margin: "0 auto",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Subtle border glow */}
            <div
              style={{
                position: "absolute",
                inset: -1,
                borderRadius: 28,
                padding: 1,
                background: "var(--gradient-primary)",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "exclude",
                WebkitMaskComposite: "xor",
                opacity: 0.4,
                pointerEvents: "none",
              }}
            />
            <div style={{ fontSize: "3rem", marginBottom: 20 }}>🎶</div>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                fontWeight: 800,
                marginBottom: 16,
                lineHeight: 1.2,
              }}
            >
              Ready to Let Your Fans{" "}
              <span className="gradient-text">Take the Stage?</span>
            </h2>
            <p
              style={{
                color: "var(--text-secondary)",
                marginBottom: 36,
                maxWidth: 500,
                margin: "0 auto 36px",
                fontSize: "1.05rem",
                lineHeight: 1.7,
              }}
            >
              Join thousands of creators who are building deeper connections
              with their audience through music. It&apos;s free to start.
            </p>
            <button className="btn-primary" style={{ fontSize: "1.1rem", padding: "18px 40px" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
              </svg>
              Get Started — It&apos;s Free
            </button>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 16 }}>
              No credit card required • Set up in 30 seconds
            </p>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer
        style={{
          borderTop: "1px solid var(--border-color)",
          background: "var(--bg-secondary)",
        }}
      >
        <div className="section-container" style={{ padding: "80px 32px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
              gap: 48,
              marginBottom: 60,
            }}
          >
            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18V5l12-2v13" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="18" cy="16" r="3" />
                  </svg>
                </div>
                <span className="gradient-text" style={{ fontSize: "1.2rem", fontWeight: 700 }}>
                  MusicMate
                </span>
              </div>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.7, maxWidth: 260 }}>
                Fan-powered music for live streams. Let your audience choose what plays next.
              </p>
            </div>

            {/* Link Columns */}
            {[
              { title: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
              { title: "Resources", links: ["Documentation", "API Docs", "Community", "Blog"] },
              { title: "Company", links: ["About", "Careers", "Privacy", "Terms"] },
            ].map((col, i) => (
              <div key={i}>
                <h4 style={{ fontSize: "0.9rem", fontWeight: 600, marginBottom: 20 }}>
                  {col.title}
                </h4>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="footer-link">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: 32,
              borderTop: "1px solid var(--border-color)",
              gap: 16,
            }}
          >
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              © 2026 MusicMate. All rights reserved.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {["Twitter", "GitHub", "YouTube"].map((label) => (
                <a key={label} href="#" aria-label={label} className="social-icon">
                  {label.charAt(0)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
