import type { SVGProps } from "react";

/** Brand mark: a sun-disc with a stylised T glyph (TIDA = 沖縄の太陽) */
export default function LogoMark(
  props: SVGProps<SVGSVGElement> & { size?: number }
) {
  const { size = 28, ...rest } = props;
  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      aria-hidden="true"
      {...rest}
    >
      <defs>
        <linearGradient id="tida-mark-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5eead4" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="18" fill="url(#tida-mark-grad)" />
      <path
        d="M11 14h18M20 14v15"
        stroke="#ffffff"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
