"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
  hoverEffect?: boolean
  glowColor?: string
}

export default function GlassCard({
  children,
  className = "",
  hoverEffect = true,
  glowColor = "rgba(255, 87, 34, 0.3)",
}: GlassCardProps) {
  return (
    <motion.div
      className={`relative backdrop-blur-md bg-white/10 border border-white/20 rounded-xl overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      whileHover={
        hoverEffect
          ? {
              y: -5,
              boxShadow: `0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 15px ${glowColor}`,
            }
          : {}
      }
      style={{
        boxShadow: `0 4px 15px rgba(0, 0, 0, 0.05), 0 0 5px ${glowColor}`,
      }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

