# my-ui

A reusable React UI package built on Base UI primitives, Tailwind CSS v4 tokens, and a Next.js sandbox for live theme editing. The sandbox deploys to Vercel with root directory `apps/sandbox` for a shareable preview of the component library.

## Structure

- `packages/ui` (`@my-ui/ui`) is the publishable component package.
- `apps/sandbox` is the Next.js App Router demo that imports `@my-ui/ui`.
- `docs/api-deviations.md` records intentional deviations from the Coss UI starting point.

## Commands

From the repo root:

```bash
bun install
bun run dev        # UI watch build + sandbox at http://localhost:3000
bun run build      # build UI, then sandbox
bun run check      # API drift + Ultracite lint/format
bun run typecheck  # TypeScript across workspaces
```

`bun run dev` runs the UI package in watch mode and the sandbox in parallel, so local development does not require a separate build step.

## Publishing

Update the package name in `packages/ui/package.json` if you want a personal npm scope, then run:

```bash
bun run build:ui
cd packages/ui && bun publish
```

Published installs ship prebuilt `dist/` output, so consumers only need `next build` (or their own bundler)—no monorepo prebuild step required.
