# F3 Muletown Website

This is a minimal Next.js app that immediately redirects visitors to the official F3 Muletown region page on the F3 Nation site.

## What it does

- `app/page.tsx` triggers a redirect on load.
- The redirect target lives in `lib/redirect.ts`; edit that file if the canonical region URL changes.

## Run locally

- Install dependencies from the repo root: `pnpm install`.
- Start just this app in dev mode: `pnpm --filter f3muletown-website dev` (serves http://localhost:3000).
- Preview a production build: `pnpm --filter f3muletown-website build && pnpm --filter f3muletown-website start`.

## Notes

- There is no UI or API surface—this app only exists to host the redirect.
