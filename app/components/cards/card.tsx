"use client";

type cardType = {
  item: any;
  itemWidth: number;
  visible: boolean;
  i: number;
};

export default function (WrappedComponent) {
  return function (props) {
    const GAP = 16;
    const { itemWidth, visible } = props;

    return (
      <div
        className="cs-card flex flex-col shrink-0 cursor-pointer"
        style={{
          width:
            itemWidth || `calc((100% - ${GAP * (visible - 1)}px) / ${visible})`,
        }}
      >
        <WrappedComponent {...props} />
      </div>
    );
  };
}
