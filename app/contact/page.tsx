"use client"

import type React from "react"

import { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { MapPin, Mail, Phone, Send, Github, Instagram } from "lucide-react"
import Navigation from "@/components/navigation"
import GlassCard from "@/components/glass-card"
import BackButton from "@/components/back-button"
import BackToTop from "@/components/back-to-top"
import MobileNav from "@/components/mobile-nav"
import { submitMessage } from "@/lib/actions"

// This would come from your database in a real app
const contactData = {
  email: "velivelakarthikeya@gmail.com",
  phone: "+91 7416191169",
  location: "Tirupati, India",
  socialLinks: [
    { name: "GitHub", icon: <Github size={20} />, url: "https://github.com/karthikeyacoder" },
    { name: "Instagram", icon: <Instagram size={20} />, url: "https://www.instagram.com/mainly.karthikeya/" },
  ],
}

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.3])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<null | { success: boolean; message: string }>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // In a real app, this would call the server action to submit the message
      // Call the server action to submit the message
      const result = await submitMessage({
        name: formData.name,
        email: formData.email,
        subject: formData.subject || "No Subject",
        message: formData.message,
        read: false,
      })

      if (result.success) {
        setSubmitStatus({
          success: true,
          message: "Your message has been sent successfully! I'll get back to you soon.",
        })

        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
      } else {
        setSubmitStatus({
          success: false,
          message: result.error || "There was an error sending your message. Please try again.",
        })
      }
    } catch (error) {
      console.error("Error submitting message:", error)
      setSubmitStatus({
        success: false,
        message: "There was an error sending your message. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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
              Contact Me
            </motion.h1>
            <motion.p
              className="text-xl max-w-3xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Have a project in mind or want to discuss a potential collaboration? I'd love to hear from you! Fill out
              the form below or reach out through any of the provided contact methods.
            </motion.p>
          </GlassCard>
        </motion.div>

        {/* Contact Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <GlassCard className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-glow-subtle">Contact Information</h2>
                <div className="space-y-6">
                  <motion.div
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    <div className="p-3 bg-[#FF5722]/20 rounded-full">
                      <Mail className="w-6 h-6 text-[#FF5722]" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <a
                        href={`mailto:${contactData.email}`}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {contactData.email}
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    <div className="p-3 bg-[#FF5722]/20 rounded-full">
                      <Phone className="w-6 h-6 text-[#FF5722]" />
                    </div>
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <a href={`tel:${contactData.phone}`} className="text-gray-400 hover:text-white transition-colors">
                        {contactData.phone}
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                  >
                    <div className="p-3 bg-[#FF5722]/20 rounded-full">
                      <MapPin className="w-6 h-6 text-[#FF5722]" />
                    </div>
                    <div>
                      <h3 className="font-medium">Location</h3>
                      <p className="text-gray-400">{contactData.location}</p>
                    </div>
                  </motion.div>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <GlassCard className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-glow-subtle">Social Media</h2>
                <div className="flex gap-4">
                  {contactData.socialLinks.map((link, index) => (
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
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    >
                      {link.icon}
                    </motion.a>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="hidden lg:block"
            >
              <GlassCard className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-glow-subtle">Working Hours</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="text-[#FF5722]">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="text-[#FF5722]">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-gray-400">Closed</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <GlassCard className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-glow-subtle">Send Me a Message</h2>

                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg mb-6 ${
                      submitStatus.success
                        ? "bg-green-500/20 border border-green-500/30"
                        : "bg-red-500/20 border border-red-500/30"
                    }`}
                  >
                    <p className={submitStatus.success ? "text-green-400" : "text-red-400"}>{submitStatus.message}</p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent transition-all"
                        placeholder="John Doe"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                    >
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent transition-all"
                        placeholder="john@example.com"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                  >
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent transition-all"
                      placeholder="Project Inquiry"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 }}
                  >
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent transition-all"
                      placeholder="Your message here..."
                    ></textarea>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.8 }}
                  >
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-2 bg-[#FF5722] text-white px-6 py-3 rounded-lg hover:bg-[#E64A19] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </motion.div>
                </form>
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

