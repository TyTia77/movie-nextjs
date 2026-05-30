"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const GAP = 16;

const DEFAULT_BREAKPOINTS = {
  0: 2,
  480: 3,
  768: 4,
  1024: 5,
};

export default function WithSlider(WrappedComponent, { mode = "track" } = {}) {
  return function SliderWrapper(props) {
    const {
      visible = 0,
      data,
      interval = -1,
      breakpoints = DEFAULT_BREAKPOINTS,
    } = props;

    const items = data?.results ?? [];
    const itemLen = items.length;
    // const ITEMS_VISIBLE = visible;
    // const STEP = mode === "hero" ? 1 : ITEMS_VISIBLE;

    const trackRef = useRef(null);
    const autoTimer = useRef(null);
    const isAnimating = useRef(false);
    const containerWidthRef = useRef(0);

    const [containerWidth, setContainerWidth] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(null);
    const [direction, setDirection] = useState(1);

    const getVisibleCount = useCallback(
      (width: number) => {
        if (visible) return visible; // manual override
        const keys = Object.keys(breakpoints)
          .map(Number)
          .sort((a, b) => a - b);
        let count = breakpoints[keys[0]];
        for (const key of keys) {
          if (width >= key) count = breakpoints[key];
        }
        return count;
      },
      [visible, breakpoints],
    );

    const ITEMS_VISIBLE = getVisibleCount(containerWidth);
    const STEP = mode === "hero" ? 1 : ITEMS_VISIBLE;

    console.log({ ITEMS_VISIBLE, props });

    // ── Measure container ──────────────────────────────────────────
    useEffect(() => {
      const el = trackRef.current;
      if (!el) return;
      const ro = new ResizeObserver(([e]) => {
        const w = e.contentRect.width;
        if (w !== containerWidthRef.current) {
          containerWidthRef.current = w;
          setContainerWidth(w);
        }
      });
      ro.observe(el);
      return () => ro.disconnect();
    }, []);

    // ── Derived values ─────────────────────────────────────────────
    const itemWidth = containerWidth
      ? (containerWidth - GAP * (ITEMS_VISIBLE - 1)) / ITEMS_VISIBLE
      : 0;

    const maxIndex = Math.max(0, itemLen - ITEMS_VISIBLE);
    const offset = currentIndex * (itemWidth + GAP);

    // ── Navigation ─────────────────────────────────────────────────
    const goTo = useCallback(
      (index, dir) => {
        if (isAnimating.current) return;
        isAnimating.current = true;
        setDirection(dir);
        setPrevIndex(currentIndex);
        if (mode === "hero") {
          setCurrentIndex((index + itemLen) % itemLen);
        } else {
          setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
        }
      },
      [currentIndex, itemLen, maxIndex, mode],
    );

    const handlePrev = useCallback(() => {
      goTo(currentIndex - STEP, -1);
      startAuto();
    }, [currentIndex, STEP, goTo]);

    const handleNext = useCallback(() => {
      goTo(currentIndex + STEP, 1);
      startAuto();
    }, [currentIndex, STEP, goTo]);

    const handleTransitionEnd = useCallback(() => {
      isAnimating.current = false;
      setPrevIndex(null);
    }, []);

    // ── Auto-advance ───────────────────────────────────────────────
    const startAuto = useCallback(() => {
      clearInterval(autoTimer.current);
      if (interval > 0) {
        autoTimer.current = setInterval(() => {
          if (!isAnimating.current) {
            isAnimating.current = true;
            setDirection(1);
            setPrevIndex((p) => p);
            setCurrentIndex((i) =>
              mode === "hero"
                ? (i + 1) % itemLen
                : Math.min(i + STEP, maxIndex),
            );
          }
        }, interval);
      }
    }, [interval, STEP, itemLen, maxIndex, mode]);

    useEffect(() => {
      if (!containerWidth) return;
      startAuto();
      return () => clearInterval(autoTimer.current);
    }, [startAuto, containerWidth]);

    const canPrev = mode === "hero" ? true : currentIndex > 0;
    const canNext = mode === "hero" ? true : currentIndex < maxIndex;

    return (
      <div ref={trackRef} className="relative w-full">
        <WrappedComponent
          {...props}
          back={handlePrev}
          forward={handleNext}
          onTransitionEnd={handleTransitionEnd}
          itemWidth={itemWidth}
          offset={offset}
          currentIndex={currentIndex}
          prevIndex={prevIndex}
          direction={direction}
          totalItems={itemLen}
          canPrev={canPrev}
          canNext={canNext}
        />

        {/* {mode === "track" && ( */}
        <>
          <button
            onClick={handlePrev}
            disabled={!canPrev}
            aria-label="Previous slide"
            className="bg-[rgba(255,255,255,0.12)] absolute top-1/2 -translate-y-1/2 left-5 z-10 w-11 h-11 rounded-full flex items-center justify-center text-lg text-white border-0 cursor-pointer transition-all duration-[180ms] ease-in-out hover:scale-110 disabled:opacity-0"
          >
            ←
          </button>
          <button
            onClick={handleNext}
            disabled={!canNext}
            aria-label="Next slide"
            className="bg-[rgba(255,255,255,0.12)] absolute top-1/2 -translate-y-1/2 right-5 z-10 w-11 h-11 rounded-full flex items-center justify-center text-lg text-white border-0 cursor-pointer transition-all duration-[180ms] ease-in-out hover:scale-110 disabled:opacity-0"
          >
            →
          </button>
        </>
        {/* )} */}
      </div>
    );
  };
}
