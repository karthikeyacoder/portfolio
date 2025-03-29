"use client"

import { useEffect, useState } from "react"
import { motion, useSpring } from "framer-motion"

export default function CursorFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")
  const [isClicking, setIsClicking] = useState(false)

  // Use spring physics for smoother movement
  const springConfig = { damping: 25, stiffness: 300 }
  const cursorX = useSpring(0, springConfig)
  const cursorY = useSpring(0, springConfig)

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const mouseDown = () => setIsClicking(true)
    const mouseUp = () => setIsClicking(false)

    window.addEventListener("mousemove", mouseMove)
    window.addEventListener("mousedown", mouseDown)
    window.addEventListener("mouseup", mouseUp)

    // Add event listeners for cursor states
    const handleLinkEnter = () => setCursorVariant("link")
    const handleLinkLeave = () => setCursorVariant("default")
    const handleImageEnter = () => setCursorVariant("image")
    const handleImageLeave = () => setCursorVariant("default")
    const handleTextEnter = () => setCursorVariant("text")
    const handleTextLeave = () => setCursorVariant("default")

    const links = document.querySelectorAll("a, button")
    links.forEach((link) => {
      link.addEventListener("mouseenter", handleLinkEnter)
      link.addEventListener("mouseleave", handleLinkLeave)
    })

    const images = document.querySelectorAll("img")
    images.forEach((img) => {
      img.addEventListener("mouseenter", handleImageEnter)
      img.addEventListener("mouseleave", handleImageLeave)
    })

    const text = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6")
    text.forEach((t) => {
      t.addEventListener("mouseenter", handleTextEnter)
      t.addEventListener("mouseleave", handleTextLeave)
    })

    return () => {
      window.removeEventListener("mousemove", mouseMove)
      window.removeEventListener("mousedown", mouseDown)
      window.removeEventListener("mouseup", mouseUp)

      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleLinkEnter)
        link.removeEventListener("mouseleave", handleLinkLeave)
      })

      images.forEach((img) => {
        img.removeEventListener("mouseenter", handleImageEnter)
        img.removeEventListener("mouseleave", handleImageLeave)
      })

      text.forEach((t) => {
        t.removeEventListener("mouseenter", handleTextEnter)
        t.removeEventListener("mouseleave", handleTextLeave)
      })
    }
  }, [cursorX, cursorY])

  // Only show custom cursor on desktop
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  if (isMobile) return null

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="cursor-main fixed top-0 left-0 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          width: isClicking ? "24px" : cursorVariant === "link" ? "64px" : "32px",
          height: isClicking ? "24px" : cursorVariant === "link" ? "64px" : "32px",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          boxShadow: "0 0 20px rgba(255, 87, 34, 0.5)",
          transform: "translate(-50%, -50%)",
        }}
        transition={{
          width: { type: "spring", stiffness: 300, damping: 30 },
          height: { type: "spring", stiffness: 300, damping: 30 },
        }}
      />

      {/* Ghost trail effect */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="cursor-trail fixed top-0 left-0 rounded-full pointer-events-none z-40 mix-blend-difference"
          style={{
            x: cursorX,
            y: cursorY,
            width: Math.max(8, 32 - i * 5),
            height: Math.max(8, 32 - i * 5),
            opacity: 0.2 - i * 0.03,
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            boxShadow: "0 0 10px rgba(255, 87, 34, 0.3)",
            transform: "translate(-50%, -50%)",
            transition: `transform ${0.1 + i * 0.05}s ease-out`,
          }}
        />
      ))}

      <style jsx global>{`
        body {
          cursor: none;
        }
        
        @media (max-width: 768px) {
          body {
            cursor: auto;
          }
        }
        
        .cursor-main, .cursor-trail {
          will-change: transform;
        }
      `}</style>
    </>
  )
}

