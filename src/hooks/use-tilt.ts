import { useCallback, useRef, useState } from "react";

interface TiltStyle {
  transform: string;
  transition: string;
}

const MAX_TILT_DEG = 8;
const RESET_STYLE: TiltStyle = {
  transform: "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
  transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
};

/**
 * Mouse-move-driven 3D tilt for the fleet preview card. Nothing like this
 * exists elsewhere in the repo, so this is a new, self-contained hook rather
 * than a modification to a shared utility.
 */
export function useTilt<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [style, setStyle] = useState<TiltStyle>(RESET_STYLE);

  const onMouseMove = useCallback((event: React.MouseEvent<T>) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width; // 0 -> 1
    const y = (event.clientY - rect.top) / rect.height; // 0 -> 1

    const rotateY = (x - 0.5) * 2 * MAX_TILT_DEG;
    const rotateX = (0.5 - y) * 2 * MAX_TILT_DEG;

    setStyle({
      transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: "transform 0.1s ease-out",
    });
  }, []);

  const onMouseLeave = useCallback(() => {
    setStyle(RESET_STYLE);
  }, []);

  return { ref, style, onMouseMove, onMouseLeave };
}
