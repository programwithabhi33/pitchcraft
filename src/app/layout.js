import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionWrapper from "./components/SessionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "PitchCraft AI – Cold Email Generator",
  description:
    "Generate polished cold emails in under 30 seconds. Built for freelancers, agencies, and consultants.",
  keywords:
    "cold email generator, freelance tools, cold outreach AI",
  openGraph: {
    title: "PitchCraft AI – Cold Email Generator",
    description:
      "AI-powered cold emails ready to send in 30 seconds.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#09090B]">
        <SessionWrapper>
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
