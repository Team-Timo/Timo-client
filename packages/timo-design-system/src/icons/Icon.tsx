import type { IconName } from "./iconNames";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number | string;
  width?: number | string;
  height?: number | string;
  className?: string;
  rotate?: 90 | 180 | 270;
  ariaHidden?: boolean;
}

export const Icon = ({
  name,
  size,
  width,
  height,
  className,
  rotate,
  ariaHidden = true,
  ...rest
}: IconProps) => {
  const w = width ?? size ?? 20;
  const h = height ?? size ?? 20;

  const rotateClass =
    rotate === 90
      ? "rotate-90"
      : rotate === 180
        ? "rotate-180"
        : rotate === 270
          ? "rotate-[270deg]"
          : "";

  return (
    <svg
      width={typeof w === "number" ? `${w}px` : w}
      height={typeof h === "number" ? `${h}px` : h}
      className={`inline-block ${rotateClass} ${className ?? ""}`}
      aria-hidden={ariaHidden}
      {...rest}
    >
      <use href={`#icon-${name}`} />
    </svg>
  );
};
