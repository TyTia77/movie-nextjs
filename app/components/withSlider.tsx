"use client";

import { useState, useEffect, useRef, useCallback, useMemo, memo } from "react";

// ── Config ──────────────────────────────────────────────────────────────────
// itemsVisible: how many items show at once in the viewport
// gap: px gap between items (must match the gap-* class below)
//  = 3;
const GAP = 16; // px, matches gap-4
const INTERVAL_MS = 10000;

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

// ── Component ────────────────────────────────────────────────────────────────
export default function WithSlider(WrappedComponent) {
  return (props) => {
    const { visible, data, interval = -1 } = props;
    const itemLen = data?.results.length || items.length;
    const ITEMS_VISIBLE = visible || 1;
    const trackRef = useRef(null);
    const [offset, setOffset] = useState(0); // px translateX (negative = scrolled right)
    const [progress, setProgress] = useState(0);
    const autoTimer = useRef(null);
    const progressTimer = useRef(null);
    const progressStart = useRef(null);
    const [containerWidth, setContainerWidth] = useState(0);

    const trackPos = useRef(0);

    const containerWidthRef = useRef(0);

    useEffect(() => {
      const el = trackRef.current;
      if (!el) return;
      const ro = new ResizeObserver(([e]) => {
        const w = e.contentRect.width;
        if (w !== containerWidthRef.current) {
          containerWidthRef.current = w;

          // console.log({ w });

          setContainerWidth(w); // only rerenders when width genuinely changes
        }
      });
      ro.observe(el);
      return () => ro.disconnect();
    }, []);

    // Measure container so item widths are always accurate
    // useEffect(() => {
    //   const el = trackRef.current?.parentElement;
    //   if (!el) return;
    //   const ro = new ResizeObserver(([e]) =>
    //     setContainerWidth(e.contentRect.width),
    //   );
    //   ro.observe(el);
    //   setContainerWidth(el.getBoundingClientRect().width);
    //   return () => ro.disconnect();
    // }, []);

    // Width of one item = (container - total gaps) / visible count
    const itemWidth = containerWidth
      ? (containerWidth - GAP * (ITEMS_VISIBLE - 1)) / ITEMS_VISIBLE
      : 0;

    // One "page" scrolls by exactly one item width + gap
    const stepPx = itemWidth + GAP;

    // Max scroll: last item should be flush with the right edge
    const maxOffset = itemWidth
      ? Math.max(0, itemLen * stepPx - GAP - containerWidth)
      : 0;

    const scrollBy = useCallback(
      (dir) => {
        setOffset((prev) => {
          const next = prev + dir * stepPx;
          trackPos.current = next < maxOffset ? trackPos.current + dir : 0;

          return Math.max(0, Math.min(next, maxOffset));
        });
      },
      [stepPx, maxOffset],
    );

    useEffect(() => {
      startAuto();

      setOffset(trackPos.current * stepPx);
    }, [containerWidth]);

    // Auto-advance: scroll right; wrap back to 0 at the end
    // const startProgress = useCallback(() => {
    //   // setProgress(0);
    //   clearInterval(progressTimer.current);
    //   progressStart.current = performance.now();
    //   progressTimer.current = setInterval(() => {
    //     const elapsed = performance.now() - progressStart.current;
    //     // setProgress(Math.min((elapsed / INTERVAL_MS) * 100, 100));
    //   }, 30);
    // }, []);

    const startAuto = useCallback(() => {
      clearInterval(autoTimer.current);
      if (interval > 0) {
        autoTimer.current = setInterval(() => {
          setOffset((prev) => {
            const next = prev + stepPx;
            trackPos.current = next < maxOffset ? trackPos.current + 1 : 0;
            return next > maxOffset ? 0 : next;
          });
          // startProgress();
        }, INTERVAL_MS);
        // startProgress();
      }
    }, [stepPx, maxOffset]);

    useEffect(() => {
      if (!itemWidth) return; // wait until measured
      startAuto();
      return () => {
        clearInterval(autoTimer.current);
        clearInterval(progressTimer.current);
      };
    }, [startAuto, itemWidth]);

    const canPrev = offset > 0;
    const canNext = offset < maxOffset;

    const handlePrev = () => {
      scrollBy(-1);
      startAuto();
    };
    const handleNext = () => {
      scrollBy(1);
      startAuto();
    };

    // console.log({ maxOffset, data });

    // const renderCount = useRef(0);
    // renderCount.current += 1;
    // console.log("render #" + renderCount.current, {
    //   containerWidth,
    //   itemWidth,
    //   offset,
    //   progress: Math.round(progress),
    // });

    return (
      <div ref={trackRef} className="relative">
        <WrappedComponent
          // ref={trackRef}
          {...{
            ...props,
            back: handlePrev,
            forward: handleNext,
            itemWidth,
            offset,
          }}
        />
        <button
          className=" absolute top-1/2 left-5 z-10 w-11 h-11 rounded-full flex items-center justify-center text-lg text-white border-0 cursor-pointer transition-[transform,opacity] duration-[180ms] ease-in-out"
          style={{
            background: "rgba(255,255,255,0.12)",
            transform: "translateY(-50%)",
          }}
          onClick={handlePrev}
          aria-label="Previous slide"
        >
          ←
        </button>

        <button
          className="absolute top-1/2 right-5 z-10 w-11 h-11 rounded-full flex items-center justify-center text-lg text-white border-0 cursor-pointer transition-[transform,opacity] duration-[180ms] ease-in-out"
          style={{
            background: "rgba(255,255,255,0.12)",
            transform: "translateY(-50%)",
          }}
          onClick={handleNext}
          aria-label="Next slide"
        >
          →
        </button>
      </div>
    );
  };
}
