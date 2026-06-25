"use client";

import type { toggleVariants } from "@my-ui/ui/components/toggle-variants";
import type { VariantProps } from "class-variance-authority";
import * as React from "react";

export const ToggleGroupContext: React.Context<
  VariantProps<typeof toggleVariants>
> = React.createContext<VariantProps<typeof toggleVariants>>({
  size: "default",
  variant: "default",
});
