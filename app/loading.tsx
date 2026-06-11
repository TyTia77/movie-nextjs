export default function Loading() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      {/* Spinner */}
      <div style={{ position: "relative", width: 56, height: 56 }}>
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          style={{ animation: "spin 1s linear infinite" }}
        >
          <circle cx="28" cy="28" r="24" stroke="#F59E0B22" strokeWidth="3" />
          <path
            d="M28 4a24 24 0 0 1 24 24"
            stroke="#F59E0B"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>

      {/* Text */}
      <div style={{ textAlign: "center" }}>
        <p
          style={{
            fontSize: 13,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#F59E0B",
            margin: 0,
          }}
        >
          Loading
        </p>
        {/* <p
          style={{
            fontSize: 12,
            color: "rgba(240,236,232,0.3)",
            margin: "6px 0 0",
            fontStyle: "italic",
          }}
        >
          Fetching from the database…
        </p> */}
      </div>

      {/* Decorative dots */}
      <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "#F59E0B",
              opacity: 0.3,
              animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
}
