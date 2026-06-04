"use client";

// import { useRef, useEffect } from "react";
// import WithSlider from "./withSlider";
import Image from "next/image";
import { paths } from "../api/fetch";
// import { debounce } from "toolkit";

const GAP = 16; // px, matches gap-4

type heroType = {
  item: any;

  offset: number;
  visible: boolean;
  itemWidth: number;
  onTransitionEnd: any;
  currentIndex: number;
  prevIndex: number;
  direction: number;
  i: number;
};

export default function (props: heroType) {
  const {
    item,
    // back,
    // forward,
    offset,
    visible,
    itemWidth,
    onTransitionEnd,
    currentIndex,
    prevIndex,
    direction,
    i,
  } = props;

  const mapped = {
    id: item.id,
    eyebrow: "Coming Soon",
    title: item.title,
    desc: item.overview,
    cta: "Explore Now",
    overlay: paths.images.base + item.backdrop_path,
    accentColor: "#7db3d6",
    ctaBg: "#f0f4f8",
    ctaText: "#0d1b2a",
    headlineColor: "#f0f4f8",
    bodyColor: "rgba(240,244,248,0.7)",
  };

  const isReverse = direction === -1;

  const getSlideClass = (i: number) => {
    const rev = isReverse ? " reverse" : "";

    // if (i === currentIndex - 1) return `hs-slide${rev}`;
    if (i === currentIndex) return `hs-slide${rev} active`;
    if (i === prevIndex) return `hs-slide${rev} exit`;
    return "hs-slide";
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap');

        .hs-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transform: translateX(60px);
          transition: opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1);
          pointer-events: none;
        }
        .hs-slide.active {
          opacity: 1;
          transform: translateX(0);
          pointer-events: auto;
        }
        .hs-slide.exit {
          opacity: 0;
          transform: translateX(-60px);
        }

        .hs-slide.reverse {
          transform: translateX(-60px);
        }
        .hs-slide.reverse.active {
          opacity: 1;
          transform: translateX(0);
        }
        .hs-slide.reverse.exit {
          opacity: 0;
          transform: translateX(60px);
        }
        .hs-cta:hover { transform: translateY(-2px); opacity: 0.88; }
        .hs-cta:active { transform: scale(0.97); }
        .hs-cta:hover .hs-arrow { transform: translateX(4px); }
      `}</style>

      <div
        key={mapped.id}
        className={`${getSlideClass(i)} ${currentIndex - 1 == i || (currentIndex === 0 && i == mapped.length - 1) ? "reverse" : ""}`}
        onTransitionEnd={i === currentIndex ? onTransitionEnd : undefined}
      >
        <Image
          src={mapped.overlay}
          alt={mapped.title}
          fill
          className="object-cover"
          priority={i === 0}
          loading={i === 0 ? "eager" : "lazy"}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

        <div className="relative z-10 flex flex-col justify-center h-full max-w-[520px] px-12 py-12">
          <div
            className="flex items-center gap-2.5 mb-3.5 text-[11px] font-medium tracking-[0.18em] uppercase"
            style={{ color: mapped.accentColor }}
          >
            <span
              className="inline-block w-7 h-px"
              style={{ background: mapped.accentColor }}
            />
            {mapped.eyebrow}
          </div>

          <h1
            className="text-[clamp(28px,4vw,52px)] font-bold leading-[1.1] mb-4 tracking-[-0.01em]"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: mapped.headlineColor,
            }}
          >
            {mapped.title}
          </h1>

          <p
            className="text-[15px] font-light leading-[1.7] mb-8 max-w-[400px] line-clamp-3"
            style={{ color: mapped.bodyColor }}
          >
            {mapped.desc}
          </p>

          <button
            className="hs-cta inline-flex items-center gap-2.5 px-[26px] py-[13px] rounded-full text-[13px] font-medium tracking-[0.04em] border-0 cursor-pointer transition-[transform,opacity] duration-[180ms] ease-in-out w-fit"
            style={{ background: mapped.ctaBg, color: mapped.ctaText }}
          >
            {mapped.cta}
            <span className="hs-arrow text-base inline-block transition-transform duration-[180ms] ease-in-out">
              →
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
