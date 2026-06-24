import { cn } from "@my-ui/ui/lib/utils";
import { Loader2Icon } from "lucide-react";
import type React from "react";

export function Spinner({
  className,
  ...props
}: React.ComponentProps<"output">): React.ReactElement {
  return (
    <output
      aria-label="Loading"
      className={cn("inline-flex items-center justify-center", className)}
      {...props}
    >
      <Loader2Icon aria-hidden="true" className="animate-spin" />
    </output>
  );
}
