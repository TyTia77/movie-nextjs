"use client";

import Image from "next/image";
import { paths } from "../../api/fetch";
import WithCard from "./card";

type cardType = {
  item: any;
  itemWidth: number;
  visible: boolean;
  i: number;
};

export default WithCard(function (props: cardType) {
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
    name: item.name,
  };

  return (
    <>
      {/* Image */}
      <div
        className="my-2 relative w-full overflow-hidden rounded-xl"
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

      {/* Title and below image */}
      <div className="px-1">
        <h3
          style={{ fontFamily: "'Playfair Display', serif" }}
          className="text-base font-bold leading-tight text-center text-black dark:text-white truncate"
        >
          {mapped.name.toLocaleString()}
        </h3>
      </div>
    </>
  );
});
