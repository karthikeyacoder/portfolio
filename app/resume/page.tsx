"use client"

import Link from "next/link"

import { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Download, Calendar, MapPin, Mail, Phone, ExternalLink } from "lucide-react"
import Navigation from "@/components/navigation"
import GlassCard from "@/components/glass-card"
import BackButton from "@/components/back-button"
import BackToTop from "@/components/back-to-top"
import MobileNav from "@/components/mobile-nav"

// This would come from your database in a real app
const resumeData = {
  name: "Karthikeya",
  title: "Full-Stack Developer & UI/UX Designer",
  email: "velivelakarthikeya@gmail.com",
  phone: "+91 7416191169",
  location: "Tirupati, India",
  summary:
    "Passionate and detail-oriented Full-Stack Developer with a strong foundation in modern web technologies. Skilled in creating responsive, user-friendly applications with React, Next.js, and Node.js. Committed to writing clean, maintainable code and delivering exceptional user experiences.",
  skills: [
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
    { category: "Backend", items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "RESTful APIs"] },
    { category: "Tools & Others", items: ["Git", "Docker", "Figma", "Responsive Design", "Performance Optimization"] },
  ],
  experience: [
    {
      title: "Full-Stack Developer",
      company: "Personal Portfolio",
      location: "Remote",
      period: "2024 - Present",
      description:
        "Designed and developed a responsive portfolio website using Next.js, Tailwind CSS, and Framer Motion. Implemented server-side rendering, animations, and responsive design principles.",
      achievements: [
        "Created a fully responsive design that works across all devices",
        "Implemented smooth animations and transitions for an engaging user experience",
        "Integrated with PostgreSQL database for dynamic content management",
      ],
    },
    {
      title: "Frontend Developer",
      company: "E-commerce Project",
      location: "Remote",
      period: "2024",
      description:
        "Built a responsive e-commerce platform using React and Redux for state management. Implemented product listings, cart functionality, and checkout process.",
      achievements: [
        "Developed reusable component library for consistent UI",
        "Implemented responsive design for mobile and desktop",
        "Integrated with payment gateway for secure transactions",
      ],
    },
  ],
  education: [
    {
      institution: "Sri Venkateswara University",
      degree: "Bachelor of Technology",
      field: "Computer Science",
      period: "2020 - 2024",
    },
  ],
  certifications: [
    {
      name: "React Developer Certification",
      issuer: "Meta",
      date: "2023",
    },
    {
      name: "Full-Stack JavaScript",
      issuer: "Udemy",
      date: "2023",
    },
  ],
}

export default function ResumePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.3])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  const [activeSection, setActiveSection] = useState("experience")

  return (
    <main className="min-h-screen pt-24 relative">
      <Navigation />
      <BackButton />

      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24 md:pb-12">
        <motion.div style={{ opacity, scale }} className="mb-16">
          <GlassCard className="p-8">
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-8 text-glow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Resume
            </motion.h1>
            <motion.p
              className="text-xl max-w-3xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {resumeData.summary}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="/resume.pdf"
                download
                className="flex items-center gap-2 bg-[#FF5722] text-white px-6 py-3 rounded-lg hover:bg-[#E64A19] transition-colors"
              >
                <Download size={18} />
                <span>Download Resume</span>
              </a>
            </motion.div>
          </GlassCard>
        </motion.div>

        {/* Resume Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Contact & Skills */}
          <div className="lg:col-span-1 space-y-8">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <GlassCard className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-glow-subtle">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#FF5722] mt-1" />
                    <div>
                      <h3 className="text-sm text-gray-400">Email</h3>
                      <p>{resumeData.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#FF5722] mt-1" />
                    <div>
                      <h3 className="text-sm text-gray-400">Phone</h3>
                      <p>{resumeData.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#FF5722] mt-1" />
                    <div>
                      <h3 className="text-sm text-gray-400">Location</h3>
                      <p>{resumeData.location}</p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <GlassCard className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-glow-subtle">Skills</h2>
                <div className="space-y-6">
                  {resumeData.skills.map((skillGroup, index) => (
                    <div key={index}>
                      <h3 className="text-lg font-medium mb-3">{skillGroup.category}</h3>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill, skillIndex) => (
                          <motion.span
                            key={skillIndex}
                            className="glass px-3 py-1 rounded-full text-sm"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 * skillIndex }}
                            whileHover={{
                              scale: 1.05,
                              backgroundColor: "rgba(255, 87, 34, 0.2)",
                              transition: { duration: 0.2 },
                            }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <GlassCard className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-glow-subtle">Education</h2>
                <div className="space-y-4">
                  {resumeData.education.map((edu, index) => (
                    <motion.div
                      key={index}
                      className="border-l-2 border-[#FF5722]/30 pl-4 py-1"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                    >
                      <h3 className="font-medium">{edu.degree}</h3>
                      <p className="text-[#FF5722]">{edu.field}</p>
                      <p className="text-sm text-gray-400">{edu.institution}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                        <Calendar size={14} />
                        <span>{edu.period}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <GlassCard className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-glow-subtle">Certifications</h2>
                <div className="space-y-4">
                  {resumeData.certifications.map((cert, index) => (
                    <motion.div
                      key={index}
                      className="flex justify-between items-start"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                    >
                      <div>
                        <h3 className="font-medium">{cert.name}</h3>
                        <p className="text-sm text-gray-400">{cert.issuer}</p>
                      </div>
                      <div className="text-sm text-gray-400">{cert.date}</div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Right Column - Experience */}
          <div className="lg:col-span-2 space-y-8">
            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <GlassCard className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-glow-subtle">Experience</h2>
                <div className="space-y-8">
                  {resumeData.experience.map((exp, index) => (
                    <motion.div
                      key={index}
                      className="relative pl-6 border-l-2 border-[#FF5722]/30"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                    >
                      <motion.div
                        className="absolute left-[-9px] top-0 w-4 h-4 bg-[#FF5722] rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 + 0.1 * index }}
                      />
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                        <h3 className="text-xl font-bold">{exp.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-400 mt-1 md:mt-0">
                          <Calendar size={14} />
                          <span>{exp.period}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[#FF5722]">{exp.company}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-400 text-sm">{exp.location}</span>
                      </div>
                      <p className="mb-4">{exp.description}</p>
                      {exp.achievements && (
                        <div>
                          <h4 className="font-medium mb-2">Key Achievements:</h4>
                          <ul className="space-y-2">
                            {exp.achievements.map((achievement, achIndex) => (
                              <motion.li
                                key={achIndex}
                                className="flex items-start gap-2"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.3 + 0.1 * achIndex }}
                              >
                                <span className="w-1.5 h-1.5 bg-[#FF5722] rounded-full mt-2" />
                                <span>{achievement}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Projects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <GlassCard className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-glow-subtle">Featured Projects</h2>
                  <Link href="/work" className="text-sm text-[#FF5722] hover:underline flex items-center gap-1">
                    <span>View All</span>
                    <ExternalLink size={14} />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div
                    className="glass p-4 rounded-lg border border-white/10 hover:border-white/30 transition-all"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <h3 className="font-medium mb-2">React Dashboard</h3>
                    <p className="text-sm text-gray-400 mb-3">
                      A comprehensive admin dashboard with data visualization
                    </p>
                    <Link href="/work/project-1" className="text-xs text-[#FF5722] hover:underline">
                      View Project
                    </Link>
                  </motion.div>
                  <motion.div
                    className="glass p-4 rounded-lg border border-white/10 hover:border-white/30 transition-all"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <h3 className="font-medium mb-2">Next.js E-commerce</h3>
                    <p className="text-sm text-gray-400 mb-3">
                      Full-stack e-commerce platform with payment integration
                    </p>
                    <Link href="/work/project-2" className="text-xs text-[#FF5722] hover:underline">
                      View Project
                    </Link>
                  </motion.div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>

      <BackToTop />
      <MobileNav />
    </main>
  )
}

