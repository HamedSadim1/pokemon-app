import type { ReactNode, SVGProps } from "react";

export type IconName =
  | "arrow-left"
  | "arrow-right"
  | "arrow-up-right"
  | "checkered"
  | "close"
  | "heart"
  | "menu"
  | "moon"
  | "search"
  | "sun"
  | "sparkle"
  | "warning";

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

const paths: Record<IconName, ReactNode> = {
  "arrow-left": <path d="m15 18-6-6 6-6" />,
  "arrow-right": <path d="m9 18 6-6-6-6" />,
  "arrow-up-right": <path d="M7 17 17 7M8 7h9v9" />,
  checkered: (
    <>
      <path d="M4 4h16v16H4z" />
      <path d="M4 8h16M4 16h16M8 4v16M16 4v16" />
    </>
  ),
  close: <path d="m6 6 12 12M18 6 6 18" />,
  heart: <path d="m20.8 8.8-8.8 9-8.8-9A5.2 5.2 0 0 1 12 5.4a5.2 5.2 0 0 1 8.8 3.4Z" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  moon: <path d="M20 15.2A8.4 8.4 0 0 1 8.8 4 8.4 8.4 0 1 0 20 15.2Z" />,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></>,
  sun: <><circle cx="12" cy="12" r="3.5" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  sparkle: <><path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3Z" /><path d="m19 16 .6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6L19 16Z" /></>,
  warning: <><path d="m12 3 9 17H3L12 3Z" /><path d="M12 9v4M12 16h.01" /></>,
};

const Icon = ({ name, size = 18, strokeWidth = 1.9, ...props }: IconProps) => (
  <svg
    {...props}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden={props["aria-label"] ? undefined : true}
    focusable="false"
  >
    {paths[name]}
  </svg>
);

export default Icon;
