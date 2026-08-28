"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type FC, type PropsWithChildren } from "react";

export const QueryProvider: FC<PropsWithChildren> = ({ children }) => {
  // Created once per browser session via useState (not module scope), so a
  // server-rendered client is never accidentally shared across requests.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
