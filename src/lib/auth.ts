/**
 * There is no auth/session system in this scaffold. `Fleet` rows are still
 * scoped by `userId` (per the brief's "authenticated user" requirement), so
 * every API route resolves the current user through this single function
 * instead of reading Prisma calls directly against a hardcoded string.
 *
 * Swap this implementation for a real session lookup (NextAuth, Clerk, a
 * cookie-based session, etc.) — nothing else in the Fleets feature needs to
 * change, since every route already goes through `getCurrentUserId()`.
 */
const MOCK_USER_ID = "mock-user-id";

export async function getCurrentUserId(): Promise<string> {
  return MOCK_USER_ID;
}
