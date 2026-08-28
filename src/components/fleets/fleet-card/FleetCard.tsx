"use client";

import { useIntlayer } from "next-intlayer";
import type { CSSProperties, HTMLAttributes } from "react";

import { getFleetColor, type FleetColorId } from "@/lib/fleet-colors";
import { BuildingIcon, DotsIcon, FolderIcon } from "@/icons";
import { cn } from "@/utils";

export interface FleetCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string | null;
  color: FleetColorId;
  /** Company count footer is only rendered when this is provided — the
   * creation-modal preview omits it (a brand-new fleet has no footer stat
   * shown in Figma), while the list card always passes it. */
  companyCount?: number;
  /** The modal preview adds a "Fleet" eyebrow row above the title; the list
   * card does not. */
  variant?: "list" | "preview";
}

export const FleetCard = ({
  title,
  description,
  color,
  companyCount,
  variant = "list",
  className,
  style,
  ...rest
}: FleetCardProps) => {
  const content = useIntlayer("fleet-card");
  const { gradientFrom, gradientTo } = getFleetColor(color);

  const cardStyle: CSSProperties = {
    ...style,
    backgroundImage: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
  };

  return (
    <div
      className={cn(
        "relative flex h-full min-h-[176px] w-full flex-col justify-between rounded-2xl border border-white/10 p-5 shadow-lg",
        className,
      )}
      style={cardStyle}
      {...rest}
    >
      <button
        aria-label={content.optionsMenuLabel}
        className="absolute right-4 top-4 rounded-md p-1 text-white/60 transition-colors hover:bg-white/10 hover:text-white/90"
        type="button"
      >
        <DotsIcon className="h-3 w-4" />
      </button>

      <div>
        {variant === "preview" && (
          <div className="mb-3 flex items-center gap-1.5 text-xs font-medium text-white/70">
            <FolderIcon className="h-3.5 w-3.5" />
            <span>{content.previewEyebrow}</span>
          </div>
        )}

        <h3 className="line-clamp-2 text-base font-semibold text-white">
          {title || content.untitledFleet}
        </h3>

        {description ? (
          <p className="mt-1.5 line-clamp-2 text-sm text-white/60">{description}</p>
        ) : null}
      </div>

      {companyCount !== undefined && (
        <div className="mt-4 flex items-center gap-1.5 text-xs text-white/70">
          <BuildingIcon className="h-3.5 w-3.5" />
          <span>{content.companyCount(companyCount)({ count: companyCount })}</span>
        </div>
      )}
    </div>
  );
};
