import type React from "react"
import type { Metadata } from "next"
import { Poppins, Orbitron } from "next/font/google"
import "./globals.css"
import CursorFollower from "@/components/cursor-follower"
import Footer from "@/components/footer"
import MobileNav from "@/components/mobile-nav"

// Use Poppins for a more modern look
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
})

// Use Orbitron for energetic text in the footer
const orbitron = Orbitron({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-orbitron",
})

export const metadata: Metadata = {
  title: "WHY KARTHIKEYA | Full-Stack Developer & UI/UX Designer",
  description:
    "Portfolio of Karthikeya, a full-stack developer and UI/UX designer focused on creating innovative digital experiences with React and Next.js.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${orbitron.variable}`}>
      <body className="font-poppins">
        {/* Background gradient */}
        <div className="fixed inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] -z-10" />

        {/* Animated background elements */}
        <div className="fixed inset-0 -z-5 overflow-hidden">
          {/* Gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF5722]/20 rounded-full filter blur-[100px] animate-float" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full filter blur-[80px] animate-float-slow" />
          <div className="absolute top-2/3 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full filter blur-[60px] animate-float-reverse" />

          {/* Grid pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        </div>

        {children}
        <Footer />
        <CursorFollower />
        <MobileNav />
      </body>
    </html>
  )
}



import './globals.css'