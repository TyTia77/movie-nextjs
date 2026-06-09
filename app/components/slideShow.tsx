"use client";

import WithSlider from "./withSlider";
import { WithSliderInjectedProps, withSliderProps } from "./withSlider";

export type SlideShowProps = WithSliderInjectedProps &
  withSliderProps & {
    component: React.ComponentType<any>[];
  };

function SlideShow(props: SlideShowProps) {
  const { data, offset, onTransitionEnd, component, gap } = props;

  const [Component, ...componentList] = component;

  return (
    <div className="w-full font-sans select-none">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500&display=swap');
        .cs-track { transition: transform 0.55s cubic-bezier(.4,0,.2,1); }
        .cs-card:hover .cs-img { transform: scale(1.03); }
      `}</style>

      <div className="relative w-full overflow-hidden">
        <div
          className="cs-track flex"
          onTransitionEnd={onTransitionEnd}
          style={{ gap, transform: `translateX(-${offset}px)` }}
        >
          {data.results.map((item, i: number) => (
            <Component key={i} {...{ ...props, item, i }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default WithSlider(SlideShow, { mode: "track" });
