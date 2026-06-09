"use client";

import WithSlider, {
  withSliderProps,
  WithSliderInjectedProps,
} from "../../components/withSlider";
import { getComponent } from "../../util/util";

type SlideRotateProps = WithSliderInjectedProps &
  withSliderProps & {
    component: React.ComponentType<any>[];
  };

function SlideRotate(props: SlideRotateProps) {
  const { data, component } = props;

  const [Component, ...componentList] = component;

  return (
    <div className="font-sans transition-opacity duration-200">
      <div className="relative w-full h-[480px] overflow-hidden">
        {data.results.map((item, i) => (
          <Component
            key={i}
            {...{ ...props, item, i, component: componentList }}
          />
        ))}
      </div>
    </div>
  );
}

export type { SlideRotateProps };
export default WithSlider(SlideRotate, { mode: "hero" });
