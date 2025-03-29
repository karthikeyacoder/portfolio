"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Github } from "lucide-react"
import Navigation from "@/components/navigation"
import GlassCard from "@/components/glass-card"
import BackButton from "@/components/back-button"
import BackToTop from "@/components/back-to-top"

// Mock project data - in a real app, this would come from a database or CMS
const projectsData = [
  {
    id: "project-1",
    slug: "project-1",
    title: "React Dashboard",
    description: "A comprehensive admin dashboard with data visualization",
    fullDescription:
      "This dashboard provides a complete overview of business metrics with interactive charts and real-time data updates. Built with React and Chart.js, it offers a responsive interface that works across all devices.",
    image: "/placeholder.svg?height=600&width=1200",
    images: [
      "/placeholder.svg?height=600&width=1200",
      "/placeholder.svg?height=600&width=1200",
      "/placeholder.svg?height=600&width=1200",
    ],
    techStack: ["React", "TypeScript", "Chart.js", "Tailwind CSS", "Redux"],
    liveLink: "https://example.com/dashboard",
    githubLink: "https://github.com/karthikeyacoder/dashboard",
    purpose:
      "To provide businesses with a clear visualization of their key metrics and enable data-driven decision making through an intuitive interface.",
    year: "2024",
  },
  {
    id: "project-2",
    slug: "project-2",
    title: "Next.js E-commerce",
    description: "Full-stack e-commerce platform with payment integration",
    fullDescription:
      "A complete e-commerce solution built with Next.js, featuring product listings, cart functionality, user authentication, and Stripe payment integration. The platform is fully responsive and offers a seamless shopping experience.",
    image: "/placeholder.svg?height=600&width=1200",
    images: [
      "/placeholder.svg?height=600&width=1200",
      "/placeholder.svg?height=600&width=1200",
      "/placeholder.svg?height=600&width=1200",
    ],
    techStack: ["Next.js", "TypeScript", "MongoDB", "Stripe", "Tailwind CSS"],
    liveLink: "https://example.com/ecommerce",
    githubLink: "https://github.com/karthikeyacoder/ecommerce",
    purpose:
      "To create a modern e-commerce platform that provides a seamless shopping experience with secure payment processing and efficient inventory management.",
    year: "2024",
  },
  {
    id: "project-3",
    slug: "project-3",
    title: "API Development",
    description: "RESTful API design and implementation for a SaaS product",
    fullDescription:
      "A robust API built for a SaaS product, featuring authentication, rate limiting, and comprehensive documentation. The API follows RESTful principles and provides endpoints for all the core functionality of the application.",
    image: "/placeholder.svg?height=600&width=1200",
    images: [
      "/placeholder.svg?height=600&width=1200",
      "/placeholder.svg?height=600&width=1200",
      "/placeholder.svg?height=600&width=1200",
    ],
    techStack: ["Node.js", "Express", "MongoDB", "JWT", "Swagger"],
    liveLink: "https://api.example.com",
    githubLink: "https://github.com/karthikeyacoder/api",
    purpose:
      "To provide a secure and scalable API that enables third-party integrations and powers the core functionality of the SaaS platform.",
    year: "2024",
  },
  {
    id: "project-4",
    slug: "project-4",
    title: "Mobile App UI/UX",
    description: "UI/UX design for a React Native health tracking application",
    fullDescription:
      "A comprehensive UI/UX design for a health tracking mobile application built with React Native. The design focuses on providing a clean, intuitive interface that makes tracking health metrics easy and engaging.",
    image: "/placeholder.svg?height=600&width=1200",
    images: [
      "/placeholder.svg?height=600&width=1200",
      "/placeholder.svg?height=600&width=1200",
      "/placeholder.svg?height=600&width=1200",
    ],
    techStack: ["React Native", "Figma", "Redux", "Firebase", "Expo"],
    liveLink: "https://example.com/health-app",
    githubLink: "https://github.com/karthikeyacoder/health-app",
    purpose:
      "To create an engaging and intuitive mobile application that helps users track their health metrics and achieve their fitness goals.",
    year: "2024",
  },
  {
    id: "project-5",
    slug: "project-5",
    title: "Team Leadership",
    description: "Led a team of 5 developers to deliver a complex web application",
    fullDescription:
      "Managed a team of 5 developers to successfully deliver a complex web application for a client in the finance sector. Implemented Agile methodologies, conducted code reviews, and ensured the project was delivered on time and within budget.",
    image: "/placeholder.svg?height=600&width=1200",
    images: [
      "/placeholder.svg?height=600&width=1200",
      "/placeholder.svg?height=600&width=1200",
      "/placeholder.svg?height=600&width=1200",
    ],
    techStack: ["React", "Node.js", "PostgreSQL", "Docker", "AWS"],
    liveLink: "https://example.com/finance-app",
    githubLink: "https://github.com/karthikeyacoder/finance-app",
    purpose:
      "To deliver a high-quality financial application that meets the client's requirements and provides a secure platform for managing financial data.",
    year: "2024",
  },
  {
    id: "project-6",
    slug: "project-6",
    title: "Dashboard UI",
    description: "Analytics dashboard for a SaaS product built with React",
    fullDescription:
      "An analytics dashboard for a SaaS product that provides users with insights into their usage patterns and key metrics. The dashboard features interactive charts, customizable widgets, and real-time data updates.",
    image: "/placeholder.svg?height=600&width=1200",
    images: [
      "/placeholder.svg?height=600&width=1200",
      "/placeholder.svg?height=600&width=1200",
      "/placeholder.svg?height=600&width=1200",
    ],
    techStack: ["React", "D3.js", "Material UI", "GraphQL", "Apollo"],
    liveLink: "https://example.com/analytics",
    githubLink: "https://github.com/karthikeyacoder/analytics",
    purpose:
      "To provide SaaS users with a comprehensive view of their usage patterns and key metrics, enabling data-driven decision making.",
    year: "2024",
  },
]

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    // In a real app, this would be an API call
    const foundProject = projectsData.find((p) => p.slug === params.slug)
    setProject(foundProject || null)
    setLoading(false)
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#FF5722] border-t-transparent rounded-full"></div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <GlassCard className="p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <p className="mb-6">The project you're looking for doesn't exist or has been removed.</p>
          <Link
            href="/work"
            className="inline-block bg-[#FF5722] text-white px-6 py-3 rounded-lg hover:bg-[#E64A19] transition-colors"
          >
            Back to Projects
          </Link>
        </GlassCard>
      </div>
    )
  }

  return (
    <main className="min-h-screen pt-24 relative">
      <Navigation />
      <BackButton />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <GlassCard className="p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2 text-glow">{project.title}</h1>
                <p className="text-xl text-gray-300">{project.description}</p>
              </div>
              <div className="mt-4 md:mt-0 flex gap-4">
                {project.liveLink && (
                  <Link
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#FF5722] text-white px-4 py-2 rounded-lg hover:bg-[#E64A19] transition-colors"
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight size={16} />
                  </Link>
                )}
                {project.githubLink && (
                  <Link
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 glass px-4 py-2 rounded-lg border border-white/10 hover:border-white/30 transition-all"
                  >
                    <Github size={16} />
                    <span>Code</span>
                  </Link>
                )}
              </div>
            </div>

            {/* Main image */}
            <div className="mb-8 overflow-hidden rounded-xl">
              <Image
                src={project.images[activeImage] || "/placeholder.svg"}
                alt={project.title}
                width={1200}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Image thumbnails */}
            {project.images.length > 1 && (
              <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
                {project.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`flex-shrink-0 w-24 h-16 rounded-md overflow-hidden border-2 transition-all ${
                      activeImage === idx ? "border-[#FF5722]" : "border-transparent"
                    }`}
                  >
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`${project.title} thumbnail ${idx + 1}`}
                      width={100}
                      height={60}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Project details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold mb-4 text-glow-subtle">About the Project</h2>
                <p className="text-gray-300 mb-6">{project.fullDescription}</p>
                <h2 className="text-2xl font-bold mb-4 text-glow-subtle">Purpose</h2>
                <p className="text-gray-300">{project.purpose}</p>
              </div>
              <div>
                <GlassCard className="p-6">
                  <h2 className="text-xl font-bold mb-4 text-glow-subtle">Project Details</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-400">Year</h3>
                      <p>{project.year}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-400">Tech Stack</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.techStack.map((tech: string) => (
                          <span key={tech} className="glass px-3 py-1 rounded-full text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>

            {/* Next/Previous project navigation */}
            <div className="flex justify-between pt-8 border-t border-white/10">
              {projectsData.findIndex((p) => p.id === project.id) > 0 ? (
                <Link
                  href={`/work/${projectsData[projectsData.findIndex((p) => p.id === project.id) - 1].slug}`}
                  className="glass px-4 py-2 rounded-lg border border-white/10 hover:border-white/30 transition-all"
                >
                  ← Previous Project
                </Link>
              ) : (
                <div></div>
              )}
              {projectsData.findIndex((p) => p.id === project.id) < projectsData.length - 1 ? (
                <Link
                  href={`/work/${projectsData[projectsData.findIndex((p) => p.id === project.id) + 1].slug}`}
                  className="glass px-4 py-2 rounded-lg border border-white/10 hover:border-white/30 transition-all"
                >
                  Next Project →
                </Link>
              ) : (
                <div></div>
              )}
            </div>
          </GlassCard>
        </motion.div>
      </div>

      <BackToTop />
    </main>
  )
}

