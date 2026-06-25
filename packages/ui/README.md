# @my-ui/ui

Reusable React components built on Base UI and Tailwind CSS v4.

## Install

```bash
bun add @my-ui/ui @base-ui/react tailwindcss
```

Import the global token stylesheet once in your app:

```tsx
import "@my-ui/ui/globals.css";
```

Import components by path:

```tsx
import { Button } from "@my-ui/ui/components/button";
```

## Theme Tokens

The package uses CSS variables for color, radius, spacing, font, and motion. Defaults are in `src/styles/globals.css`; the sandbox edits those variables live and persists overrides to `localStorage`.

## Build And Publish

```bash
bun run --filter @my-ui/ui build
cd packages/ui && bun publish
```

Rename the package scope in `package.json` before publishing if `@my-ui` is not your npm scope.
