"use client";

import { paths } from "../api/fetch";

type cardRoundType = {
  item: any;
  itemWidth: number;
  visible: boolean;
  i: number;
};

export default function (props: cardRoundType) {
  const GAP = 16;

  const { item, itemWidth, visible, i } = props;
  const { name, profile_path } = item;

  return (
    <div
      // key={item.id}
      className="cs-card flex flex-col shrink-0 cursor-pointer"
      style={{
        width:
          itemWidth || `calc((100% - ${GAP * (visible - 1)}px) / ${visible})`,
      }}
    >
      <div className="relative w-32 h-32 self-center rounded-full overflow-hidden flex-shrink-0">
        <img
          src={paths.images.base + profile_path}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex p-2 justify-center">{name}</div>
    </div>
  );
}
