import type { SVGProps } from "react";

export const FolderIcon = (props: SVGProps<SVGSVGElement>) => {
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
        d="M1.5 3.5C1.5 2.67157 2.17157 2 3 2H6.17157C6.5694 2 6.95093 2.15804 7.23223 2.43934L8.29289 3.5H13C13.8284 3.5 14.5 4.17157 14.5 5V12C14.5 12.8284 13.8284 13.5 13 13.5H3C2.17157 13.5 1.5 12.8284 1.5 12V3.5Z"
        stroke="currentColor"
        strokeLinejoin="round"
      />
    </svg>
  );
};
