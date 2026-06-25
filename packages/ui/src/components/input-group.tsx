"use client";

import { Input } from "@my-ui/ui/components/input";
import type { InputProps } from "@my-ui/ui/components/input";
import { Textarea } from "@my-ui/ui/components/textarea";
import type { TextareaProps } from "@my-ui/ui/components/textarea";
import { cn } from "@my-ui/ui/lib/utils";
import type * as React from "react";

export function InputGroup({
  className,
  ...props
}: React.ComponentProps<"fieldset">): React.ReactElement {
  return (
    <fieldset
      className={cn(
        "relative m-0 inline-flex w-full min-w-0 items-center rounded-lg border border-input bg-background not-dark:bg-clip-padding p-0 text-base text-foreground shadow-xs/5 ring-ring/24 transition-shadow overflow-hidden has-[input:focus-visible,textarea:focus-visible]:has-[input[aria-invalid],textarea[aria-invalid]]:border-destructive/64 has-[input:focus-visible,textarea:focus-visible]:has-[input[aria-invalid],textarea[aria-invalid]]:ring-destructive/16 has-[textarea]:h-auto has-data-[align=block-end]:h-auto has-data-[align=block-start]:h-auto has-data-[align=block-end]:flex-col has-data-[align=block-start]:flex-col has-[input:focus-visible,textarea:focus-visible]:border-ring has-[input[aria-invalid],textarea[aria-invalid]]:border-destructive/36 has-autofill:bg-foreground/4 has-[input:disabled,textarea:disabled]:opacity-64 has-[input:disabled,textarea:disabled,input:focus-visible,textarea:focus-visible,input[aria-invalid],textarea[aria-invalid]]:shadow-none has-[input:focus-visible,textarea:focus-visible]:ring-[3px] sm:text-sm dark:bg-input/32 dark:has-autofill:bg-foreground/8 dark:has-[input[aria-invalid],textarea[aria-invalid]]:ring-destructive/24 has-data-[align=inline-start]:**:[[data-size=sm]_input]:ps-1.5 has-data-[align=inline-end]:**:[[data-size=sm]_input]:pe-1.5 *:[[data-slot=input-control],[data-slot=textarea-control]]:contents *:[[data-slot=input-control],[data-slot=textarea-control]]:before:hidden has-[[data-align=block-start],[data-align=block-end]]:**:[input]:h-auto has-data-[align=inline-start]:**:[input]:ps-2 has-data-[align=inline-end]:**:[input]:pe-2 has-data-[align=block-end]:**:[input]:pt-1.5 has-data-[align=block-start]:**:[input]:pb-1.5 **:[textarea]:min-h-20.5 **:[textarea]:resize-none **:[textarea]:py-[calc(--spacing(3)-1px)] **:[textarea]:max-sm:min-h-23.5 **:[textarea_button]:rounded-[calc(var(--radius-md)-1px)]",
        className
      )}
      data-slot="input-group"
      {...props}
    />
  );
}

export function InputGroupInput({
  className,
  ...props
}: InputProps): React.ReactElement {
  return <Input className={className} unstyled {...props} />;
}

export function InputGroupTextarea({
  className,
  ...props
}: TextareaProps): React.ReactElement {
  return <Textarea className={className} unstyled {...props} />;
}
