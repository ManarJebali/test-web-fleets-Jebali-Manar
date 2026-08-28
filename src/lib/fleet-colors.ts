/**
 * The 8 preset colors shown as swatches in the creation form (Figma:
 * blue → cyan → green → yellow → orange → red → pink → purple, blue
 * pre-selected). Exact hex values aren't extractable from the screenshots
 * with certainty, so these are close visual approximations — flagged here
 * rather than presented as exact design tokens.
 *
 * Each color also drives the card's background gradient in the list/preview,
 * approximating the per-card gradients seen in the list screenshot.
 */
export const FLEET_COLORS = [
  { id: "blue", swatch: "#3B82F6", gradientFrom: "#2E3A8C", gradientTo: "#1B1440" },
  { id: "cyan", swatch: "#22D3EE", gradientFrom: "#1F6E7A", gradientTo: "#152C46" },
  { id: "green", swatch: "#22C55E", gradientFrom: "#1F6E4A", gradientTo: "#132B23" },
  { id: "yellow", swatch: "#EAB308", gradientFrom: "#8A6A1E", gradientTo: "#2E2410" },
  { id: "orange", swatch: "#F97316", gradientFrom: "#8A4A1E", gradientTo: "#2E1B10" },
  { id: "red", swatch: "#EF4444", gradientFrom: "#7A2E2E", gradientTo: "#2E1414" },
  { id: "pink", swatch: "#EC4899", gradientFrom: "#7A2E5E", gradientTo: "#2E1428" },
  { id: "purple", swatch: "#A855F7", gradientFrom: "#5B2E8C", gradientTo: "#211440" },
] as const;

export type FleetColorId = (typeof FLEET_COLORS)[number]["id"];

export const FLEET_COLOR_IDS = FLEET_COLORS.map((c) => c.id) as [FleetColorId, ...FleetColorId[]];

export const DEFAULT_FLEET_COLOR: FleetColorId = "blue";

export function getFleetColor(id: string) {
  return FLEET_COLORS.find((c) => c.id === id) ?? FLEET_COLORS[0];
}
