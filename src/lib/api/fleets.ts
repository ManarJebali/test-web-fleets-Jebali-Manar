import type { CreateFleetInput } from "@/lib/validation/fleet";
import type { FleetDto, FleetsPage } from "@/types/fleet";

const FLEETS_PAGE_SIZE = 10;

interface ApiErrorBody {
  error?: { code?: string };
}

async function parseErrorMessage(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as ApiErrorBody;
    return body.error?.code ?? `Request failed with status ${response.status}`;
  } catch {
    return `Request failed with status ${response.status}`;
  }
}

export async function fetchFleetsPage(cursor?: string | null): Promise<FleetsPage> {
  const params = new URLSearchParams({ limit: String(FLEETS_PAGE_SIZE) });
  if (cursor) params.set("cursor", cursor);

  const response = await fetch(`/api/fleets?${params.toString()}`);
  if (!response.ok) throw new Error(await parseErrorMessage(response));

  return (await response.json()) as FleetsPage;
}

export async function createFleet(input: CreateFleetInput): Promise<FleetDto> {
  const response = await fetch("/api/fleets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) throw new Error(await parseErrorMessage(response));

  return (await response.json()) as FleetDto;
}
