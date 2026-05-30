"use client";

import { useRef, useEffect } from "react";
// import WithSlider from "./withSlider";
// import Image from "next/image";
// import { paths } from "../api/fetch";
import { debounce } from "toolkit";
import { getComponent } from "../util/util";
import withSlider from "./withSlider";

const GAP = 16; // px, matches gap-4

const Stacker = ({
  data,
  offset = 0,
  //   visible,
  //   itemWidth,
  component,
  ...rest
}) => {
  const [Component, componentList] = getComponent(component);
  console.log({ data });

  //   const data = await authenticatedFetch(api);

  //   return <Component {...{ ...rest, data }} />;

  // console.log({ data, back, forward, offset, visible, itemWidth });

  const resizeRef = useRef(null);

  const delay = debounce(() => {
    resizeRef.current.classList.remove("opacity-0");
  }, 1000);

  const fade2black = () => {
    if (resizeRef.current) {
      resizeRef.current.classList.add("opacity-0");
      delay();
    }
  };

  useEffect(() => {
    const el = resizeRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const w = e.contentRect.width;
      fade2black();
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  //   const mapped = data.results.map((d) => {
  //     return {
  //       id: d.id,
  //       eyebrow: "Coming Soon",
  //       title: [d.title],
  //       desc: d.overview,
  //       cta: "Explore Now",
  //       bg: paths.images.base + d.poster_path,
  //       overlay: paths.images.base + d.backdrop_path,
  //       accentColor: "#7db3d6",
  //       ctaBg: "#f0f4f8",
  //       ctaText: "#0d1b2a",
  //       headlineColor: "#f0f4f8",
  //       bodyColor: "rgba(240,244,248,0.7)",
  //     };
  //   });

  if (offset === 0) fade2black();

  return (
    <div ref={resizeRef} className="w-full font-sans transition duration-200 ">
      {/* Inject Google Fonts + keyframe-dependent transitions */}

      {/* ── Slider wrapper ── */}
      <div className="relative w-full">
        <div
          className="flex flex-row flex-nowrap hs-track"
          style={{
            gap: GAP,
            transform: `translateX(-${offset}px)`,
          }}
        >
          {data.results.map((s, i) => {
            return <Component key={i} {...{ ...rest, ...s }} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default withSlider(Stacker);
