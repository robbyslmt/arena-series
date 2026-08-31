# Arena Series Dashboard — THE COLLECTION (20 sites)

Hub dashboard for the 20-site cinematic destination collection. Live: https://arena-series-dashboard.vercel.app

## Branches (IMPORTANT — do not change)

| Branch | Role | Deploys to |
|---|---|---|
| `master` | **Vercel source of truth** — vite app + `src/` + `live-output/` (merged static build) + `scripts/merge.mjs` | **Vercel production** (GitHub auto-deploy, re-linked 2026-08-31) |
| `gh-pages` | Flattened static mirror of `live-output/` | GitHub Pages → robbyslmt.github.io/arena-series |
| `main` | Legacy flat-mirror branch (historical). Kept for reference only — **not** used by any deploy. | — |

## Workflow

1. Edit sources under `src/` (and/or merged sites under `live-output/sites/<slug>/`).
2. Rebuild the hub: `npm run build`.
3. Re-merge sites into `live-output/`: `node scripts/merge.mjs` (non-destructive).
4. Commit + push `master` → Vercel auto-deploys production.
5. To update GitHub Pages, re-sync the `gh-pages` branch from `live-output/`.

## Vercel

- Project: `arena-series-dashboard` (team: directions-projects)
- Build: static — `vercel.json` sets `outputDirectory: live-output`
- 2026-08-31: GitHub↔Vercel integration was broken since 2026-08-13 (manual CLI deploys in the gap); re-linked via `vercel git connect`. If auto-deploy ever stops again: `vercel git connect --yes` from this folder.
