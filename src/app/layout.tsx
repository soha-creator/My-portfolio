import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Serif, JetBrains_Mono, Inter_Tight } from "next/font/google";
import { Providers } from "@/components/Providers";
import { profile } from "@/data/profile";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
});

const body = Inter_Tight({
  variable: "--font-body",
  subsets: ["latin"],
});

const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${profile.fullName} — ${profile.role}`,
  description: profile.intro,
  openGraph: {
    title: `${profile.fullName} — ${profile.role}`,
    description: profile.intro,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f0e9" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0e0c" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${serif.variable} ${mono.variable} antialiased`}
    >
      <body className="grain min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
