import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: { default: "As Sadaqah — Giving with confidence", template: "%s | As Sadaqah" },
  description: "Trusted digital infrastructure for Islamic community giving. Discover verified mosques, support reviewed projects and follow the impact.",
  applicationName: "As Sadaqah",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000")
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Providers>{children}</Providers></body></html>;
}
