"use client";
import { forwardRef } from "react";
import WithSlider from "./withSlider";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { paths } from "../api/fetch";

const ITEMS_VISIBLE = 3;
const GAP = 16; // px, matches gap-4
const INTERVAL_MS = 100000;

const items = [
  {
    id: 0,
    label: "Ocean",
    tag: "New",
    desc: "Shoreline ready, boardroom approved.",
    bg: "linear-gradient(135deg, #0d1b2a, #1b3a5c)",
    accent: "#7db3d6",
    text: "#f0f4f8",
  },
  {
    id: 1,
    label: "Golden Hour",
    tag: "Limited",
    desc: "The hour before sunset, bottled.",
    bg: "linear-gradient(135deg, #3d1c00, #6b3400)",
    accent: "#e8a96b",
    text: "#fdf4ec",
  },
  {
    id: 2,
    label: "Forest",
    tag: "Eco",
    desc: "Materials that give back every season.",
    bg: "linear-gradient(135deg, #0d1f0d, #2d6b2d)",
    accent: "#7dcc7d",
    text: "#edf7ed",
  },
  {
    id: 3,
    label: "Dusk",
    tag: "SS25",
    desc: "Where day meets night in perfect balance.",
    bg: "linear-gradient(135deg, #1a0a2e, #4a1a6b)",
    accent: "#c89be8",
    text: "#f5eeff",
  },
  {
    id: 4,
    label: "Ember",
    tag: "Hot",
    desc: "Warmth that lasts long after dark.",
    bg: "linear-gradient(135deg, #2e0a0a, #7a2020)",
    accent: "#e88a7d",
    text: "#fff0ee",
  },
  {
    id: 5,
    label: "Arctic",
    tag: "FW25",
    desc: "Clean lines for the coldest mornings.",
    bg: "linear-gradient(135deg, #0a1a2e, #1a3a5c)",
    accent: "#a8d4f5",
    text: "#eef6ff",
  },
];

const CardStacks = forwardRef(function (props, ref) {
  const { data, back, forward, offset, itemWidth, visible } = props;

  console.log({ data, back, forward, offset, itemWidth, visible });

  const mapped = data.results.map((x) => {
    return {
      id: x.id,
      label: x.title,
      tag: `Rating ${x.vote_average.toFixed(2)}`,
      desc: "",
      // desc: x.overview,
      bg: paths.images.base + x.poster_path,
      accent: "#7db3d6",
      text: "#f0f4f8",
      votes: x.vote_count,
    };
  });

  return (
    <div ref={ref} className="w-full font-sans select-none">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500&display=swap');
        .hs-track { transition: transform 0.55s cubic-bezier(.4,0,.2,1); }
        .hs-card:hover .hs-card-inner { transform: translateY(-4px); }
        .hs-nav-btn:hover { opacity: 1 !important; transform: scale(1.08); }
        .hs-nav-btn:disabled { opacity: 0.25 !important; cursor: default; pointer-events: none; }
      `}</style>

      {/* ── Viewport ── */}
      <div className="relative w-full overflow-hidden ">
        {/* Track: all items in a single row */}
        <div
          className="hs-track flex"
          style={{
            gap: GAP,
            transform: `translateX(-${offset}px)`,
          }}
        >
          {mapped.map((item) => (
            <div
              key={item.id}
              className="flex flex-col hs-card shrink-0 cursor-pointer "
              style={{
                width:
                  itemWidth ||
                  `calc((100% - ${GAP * (visible - 1)}px) / ${visible})`,
              }}
            >
              <Image
                className=" inset-0 self-center"
                // className="hs-card-inner relative rounded-xl overflow-hidden transition-transform duration-300 ease-out"
                //   className="dark:invert"
                src={item.bg}
                alt="movie image"
                // fill
                // width={itemWidth}
                height={400}
                width={270}
                priority
              />
              <div
                className="hs-card-inner relative rounded-xl overflow-hidden transition-transform duration-300 ease-out"
                style={{ background: item.bg, aspectRatio: "3" }}
              >
                {/* Tag */}
                <span
                  className="relative top-3 left-3 z-10 text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    color: item.text,
                    backdropFilter: "blur(6px)",
                  }}
                >
                  {item.tag}
                </span>

                {/* Bottom content */}
                <div
                  className="absolute inset-x-0 p-4 z-10"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
                  }}
                >
                  <div
                    className="flex items-center gap-2 mb-1 text-[10px] font-medium tracking-[0.15em] uppercase"
                    style={{ color: item.accent }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: 18,
                        height: 1,
                        background: item.accent,
                      }}
                    />
                    {item.votes} votes
                  </div>
                  <h3
                    className="text-lg font-bold leading-tight mb-1"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: item.text,
                    }}
                  >
                    {item.label}
                  </h3>
                  <p
                    className="text-xs font-light leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        {/* <div
          className="absolute bottom-0 left-0 h-[3px] z-20 transition-[width] duration-[30ms] linear"
          style={{ width: `${progress}%`, background: "rgba(255,255,255,0.5)" }}
        />
      </div> */}

        {/* ── Controls row ── */}
        <div className="mt-4 flex items-center justify-between">
          {/* Scroll position indicator */}
          {/* <div className="flex items-center gap-1.5">
          {Array.from({
            length: Math.ceil(items.length - ITEMS_VISIBLE + 1),
          }).map((_, i) => {
            const stepOffset = i * stepPx;
            const active = Math.abs(offset - stepOffset) < stepPx / 2;
            return (
              <button
                key={i}
                onClick={() => {
                  setOffset(Math.min(stepOffset, maxOffset));
                  startAuto();
                }}
                className="border-0 p-0 cursor-pointer rounded-full transition-all duration-300"
                style={{
                  width: active ? 20 : 5,
                  height: 5,
                  borderRadius: active ? 3 : "50%",
                  background: active ? "#111" : "#d1d5db",
                }}
                aria-label={`Scroll to position ${i + 1}`}
              />
            );
          })}
        </div> */}

          {/* Prev / Next */}
          {/* <div className="flex items-center gap-2">
            <button
              className="hs-nav-btn w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-sm text-gray-700 bg-white cursor-pointer transition-all duration-150"
              // style={{ opacity: canPrev ? 0.8 : 0.25 }}
              // disabled={!canPrev}
              onClick={back}
              aria-label="Previous"
            >
              ←
            </button>
            <button
              className="hs-nav-btn w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-sm text-gray-700 bg-white cursor-pointer transition-all duration-150"
              // style={{ opacity: canNext ? 0.8 : 0.25 }}
              // disabled={!canNext}
              onClick={forward}
              aria-label="Next"
            >
              →
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
});

export default WithSlider(CardStacks);
