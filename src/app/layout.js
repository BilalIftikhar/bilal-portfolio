import { Inter, Bebas_Neue, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Preloader from "@/components/sections/Preloader";
import StructuredData from "@/components/StructuredData";
import MotionProvider from "@/components/MotionProvider";
import { PERSON, SITE_URL, TAGLINE } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});
const bebas = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
const syne = Syne({
  variable: "--font-syne",
  weight: ["600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});
const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  // Only the mono weights actually used on the page.
  weight: ["400", "500"],
});

const TITLE = `${PERSON.name} — ${PERSON.jobTitle}`;

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s — ${PERSON.shortName}`,
  },
  description:
    "Senior software engineer specialising in AI integration — LLM features, RAG pipelines and AI agents — plus modern full-stack web development with Next.js, React, Node.js and Laravel.",
  applicationName: `${PERSON.shortName} — Portfolio`,
  keywords: [
    "Muhammad Bilal Iftikhar",
    "Bilal Iftikhar",
    "Senior Software Engineer",
    "AI Integration Specialist",
    "AI Engineer",
    "LLM developer",
    "RAG pipelines",
    "LangChain developer",
    "OpenAI API",
    "Claude API",
    "vector databases",
    "AI agents",
    "Next.js developer",
    "React developer",
    "Laravel developer",
    "full stack developer Pakistan",
    "hire AI developer",
  ],
  authors: [{ name: PERSON.name, url: SITE_URL }],
  creator: PERSON.name,
  publisher: PERSON.name,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: SITE_URL,
    title: TITLE,
    description: TAGLINE,
    siteName: `${PERSON.shortName} — Portfolio`,
    firstName: "Muhammad Bilal",
    lastName: "Iftikhar",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: TAGLINE,
  },
  icons: {
    icon: [{ url: "/profile.png", type: "image/png" }],
    apple: [{ url: "/profile.png", sizes: "180x180", type: "image/png" }],
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
};

export const viewport = {
  themeColor: "#050510",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${bebas.variable} ${syne.variable} ${mono.variable} antialiased`}
      >
        <StructuredData />
        <a href="#home" className="skip-link">
          Skip to content
        </a>
        <MotionProvider>
          <Preloader />
          <ScrollProgress />
          <CustomCursor />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
