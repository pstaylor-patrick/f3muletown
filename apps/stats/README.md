# F3 Muletown Stats Redirect

A lightweight Next.js app that forwards visitors to the year-to-date F3 Muletown stats dashboard hosted on yourfullstack.com.

## What it does

- On load, `app/page.tsx` builds the target URL with the current year and `location=f3muletown`, then redirects the user.
- Update the location or base URL in `app/page.tsx` if the stats endpoint changes.

## Run locally

- Install dependencies from the repo root: `pnpm install`.
- Start this app in dev mode: `pnpm --filter f3muletown-stats dev` (serves http://localhost:3001).
- Preview a production build: `pnpm --filter f3muletown-stats build && pnpm --filter f3muletown-stats start` (set `PORT` to 3001 if you want to mirror dev).

## Notes

- This app has no UI—its only purpose is to redirect to the external stats page.
