"use client";

import { paths } from "../../api/fetch";
import { SlideShowProps } from "@/app/components/slideShow";
import { PopularActorsType } from "./api";
import Link from "next/link";

type cardRoundType = SlideShowProps & {
  item: PopularActorsType;
  i: number;
};

export default function (props: cardRoundType) {
  const { item, itemWidth, visible = 0, gap } = props;
  const { name, profile_path } = item;

  return (
    <Link href={`/actors/${item.id}`}>
      <div
        className="cs-card flex flex-col shrink-0 cursor-pointer group"
        style={{
          width:
            itemWidth || `calc((100% - ${gap * (visible - 1)}px) / ${visible})`,
        }}
      >
        <div className="relative w-32 h-32 self-center rounded-full overflow-hidden flex-shrink-0">
          <img
            src={paths.images.base + profile_path}
            alt={name}
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 rounded-full" />
        </div>
        <div className="flex p-2 justify-center">{name}</div>
      </div>
    </Link>
  );
}
