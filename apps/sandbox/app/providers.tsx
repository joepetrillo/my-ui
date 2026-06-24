"use client";

import { ThemeProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

const themeScriptProps = {
  type: typeof window === "undefined" ? "text/javascript" : "text/plain",
} satisfies NonNullable<ThemeProviderProps["scriptProps"]>;

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem
      scriptProps={themeScriptProps}
    >
      {children}
    </ThemeProvider>
  );
}
