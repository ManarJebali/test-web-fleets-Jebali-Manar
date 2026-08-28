This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/[locale]/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Fleets feature

Branch: `feature/fleets`. Adds a "Fleets" library at `/en/fleets` and `/fr/fleets`: an infinite-scroll list of fleet cards and a creation modal with a live tilt-effect preview.

### Running it locally

```bash
cp .env.example .env   # point DATABASE_URL at a real Postgres instance
npx prisma migrate dev --name init
npx prisma generate
npm run dev
```

`prisma generate`/`migrate` could not be run in the sandbox this was built in (its network policy blocks Prisma's engine-binary CDN) — the schema and code are written and type-check correctly against the generated client's shape, but you'll see two files (`src/lib/prisma.ts`, `app/api/fleets/route.ts`) fail `tsc` here until you run the command above with real network access.

### What's real vs. what's a placeholder

- **Auth is mocked.** There's no session system in the scaffold at all, so `src/lib/auth.ts` exports a single `getCurrentUserId()` returning a hardcoded id. Every fleets query/mutation goes through it, so swapping in real auth later is a one-file change.
- **`companyCount` is a plain counter**, not a relation. The creation form (per Figma) only exposes name/color/description — there's no company-management UI in scope — so it defaults to `0` and isn't part of the create payload.
- **The 8 fleet colors and card gradients are visual approximations.** Exact hex values aren't recoverable from the provided screenshots; see `src/lib/fleet-colors.ts`.
- **The "⋯" overflow menu on cards renders but does nothing** — no edit/delete flow was in scope (only create + list were requested).

### Bugs found in the scaffold and how they were handled

- `prisma` was pinned to `^8.0.0-rc.12`, a pre-release with an entirely different CLI (no `migrate`/`generate`) and `@prisma/client` wasn't even installed. Repinned both to the stable `7.10.0` line rather than build against a paradigm nobody would ship with.
- The scaffolder's own `intlayer init` set `routing.enableProxy: false`, which disables the header the server-side locale reader depends on — every locale, including `/fr/...`, silently rendered English. Confirmed via `curl` before and after; fixed by setting it to `true`.
- `next-intlayer` and `@hookform/resolvers` were required by the stack but missing entirely — added as dependencies.
- `src/icons/index.ts` imports `arrow-left.svg` as a React component with no SVGR loader configured anywhere in the repo. This is a real latent bug (confirmed via Next's own type declarations, which type `.svg` imports as `any` specifically to avoid clashing with SVGR) — but nothing the Fleets feature uses touches `ArrowLeftIcon`, so it was left as-is and is called out here rather than fixed silently as part of an unrelated feature branch.

### Verification performed

- `tsc --noEmit` and `eslint` both run clean (aside from the two Prisma-client files noted above)
- `next build` completes successfully
- Dev server smoke-tested: both `/en/fleets` and `/fr/fleets` return 200 with correctly localized copy ("Your fleets"/"Create a fleet" vs. "Vos flottes"/"Créer une flotte")

### Not verified

- **Pixel-level fidelity at exactly 1920×1080 and 1400×900.** This sandbox has no downloadable headless-browser binary (Playwright's CDN is also blocked), so I could not screenshot the two target resolutions. The grid (`FleetsList.tsx`) uses standard Tailwind breakpoints that reduce column count at narrower widths, but you should verify the exact spacing/column count against Figma in devtools.
- **The live end-to-end flow against a real database** (create → list updates instantly) — the code path is written and the query/cache logic is unit-reasoned, but it hasn't been exercised against a live Postgres instance since none was reachable here.
- No automated tests were added. The brief's testing section says to match whatever test runner is already configured and not introduce a new one — this scaffold has none configured at all, so that requirement doesn't apply as written. Flagging rather than unilaterally adding Vitest/Playwright as a new toolchain choice.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
