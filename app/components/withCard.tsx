"use client";

import { SlideShowProps } from "./slideShow";
import { TopratedMovieType } from "../features/movies/api";
import { TvShowType } from "../features/tvShows/api";

export type cardType = SlideShowProps & {
  item: TopratedMovieType | TvShowType;
  i: number;
};

export default function (WrappedComponent: React.ComponentType<any>) {
  return function (props: cardType) {
    const { itemWidth, visible = 0, gap: GAP } = props;

    return (
      <div
        className="cs-card flex flex-col shrink-0 cursor-pointer"
        style={{
          width:
            itemWidth || `calc((100% - ${GAP * (visible - 1)}px) / ${visible})`,
        }}
      >
        <WrappedComponent {...props} />
      </div>
    );
  };
}
