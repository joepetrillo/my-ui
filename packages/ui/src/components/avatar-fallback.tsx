"use client";

import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { cn } from "@my-ui/ui/lib/utils";
import type React from "react";

export function AvatarFallback({
  className,
  ...props
}: AvatarPrimitive.Fallback.Props): React.ReactElement {
  return (
    <AvatarPrimitive.Fallback
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-muted",
        className
      )}
      data-slot="avatar-fallback"
      {...props}
    />
  );
}
