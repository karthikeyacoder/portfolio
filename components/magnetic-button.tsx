"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion } from "framer-motion"

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  glowColor?: string
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  glowColor = "rgba(255, 87, 34, 0.7)",
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e
    const { left, top, width, height } = buttonRef.current!.getBoundingClientRect()

    const x = (clientX - (left + width / 2)) * 0.3
    const y = (clientY - (top + height / 2)) * 0.3

    setPosition({ x, y })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.button
      ref={buttonRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      whileTap={{ scale: 0.95 }}
      whileHover={{
        boxShadow: `0 0 20px ${glowColor}`,
      }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 opacity-0"
        animate={{
          opacity: position.x !== 0 || position.y !== 0 ? 0.3 : 0,
          background: `radial-gradient(circle at ${position.x + 50}% ${position.y + 50}%, ${glowColor}, transparent 70%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.button>
  )
}

