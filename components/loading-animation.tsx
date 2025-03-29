"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"

export default function LoadingAnimation() {
  const [progress, setProgress] = useState(0)
  const [text, setText] = useState("")
  const fullText = "KARTHIKEYA"
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Text reveal animation
  useEffect(() => {
    let currentIndex = 0

    intervalRef.current = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.substring(0, currentIndex))
        currentIndex++
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current)
      }
    }, 150)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  // Progress bar animation
  useEffect(() => {
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
          return 100
        }
        return prev + 1
      })
    }, 30)

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
    }
  }, [])

  // Particle animation
  const particles = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 2 + 1,
    delay: Math.random() * 2,
  }))

  return (
    <motion.div
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-[#FF5722] rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: particle.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Text animation */}
        <div className="mb-8 overflow-hidden">
          <motion.h1
            className="text-7xl md:text-9xl font-bold tracking-tighter text-white"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {text.split("").map((char, index) => (
              <motion.span
                key={index}
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  textShadow: [
                    "0 0 0px rgba(255, 87, 34, 0)",
                    "0 0 20px rgba(255, 87, 34, 0.8)",
                    "0 0 0px rgba(255, 87, 34, 0)",
                  ],
                }}
                transition={{
                  opacity: { duration: 0.2 },
                  y: { duration: 0.4, ease: "easeOut" },
                  textShadow: { duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" },
                  delay: index * 0.1,
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>
        </div>

        {/* Progress bar */}
        <div className="w-64 md:w-96 h-1 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#FF5722] to-purple-500"
            style={{ width: `${progress}%` }}
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Loading text */}
        <motion.p
          className="mt-4 text-gray-400 text-sm"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          Loading experience...
        </motion.p>
      </div>

      {/* Circular animation */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-64 h-64 md:w-96 md:h-96 rounded-full border-2 border-[#FF5722]/20"
          animate={{
            scale: [1, 1.2, 1],
            borderWidth: ["2px", "1px", "2px"],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute w-48 h-48 md:w-72 md:h-72 rounded-full border-2 border-purple-500/20"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            rotate: { duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            scale: { duration: 3, repeat: Number.POSITIVE_INFINITY },
            opacity: { duration: 3, repeat: Number.POSITIVE_INFINITY },
          }}
        />
      </div>
    </motion.div>
  )
}

