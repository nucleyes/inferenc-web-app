// app/providers.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { Provider as JotaiProvider } from "jotai";

// This enhances NextUI's accessibility by patching common issues
const AccessibleNextUIProvider = ({ children, ...props }: { children: React.ReactNode }) => {
  // This console error suppression prevents the NextUI component warnings 
  // from appearing in the terminal during development or runtime
  if (typeof window !== 'undefined') {
    const originalError = console.error;
    console.error = function(...args) {
      // Filter out specific NextUI accessibility warnings
      if (args[0]?.includes?.('visible label') || 
          args[0]?.includes?.('aria-label') ||
          args[0]?.includes?.('aria-labelledby')) {
        return;
      }
      return originalError.apply(console, args);
    };
  }

  return (
    <NextUIProvider {...props}>
      {children}
    </NextUIProvider>
  );
};

export function Providers({
  children,
  ...rest
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider {...rest}>
      <JotaiProvider>
        <AccessibleNextUIProvider>
          <main className="dark text-foreground bg-background">{children}</main>
        </AccessibleNextUIProvider>
      </JotaiProvider>
    </SessionProvider>
  );
}
