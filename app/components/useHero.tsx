"use client";

import { useRef, useEffect, useCallback } from "react";
import WithSlider from "./useSlider";
import Image from "next/image";
import { paths } from "../api/fetch";

const GAP = 16;

function Hero(props) {
  const {
    data,
    back,
    forward,
    offset,
    visible,
    itemWidth,
    onTransitionEnd,
    currentIndex,
    prevIndex,
    direction,
  } = props;

  const resizeRef = useRef(null);
  const debounceTimer = useRef(null);

  const fadeIn = useCallback(() => {
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      resizeRef.current?.classList.remove("opacity-0");
    }, 300);
  }, []);

  const fadeOut = useCallback(() => {
    resizeRef.current?.classList.add("opacity-0");
    fadeIn();
  }, [fadeIn]);

  //   useEffect(() => {
  //     const el = resizeRef.current;
  //     if (!el) return;
  //     const ro = new ResizeObserver(() => fadeOut());
  //     ro.observe(el);
  //     return () => {
  //       ro.disconnect();
  //       clearTimeout(debounceTimer.current);
  //     };
  //   }, [fadeOut]);

  const mapped = data.results.map((d) => ({
    id: d.id,
    eyebrow: "Coming Soon",
    title: d.title,
    desc: d.overview,
    cta: "Explore Now",
    overlay: paths.images.base + d.backdrop_path,
    accentColor: "#7db3d6",
    ctaBg: "#f0f4f8",
    ctaText: "#0d1b2a",
    headlineColor: "#f0f4f8",
    bodyColor: "rgba(240,244,248,0.7)",
  }));

  const isReverse = direction === -1;

  const getSlideClass = (i: number) => {
    const rev = isReverse ? " reverse" : "";

    // if (i === currentIndex - 1) return `hs-slide${rev}`;
    if (i === currentIndex) return `hs-slide${rev} active`;
    if (i === prevIndex) return `hs-slide${rev} exit`;
    return "hs-slide";
  };

  return (
    <div ref={resizeRef} className="font-sans transition-opacity duration-200">
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

      <div className="relative w-full h-[480px] overflow-hidden">
        {mapped.map((s, i) => (
          <div
            key={s.id}
            className={`${getSlideClass(i)} ${currentIndex - 1 == i || (currentIndex === 0 && i == mapped.length - 1) ? "reverse" : ""}`}
            onTransitionEnd={i === currentIndex ? onTransitionEnd : undefined}
          >
            <Image
              src={s.overlay}
              alt={s.title}
              fill
              className="object-cover"
              priority={i === 0}
              loading={i === 0 ? "eager" : "lazy"}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

            <div className="relative z-10 flex flex-col justify-center h-full max-w-[520px] px-12 py-12">
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

              <h1
                className="text-[clamp(28px,4vw,52px)] font-bold leading-[1.1] mb-4 tracking-[-0.01em]"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: s.headlineColor,
                }}
              >
                {s.title}
              </h1>

              <p
                className="text-[15px] font-light leading-[1.7] mb-8 max-w-[400px] line-clamp-3"
                style={{ color: s.bodyColor }}
              >
                {s.desc}
              </p>

              <button
                className="hs-cta inline-flex items-center gap-2.5 px-[26px] py-[13px] rounded-full text-[13px] font-medium tracking-[0.04em] border-0 cursor-pointer transition-[transform,opacity] duration-[180ms] ease-in-out w-fit"
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

        {/* Buttons inside hero so they anchor to the 480px container */}
        {/* <button
          onClick={back}
          aria-label="Previous slide"
          className="absolute top-1/2 left-5 -translate-y-1/2 z-10 w-11 h-11 rounded-full flex items-center justify-center text-lg text-white border-0 cursor-pointer transition-[transform,opacity] duration-[180ms] ease-in-out hover:scale-110"
          style={{ background: "rgba(255,255,255,0.12)" }}
        >
          ←
        </button>

        <button
          onClick={forward}
          aria-label="Next slide"
          className="absolute top-1/2 right-5 -translate-y-1/2 z-10 w-11 h-11 rounded-full flex items-center justify-center text-lg text-white border-0 cursor-pointer transition-[transform,opacity] duration-[180ms] ease-in-out hover:scale-110"
          style={{ background: "rgba(255,255,255,0.12)" }}
        >
          →
        </button> */}
      </div>
    </div>
  );
}

export default WithSlider(Hero, { mode: "hero" });
