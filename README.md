# F3 Muletown

Monorepo for two small Next.js apps that route traffic to the right F3 Muletown destinations.

## Apps & ports

- `apps/web` (`f3muletown-website`): Redirects to the official F3 Muletown region page; dev server on http://localhost:3000. Details: apps/web/README.md.
- `apps/stats` (`f3muletown-stats`): Redirects to the region's Pax Vault stats page (https://pax-vault.f3nation.com/stats/region/35838); dev server on http://localhost:3001 (set `PORT=3001` when running a production build). Details: apps/stats/README.md.

## Quick start

- Install dependencies with `pnpm install`.
- Run both apps during development with `pnpm dev` (Turbo starts each app on its configured port).
- Work on a single app with `pnpm --filter f3muletown-website dev` or `pnpm --filter f3muletown-stats dev`.
- Common tasks: `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`.

## Hosting

Production traffic for f3muletown.com, www.f3muletown.com and stats.f3muletown.com is answered by a CloudFront Function in AWS account 141147250900. The Terraform is in `infra/` and is applied locally (see infra/README.md). DNS is the Route53 zone in the personal AWS account. The Next.js apps are kept for local development and as a fallback; they are not the production front door.

## Maintainers guide

- Redirect targets live in `packages/redirects/src/index.ts`. The production copy lives in `infra/redirect.js`; a unit test fails if the two drift.
- Keep port conventions: 3000 for the web redirect, 3001 for stats. Set `PORT` explicitly when running `next start` to avoid collisions.
- New apps belong under `apps/`; add a short README and note their dev port here to keep the registry current.
