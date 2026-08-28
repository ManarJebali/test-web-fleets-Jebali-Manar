import type { SVGProps } from "react";

export const BuildingIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.5 13.5V2.5H10.5V13.5M13.5 13.5V6.5H10.5M3.5 13.5H13.5M5.5 5H6.5M8 5H9M5.5 7.5H6.5M8 7.5H9M5.5 10H6.5M8 10H9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
