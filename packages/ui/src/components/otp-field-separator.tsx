"use client";

import { OTPFieldPreview as OTPFieldPrimitive } from "@base-ui/react/otp-field";
import { Separator } from "@my-ui/ui/components/separator";
import { cn } from "@my-ui/ui/lib/utils";
import type * as React from "react";

export function OTPFieldSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>): React.ReactElement {
  return (
    <OTPFieldPrimitive.Separator
      render={
        <Separator
          className={cn(
            "rounded-full bg-input data-[orientation=horizontal]:h-0.5 data-[orientation=horizontal]:w-3",
            className
          )}
          orientation="horizontal"
          {...props}
        />
      }
    />
  );
}
