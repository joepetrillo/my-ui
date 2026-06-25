"use client";

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { toggleVariants } from "@my-ui/ui/components/toggle-variants";
import { cn } from "@my-ui/ui/lib/utils";
import type { VariantProps } from "class-variance-authority";
import type React from "react";

export function Toggle({
  className,
  variant,
  size,
  ...props
}: TogglePrimitive.Props &
  VariantProps<typeof toggleVariants>): React.ReactElement {
  return (
    <TogglePrimitive
      className={cn(toggleVariants({ className, size, variant }))}
      data-slot="toggle"
      {...props}
    />
  );
}

export { TogglePrimitive };
