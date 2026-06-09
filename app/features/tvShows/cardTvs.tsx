"use client";

import Image from "next/image";
import { paths } from "../../api/fetch";
import WithCard, { cardType } from "@/app/components/withCard";
// import { SlideShowProps } from "@/app/components/slideShow";
import { TvShowType } from "./api";
import Link from "next/link";

type cardTvType = cardType & {
  item: TvShowType;
};

export default WithCard(function (props: cardTvType) {
  // const GAP = 16;
  const { item, visible = 0, i } = props;

  const mapped = {
    id: item.id,
    label: (item as any).title,
    tag: `Rating ${item.vote_average.toFixed(2)}`,
    bg: paths.images.base + item.poster_path,
    accent: "#7db3d6",
    text: "#f0f4f8",
    votes: item.vote_count,
    name: item.name,
  };

  return (
    <>
      <Link href={`/tv/${item.id}`}>
        {/* Image */}
        <div
          className="my-2 relative w-full overflow-hidden rounded-xl"
          style={{ aspectRatio: "2/3" }}
        >
          <Image
            alt={mapped.label}
            src={mapped.bg}
            fill
            className="cs-img object-cover transition-transform duration-300 ease-out"
            priority={i < visible}
            loading={i < visible ? "eager" : "lazy"}
          />
        </div>

        {/* Title and below image */}
        <div className="px-1">
          <h3
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-base font-bold leading-tight text-center text-black dark:text-white truncate"
          >
            {mapped.name.toLocaleString()}
          </h3>
        </div>
      </Link>
    </>
  );
});
