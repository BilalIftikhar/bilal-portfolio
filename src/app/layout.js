import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "aos/dist/aos.css";
import DevtoolsRemover from "@/components/DevtoolsRemover";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Muhammad Bilal Iftikhar - Senior Software Engineer | Full Stack Developer",
  description: "Senior Software Engineer with 5+ years of experience building scalable, user-centric web applications using Laravel, Next.js, and modern JavaScript frameworks. Skilled in REST API development, database optimization, and responsive UI design.",
  keywords: "Senior Software Engineer, Full Stack Developer, Laravel Developer, React Developer, Next.js, Vue.js, PHP, JavaScript, Web Development, REST APIs, MySQL, PostgreSQL, MongoDB, Lahore Pakistan",
  authors: [{ name: "Muhammad Bilal Iftikhar" }],
  creator: "Muhammad Bilal Iftikhar",
  metadataBase: new URL("https://bilaliftikhar.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bilaliftikhar.com",
    title: "Muhammad Bilal Iftikhar - Senior Software Engineer",
    description: "Full Stack Software Engineer with 5+ years of experience building scalable web applications. Forging the digital pulse of innovation.",
    siteName: "Bilal Iftikhar Portfolio",
    images: [
      {
        url: "/profile.png",
        width: 1200,
        height: 1200,
        alt: "Muhammad Bilal Iftikhar - Senior Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Bilal Iftikhar - Senior Software Engineer",
    description: "Full Stack Software Engineer with 5+ years of experience building scalable web applications",
    images: ["/profile.png"],
  },
  icons: {
    icon: [
      { url: "/profile.png", type: "image/png" },
      { url: "/profile.png", sizes: "32x32", type: "image/png" },
      { url: "/profile.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/profile.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/profile.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DevtoolsRemover />
        {children}
      </body>
    </html>
  );
}
