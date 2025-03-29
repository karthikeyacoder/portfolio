"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Code, Palette, Lightbulb, Github, Instagram, Mail } from "lucide-react"
import Navigation from "@/components/navigation"
import GlassCard from "@/components/glass-card"
import BackButton from "@/components/back-button"
import BackToTop from "@/components/back-to-top"
import MobileNav from "@/components/mobile-nav"

// This would come from your database in a real app
const aboutData = {
  name: "Karthikeya",
  title: "Full-Stack Developer & UI/UX Designer",
  bio: "I'm Karthikeya, a full-stack developer and UI/UX designer with a passion for creating intuitive and engaging digital experiences. As a recent graduate, I'm excited to bring my creativity and technical skills to the industry.",
  philosophy:
    "My approach combines technical expertise with design thinking to create applications that not only function flawlessly but also solve real problems for users. I believe in continuous learning and staying updated with the latest technologies and design trends.",
  skills: [
    {
      category: "Development",
      icon: <Code className="w-6 h-6 text-[#FF5722]" />,
      items: ["React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS"],
    },
    {
      category: "Design",
      icon: <Palette className="w-6 h-6 text-[#FF5722]" />,
      items: ["UI/UX Design", "Figma", "Responsive Design", "Animation", "Prototyping"],
    },
    {
      category: "Problem Solving",
      icon: <Lightbulb className="w-6 h-6 text-[#FF5722]" />,
      items: ["Critical Thinking", "Analytical Skills", "Attention to Detail", "Research"],
    },
  ],
  interests: ["Web Development", "UI/UX Design", "Open Source", "New Technologies", "Reading"],
  socialLinks: [
    { name: "GitHub", icon: <Github size={20} />, url: "https://github.com/karthikeyacoder" },
    { name: "Instagram", icon: <Instagram size={20} />, url: "https://www.instagram.com/mainly.karthikeya/" },
    { name: "Email", icon: <Mail size={20} />, url: "mailto:velivelakarthikeya@gmail.com" },
  ],
}

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.3])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

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
              About Me
            </motion.h1>
            <motion.p
              className="text-xl max-w-3xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {aboutData.bio}
            </motion.p>
          </GlassCard>
        </motion.div>

        {/* About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Image & Social Links */}
          <div className="lg:col-span-1 space-y-8">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <GlassCard className="p-6">
                <div className="aspect-square rounded-xl overflow-hidden mb-6 relative">
                  <Image
                    src="/placeholder.svg?height=400&width=400"
                    alt={aboutData.name}
                    width={400}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h2 className="text-2xl font-bold text-white">{aboutData.name}</h2>
                    <p className="text-white/80">{aboutData.title}</p>
                  </div>
                </div>
                <div className="flex justify-center space-x-4">
                  {aboutData.socialLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass p-3 rounded-full text-white/80 hover:text-white border border-white/10 hover:border-white/30 transition-all"
                      whileHover={{
                        y: -5,
                        boxShadow: "0 0 15px rgba(255, 87, 34, 0.5)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    >
                      {link.icon}
                    </motion.a>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Interests */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <GlassCard className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-glow-subtle">Interests</h2>
                <div className="flex flex-wrap gap-2">
                  {aboutData.interests.map((interest, index) => (
                    <motion.span
                      key={index}
                      className="glass px-3 py-1 rounded-full text-sm"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.6 + 0.1 * index }}
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(255, 87, 34, 0.2)",
                        transition: { duration: 0.2 },
                      }}
                    >
                      {interest}
                    </motion.span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Right Column - Philosophy & Skills */}
          <div className="lg:col-span-2 space-y-8">
            {/* Philosophy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <GlassCard className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-glow-subtle">My Philosophy</h2>
                <p className="text-lg leading-relaxed">{aboutData.philosophy}</p>
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
                <div className="space-y-8">
                  {aboutData.skills.map((skillGroup, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + 0.1 * index }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        {skillGroup.icon}
                        <h3 className="text-xl font-medium">{skillGroup.category}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2 ml-9">
                        {skillGroup.items.map((skill, skillIndex) => (
                          <motion.div
                            key={skillIndex}
                            className="glass px-3 py-1 rounded-full text-sm relative overflow-hidden group"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.6 + 0.05 * skillIndex }}
                            whileHover={{ scale: 1.05 }}
                          >
                            <span className="relative z-10">{skill}</span>
                            <motion.div
                              className="absolute inset-0 bg-[#FF5722]/20"
                              initial={{ width: "0%" }}
                              whileHover={{ width: "100%" }}
                              transition={{ duration: 0.3 }}
                            />
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Journey */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <GlassCard className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-glow-subtle">My Journey</h2>
                <div className="relative pl-6 border-l-2 border-[#FF5722]/30">
                  <div className="space-y-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className="relative"
                    >
                      <motion.div
                        className="absolute left-[-9px] top-0 w-4 h-4 bg-[#FF5722] rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.7 }}
                      />
                      <h3 className="text-xl font-bold">Started Learning Web Development</h3>
                      <p className="text-[#FF5722] mb-2">2020</p>
                      <p>Began my journey into web development, learning HTML, CSS, and JavaScript fundamentals.</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                      className="relative"
                    >
                      <motion.div
                        className="absolute left-[-9px] top-0 w-4 h-4 bg-[#FF5722] rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.8 }}
                      />
                      <h3 className="text-xl font-bold">Discovered React & Modern Frontend</h3>
                      <p className="text-[#FF5722] mb-2">2022</p>
                      <p>
                        Fell in love with React and the modern frontend ecosystem, including state management, hooks,
                        and component-based architecture.
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="relative"
                    >
                      <motion.div
                        className="absolute left-[-9px] top-0 w-4 h-4 bg-[#FF5722] rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.9 }}
                      />
                      <h3 className="text-xl font-bold">Expanded to Full-Stack Development</h3>
                      <p className="text-[#FF5722] mb-2">2023</p>
                      <p>
                        Expanded my skills to include backend development with Node.js, Express, and database
                        technologies.
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.9 }}
                      className="relative"
                    >
                      <motion.div
                        className="absolute left-[-9px] top-0 w-4 h-4 bg-[#FF5722] rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 1.0 }}
                      />
                      <h3 className="text-xl font-bold">Graduated & Started Professional Journey</h3>
                      <p className="text-[#FF5722] mb-2">2024</p>
                      <p>
                        Graduated with a degree in Computer Science and began my professional journey as a full-stack
                        developer.
                      </p>
                    </motion.div>
                  </div>
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

