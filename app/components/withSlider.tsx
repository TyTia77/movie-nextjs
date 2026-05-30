"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Button from "./button";

const ITEMS_LENGTH = 1;
const GAP = 16; // px, matches gap-4

export default function (WrappedComponent) {
  return (props) => {
    const { visible = ITEMS_LENGTH, data, interval = -1 } = props;
    const itemLen = data?.results.length || 0;
    // const ITEMS_VISIBLE = visible || ITEMS_LENGTH;
    const trackRef = useRef(null);
    const [offset, setOffset] = useState(0); // px translateX (negative = scrolled right)
    // const [progress, setProgress] = useState(0);
    const autoTimer = useRef(null);
    // const progressTimer = useRef(null);
    // const progressStart = useRef(null);
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
      ? (containerWidth - GAP * (visible - 1)) / visible
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
        }, interval);
        // startProgress();
      }
    }, [stepPx, maxOffset]);

    useEffect(() => {
      if (!itemWidth) return; // wait until measured
      startAuto();
      return () => {
        clearInterval(autoTimer.current);
        // clearInterval(progressTimer.current);
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
      <div ref={trackRef} className="relative w-[100%]">
        <Button
          className="bg-[rgba(255,255,255,0.12)] absolute top-1/2 left-5 -translate-y-1/2 z-10 w-11 h-11 rounded-full flex items-center justify-center text-lg text-white border-0 cursor-pointer transition-[transform,opacity] duration-[180ms] ease-in-out"
          text={"←"}
          // disabled={canPrev}
          onClick={handlePrev}
        />
        <Button
          className="bg-[rgba(255,255,255,0.12)] absolute top-1/2 right-5 -translate-y-1/2 z-10 w-11 h-11 rounded-full flex items-center justify-center text-lg text-white border-0 cursor-pointer transition-[transform,opacity] duration-[180ms] ease-in-out"
          text={"→"}
          // disabled={false}
          onClick={handleNext}
        />
        <WrappedComponent
          {...{
            ...props,
            back: handlePrev,
            forward: handleNext,
            itemWidth,
            offset,
          }}
        />

        {/* <button
          className=" absolute top-1/2 left-5 z-10 w-11 h-11 rounded-full flex items-center justify-center text-lg text-white border-0 cursor-pointer transition-[transform,opacity] duration-[180ms] ease-in-out"
          style={{
            background: "rgba(255,255,255,0.12)",
            // transform: "translateY(-50%)",
          }}
          onClick={handlePrev}
          aria-label="Previous slide"
        >
          ←
        </button> */}

        {/* <button
          className="absolute top-1/2 right-5 z-10 w-11 h-11 rounded-full flex items-center justify-center text-lg text-white border-0 cursor-pointer transition-[transform,opacity] duration-[180ms] ease-in-out"
          style={{
            background: "rgba(255,255,255,0.12)",
            // transform: "translateY(-50%)",
          }}
          onClick={handleNext}
          aria-label="Next slide"
        >
          →
        </button> */}
      </div>
    );
  };
}
