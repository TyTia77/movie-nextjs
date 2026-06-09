"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ResponseType } from "../api/fetch";

import { PopularActorsType } from "../features/actors/api";
import { UpcomingMoviesType } from "../features/hero/api";
import { TopratedMovieType } from "../features/movies/api";
import { TvShowType } from "../features/tvShows/api";

const GAP = 16;

const DEFAULT_BREAKPOINTS = {
  0: 2,
  480: 3,
  768: 4,
  1024: 5,
};

export type withSliderProps = {
  visible?: number;
  interval?: number;
  breakpoints?: {
    0: number;
    480: number;
    768: number;
    1024: number;
  };
  data: ResponseType<
    | PopularActorsType[]
    | UpcomingMoviesType[]
    | TopratedMovieType[]
    | TvShowType[]
  >;
};

export type WithSliderInjectedProps = {
  onTransitionEnd: () => void;
  itemWidth: number;
  offset: number;
  currentIndex: number;
  prevIndex: number;
  direction: number;
  totalItems: number;
  gap: number;
};

export default function WithSlider<
  T extends withSliderProps & WithSliderInjectedProps,
>(WrappedComponent: React.ComponentType<T>, { mode = "track" } = {}) {
  return function SliderWrapper(props: Omit<T, keyof WithSliderInjectedProps>) {
    const {
      visible = 0,
      data,
      interval = -1,
      breakpoints = DEFAULT_BREAKPOINTS,
    } = props as T;

    const items = data?.results ?? [];
    const itemLen = items.length;
    // const ITEMS_VISIBLE = visible;
    // const STEP = mode === "hero" ? 1 : ITEMS_VISIBLE;

    const trackRef = useRef<HTMLDivElement>(null);
    const autoTimer = useRef<number | null>(null);
    const isAnimating = useRef(false);
    const containerWidthRef = useRef(0);

    const [containerWidth, setContainerWidth] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState<number | null>(null);
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
      (index: number, dir: number) => {
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
      clearInterval(autoTimer.current as number);
      if (interval > 0) {
        autoTimer.current = window.setInterval(() => {
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
      return () => clearInterval(autoTimer.current as number);
    }, [startAuto, containerWidth]);

    const canPrev = mode === "hero" ? true : currentIndex > 0;
    const canNext = mode === "hero" ? true : currentIndex < maxIndex;

    return (
      <div ref={trackRef} className="relative w-full">
        <WrappedComponent
          {...(props as T)}
          onTransitionEnd={handleTransitionEnd}
          itemWidth={itemWidth}
          offset={offset}
          currentIndex={currentIndex}
          prevIndex={prevIndex}
          direction={direction}
          totalItems={itemLen}
          gap={GAP}
        />

        {/* {mode === "track" && ( */}
        <>
          <button
            onClick={handlePrev}
            disabled={!canPrev}
            aria-label="Previous slide"
            className="bg-[#F59E0B] opacity-[.8] absolute top-1/2 -translate-y-1/2 left-5 z-10 w-11 h-11 rounded-full flex items-center justify-center text-lg text-white border-0 cursor-pointer transition-all duration-[180ms] ease-in-out hover:scale-110 disabled:opacity-0"
            // className="bg-[rgba(255,255,255,0.12)] absolute top-1/2 -translate-y-1/2 left-5 z-10 w-11 h-11 rounded-full flex items-center justify-center text-lg text-white border-0 cursor-pointer transition-all duration-[180ms] ease-in-out hover:scale-110 disabled:opacity-0"
          >
            ←
          </button>
          <button
            onClick={handleNext}
            disabled={!canNext}
            aria-label="Next slide"
            className="bg-[#F59E0B] opacity-[.8] absolute top-1/2 -translate-y-1/2 right-5 z-10 w-11 h-11 rounded-full flex items-center justify-center text-lg text-white border-0 cursor-pointer transition-all duration-[180ms] ease-in-out hover:scale-110 disabled:opacity-0"
            // className="bg-[rgba(255,255,255,0.12)] absolute top-1/2 -translate-y-1/2 right-5 z-10 w-11 h-11 rounded-full flex items-center justify-center text-lg text-white border-0 cursor-pointer transition-all duration-[180ms] ease-in-out hover:scale-110 disabled:opacity-0"
          >
            →
          </button>
        </>
        {/* )} */}
      </div>
    );
  };
}
