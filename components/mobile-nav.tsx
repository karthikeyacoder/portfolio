"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Briefcase, User, FileText, Mail } from "lucide-react"

export default function MobileNav() {
  const [showBottomNav, setShowBottomNav] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Only show on mobile
    const checkMobile = () => {
      setShowBottomNav(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  if (!showBottomNav) return null

  return (
    <>
      {/* Bottom navigation bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-md border-t border-white/10 z-50">
        <div className="flex justify-around items-center h-16">
          <NavItem href="/" icon={<Home size={20} />} label="Home" active={pathname === "/"} />
          <NavItem
            href="/work"
            icon={<Briefcase size={20} />}
            label="Work"
            active={pathname === "/work" || pathname.startsWith("/work/")}
          />
          <NavItem href="/about" icon={<User size={20} />} label="About" active={pathname === "/about"} />
          <NavItem href="/resume" icon={<FileText size={20} />} label="Resume" active={pathname === "/resume"} />
          <NavItem href="/contact" icon={<Mail size={20} />} label="Contact" active={pathname === "/contact"} />
        </div>
      </div>

      {/* Add padding to the bottom of the page to account for the nav bar */}
      <div className="h-16 md:h-0"></div>
    </>
  )
}

function NavItem({
  href,
  icon,
  label,
  active,
}: { href: string; icon: React.ReactNode; label: string; active: boolean }) {
  return (
    <Link href={href} className="flex flex-col items-center justify-center w-full h-full">
      <div className={`flex flex-col items-center justify-center ${active ? "text-[#FF5722]" : "text-gray-400"}`}>
        <div className="relative">
          {icon}
          {active && (
            <motion.div
              layoutId="activeIndicator"
              className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#FF5722] rounded-full"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </div>
        <span className="text-xs mt-1">{label}</span>
      </div>
    </Link>
  )
}

