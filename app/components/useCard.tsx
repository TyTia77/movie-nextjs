"use client";

import WithSlider from "./useSlider";
// import Image from "next/image";
// import { paths } from "../api/fetch";
import { getComponent } from "../util/util";

const GAP = 16;

function CardStacks(props) {
  const {
    data,
    offset,
    itemWidth,
    visible,
    onTransitionEnd,
    canPrev,
    canNext,
    component,
  } = props;

  const [Component, componentList] = getComponent(component);

  return (
    <div className="w-full font-sans select-none">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500&display=swap');
        .cs-track { transition: transform 0.55s cubic-bezier(.4,0,.2,1); }
        .cs-card:hover .cs-img { transform: scale(1.03); }
      `}</style>

      <div className="relative w-full overflow-hidden">
        <div
          className="cs-track flex"
          onTransitionEnd={onTransitionEnd}
          style={{ gap: GAP, transform: `translateX(-${offset}px)` }}
        >
          {data.results.map((item, i) => (
            <Component key={i} {...{ ...props, item, i }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default WithSlider(CardStacks, { mode: "track" });
