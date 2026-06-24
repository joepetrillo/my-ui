import { cn } from "@my-ui/ui/lib/utils";
import type React from "react";

export function Skeleton({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn("animate-pulse rounded-sm bg-muted", className)}
      data-slot="skeleton"
      {...props}
    />
  );
}
