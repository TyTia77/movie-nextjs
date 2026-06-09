"use client";

import Image from "next/image";
import Link from "next/link";
import { paths } from "@/app/api/fetch";
import { ActorType } from "./api";

type ActorCardProps = {
  item: ActorType;
};

export default function ActorCard({ item }: ActorCardProps) {
  const { id, name, profile_path, known_for_department, known_for } = item;
  const knownForTitles = known_for
    .slice(0, 2)
    .map((k) => k.title || k.name)
    .filter(Boolean)
    .join(", ");

  return (
    <Link
      href={`/actors/${id}`}
      className="group flex gap-4 items-start py-4 border-b border-white/10 hover:bg-white/5 px-2 rounded-lg transition-colors"
    >
      {/* Avatar */}
      <div className="relative w-16 h-16 shrink-0 rounded-full overflow-hidden bg-white/10">
        {profile_path ? (
          <Image
            src={paths.images.base + profile_path}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/30 text-xs">
            ?
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 min-w-0">
        <h3 className="text-white font-semibold text-sm leading-snug truncate group-hover:text-amber-400 transition-colors">
          {name}
        </h3>
        <span className="text-white/50 text-xs">{known_for_department}</span>
        {knownForTitles && (
          <span className="text-white/30 text-xs truncate">
            Known for: {knownForTitles}
          </span>
        )}
      </div>

      {/* <span className="ml-auto text-white/20 group-hover:text-white/60 transition-colors self-center text-lg shrink-0">
        →
      </span> */}
    </Link>
  );
}
