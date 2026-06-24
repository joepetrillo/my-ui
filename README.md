# my-ui

A reusable React UI package built on Base UI primitives, Tailwind CSS v4 tokens, and a Next.js sandbox for live theme editing.

## Structure

- `packages/ui` is the publishable component package.
- `apps/sandbox` is the Next.js App Router sandbox that imports `@my-ui/ui`.
- `docs/api-deviations.md` records intentional deviations from the Coss UI starting point.

## Commands

```bash
npm install
npm run dev
npm run build
npm run check
```

The sandbox runs at `http://localhost:3000`.

## Publishing

Update the package name in `packages/ui/package.json` if you want a personal npm scope, then run:

```bash
npm run build:ui
npm publish -w @my-ui/ui
```
