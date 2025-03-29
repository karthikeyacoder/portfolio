"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { ChevronDown } from "lucide-react"
import Navigation from "@/components/navigation"
import ProjectCard from "@/components/project-card"
import MagneticButton from "@/components/magnetic-button"
import GlassCard from "@/components/glass-card"
import BackButton from "@/components/back-button"
import BackToTop from "@/components/back-to-top"

// Mock project data - in a real app, this would come from a database or CMS
const projectsData = [
  {
    id: "project-1",
    title: "React Dashboard",
    description: "A comprehensive admin dashboard with data visualization",
    image: "/placeholder.svg?height=400&width=600",
    link: "/work/project-1",
  },
  {
    id: "project-2",
    title: "Next.js E-commerce",
    description: "Full-stack e-commerce platform with payment integration",
    image: "/placeholder.svg?height=400&width=600",
    link: "/work/project-2",
  },
  {
    id: "project-3",
    title: "API Development",
    description: "RESTful API design and implementation for a SaaS product",
    image: "/placeholder.svg?height=400&width=600",
    link: "/work/project-3",
  },
  {
    id: "project-4",
    title: "Mobile App UI/UX",
    description: "UI/UX design for a React Native health tracking application",
    image: "/placeholder.svg?height=400&width=600",
    link: "/work/project-4",
  },
  {
    id: "project-5",
    title: "Team Leadership",
    description: "Led a team of 5 developers to deliver a complex web application",
    image: "/placeholder.svg?height=400&width=600",
    link: "/work/project-5",
  },
  {
    id: "project-6",
    title: "Dashboard UI",
    description: "Analytics dashboard for a SaaS product built with React",
    image: "/placeholder.svg?height=400&width=600",
    link: "/work/project-6",
  },
  {
    id: "project-7",
    title: "E-commerce Platform",
    description: "Full-stack Next.js e-commerce with Stripe integration",
    image: "/placeholder.svg?height=400&width=600",
    link: "/work/project-7",
  },
  {
    id: "project-8",
    title: "Authentication System",
    description: "Secure authentication and authorization system with JWT",
    image: "/placeholder.svg?height=400&width=600",
    link: "/work/project-8",
  },
  {
    id: "project-9",
    title: "Component Library",
    description: "Reusable React component library with Storybook documentation",
    image: "/placeholder.svg?height=400&width=600",
    link: "/work/project-9",
  },
]

export default function WorkPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.3])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  const [visibleProjects, setVisibleProjects] = useState(6)
  const hasMoreProjects = visibleProjects < projectsData.length

  const loadMoreProjects = () => {
    setVisibleProjects((prev) => Math.min(prev + 3, projectsData.length))
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <main className="min-h-screen pt-24 relative">
      <Navigation />
      <BackButton />

      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div style={{ opacity, scale }} className="mb-16">
          <GlassCard className="p-8">
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-8 text-glow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              My Work
            </motion.h1>
            <motion.p
              className="text-xl max-w-3xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              A collection of my projects showcasing full-stack development with React and Next.js, UI/UX design, and
              team leadership experience.
            </motion.p>
          </GlassCard>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold mb-8 text-glow-subtle">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {projectsData.slice(0, 3).map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  link={project.link}
                />
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold mb-8 text-glow-subtle">All Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectsData.slice(3, visibleProjects).map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  link={project.link}
                />
              ))}
            </div>

            {hasMoreProjects && (
              <motion.div
                className="mt-12 flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <MagneticButton
                  onClick={loadMoreProjects}
                  className="flex items-center gap-2 glass px-6 py-3 rounded-full text-white border border-white/10 hover:border-white/30 transition-all"
                >
                  <span>Load More Projects</span>
                  <ChevronDown size={18} />
                </MagneticButton>
              </motion.div>
            )}
          </motion.div>

          <motion.div className="mt-16 text-center" variants={itemVariants}>
            <MagneticButton className="inline-block glass px-8 py-4 rounded-full text-lg font-medium text-white border border-white/10">
              Let's work together
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      <BackToTop />
    </main>
  )
}

