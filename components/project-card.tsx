"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"
import GlassCard from "./glass-card"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  link: string
}

export default function ProjectCard({ title, description, image, link }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <GlassCard className="p-0 overflow-hidden" hoverEffect={false} glowColor="rgba(255, 87, 34, 0.3)">
      <motion.div
        className="h-full"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
      >
        <Link href={link} className="block group h-full">
          <div className="overflow-hidden relative">
            <motion.div
              animate={{
                scale: isHovered ? 1.05 : 1,
                filter: isHovered ? "brightness(1.1)" : "brightness(1)",
              }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={title}
                width={600}
                height={400}
                className="w-full h-64 object-cover"
              />
            </motion.div>

            {/* Overlay with animated border */}
            <motion.div
              className="absolute inset-0 border-2 border-transparent"
              animate={{
                borderColor: isHovered ? "#FF5722" : "transparent",
                opacity: isHovered ? 1 : 0,
                boxShadow: isHovered ? "inset 0 0 20px rgba(255, 87, 34, 0.3)" : "none",
              }}
              transition={{ duration: 0.3 }}
            />

            {/* View Project button that appears on hover */}
            <motion.div
              className="absolute bottom-4 right-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 10,
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="glass px-4 py-2 rounded-full text-sm font-medium text-white border border-white/10">
                View Project
              </span>
            </motion.div>
          </div>
          <div className="p-6">
            <motion.h3
              className="text-xl font-bold transition-colors"
              animate={{
                color: isHovered ? "#FF5722" : "#ffffff",
                textShadow: isHovered ? "0 0 8px rgba(255, 87, 34, 0.7)" : "none",
              }}
            >
              {title}
            </motion.h3>
            <p className="text-gray-300 mt-2">{description}</p>
          </div>
        </Link>
      </motion.div>
    </GlassCard>
  )
}

