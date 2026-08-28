"use client";

import { useIntlayer } from "next-intlayer";
import { useEffect, useRef } from "react";

import { Button } from "@/components/button";
import { MODAL_IDS, useModalActions } from "@/components/modal";
import { useFleetsInfiniteQuery } from "@/hooks/use-fleets";
import { PlusIcon } from "@/icons";

import { FleetCard } from "../fleet-card";

const SKELETON_COUNT = 5;

const FleetCardSkeleton = () => (
  <div className="h-full min-h-[176px] w-full animate-pulse rounded-2xl border border-white/10 bg-white/5" />
);

export const FleetsList = () => {
  const content = useIntlayer("fleets-list");
  const { openModal } = useModalActions();
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const { data, status, error, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useFleetsInfiniteQuery();

  // Real infinite scroll: an IntersectionObserver on a sentinel div at the
  // bottom of the grid triggers fetchNextPage, rather than fetching
  // everything up front and slicing client-side.
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const fleets = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <div className="mx-auto w-full max-w-[1600px] px-6 py-10 md:px-10 lg:px-16">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-white">{content.pageTitle}</h1>
        <Button
          variant="ghostLight"
          onClick={() => openModal(MODAL_IDS.createFleet)}
          className="items-center"
        >
          <PlusIcon className="h-3.5 w-3.5" />
          {content.createFleetButton}
        </Button>
      </div>

      {status === "pending" && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
            <FleetCardSkeleton key={index} />
          ))}
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 py-16 text-center">
          <p className="text-sm text-white/70">
            {error instanceof Error ? error.message : content.loadError}
          </p>
          <Button variant="ghostLight" onClick={() => refetch()}>
            {content.retryButton}
          </Button>
        </div>
      )}

      {status === "success" && fleets.length === 0 && (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 py-20 text-center">
          <p className="text-base font-medium text-white">{content.emptyTitle}</p>
          <p className="max-w-sm text-sm text-white/60">{content.emptyDescription}</p>
        </div>
      )}

      {status === "success" && fleets.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {fleets.map((fleet) => (
              <FleetCard
                key={fleet.id}
                title={fleet.title}
                description={fleet.description}
                color={fleet.color}
                companyCount={fleet.companyCount}
              />
            ))}
          </div>

          <div ref={sentinelRef} className="h-1 w-full" />

          {isFetchingNextPage && (
            <p className="mt-4 text-center text-xs text-white/50">{content.loadingMore}</p>
          )}
        </>
      )}
    </div>
  );
};
