"use client";

import Image from "next/image";
import { paths } from "../api/fetch";

export default function MovieCard(props) {
  const GAP = 16;
  const { item, itemWidth, visible, i } = props;

  const mapped = {
    id: item.id,
    label: item.title,
    tag: `Rating ${item.vote_average.toFixed(2)}`,
    bg: paths.images.base + item.poster_path,
    accent: "#7db3d6",
    text: "#f0f4f8",
    votes: item.vote_count,
  };

  return (
    <div
      className="cs-card flex flex-col shrink-0 cursor-pointer gap-2"
      style={{
        width:
          itemWidth || `calc((100% - ${GAP * (visible - 1)}px) / ${visible})`,
      }}
    >
      {/* Rating above image */}
      <span
        className="self-start text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full"
        style={{
          background: "rgba(125,179,214,0.15)",
          color: mapped.accent,
        }}
      >
        {mapped.tag}
      </span>

      {/* Image */}
      <div
        className="relative w-full overflow-hidden rounded-xl"
        style={{ aspectRatio: "2/3" }}
      >
        <Image
          src={mapped.bg}
          alt={mapped.label}
          fill
          className="cs-img object-cover transition-transform duration-300 ease-out"
          priority={i < visible}
          loading={i < visible ? "eager" : "lazy"}
        />
      </div>

      {/* Title and votes below image */}
      <div className="px-1">
        <h3
          className="text-base font-bold leading-tight text-black dark:text-white truncate"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {mapped.label}
        </h3>
        <div
          className="flex items-center gap-2 mt-1 text-[10px] font-medium tracking-[0.15em] uppercase"
          style={{ color: mapped.accent }}
        >
          <span
            className="inline-block h-px"
            style={{ width: 18, background: mapped.accent }}
          />
          {mapped.votes.toLocaleString()} votes
        </div>
      </div>
    </div>
  );
}
