"use client";

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import type React from "react";

export function Collapsible({
  ...props
}: CollapsiblePrimitive.Root.Props): React.ReactElement {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

export { CollapsiblePrimitive };
