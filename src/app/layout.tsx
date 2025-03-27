import { Providers } from "./providers";
import Navbar from "./components/navbar";
import InitGlobalAppPopUps from "./app-popups";
import Script from "next/script";

import "./globals.css";

export const metadata = {
  title: {
    default: "Next.js AI Chatbot",
    template: `%s - Next.js AI Chatbot`,
  },
  description: "An AI-powered chatbot template built with Next.js and Vercel.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <Script id="suppress-warnings" strategy="beforeInteractive">
          {`
            // Suppress accessibility warnings at runtime
            (function() {
              if (typeof window !== 'undefined' && typeof console !== 'undefined') {
                const originalError = console.error;
                console.error = function(...args) {
                  if (
                    typeof args[0] === 'string' && (
                      args[0].includes('visible label') || 
                      args[0].includes('aria-label') || 
                      args[0].includes('aria-labelledby')
                    )
                  ) {
                    return;
                  }
                  return originalError.apply(console, args);
                };
              }
            })();
          `}
        </Script>
      </head>
      <body className="font-sans">
        <Providers>
          <InitGlobalAppPopUps />
          <main className="min-h-screen bg-background-secondary flex flex-col">
            <Navbar />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}