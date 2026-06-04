"use client";

// import { useRef, useEffect, useCallback } from "react";
import WithSlider from "./withSlider";
import { getComponent } from "../util/util";

const GAP = 16;

function SlideRotate(props) {
  // const {
  //   data,
  //   back,
  //   forward,
  //   offset,
  //   visible,
  //   itemWidth,
  //   onTransitionEnd,
  //   currentIndex,
  //   prevIndex,
  //   direction,
  // } = props;

  const {
    data,
    // offset,
    // itemWidth,
    // visible,
    // onTransitionEnd,
    // canPrev,
    // canNext,
    component,
    children,
  } = props;

  const [Component, componentList] = getComponent(component);

  return (
    <div className="font-sans transition-opacity duration-200">
      <div className="relative w-full h-[480px] overflow-hidden">
        {data.results.map((item, i) => (
          <Component key={i} {...{ ...props, item, i }} />
        ))}
      </div>
    </div>
  );
}

export default WithSlider(SlideRotate, { mode: "hero" });
