import Image from "next/image";

type ImageProps = {
  path: string;
  alt?: string;
  size?: number; // square (circular)
  width?: number; // portrait/custom
  height?: number;
  round?: boolean;
};

export default function ({
  path,
  alt = "",
  size,
  width,
  height,
  round = size ? true : false,
}: ImageProps) {
  const w = size ? size * 4 : width!;
  const h = size ? size * 4 : height!;

  return (
    <div
      style={{ width: `${w}px`, height: `${h}px` }}
      className={`relative self-center overflow-hidden flex-shrink-0 ${round ? "rounded-full" : "rounded-xl"}`}
    >
      <Image src={path} alt={alt} fill className="object-cover" />
    </div>
  );
}
