"use client";
// import { useState } from "react";
import { paths } from "../api/fetch";
import ImageRound from "./image";

export type detailsTypes = {
  name: string;
  known_for_department?: string;
  also_known_as?: string[];
  tagline?: string;
  genres?: { id: number; name: string }[];
  poster_path?: string;
  profile_path?: string;
  overview?: string;
  biography?: string;
  vote_average?: number;
  vote_count?: number;
  release_date?: string;
  runtime?: number;
  details: Record<string, any>;
};

const colorMap = {
  "c-teal": { bg: "#5DCAA5", text: "#04342C" },
  "c-purple": { bg: "#AFA9EC", text: "#26215C" },
  "c-coral": { bg: "#F0997B", text: "#4A1B0C" },
  "c-blue": { bg: "#85B7EB", text: "#042C53" },
  "c-amber": { bg: "#FAC775", text: "#412402" },
};

function StarRating({ score }: { score: number }) {
  const filled = Math.round(score / 2);
  return (
    <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i <= filled ? "#fff" : "none"}
          stroke="#fff"
          strokeWidth="2"
          style={{ opacity: i <= filled ? 1 : 0.35 }}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

function Badge({ label, accent }: { label: string; accent: string }) {
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

export default function ({ response }: { response: detailsTypes }) {
  console.log({ response });

  const img = response.poster_path
    ? response.poster_path
    : response.profile_path;

  //   const [activeType, setActiveType] = useState("movie");

  const isDark = true;

  const themeColor1 = "#d4a055";
  const themeColor2 = "#F59E0B";
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
      <div
        style={{
          position: "relative",
          padding: "3.5rem 2rem 2.5rem",
          background:
            "linear-gradient(135deg, #1a1400 0%, #2a1f00 40%, #1a1200 100%)",

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
        <div
          className="flex flex-row justify-between"
          style={{ position: "relative", maxWidth: 680, margin: "0 auto" }}
        >
          <div className="flex flex-col justify-center">
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
              {response.name}
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
              {response.tagline}
            </p>

            {response.known_for_department && (
              <p
                style={{
                  fontSize: 15,
                  fontStyle: "italic",
                  color: textSecondary,
                  margin: "0 0 20px",
                  fontFamily: "'Georgia', serif",
                }}
              >
                Known for {response.known_for_department}
              </p>
            )}

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
              {response.also_known_as && (
                <>
                  <span style={{ fontSize: 13, color: textSecondary }}>
                    {/* {data.year} */}
                    {response.also_known_as.length > 0 && "also known as"}
                  </span>

                  {response.also_known_as.map((g) => (
                    <Badge key={g} label={g} accent={themeColor2} />
                  ))}
                </>
              )}

              {response.release_date && (
                <span style={{ fontSize: 13, color: textSecondary }}>
                  {response.release_date.slice(0, 4)}
                </span>
              )}

              {response.runtime && (
                <>
                  <span style={{ color: divider }}>·</span>
                  <span style={{ fontSize: 13, color: textSecondary }}>
                    {response.runtime} mins
                  </span>
                </>
              )}

              {response.genres &&
                response.genres.map((g) => (
                  <Badge key={g.id} label={g.name} accent={themeColor1} />
                ))}
            </div>

            {/* Score */}
            {response.vote_average && (
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
                      color: themeColor1,
                      lineHeight: 1,
                    }}
                  >
                    {response.vote_average.toFixed(0)}
                  </span>
                  <span style={{ fontSize: 14, color: textSecondary }}>
                    /10
                  </span>
                </div>
                <div>
                  <StarRating score={response.vote_average} />
                  <p
                    style={{
                      fontSize: 12,
                      color: textSecondary,
                      margin: "3px 0 0",
                      fontFamily: "'Georgia', serif",
                    }}
                  >
                    {formatNumber(response.vote_count)} ratings
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex">
            <ImageRound
              path={paths.images.base + img}
              alt={response.name}
              {...(response.profile_path
                ? { size: 45, round: true }
                : { width: 160, height: 220 })}
            />{" "}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "2.5rem 2rem" }}>
        {/* Overview */}
        <section style={{ marginBottom: "2.5rem" }}>
          <h2
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: themeColor2,
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
            {response.overview}
            {response.biography || "N/A"}
          </p>
        </section>

        {/* Details grid */}
        <section style={{ marginBottom: "2.5rem" }}>
          <h2
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: themeColor2,
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
            {response.details &&
              Object.entries(response.details).map(([key, val]) => (
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
                      color: themeColor2,
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
                    {val as any}
                  </p>
                </div>
              ))}
          </div>
        </section>

        {/* Divider */}
        <div style={{ height: 1, background: divider, margin: "0 0 2rem" }} />
      </div>
    </div>
  );
}

function formatNumber(n: number | undefined): string {
  if (!n) return "";
  if (n >= 1_000) {
    return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return n.toLocaleString();
}
