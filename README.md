# F3 Muletown

Monorepo for two small Next.js apps that route traffic to the right F3 Muletown destinations.

## Apps & ports

- `apps/web` (`f3muletown-website`): Redirects to the official F3 Muletown region page; dev server on http://localhost:3000. Details: apps/web/README.md.
- `apps/stats` (`f3muletown-stats`): Redirects to the year-to-date stats dashboard on yourfullstack.com; dev server on http://localhost:3001 (set `PORT=3001` when running a production build). Details: apps/stats/README.md.

## Quick start

- Install dependencies with `pnpm install`.
- Run both apps during development with `pnpm dev` (Turbo starts each app on its configured port).
- Work on a single app with `pnpm --filter f3muletown-website dev` or `pnpm --filter f3muletown-stats dev`.
- Common tasks: `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`.

## Maintainers guide

- Redirect targets live in `apps/web/lib/redirect.ts` and `apps/stats/app/page.tsx`; edit them if URLs or locations change.
- Keep port conventions: 3000 for the web redirect, 3001 for stats. Set `PORT` explicitly when running `next start` to avoid collisions.
- New apps belong under `apps/`; add a short README and note their dev port here to keep the registry current.
