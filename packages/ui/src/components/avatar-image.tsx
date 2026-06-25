"use client";

import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { cn } from "@my-ui/ui/lib/utils";
import type React from "react";

export function AvatarImage({
  className,
  ...props
}: AvatarPrimitive.Image.Props): React.ReactElement {
  return (
    <AvatarPrimitive.Image
      className={cn("size-full object-cover", className)}
      data-slot="avatar-image"
      {...props}
    />
  );
}
