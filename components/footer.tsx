"use client"

import type React from "react"

import Link from "next/link"
import { motion } from "framer-motion"
import { Github, Instagram, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="flex flex-col items-center justify-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-8 w-full max-w-3xl mx-auto"
          >
            <h2
              className="text-5xl md:text-7xl font-bold tracking-wider text-center text-glow font-energetic"
              style={{ letterSpacing: "0.15em" }}
            >
              KARTHIKEYA
            </h2>
          </motion.div>

          {/* Social links */}
          <motion.div
            className="flex space-x-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <SocialLink href="https://github.com/karthikeyacoder" icon={<Github size={20} />} />
            <SocialLink href="https://www.instagram.com/mainly.karthikeya/" icon={<Instagram size={20} />} />
            <SocialLink href="mailto:hello@karthikeya.design" icon={<Mail size={20} />} />
          </motion.div>

          {/* View Profile button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <Link
              href="/about"
              className="glass px-6 py-3 rounded-full text-sm font-medium border border-white/10 hover:border-white/30 transition-all hover:text-glow"
            >
              View Profile
            </Link>
          </motion.div>

          {/* Admin Login - small and subtle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <Link href="/admin/login" className="text-xs text-gray-500 hover:text-gray-400 transition-colors">
              Admin
            </Link>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-sm text-gray-400"
          >
            © {new Date().getFullYear()} Karthikeya. All rights reserved.
          </motion.div>
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#FF5722]/30 to-transparent" />

        {/* Animated particles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#FF5722] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </footer>
  )
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="glass p-3 rounded-full text-white/80 hover:text-white border border-white/10 hover:border-white/30 transition-all"
      whileHover={{
        y: -5,
        boxShadow: "0 0 15px rgba(255, 87, 34, 0.5)",
      }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
    </motion.a>
  )
}

