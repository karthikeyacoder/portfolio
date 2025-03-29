"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion"
import LoadingAnimation from "@/components/loading-animation"
import Navigation from "@/components/navigation"
import ProjectCard from "@/components/project-card"
import GlassCard from "@/components/glass-card"
import BackToTop from "@/components/back-to-top"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const { scrollY } = useScroll()

  // References for scroll animations
  const heroRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  // Check if sections are in view
  const heroInView = useInView(heroRef, { once: false, margin: "-100px" })
  const introInView = useInView(introRef, { once: false, margin: "-100px" })
  const projectsInView = useInView(projectsRef, { once: false, margin: "-100px" })
  const skillsInView = useInView(skillsRef, { once: false, margin: "-100px" })
  const testimonialsInView = useInView(testimonialsRef, { once: false, margin: "-100px" })
  const ctaInView = useInView(ctaRef, { once: false, margin: "-100px" })

  // Parallax effects
  const heroY = useTransform(scrollY, [0, 500], [0, -100])
  const springHeroY = useSpring(heroY, { stiffness: 100, damping: 30 })

  // Background gradient animation based on scroll
  const bgOpacity = useTransform(scrollY, [0, 300], [0, 0.05])

  useEffect(() => {
    // Simulate loading time - increased to ensure animation is visible
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 5000) // Increased to 5 seconds for better visibility

    return () => clearTimeout(timer)
  }, [])

  // Text animation variants
  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  // Section animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <>
      <AnimatePresence mode="wait">{isLoading && <LoadingAnimation />}</AnimatePresence>

      <main className="min-h-screen overflow-x-hidden pt-20">
        <Navigation />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div
            className="mt-20 mb-16 relative"
            ref={heroRef}
            style={{ y: springHeroY }}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            variants={sectionVariants}
          >
            <div className="flex flex-col items-center">
              <h1 className="text-7xl md:text-9xl font-bold tracking-tighter text-center overflow-hidden">
                {/* Animate each letter separately */}
                <div className="flex justify-center overflow-hidden">
                  {Array.from("Full-Stack").map((letter, i) => (
                    <motion.span
                      key={i}
                      custom={i}
                      variants={letterVariants}
                      initial="hidden"
                      animate={heroInView ? "visible" : "hidden"}
                      className="text-glow"
                      whileHover={{
                        scale: 1.2,
                        color: "#FF5722",
                        textShadow: "0 0 15px rgba(255, 87, 34, 0.8)",
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>
              </h1>

              <div className="relative">
                <h1 className="text-7xl md:text-9xl font-bold tracking-tighter text-center text-[#FF5722] overflow-hidden">
                  <div className="flex justify-center">
                    {Array.from("DEVELOPER").map((letter, i) => (
                      <motion.span
                        key={i}
                        custom={i + 10}
                        variants={letterVariants}
                        initial="hidden"
                        animate={heroInView ? "visible" : "hidden"}
                        className="text-glow"
                        whileHover={{
                          scale: 1.2,
                          rotate: [0, 5, -5, 0],
                          transition: { duration: 0.5 },
                        }}
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </div>
                </h1>

                {/* Red button overlay for the O in DEVELOPER */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-[5rem] -translate-y-1/2"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: 1.2,
                    duration: 0.8,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  <div className="w-24 h-12 bg-red-500 rounded-full flex items-center neon-border">
                    <motion.div
                      className="w-10 h-10 bg-white rounded-full ml-1"
                      animate={{
                        x: [0, 12, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: 2,
                      }}
                    />
                  </div>
                </motion.div>
              </div>

              <h1 className="text-7xl md:text-9xl font-bold tracking-tighter text-center overflow-hidden">
                <div className="flex justify-center">
                  {Array.from("& DESIGNER").map((letter, i) => (
                    <motion.span
                      key={i}
                      custom={i + 19}
                      variants={letterVariants}
                      initial="hidden"
                      animate={heroInView ? "visible" : "hidden"}
                      className="text-glow"
                      whileHover={{
                        scale: 1.2,
                        color: "#FF5722",
                        textShadow: "0 0 15px rgba(255, 87, 34, 0.8)",
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>
                <motion.span
                  className="text-[#FF5722] text-4xl inline-block text-glow"
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{
                    delay: 2,
                    duration: 0.6,
                    type: "spring",
                  }}
                  whileHover={{
                    scale: 1.5,
                    rotate: 360,
                    transition: { duration: 0.5 },
                  }}
                >
                  *
                </motion.span>
              </h1>

              {/* Telugu text */}
              <motion.div
                className="mt-4 text-right w-full max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-sm text-gray-300">
                  <span className="font-medium">FULL-STACK DEVELOPER,</span> డిజైన్ ద్వారా
                  <br />
                  మెరుగైన అనుభవాలను సృష్టించడం నా లక్ష్యం | |
                </p>
              </motion.div>

              {/* Open to job offers */}
              <motion.div
                className="mt-8 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 2.4 }}
              >
                <GlassCard className="px-6 py-3">
                  <p className="text-lg">
                    Open to <span className="font-light">new job offers</span>
                    <motion.span
                      className="inline-block w-3 h-3 bg-green-500 rounded-full ml-1"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [1, 0.7, 1],
                        boxShadow: [
                          "0 0 0px rgba(34, 197, 94, 0.5)",
                          "0 0 10px rgba(34, 197, 94, 0.8)",
                          "0 0 0px rgba(34, 197, 94, 0.5)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                      }}
                    />
                  </p>
                </GlassCard>
              </motion.div>
            </div>
          </motion.div>

          {/* Introduction */}
          <motion.div
            className="mt-32 mb-32 max-w-5xl mx-auto"
            ref={introRef}
            initial="hidden"
            animate={introInView ? "visible" : "hidden"}
            variants={sectionVariants}
          >
            <GlassCard className="p-8">
              <h2 className="text-3xl md:text-5xl font-medium leading-tight text-glow-subtle">
                Hi, I am{" "}
                <motion.span
                  className="relative inline-block"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="Karthikeya"
                    width={40}
                    height={40}
                    className="inline-block rounded-md mr-2"
                  />
                  Karthikeya
                </motion.span>
                <motion.span
                  className="inline-block"
                  animate={{ rotate: [0, 20, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                >
                  👋
                </motion.span>
                , a Full-Stack Developer since{" "}
                <motion.span
                  className="inline-block border border-[#FF5722] rounded-full px-4 py-1 neon-border"
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(255, 87, 34, 0.2)",
                  }}
                >
                  2024
                </motion.span>{" "}
                focused on building with{" "}
                <motion.span
                  className="inline-block"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  ⚛️
                </motion.span>{" "}
                React and{" "}
                <motion.span
                  className="inline-block"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  🔼
                </motion.span>{" "}
                Next.js, creating beautiful UI/UX{" "}
                <motion.span
                  className="inline-block"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  🎨
                </motion.span>{" "}
                and leading teams{" "}
                <motion.span
                  className="inline-block"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  👥
                </motion.span>
                .
              </h2>
            </GlassCard>
          </motion.div>

          {/* Featured Projects Section */}
          <motion.div
            className="mb-32"
            ref={projectsRef}
            initial="hidden"
            animate={projectsInView ? "visible" : "hidden"}
            variants={sectionVariants}
          >
            <div className="max-w-7xl mx-auto">
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-12 text-glow-subtle"
                initial={{ opacity: 0, x: -20 }}
                animate={projectsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                whileHover={{
                  scale: 1.03,
                  color: "#FF5722",
                  textShadow: "0 0 15px rgba(255, 87, 34, 0.8)",
                }}
              >
                Featured Projects
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ProjectCard
                  title="React Dashboard"
                  description="A comprehensive admin dashboard with data visualization"
                  image="/placeholder.svg?height=400&width=600"
                  link="/work/project-1"
                />
                <ProjectCard
                  title="Next.js E-commerce"
                  description="Full-stack e-commerce platform with payment integration"
                  image="/placeholder.svg?height=400&width=600"
                  link="/work/project-2"
                />
                <ProjectCard
                  title="API Development"
                  description="RESTful API design and implementation for a SaaS product"
                  image="/placeholder.svg?height=400&width=600"
                  link="/work/project-3"
                />
                <ProjectCard
                  title="Mobile App UI/UX"
                  description="UI/UX design for a React Native health tracking application"
                  image="/placeholder.svg?height=400&width=600"
                  link="/work/project-4"
                />
              </div>
              <motion.div
                className="mt-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <Link
                  href="/work"
                  className="inline-block border-b-2 border-[#FF5722] pb-1 text-lg font-medium hover:text-[#FF5722] hover:border-[#FF5722] transition-colors relative group text-glow"
                >
                  View all projects
                  <motion.span
                    className="absolute -right-6 top-1/2 transform -translate-y-1/2"
                    initial={{ x: 0 }}
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
                  >
                    →
                  </motion.span>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            className="mb-32"
            ref={skillsRef}
            initial="hidden"
            animate={skillsInView ? "visible" : "hidden"}
            variants={sectionVariants}
          >
            <div className="max-w-5xl mx-auto">
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-12 text-glow-subtle"
                initial={{ opacity: 0, x: -20 }}
                animate={skillsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                whileHover={{
                  scale: 1.03,
                  color: "#FF5722",
                  textShadow: "0 0 15px rgba(255, 87, 34, 0.8)",
                }}
              >
                Skills & Expertise
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Frontend Development",
                    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
                  },
                  {
                    title: "Backend Development",
                    skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "RESTful APIs"],
                  },
                  {
                    title: "UI/UX & Leadership",
                    skills: [
                      "UI/UX Design",
                      "Team Leadership",
                      "Project Management",
                      "Agile Methodology",
                      "Client Communication",
                    ],
                  },
                ].map((category, index) => (
                  <GlassCard
                    key={category.title}
                    className="p-6"
                    glowColor={
                      index === 0
                        ? "rgba(255, 87, 34, 0.3)"
                        : index === 1
                          ? "rgba(124, 58, 237, 0.3)"
                          : "rgba(56, 189, 248, 0.3)"
                    }
                  >
                    <h3 className="text-xl font-bold mb-4">{category.title}</h3>
                    <ul className="space-y-2">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.li
                          key={skill}
                          initial={{ opacity: 0, x: -10 }}
                          animate={skillsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                          transition={{ duration: 0.3, delay: index * 0.1 + skillIndex * 0.05 + 0.3 }}
                          className="flex items-center"
                          whileHover={{
                            x: 5,
                            color: index === 0 ? "#FF5722" : index === 1 ? "#7c3aed" : "#38bdf8",
                            transition: { duration: 0.2 },
                          }}
                        >
                          <motion.span
                            className="w-2 h-2 bg-[#FF5722] rounded-full mr-2"
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.7, 1, 0.7],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              delay: index * 0.1 + skillIndex * 0.2,
                            }}
                          />
                          {skill}
                        </motion.li>
                      ))}
                    </ul>
                  </GlassCard>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Testimonials Section */}
          <motion.div
            className="mb-32"
            ref={testimonialsRef}
            initial="hidden"
            animate={testimonialsInView ? "visible" : "hidden"}
            variants={sectionVariants}
          >
            <div className="max-w-5xl mx-auto">
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-12 text-glow-subtle"
                initial={{ opacity: 0, x: -20 }}
                animate={testimonialsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                whileHover={{
                  scale: 1.03,
                  color: "#FF5722",
                  textShadow: "0 0 15px rgba(255, 87, 34, 0.8)",
                }}
              >
                What People Say
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    quote:
                      "Karthikeya's approach to development is both creative and strategic. His React skills are exceptional and he delivered outstanding results for our product.",
                    name: "KARTHIKEYA",
                    role: "FRESHER, LEADER",
                  },
                  {
                    quote:
                      "Working with Karthikeya was a game-changer for our team. His leadership and technical expertise helped us deliver our Next.js project ahead of schedule.",
                    name: "ELON MUSK",
                    role: "CEO, TESLA",
                  },
                ].map((testimonial, index) => (
                  <GlassCard
                    key={testimonial.name}
                    className="p-8 relative"
                    glowColor={index === 0 ? "rgba(255, 87, 34, 0.3)" : "rgba(124, 58, 237, 0.3)"}
                  >
                    <motion.div
                      className="absolute -top-4 -left-4 text-5xl text-[#FF5722] opacity-30"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={
                        testimonialsInView ? { opacity: 0.3, scale: 1, rotate: [0, 10, 0] } : { opacity: 0, scale: 0 }
                      }
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                    >
                      "
                    </motion.div>
                    <p className="text-lg italic mb-6">{testimonial.quote}</p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-700 rounded-full mr-4 overflow-hidden border border-white/20"></div>
                      <div>
                        <p className="font-bold">{testimonial.name}</p>
                        <p className="text-sm text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            className="mb-32 text-center"
            ref={ctaRef}
            initial="hidden"
            animate={ctaInView ? "visible" : "hidden"}
            variants={sectionVariants}
          >
            <GlassCard className="p-12 max-w-3xl mx-auto">
              <motion.h2
                className="text-3xl md:text-5xl font-bold mb-6 text-glow"
                initial={{ opacity: 0, y: 30 }}
                animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
              >
                Let's build something amazing together
              </motion.h2>
              <motion.p
                className="text-xl mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Have a project in mind? I'd love to hear about it.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact"
                  className="inline-block bg-[#FF5722] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-[#E64A19] transition-colors neon-border"
                >
                  Get in touch
                </Link>
              </motion.div>
            </GlassCard>
          </motion.div>
        </div>

        <BackToTop />
      </main>
    </>
  )
}

