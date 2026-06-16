import { Inter, Bebas_Neue, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import DevtoolsRemover from "@/components/DevtoolsRemover";
import CustomCursor from "@/components/ui/CustomCursor";
import Preloader from "@/components/sections/Preloader";

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
});

export const metadata = {
  title: "Muhammad Bilal Iftikhar — Senior Software Engineer & AI Integration Specialist",
  description:
    "I architect intelligent systems that scale, surprise, and solve. Senior Software Engineer specializing in AI/ML integration — LLMs, RAG pipelines, AI agents — and modern full-stack web development.",
  keywords:
    "Muhammad Bilal Iftikhar, Senior Software Engineer, AI Integration Specialist, AI Engineer, LLM, RAG, LangChain, OpenAI, Claude, Vector Databases, Next.js, React, Python, Full Stack Developer, Machine Learning, AI Agents",
  authors: [{ name: "Muhammad Bilal Iftikhar" }],
  creator: "Muhammad Bilal Iftikhar",
  metadataBase: new URL("https://bilaliftikhar.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bilaliftikhar.com",
    title: "Muhammad Bilal Iftikhar — Senior Software Engineer & AI Integration Specialist",
    description: "I architect intelligent systems that scale, surprise, and solve.",
    siteName: "Bilal Iftikhar",
    images: [{ url: "/profile.png", width: 1200, height: 1200, alt: "Muhammad Bilal Iftikhar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Bilal Iftikhar — Senior Software Engineer & AI Integration Specialist",
    description: "I architect intelligent systems that scale, surprise, and solve.",
    images: ["/profile.png"],
  },
  icons: {
    icon: [{ url: "/profile.png", type: "image/png" }],
    apple: [{ url: "/profile.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport = {
  themeColor: "#050510",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${bebas.variable} ${syne.variable} ${mono.variable} antialiased`}
      >
        <DevtoolsRemover />
        <Preloader />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
