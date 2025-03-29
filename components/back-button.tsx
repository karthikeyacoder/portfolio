"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"

export default function BackButton() {
  return (
    <motion.div
      className="absolute top-24 left-4 sm:left-8 z-30"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      whileHover={{ x: -5 }}
    >
      <Link href="/" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group">
        <motion.div
          className="p-2 rounded-full bg-[#FF5722]/20 group-hover:bg-[#FF5722]/40 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft size={20} />
        </motion.div>
        <span className="font-medium">Back to Home</span>
      </Link>
    </motion.div>
  )
}

