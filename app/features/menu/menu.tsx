"use client";

import { useState, useEffect, useRef } from "react";
import Logo from "./logo";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { paths } from "@/app/api/fetch";
import Image from "next/image";

type SearchResult = {
  id: number;
  media_type: "movie" | "tv" | "person";
  title?: string;
  name?: string;
  poster_path?: string;
  profile_path?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
};

const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYWViNTZmODgzZjQ1M2UxZjUyMzMzOGRiNDQwZWI5ZSIsIm5iZiI6MTUwNTg5MzI4Ny41Nzc5OTk4LCJzdWIiOiI1OWMyMWJhNzkyNTE0MTc2OGEwMDk3ZDkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.NZtHiZyMMTgCaK4WqALEugaP_aKDViRpwQjJmSakAao";

function mediaHref(item: SearchResult) {
  if (item.media_type === "movie") return `/movie/${item.id}`;
  if (item.media_type === "tv") return `/tv/${item.id}`;
  return `/actors/${item.id}`;
}

function mediaLabel(item: SearchResult) {
  return item.title || item.name || "Unknown";
}

function mediaYear(item: SearchResult) {
  const date = item.release_date || item.first_air_date;
  return date ? date.slice(0, 4) : null;
}

function mediaImage(item: SearchResult) {
  const p = item.poster_path || item.profile_path;
  return p ? paths.images.base + p : null;
}

function mediaTypeBadge(type: string) {
  if (type === "movie") return "Movie";
  if (type === "tv") return "TV";
  return "Person";
}

export default function () {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const params = usePathname();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const links = [
    { label: "Home", path: "/#" },
    { label: "Movies", path: "/movie" },
    { label: "TV Shows", path: "/tv" },
    { label: "People", path: "/actors" },
  ];

  const color = "#F59E0B";

  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(searchQuery)}&page=1`,
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
              "Content-Type": "application/json",
            },
          },
        );
        const data = await res.json();
        setResults(
          (data.results as SearchResult[])
            .filter((r) => ["movie", "tv", "person"].includes(r.media_type))
            .slice(0, 6),
        );
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchQuery]);

  function closeSearch() {
    setSearchOpen(false);
    setSearchQuery("");
    setResults([]);
  }

  return (
    <nav className="fixed top-0 z-50 w-full">
      {/* Main bar */}
      <div className="flex items-center justify-between px-4 h-20 bg-white dark:bg-black border-b border-black/10 dark:border-white/10">
        <Logo className="h-19 text-black dark:text-white" />

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-1">
          {links.map((link) => (
            <Link key={link.label} href={link.path}>
              <button
                className="px-3 py-1.5 rounded-lg text-sm transition-colors text-gray-500 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10"
                style={{
                  color:
                    params.includes(link.path) ||
                    (params === "/" && link.path === links[0].path)
                      ? color
                      : undefined,
                }}
              >
                {link.label}
              </button>
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Search toggle */}
          <button
            className="p-2 text-gray-500 hover:text-black dark:hover:text-white transition-colors"
            onClick={() => {
              if (searchOpen) {
                closeSearch();
              } else {
                setSearchOpen(true);
                setMenuOpen(false);
              }
            }}
            aria-label="Toggle search"
          >
            {searchOpen ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            )}
          </button>

          {/* Hamburger */}
          <button
            className="sm:hidden flex flex-col gap-[5px] p-1"
            onClick={() => {
              setMenuOpen((o) => !o);
              setSearchOpen(false);
              setSearchQuery("");
              setResults([]);
            }}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-[22px] h-[2px] bg-black dark:bg-white rounded transition-all duration-200 origin-center ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`block w-[22px] h-[2px] bg-black dark:bg-white rounded transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-[22px] h-[2px] bg-black dark:bg-white rounded transition-all duration-200 origin-center ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Search bar + results */}
      {searchOpen && (
        <div className="border-b border-black/10 dark:border-white/10 bg-white dark:bg-black">
          {/* Input */}
          <div className="px-4 py-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-gray-50 dark:bg-white/5 max-w-xl mx-auto">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-gray-400 shrink-0"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                ref={inputRef}
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies, shows, people…"
                className="w-full text-sm bg-transparent text-black dark:text-white outline-none placeholder:text-gray-400"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setResults([]);
                  }}
                  className="text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Results */}
          {(loading || results.length > 0) && (
            <div className="px-4 pb-3 max-w-xl mx-auto">
              {loading ? (
                <div className="flex items-center justify-center py-6 text-gray-400 text-sm gap-2">
                  <svg
                    className="animate-spin"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Searching…
                </div>
              ) : (
                <div className="flex flex-col rounded-lg border border-black/10 dark:border-white/10 overflow-hidden">
                  {results.map((item, i) => (
                    <Link
                      key={item.id}
                      href={mediaHref(item)}
                      onClick={closeSearch}
                      className={`flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${i !== 0 ? "border-t border-black/5 dark:border-white/5" : ""}`}
                    >
                      {/* Poster / avatar */}
                      <div className="relative w-8 h-12 shrink-0 rounded overflow-hidden bg-gray-100 dark:bg-white/10">
                        {mediaImage(item) ? (
                          <Image
                            src={mediaImage(item)!}
                            alt={mediaLabel(item)}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-white/20 text-xs">
                            ?
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-medium text-black dark:text-white truncate">
                          {mediaLabel(item)}
                        </span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span
                            className="text-xs px-1.5 py-0.5 rounded"
                            style={{
                              background: "#F59E0B22",
                              color: "#F59E0B",
                            }}
                          >
                            {mediaTypeBadge(item.media_type)}
                          </span>
                          {mediaYear(item) && (
                            <span className="text-xs text-gray-400">
                              {mediaYear(item)}
                            </span>
                          )}
                          {item.vote_average && item.vote_average > 0 && (
                            <span className="text-xs text-gray-400">
                              ★ {item.vote_average.toFixed(1)}
                            </span>
                          )}
                        </div>
                      </div>

                      <svg
                        className="ml-auto shrink-0 text-gray-300 dark:text-white/20"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* No results */}
          {!loading && searchQuery.trim() && results.length === 0 && (
            <div className="px-4 pb-4 max-w-xl mx-auto text-center text-sm text-gray-400">
              No results for "{searchQuery}"
            </div>
          )}
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden flex flex-col border-b border-black/10 dark:border-white/10 bg-white dark:bg-black">
          {links.map((link) => (
            <Link key={link.label} href={link.path}>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-full px-5 py-3 text-left text-sm transition-colors text-gray-500 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5"
                style={{
                  color:
                    params.includes(link.path) ||
                    (params === "/" && link.path === links[0].path)
                      ? color
                      : undefined,
                }}
              >
                {link.label}
              </button>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
