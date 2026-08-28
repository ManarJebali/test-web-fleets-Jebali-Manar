import { Prisma } from "@prisma/client";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

import { getCurrentUserId } from "@/lib/auth";
import type { FleetColorId } from "@/lib/fleet-colors";
import { prisma } from "@/lib/prisma";
import { createFleetSchema, listFleetsQuerySchema } from "@/lib/validation/fleet";
import type { FleetDto, FleetsPage } from "@/types/fleet";

function toDto(fleet: {
  id: string;
  title: string;
  color: string;
  description: string | null;
  companyCount: number;
  createdAt: Date;
  updatedAt: Date;
}): FleetDto {
  return {
    id: fleet.id,
    title: fleet.title,
    color: fleet.color as FleetColorId,
    description: fleet.description,
    companyCount: fleet.companyCount,
    createdAt: fleet.createdAt.toISOString(),
    updatedAt: fleet.updatedAt.toISOString(),
  };
}

/**
 * GET /api/fleets?cursor=<fleetId>&limit=<n>
 *
 * Cursor-paginated (not offset-based): `cursor` is the id of the last fleet
 * seen, ordered by `createdAt desc, id desc` for a stable sort even when two
 * fleets share a timestamp. Scoped to the current (mocked) user.
 */
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const parseResult = listFleetsQuerySchema.safeParse({
    cursor: url.searchParams.get("cursor") ?? undefined,
    limit: url.searchParams.get("limit") ?? undefined,
  });

  if (!parseResult.success) {
    return NextResponse.json(
      { error: { code: "INVALID_QUERY", issues: parseResult.error.flatten() } },
      { status: 400 },
    );
  }

  const { cursor, limit } = parseResult.data;
  const userId = await getCurrentUserId();

  try {
    const fleets = await prisma.fleet.findMany({
      where: { userId },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      take: limit + 1,
      ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
    });

    const hasMore = fleets.length > limit;
    const items = hasMore ? fleets.slice(0, limit) : fleets;
    const nextCursor = hasMore ? items[items.length - 1].id : null;

    const body: FleetsPage = { items: items.map(toDto), nextCursor };
    return NextResponse.json(body);
  } catch (error) {
    console.error("[GET /api/fleets]", error);
    return NextResponse.json({ error: { code: "INTERNAL_ERROR" } }, { status: 500 });
  }
}

/**
 * POST /api/fleets
 *
 * Validated with the same Zod schema the client form uses
 * (`lib/validation/fleet.ts`), so the two can never drift.
 */
export async function POST(request: NextRequest) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: { code: "INVALID_JSON" } }, { status: 400 });
  }

  const parseResult = createFleetSchema.safeParse(json);
  if (!parseResult.success) {
    return NextResponse.json(
      { error: { code: "VALIDATION_ERROR", issues: parseResult.error.flatten() } },
      { status: 400 },
    );
  }

  const { title, color, description } = parseResult.data;
  const userId = await getCurrentUserId();

  try {
    const fleet = await prisma.fleet.create({
      data: {
        userId,
        title,
        color,
        description: description || null,
      },
    });

    return NextResponse.json(toDto(fleet), { status: 201 });
  } catch (error) {
    // Don't leak raw Prisma error shapes/messages to the client.
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("[POST /api/fleets] Prisma error", error.code, error.message);
      return NextResponse.json({ error: { code: "DATABASE_ERROR" } }, { status: 500 });
    }
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", issues: error.flatten() } },
        { status: 400 },
      );
    }
    console.error("[POST /api/fleets]", error);
    return NextResponse.json({ error: { code: "INTERNAL_ERROR" } }, { status: 500 });
  }
}
