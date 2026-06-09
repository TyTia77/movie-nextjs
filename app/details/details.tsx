"use client";

import { useState } from "react";
import ImageRound from "@/app/components/image";
import { paths } from "@/app/api/fetch";

const MOCK_DATA = {
  movie: {
    type: "movie",
    title: "Dune: Part Two",
    tagline: "Long live the fighters.",
    year: 2024,
    rating: "PG-13",
    runtime: "2h 46m",
    score: 8.5,
    votes: "432K",
    genres: ["Sci-Fi", "Adventure", "Drama"],
    overview:
      "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he endeavors to prevent a terrible future only he can foresee.",
    director: "Denis Villeneuve",
    cast: [
      {
        name: "Timothée Chalamet",
        role: "Paul Atreides",
        initials: "TC",
        color: "c-teal",
      },
      { name: "Zendaya", role: "Chani", initials: "Z", color: "c-purple" },
      {
        name: "Rebecca Ferguson",
        role: "Lady Jessica",
        initials: "RF",
        color: "c-coral",
      },
      {
        name: "Josh Brolin",
        role: "Gurney Halleck",
        initials: "JB",
        color: "c-blue",
      },
      {
        name: "Austin Butler",
        role: "Feyd-Rautha",
        initials: "AB",
        color: "c-amber",
      },
    ],
    details: {
      budget: "$190M",
      boxOffice: "$714M",
      language: "English",
      country: "USA",
    },
    backdrop: "linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 40%, #0d1a2e 100%)",
    accentColor: "#d4a055",
  },
  tvshow: {
    type: "tvshow",
    title: "Severance",
    tagline: "Work and life, perfectly balanced.",
    year: 2022,
    rating: "TV-MA",
    runtime: "~55m/ep",
    score: 8.7,
    votes: "218K",
    genres: ["Thriller", "Sci-Fi", "Drama"],
    overview:
      "Mark leads a team of office workers whose memories have been surgically divided between their work and personal lives. When a mysterious colleague appears outside of work, it begins a journey to uncover the truth about their jobs.",
    creator: "Dan Erickson",
    cast: [
      {
        name: "Adam Scott",
        role: "Mark Scout",
        initials: "AS",
        color: "c-blue",
      },
      {
        name: "Britt Lower",
        role: "Helly R.",
        initials: "BL",
        color: "c-teal",
      },
      {
        name: "Zach Cherry",
        role: "Dylan George",
        initials: "ZC",
        color: "c-coral",
      },
      {
        name: "Tramell Tillman",
        role: "Seth Milchick",
        initials: "TT",
        color: "c-purple",
      },
      {
        name: "Patricia Arquette",
        role: "Harmony Cobel",
        initials: "PA",
        color: "c-amber",
      },
    ],
    details: {
      seasons: "2 Seasons",
      episodes: "19 Episodes",
      network: "Apple TV+",
      status: "Renewed",
    },
    backdrop: "linear-gradient(135deg, #f8f4f0 0%, #e8e0d8 40%, #f0e8e0 100%)",
    accentColor: "#4a6fa5",
  },
  person: {
    type: "person",
    title: "Denis Villeneuve",
    tagline: "Director · Producer · Screenwriter",
    year: "Born 1967",
    rating: null,
    runtime: null,
    score: null,
    votes: null,
    genres: ["Sci-Fi", "Thriller", "Drama"],
    overview:
      "Denis Villeneuve is a Canadian film director known for his visually stunning and intellectually rich science fiction epics. His films explore themes of identity, isolation, and the limits of human understanding through meticulous craftsmanship and immersive world-building.",
    knownFor: "Directing",
    cast: [
      {
        name: "Blade Runner 2049",
        role: "Director, 2017",
        initials: "BR",
        color: "c-blue",
      },
      {
        name: "Arrival",
        role: "Director, 2016",
        initials: "AR",
        color: "c-teal",
      },
      {
        name: "Dune: Part Two",
        role: "Director, 2024",
        initials: "D2",
        color: "c-amber",
      },
      {
        name: "Sicario",
        role: "Director, 2015",
        initials: "SC",
        color: "c-coral",
      },
      {
        name: "Prisoners",
        role: "Director, 2013",
        initials: "PR",
        color: "c-purple",
      },
    ],
    details: {
      birthplace: "Québec, Canada",
      nationality: "Canadian",
      awards: "Oscar Nominated",
      active: "1991 – Present",
    },
    backdrop: "linear-gradient(135deg, #0f1c0f 0%, #1a2a1a 40%, #0f1f1f 100%)",
    accentColor: "#7db87d",
  },
};

const colorMap = {
  "c-teal": { bg: "#5DCAA5", text: "#04342C" },
  "c-purple": { bg: "#AFA9EC", text: "#26215C" },
  "c-coral": { bg: "#F0997B", text: "#4A1B0C" },
  "c-blue": { bg: "#85B7EB", text: "#042C53" },
  "c-amber": { bg: "#FAC775", text: "#412402" },
};

function StarRating({ score }) {
  const filled = Math.round(score / 2);
  return (
    <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i <= filled ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          style={{ opacity: i <= filled ? 1 : 0.35 }}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

function Badge({ label, accent }) {
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        padding: "4px 10px",
        borderRadius: 99,
        border: `1px solid ${accent}44`,
        color: accent,
        background: `${accent}18`,
      }}
    >
      {label}
    </span>
  );
}

export default function DetailsPage() {
  const [activeType, setActiveType] = useState("tvshow");
  const data = MOCK_DATA[activeType];

  const isDark = activeType !== "tvshow";

  const textPrimary = isDark ? "#f0ece8" : "#1a1410";
  const textSecondary = isDark
    ? "rgba(240,236,232,0.55)"
    : "rgba(26,20,16,0.55)";
  const cardBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";
  const cardBorder = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)";
  const divider = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";

  return (
    <div
      style={{
        fontFamily: "'Georgia', 'Times New Roman', serif",
        minHeight: "100vh",
        background: "#0a0a0a",
        color: textPrimary,
      }}
    >
      {/* Type switcher */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          justifyContent: "center",
          padding: "1.5rem 2rem 0",
          gap: 8,
        }}
      >
        {["movie", "tvshow", "person"].map((t) => (
          <button
            key={t}
            onClick={() => setActiveType(t)}
            style={{
              padding: "7px 18px",
              borderRadius: 99,
              border: `1px solid ${activeType === t ? data.accentColor : "rgba(255,255,255,0.18)"}`,
              background:
                activeType === t ? `${data.accentColor}22` : "transparent",
              color:
                activeType === t ? data.accentColor : "rgba(255,255,255,0.5)",
              fontSize: 12,
              fontFamily: "'Georgia', serif",
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.25s ease",
            }}
          >
            {t === "tvshow"
              ? "TV Show"
              : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Hero */}
      <div
        style={{
          position: "relative",
          padding: "3.5rem 2rem 2.5rem",
          background: data.backdrop,
          overflow: "hidden",
          transition: "background 0.5s ease",
        }}
      >
        {/* Decorative grain overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
            opacity: 0.6,
            pointerEvents: "none",
          }}
        />

        {/* Content */}
        <div style={{ position: "relative", maxWidth: 680, margin: "0 auto" }}>
          {/* Type label */}
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: data.accentColor,
              margin: "0 0 12px",
              fontFamily: "'Georgia', serif",
            }}
          >
            {data.type === "tvshow"
              ? "Television Series"
              : data.type === "person"
                ? "Public Figure"
                : "Feature Film"}
          </p>

          {/* Title */}
          <h1
            style={{
              fontSize: "clamp(2rem, 6vw, 3.2rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              margin: "0 0 10px",
              letterSpacing: "-0.02em",
              color: textPrimary,
              fontFamily: "'Georgia', serif",
            }}
          >
            {data.name}
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontSize: 15,
              fontStyle: "italic",
              color: textSecondary,
              margin: "0 0 20px",
              fontFamily: "'Georgia', serif",
            }}
          >
            {data.tagline}
          </p>

          {/* Meta row */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <span style={{ fontSize: 13, color: textSecondary }}>
              {data.year}
            </span>
            {data.rating && (
              <>
                <span style={{ color: divider }}>·</span>
                <span
                  style={{
                    fontSize: 12,
                    border: `1px solid ${cardBorder}`,
                    padding: "2px 7px",
                    borderRadius: 4,
                    color: textSecondary,
                    letterSpacing: "0.05em",
                  }}
                >
                  {data.rating}
                </span>
              </>
            )}
            {data.runtime && (
              <>
                <span style={{ color: divider }}>·</span>
                <span style={{ fontSize: 13, color: textSecondary }}>
                  {data.runtime}
                </span>
              </>
            )}
            {props.response.genres.map((g) => (
              <Badge key={g.id} label={g.name} accent={data.accentColor} />
            ))}
          </div>

          {/* Score */}
          {data.score && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 24,
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: 36,
                    fontWeight: 700,
                    color: data.accentColor,
                    lineHeight: 1,
                  }}
                >
                  {data.score}
                </span>
                <span style={{ fontSize: 14, color: textSecondary }}>/10</span>
              </div>
              <div>
                <StarRating score={data.score} />
                <p
                  style={{
                    fontSize: 12,
                    color: textSecondary,
                    margin: "3px 0 0",
                    fontFamily: "'Georgia', serif",
                  }}
                >
                  {data.votes} ratings
                </p>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              style={{
                padding: "10px 22px",
                borderRadius: 6,
                border: "none",
                background: data.accentColor,
                color: isDark ? "#0a0a0a" : "#fff",
                fontSize: 13,
                fontWeight: 600,
                fontFamily: "'Georgia', serif",
                cursor: "pointer",
                letterSpacing: "0.04em",
              }}
            >
              ▶ Watch Trailer
            </button>
            <button
              style={{
                padding: "10px 22px",
                borderRadius: 6,
                border: `1px solid ${cardBorder}`,
                background: cardBg,
                color: textPrimary,
                fontSize: 13,
                fontFamily: "'Georgia', serif",
                cursor: "pointer",
              }}
            >
              + Watchlist
            </button>
            <button
              style={{
                padding: "10px 18px",
                borderRadius: 6,
                border: `1px solid ${cardBorder}`,
                background: cardBg,
                color: textPrimary,
                fontSize: 13,
                fontFamily: "'Georgia', serif",
                cursor: "pointer",
              }}
            >
              ↗ Share
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "2.5rem 2rem" }}>
        {/* Overview */}
        <section style={{ marginBottom: "2.5rem" }}>
          <h2
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: data.accentColor,
              margin: "0 0 14px",
              fontFamily: "'Georgia', serif",
            }}
          >
            Overview
          </h2>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.8,
              color: "#c8c4c0",
              fontFamily: "'Georgia', serif",
              margin: 0,
            }}
          >
            {props.response.overview}
          </p>
        </section>

        {/* Details grid */}
        <section style={{ marginBottom: "2.5rem" }}>
          <h2
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: data.accentColor,
              margin: "0 0 14px",
              fontFamily: "'Georgia', serif",
            }}
          >
            Details
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: 12,
            }}
          >
            {Object.entries(data.details).map(([key, val]) => (
              <div
                key={key}
                style={{
                  background: cardBg,
                  border: `0.5px solid ${cardBorder}`,
                  borderRadius: 8,
                  padding: "14px 16px",
                }}
              >
                <p
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: data.accentColor,
                    margin: "0 0 6px",
                    opacity: 0.8,
                  }}
                >
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </p>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#f0ece8",
                    margin: 0,
                    fontFamily: "'Georgia', serif",
                  }}
                >
                  {val}
                </p>
              </div>
            ))}
            {(data.director || data.creator || data.knownFor) && (
              <div
                style={{
                  background: cardBg,
                  border: `0.5px solid ${cardBorder}`,
                  borderRadius: 8,
                  padding: "14px 16px",
                }}
              >
                <p
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: data.accentColor,
                    margin: "0 0 6px",
                    opacity: 0.8,
                  }}
                >
                  {data.director
                    ? "Director"
                    : data.creator
                      ? "Creator"
                      : "Known For"}
                </p>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#f0ece8",
                    margin: 0,
                    fontFamily: "'Georgia', serif",
                  }}
                >
                  {data.director || data.creator || data.knownFor}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Cast / Credits */}
        <section style={{ marginBottom: "2.5rem" }}>
          <h2
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: data.accentColor,
              margin: "0 0 16px",
              fontFamily: "'Georgia', serif",
            }}
          >
            {data.type === "person" ? "Known Works" : "Cast"}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {data.cast.map((person, i) => {
              const c = colorMap[person.color] || { bg: "#888", text: "#fff" };
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "12px 14px",
                    background: cardBg,
                    border: `0.5px solid ${cardBorder}`,
                    borderRadius: 10,
                    cursor: "pointer",
                    transition: "border-color 0.2s",
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: c.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      fontWeight: 700,
                      color: c.text,
                      flexShrink: 0,
                      fontFamily: "'Georgia', serif",
                    }}
                  >
                    {person.initials}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        margin: 0,
                        color: "#f0ece8",
                        fontFamily: "'Georgia', serif",
                      }}
                    >
                      {person.name}
                    </p>
                    <p
                      style={{
                        fontSize: 12,
                        color: "rgba(240,236,232,0.45)",
                        margin: "2px 0 0",
                        fontStyle: "italic",
                        fontFamily: "'Georgia', serif",
                      }}
                    >
                      {person.role}
                    </p>
                  </div>
                  <span
                    style={{ fontSize: 16, color: "rgba(240,236,232,0.25)" }}
                  >
                    ›
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Divider */}
        <div style={{ height: 1, background: divider, margin: "0 0 2rem" }} />

        {/* Footer meta */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <p
            style={{
              fontSize: 12,
              color: "rgba(240,236,232,0.25)",
              margin: 0,
              fontFamily: "'Georgia', serif",
              fontStyle: "italic",
            }}
          >
            Data sourced for demonstration purposes only
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            {["IMDb", "Letterboxd", "Wikipedia"].map((s) => (
              <span
                key={s}
                style={{
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(240,236,232,0.3)",
                  padding: "4px 10px",
                  border: "0.5px solid rgba(240,236,232,0.1)",
                  borderRadius: 4,
                  cursor: "pointer",
                  fontFamily: "'Georgia', serif",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
