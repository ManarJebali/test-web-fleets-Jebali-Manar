import type { SVGProps } from "react";

export const DotsIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      viewBox="0 0 16 4"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="2" cy="2" fill="currentColor" r="1.5" />
      <circle cx="8" cy="2" fill="currentColor" r="1.5" />
      <circle cx="14" cy="2" fill="currentColor" r="1.5" />
    </svg>
  );
};
