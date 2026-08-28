import type { FleetColorId } from "@/lib/fleet-colors";

/** JSON-serializable shape returned by the API (Prisma's `Date` -> ISO string). */
export interface FleetDto {
  id: string;
  title: string;
  color: FleetColorId;
  description: string | null;
  companyCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface FleetsPage {
  items: FleetDto[];
  nextCursor: string | null;
}
