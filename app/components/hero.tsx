"use client";

import { useRef, useEffect } from "react";
import WithSlider from "./withSlider";
import Image from "next/image";
import { paths } from "../api/fetch";
import { debounce } from "toolkit";

const GAP = 16; // px, matches gap-4

const Hero = (props) => {
  const { data, offset, visible, itemWidth } = props;

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

  const mapped = data.results.map((d) => {
    return {
      id: d.id,
      eyebrow: "Coming Soon",
      title: [d.title],
      desc: d.overview,
      cta: "Explore Now",
      bg: paths.images.base + d.poster_path,
      overlay: paths.images.base + d.backdrop_path,
      accentColor: "#7db3d6",
      ctaBg: "#f0f4f8",
      ctaText: "#0d1b2a",
      headlineColor: "#f0f4f8",
      bodyColor: "rgba(240,244,248,0.7)",
    };
  });

  if (offset === 0) fade2black();

  return (
    <div ref={resizeRef} className="font-sans transition duration-200 ">
      {/* Inject Google Fonts + keyframe-dependent transitions */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap');

        .hs-slide {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          padding: 0 6%;
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
        .hs-cta:hover  { transform: translateY(-2px); opacity: 0.88; }
        .hs-cta:active { transform: scale(0.97); }
        .hs-cta:hover .hs-arrow { transform: translateX(4px); }
        .hs-nav:hover  { transform: translateY(-50%) scale(1.08); }

        .hs-track { transition: transform 0.55s cubic-bezier(.4,0,.2,1); }

      `}</style>

      {/* ── Slider wrapper ── */}
      <div className="relative w-full h-[480px] overflow-hidden">
        <div
          className="flex flex-row flex-nowrap hs-track"
          style={{
            gap: GAP,
            transform: `translateX(-${offset}px)`,
          }}
        >
          {mapped.map((s, i) => (
            <div
              key={s.id}
              //   className=" hs-slide active hs-card shrink-0 cursor-pointer"
              // className="h-[480px]"
              style={{
                position: "relative",
                flex: "0 0 auto",
                width:
                  itemWidth ||
                  `calc((100% - ${GAP * (visible - 1)}px) / ${visible})`,
              }}
              // className={`hs-slide active`}
              // className={`hs-slide${i === current ? " active" : ""}${i === exiting ? " exit" : ""}`}
            >
              <Image
                // className="relative inset-0"
                className="object-cover rounded-lg"
                //   className="dark:invert"
                src={s.overlay}
                alt="movie image"
                fill
                // width={itemWidth}
                // height={480}
                priority
              />

              {/* Slide content */}
              <div className="relative z-10 max-w-[520px] p-[50px_50px]">
                {/* Eyebrow */}
                <div
                  className="flex items-center gap-2.5 mb-3.5 text-[11px] font-medium tracking-[0.18em] uppercase"
                  style={{ color: s.accentColor }}
                >
                  <span
                    className="inline-block w-7 h-px"
                    style={{ background: s.accentColor }}
                  />
                  {s.eyebrow}
                </div>

                {/* Headline */}
                <h1
                  className="text-[clamp(32px,5vw,52px)] font-bold leading-[1.1] mb-[18px] tracking-[-0.01em]"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: s.headlineColor,
                  }}
                >
                  {s.title[0]}
                  <br />
                  {s.title[1]}
                </h1>

                {/* Description */}
                <p
                  className="text-[15px] font-light leading-[1.7] mb-8 max-w-[400px]"
                  style={{ color: s.bodyColor }}
                >
                  {s.desc}
                </p>

                {/* CTA */}
                <button
                  className="hs-cta inline-flex items-center gap-2.5 px-[26px] py-[13px] rounded-full text-[13px] font-medium tracking-[0.04em] border-0 cursor-pointer transition-[transform,opacity] duration-[180ms] ease-in-out"
                  style={{ background: s.ctaBg, color: s.ctaText }}
                >
                  {s.cta}
                  <span className="hs-arrow text-base inline-block transition-transform duration-[180ms] ease-in-out">
                    →
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ── Prev / Next buttons ── */}
        {/* <button
          className="hs-nav absolute top-1/2 left-5 z-10 w-11 h-11 rounded-full flex items-center justify-center text-lg text-white border-0 cursor-pointer transition-[transform,opacity] duration-[180ms] ease-in-out"
          style={{
            background: "rgba(255,255,255,0.12)",
            transform: "translateY(-50%)",
          }}
          onClick={back}
          aria-label="Previous slide"
        >
          ←
        </button>

        <button
          className="hs-nav absolute top-1/2 right-5 z-10 w-11 h-11 rounded-full flex items-center justify-center text-lg text-white border-0 cursor-pointer transition-[transform,opacity] duration-[180ms] ease-in-out"
          style={{
            background: "rgba(255,255,255,0.12)",
            transform: "translateY(-50%)",
          }}
          onClick={forward}
          aria-label="Next slide"
        >
          →
        </button> */}

        {/* ── Dot indicators ── */}
        {/* <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2.5">
          {mapped.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDot(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="border-0 cursor-pointer p-0 transition-all duration-300 ease-in-out rounded-full"
              style={{
                width: i === current ? 24 : 6,
                height: 6,
                borderRadius: i === current ? 3 : "50%",
                background:
                  i === current
                    ? "rgba(255,255,255,0.9)"
                    : "rgba(255,255,255,0.35)",
              }}
            />
          ))}
        </div> */}

        {/* ── Progress bar ── */}
        {/* <div
          className="absolute bottom-0 left-0 h-[3px] z-10 bg-white/50 transition-[width] duration-[30ms] linear"
          style={{ width: `${progress}%` }}
        /> */}

        {/* ── Interval picker ── */}
        {/* <div className="mt-3 flex items-center gap-2.5 justify-end">
        <span className="text-xs text-gray-400">Interval</span>
        {INTERVALS.map((ms) => (
          <button
            key={ms}
            onClick={() => setIntervalMs(ms)}
            className={`text-xs px-3 py-1 rounded-full border cursor-pointer transition-all duration-[180ms] ease-in-out ${
              intervalMs === ms
                ? "bg-gray-900 text-white border-gray-900 font-medium"
                : "bg-transparent text-gray-500 border-gray-300 font-normal"
            }`}
          >
            {ms / 1000}s
          </button>
        ))}
      </div> */}
      </div>
    </div>
  );
};

export default WithSlider(Hero);
