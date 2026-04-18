import type { Metadata } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BackgroundDots from "@/components/BackgroundDots";
import ScrollProgress from "@/components/ScrollProgress";
import CursorSpotlight from "@/components/CursorSpotlight";
import SiteEnhancements from "@/components/SiteEnhancements";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dannyamezquita.com"),
  title: {
    default: "Danny Amezquita — UX Engineer & Frontend Developer",
    template: "%s · Danny Amezquita",
  },
  description:
    "Danny Amezquita is a UX Engineer and Frontend Developer based in Texas, designing clear interfaces and building performant web apps.",
  keywords: [
    "Danny Amezquita",
    "UX Engineer",
    "Frontend Developer",
    "UI/UX Designer",
    "Software Engineer",
    "Next.js",
    "React",
    "Texas",
  ],
  authors: [{ name: "Danny Amezquita" }],
  creator: "Danny Amezquita",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dannyamezquita.com",
    siteName: "Danny Amezquita",
    title: "Danny Amezquita — UX Engineer & Frontend Developer",
    description:
      "UX Engineer and Frontend Developer based in Texas. Designing clear interfaces and building performant web apps.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Danny Amezquita — UX Engineer & Frontend Developer",
    description:
      "UX Engineer and Frontend Developer based in Texas. Designing clear interfaces and building performant web apps.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">{`
          try {
            var stored = localStorage.getItem('theme');
            var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            var t = stored || (prefersDark ? 'dark' : 'light');
            var html = document.documentElement;
            if (t === 'dark') {
              html.classList.add('dark');
              html.removeAttribute('data-theme');
            } else {
              html.classList.remove('dark');
              html.setAttribute('data-theme', 'light');
            }
          } catch (e) {}
        `}</Script>
      </head>
      <body className={`${plusJakartaSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased overflow-x-hidden`}>
        <ScrollProgress />
        <CursorSpotlight />
        <BackgroundDots count={140} />
        <Navbar />
        {children}
        <SiteEnhancements />
      </body>
    </html>
  );
}
