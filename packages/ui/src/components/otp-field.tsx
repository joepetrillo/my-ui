"use client";

import { OTPFieldPreview as OTPFieldPrimitive } from "@base-ui/react/otp-field";
import { cn } from "@my-ui/ui/lib/utils";
import type * as React from "react";

export function OTPField({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof OTPFieldPrimitive.Root> & {
  size?: "default" | "lg";
}): React.ReactElement {
  return (
    <OTPFieldPrimitive.Root
      className={cn(
        "flex items-center gap-2 has-disabled:opacity-64 has-disabled:**:data-[slot=otp-field-input]:shadow-none has-disabled:**:data-[slot=otp-field-input]:before:shadow-none!",
        className
      )}
      data-size={size}
      data-slot="otp-field"
      {...props}
    />
  );
}

export { OTPFieldPrimitive };
