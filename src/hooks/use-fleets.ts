import { useInfiniteQuery, useMutation, useQueryClient, type InfiniteData } from "@tanstack/react-query";

import { createFleet, fetchFleetsPage } from "@/lib/api/fleets";
import type { CreateFleetInput } from "@/lib/validation/fleet";
import type { FleetsPage } from "@/types/fleet";

export const fleetsQueryKey = ["fleets"] as const;

export function useFleetsInfiniteQuery() {
  return useInfiniteQuery({
    queryKey: fleetsQueryKey,
    queryFn: ({ pageParam }) => fetchFleetsPage(pageParam),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

export function useCreateFleetMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateFleetInput) => createFleet(input),
    onSuccess: (createdFleet) => {
      // Prepend into the cached first page instead of a full refetch, so the
      // new fleet appears in the list immediately. Falls back to
      // invalidateQueries below if no cached data exists yet (e.g. the list
      // was never successfully fetched in this session).
      const existing = queryClient.getQueryData<InfiniteData<FleetsPage>>(fleetsQueryKey);

      if (!existing) {
        queryClient.invalidateQueries({ queryKey: fleetsQueryKey });
        return;
      }

      const [firstPage, ...restPages] = existing.pages;
      queryClient.setQueryData<InfiniteData<FleetsPage>>(fleetsQueryKey, {
        ...existing,
        pages: [{ ...firstPage, items: [createdFleet, ...firstPage.items] }, ...restPages],
      });
    },
  });
}
