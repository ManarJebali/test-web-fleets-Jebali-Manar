import { z } from "zod";

import { FLEET_COLOR_IDS } from "@/lib/fleet-colors";

/**
 * Shared between `FleetForm` (client) and `POST /api/fleets` (server) so
 * validation rules can never drift between the two.
 */
export const createFleetSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "fleet_name_required")
    .max(80, "fleet_name_too_long"),
  color: z.enum(FLEET_COLOR_IDS),
  description: z
    .string()
    .trim()
    .max(280, "fleet_description_too_long")
    .optional()
    .or(z.literal("")),
});

export type CreateFleetInput = z.infer<typeof createFleetSchema>;

export const listFleetsQuerySchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(50).default(10),
});
