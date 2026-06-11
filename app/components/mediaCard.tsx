"use client";

import Image from "next/image";
import Link from "next/link";
import { paths } from "@/app/api/fetch";

type MediaCardProps = {
  id: number;
  title: string;
  posterPath: string;
  releaseDate: string;
  rating: number;
  overview: string;
  href: string;
};

export default function MediaCard({
  id,
  title,
  posterPath,
  releaseDate,
  rating,
  overview,
  href,
}: MediaCardProps) {
  const year = releaseDate ? releaseDate.slice(0, 4) : "—";
  const score = rating.toFixed(1);

  return (
    <Link
      href={href}
      className="group flex gap-4 items-start py-4 border-b border-white/10 hover:bg-white/5 px-2 rounded-lg transition-colors"
    >
      {/* Poster */}
      <div className="relative w-16 h-24 shrink-0 rounded-md overflow-hidden bg-white/10">
        {posterPath ? (
          <Image
            src={paths.images.base + posterPath}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/30 text-xs">
            No image
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 min-w-0 flex-1">
        <h3 className="text-white font-semibold text-sm leading-snug truncate group-hover:text-amber-400 transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-white/50 text-xs">{year}</span>
          <span className="text-white/20 text-xs">·</span>
          <span className="text-amber-400 text-xs">★</span>
          <span className="text-white/70 text-xs font-medium">{score}</span>
        </div>
        {overview && (
          <p className="text-white/40 text-xs leading-relaxed line-clamp-2 mt-1">
            {overview}
          </p>
        )}
      </div>

      {/* Arrow */}
      {/* <span className="ml-auto text-white/20 group-hover:text-white/60 transition-colors self-center text-lg shrink-0">
        →
      </span> */}
    </Link>
  );
}
