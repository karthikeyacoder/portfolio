"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: i * 0.05,
      },
    }),
    hover: {
      scale: 1.05,
      textShadow: "0 0 8px rgba(255, 87, 34, 0.7)",
      transition: { duration: 0.2 },
    },
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        backgroundColor: isScrolled ? "rgba(15, 23, 42, 0.85)" : "transparent",
        backdropFilter: isScrolled ? "blur(12px)" : "none",
        boxShadow: isScrolled ? "0 4px 30px rgba(0, 0, 0, 0.1)" : "none",
        borderBottom: isScrolled ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <Link href="/" className="text-sm font-medium uppercase text-glow">
              WHY KARTHIKEYA
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {[
              { name: "WORK", path: "/work" },
              { name: "ABOUT", path: "/about" },
              { name: "RESUME", path: "/resume" },
              { name: "CONTACT", path: "/contact" },
            ].map((item, index) => (
              <motion.div
                key={item.name}
                custom={index}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                variants={navItemVariants}
              >
                <NavLink href={item.path} active={pathname === item.path}>
                  {item.name}
                </NavLink>
              </motion.div>
            ))}
          </div>

          <div className="hidden md:flex space-x-8">
            {[
              { name: "INSTAGRAM", url: "https://www.instagram.com/mainly.karthikeya/" },
              { name: "GITHUB", url: "https://github.com/karthikeyacoder" },
            ].map((item, index) => (
              <motion.div
                key={item.name}
                custom={index}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                variants={navItemVariants}
              >
                <NavLink href={item.url} external>
                  {item.name}
                </NavLink>
              </motion.div>
            ))}
          </div>

          {/* Mobile menu button */}
          <motion.button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden glass absolute top-full left-0 right-0"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              {[
                { name: "WORK", path: "/work" },
                { name: "ABOUT", path: "/about" },
                { name: "RESUME", path: "/resume" },
                { name: "CONTACT", path: "/contact" },
              ].map((item, index) => (
                <MobileNavLink
                  key={item.name}
                  href={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  active={pathname === item.path}
                >
                  {item.name}
                </MobileNavLink>
              ))}
              <div className="pt-4 border-t border-white/10">
                <MobileNavLink href="https://www.instagram.com/mainly.karthikeya/">INSTAGRAM</MobileNavLink>
                <MobileNavLink href="https://github.com/karthikeyacoder">GITHUB</MobileNavLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

function NavLink({
  href,
  children,
  active = false,
  external = false,
}: {
  href: string
  children: React.ReactNode
  active?: boolean
  external?: boolean
}) {
  return (
    <Link
      href={href}
      className={`text-sm font-medium uppercase relative group ${active ? "text-[#FF5722] text-glow" : ""}`}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {children}
      <motion.span
        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#FF5722] origin-left"
        initial={{ scaleX: active ? 1 : 0 }}
        animate={{ scaleX: active ? 1 : 0 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 0.3 }}
        style={{ boxShadow: "0 0 10px rgba(255, 87, 34, 0.8)" }}
      />
      <motion.span
        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#FF5722] origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
        style={{ boxShadow: "0 0 10px rgba(255, 87, 34, 0.8)" }}
      />
    </Link>
  )
}

function MobileNavLink({
  href,
  children,
  onClick,
  active = false,
}: {
  href: string
  children: React.ReactNode
  onClick?: () => void
  active?: boolean
}) {
  return (
    <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
      <Link
        href={href}
        className={`block py-2 text-base font-medium transition-colors ${
          active ? "text-[#FF5722] text-glow" : "hover:text-[#FF5722] hover:text-glow"
        }`}
        onClick={onClick}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </Link>
    </motion.div>
  )
}

