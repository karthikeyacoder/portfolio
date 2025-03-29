"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  Layers,
  Users,
  FileText,
  Mail,
  Settings,
  LogOut,
  Plus,
  Edit,
  Trash,
  ChevronRight,
  Eye,
  Menu,
  X,
  Home,
  BarChart3,
  MessageSquare,
} from "lucide-react"
import GlassCard from "@/components/glass-card"
import { getMessages } from "@/app/actions"

// Mock data for projects
const projectsData = [
  { id: 1, title: "React Dashboard", type: "Frontend", image: "/placeholder.svg?height=100&width=100" },
  { id: 2, title: "Next.js E-commerce", type: "Full-Stack", image: "/placeholder.svg?height=100&width=100" },
  { id: 3, title: "API Development", type: "Backend", image: "/placeholder.svg?height=100&width=100" },
  { id: 4, title: "Mobile App UI/UX", type: "Design", image: "/placeholder.svg?height=100&width=100" },
]

// Mock data for messages
const messagesData = [
  { id: 1, name: "John Doe", email: "john@example.com", subject: "Project Inquiry", date: "2024-03-15", read: false },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    subject: "Collaboration Opportunity",
    date: "2024-03-10",
    read: true,
  },
  {
    id: 3,
    name: "Alex Johnson",
    email: "alex@example.com",
    subject: "Job Opportunity",
    date: "2024-03-05",
    read: false,
  },
]

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Form states for different sections
  const [aboutForm, setAboutForm] = useState({
    bio: "I'm Karthikeya, a full-stack developer and UI/UX designer with a passion for creating intuitive and engaging digital experiences. As a recent graduate, I'm excited to bring my creativity and technical skills to the industry.",
    philosophy:
      "My approach combines technical expertise with design thinking to create applications that not only function flawlessly but also solve real problems for users.",
    profileImage: "/placeholder.svg?height=400&width=400",
  })

  const [resumeForm, setResumeForm] = useState({
    fullName: "Karthikeya",
    title: "Full-Stack Developer & UI/UX Designer",
    summary: "Passionate and detail-oriented Full-Stack Developer with a strong foundation in modern web technologies.",
    experiences: [
      {
        title: "Full-Stack Developer",
        company: "Personal Portfolio",
        location: "Remote",
        startDate: "2024-01",
        endDate: "Present",
        description:
          "Designed and developed a responsive portfolio website using Next.js, Tailwind CSS, and Framer Motion.",
      },
      {
        title: "Frontend Developer",
        company: "E-commerce Project",
        location: "Remote",
        startDate: "2024-01",
        endDate: "2024-03",
        description: "Built a responsive e-commerce platform using React and Redux for state management.",
      },
    ],
  })

  const [contactForm, setContactForm] = useState({
    email: "velivelakarthikeya@gmail.com",
    phone: "+91 7416191169",
    location: "Tirupati, India",
    github: "https://github.com/karthikeyacoder",
    instagram: "https://www.instagram.com/mainly.karthikeya/",
  })

  useEffect(() => {
    // Check if user is authenticated
    const auth = localStorage.getItem("adminAuthenticated")
    if (auth !== "true") {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated")
    router.push("/admin/login")
  }

  // Handle form changes
  const handleAboutChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setAboutForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setResumeForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setContactForm((prev) => ({ ...prev, [name]: value }))
  }

  // Handle experience changes
  const handleExperienceChange = (index: number, field: string, value: string) => {
    setResumeForm((prev) => {
      const updatedExperiences = [...prev.experiences]
      updatedExperiences[index] = { ...updatedExperiences[index], [field]: value }
      return { ...prev, experiences: updatedExperiences }
    })
  }

  const addExperience = () => {
    setResumeForm((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        {
          title: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    }))
  }

  const removeExperience = (index: number) => {
    setResumeForm((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index),
    }))
  }

  const [messages, setMessages] = useState(messagesData)

  useEffect(() => {
    // Fetch messages from the database
    const fetchMessages = async () => {
      try {
        const fetchedMessages = await getMessages()
        if (fetchedMessages && fetchedMessages.length > 0) {
          setMessages(fetchedMessages)
        }
      } catch (error) {
        console.error("Error fetching messages:", error)
      }
    }

    if (isAuthenticated && activeTab === "messages") {
      fetchMessages()
    }
  }, [isAuthenticated, activeTab])

  const markMessageAsRead = (messageId: string | number) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) => (message.id === messageId ? { ...message, read: true } : message)),
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#FF5722] border-t-transparent rounded-full"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-900">
      {/* Mobile Header */}
      <div className="md:hidden bg-gray-900 p-4 border-b border-white/10 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-400 hover:text-white transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-gray-900/95 backdrop-blur-sm">
          <div className="p-4 flex justify-between items-center border-b border-white/10">
            <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <nav className="p-4 space-y-2">
            <MobileNavItem
              icon={<BarChart3 size={20} />}
              label="Dashboard"
              active={activeTab === "dashboard"}
              onClick={() => {
                setActiveTab("dashboard")
                setIsMobileMenuOpen(false)
              }}
            />
            <MobileNavItem
              icon={<Layers size={20} />}
              label="Projects"
              active={activeTab === "projects"}
              onClick={() => {
                setActiveTab("projects")
                setIsMobileMenuOpen(false)
              }}
            />
            <MobileNavItem
              icon={<FileText size={20} />}
              label="Resume"
              active={activeTab === "resume"}
              onClick={() => {
                setActiveTab("resume")
                setIsMobileMenuOpen(false)
              }}
            />
            <MobileNavItem
              icon={<Users size={20} />}
              label="About"
              active={activeTab === "about"}
              onClick={() => {
                setActiveTab("about")
                setIsMobileMenuOpen(false)
              }}
            />
            <MobileNavItem
              icon={<Mail size={20} />}
              label="Contact"
              active={activeTab === "contact"}
              onClick={() => {
                setActiveTab("contact")
                setIsMobileMenuOpen(false)
              }}
            />
            <MobileNavItem
              icon={<MessageSquare size={20} />}
              label="Messages"
              active={activeTab === "messages"}
              onClick={() => {
                setActiveTab("messages")
                setIsMobileMenuOpen(false)
              }}
            />
            <MobileNavItem
              icon={<Settings size={20} />}
              label="Settings"
              active={activeTab === "settings"}
              onClick={() => {
                setActiveTab("settings")
                setIsMobileMenuOpen(false)
              }}
            />
          </nav>
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full p-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
            <Link
              href="/"
              className="flex items-center gap-2 w-full p-3 mt-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <Home size={20} />
              <span>Back to Website</span>
            </Link>
          </div>
        </div>
      )}

      {/* Sidebar - Desktop */}
      <div className="hidden md:block w-64 bg-gray-900 fixed h-full">
        <div className="p-6">
          <h1 className="text-xl font-bold text-white mb-8">Admin Dashboard</h1>
          <nav className="space-y-2">
            <SidebarLink
              icon={<BarChart3 size={18} />}
              label="Dashboard"
              active={activeTab === "dashboard"}
              onClick={() => setActiveTab("dashboard")}
            />
            <SidebarLink
              icon={<Layers size={18} />}
              label="Projects"
              active={activeTab === "projects"}
              onClick={() => setActiveTab("projects")}
            />
            <SidebarLink
              icon={<FileText size={18} />}
              label="Resume"
              active={activeTab === "resume"}
              onClick={() => setActiveTab("resume")}
            />
            <SidebarLink
              icon={<Users size={18} />}
              label="About"
              active={activeTab === "about"}
              onClick={() => setActiveTab("about")}
            />
            <SidebarLink
              icon={<Mail size={18} />}
              label="Contact"
              active={activeTab === "contact"}
              onClick={() => setActiveTab("contact")}
            />
            <SidebarLink
              icon={<MessageSquare size={18} />}
              label="Messages"
              active={activeTab === "messages"}
              onClick={() => setActiveTab("messages")}
            />
            <SidebarLink
              icon={<Settings size={18} />}
              label="Settings"
              active={activeTab === "settings"}
              onClick={() => setActiveTab("settings")}
            />
          </nav>
        </div>
        <div className="absolute bottom-0 w-full p-6 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors w-full px-3 py-2 rounded-lg hover:bg-white/5"
          >
            <Home size={18} />
            <span>Back to Website</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors w-full px-3 py-2 rounded-lg hover:bg-white/5"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="md:ml-64 flex-1 p-4 md:p-8">
        {activeTab === "dashboard" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <DashboardCard
                title="Total Projects"
                value={projectsData.length.toString()}
                icon={<Layers size={20} />}
                color="#FF5722"
              />
              <DashboardCard
                title="Unread Messages"
                value={messagesData.filter((m) => !m.read).length.toString()}
                icon={<MessageSquare size={20} />}
                color="#4CAF50"
              />
              <DashboardCard title="Profile Views" value="1,234" icon={<Eye size={20} />} color="#2196F3" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GlassCard className="p-6">
                <h3 className="text-xl font-bold mb-4">Recent Projects</h3>
                <div className="space-y-4">
                  {projectsData.slice(0, 3).map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-800 rounded-lg overflow-hidden mr-3">
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{project.title}</h4>
                          <p className="text-sm text-gray-400">{project.type}</p>
                        </div>
                      </div>
                      <button className="text-[#FF5722]">
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <button onClick={() => setActiveTab("projects")} className="text-sm text-[#FF5722] hover:underline">
                    View All Projects
                  </button>
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h3 className="text-xl font-bold mb-4">Recent Messages</h3>
                <div className="space-y-4">
                  {messagesData.slice(0, 3).map((message) => (
                    <div key={message.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <h4 className="font-medium flex items-center">
                          {message.name}
                          {!message.read && <span className="ml-2 w-2 h-2 bg-[#FF5722] rounded-full"></span>}
                        </h4>
                        <p className="text-sm text-gray-400">{message.subject}</p>
                      </div>
                      <div className="text-sm text-gray-400">{message.date}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <button onClick={() => setActiveTab("messages")} className="text-sm text-[#FF5722] hover:underline">
                    View All Messages
                  </button>
                </div>
              </GlassCard>
            </div>
          </div>
        )}

        {activeTab === "projects" && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold">Projects</h2>
              <button className="flex items-center gap-2 bg-[#FF5722] text-white px-4 py-2 rounded-lg hover:bg-[#E64A19] transition-colors">
                <Plus size={18} />
                <span>Add Project</span>
              </button>
            </div>

            <GlassCard className="p-6 overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4">Image</th>
                    <th className="text-left py-3 px-4">Title</th>
                    <th className="text-left py-3 px-4">Type</th>
                    <th className="text-right py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projectsData.map((project) => (
                    <tr key={project.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3 px-4">
                        <div className="w-10 h-10 bg-gray-800 rounded-lg overflow-hidden">
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="py-3 px-4">{project.title}</td>
                      <td className="py-3 px-4">{project.type}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-1 text-gray-400 hover:text-white transition-colors">
                            <Edit size={16} />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                            <Trash size={16} />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-[#FF5722] transition-colors">
                            <Eye size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </GlassCard>
          </div>
        )}

        {activeTab === "about" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Edit About Page</h2>
            <GlassCard className="p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Profile Image</label>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="w-24 h-24 bg-gray-800 rounded-full overflow-hidden">
                      <Image
                        src={aboutForm.profileImage || "/placeholder.svg"}
                        alt="Profile"
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                      Change Image
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="bio" className="block text-sm font-medium mb-2">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={aboutForm.bio}
                    onChange={handleAboutChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent transition-all"
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="philosophy" className="block text-sm font-medium mb-2">
                    Philosophy
                  </label>
                  <textarea
                    id="philosophy"
                    name="philosophy"
                    value={aboutForm.philosophy}
                    onChange={handleAboutChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent transition-all"
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button className="bg-[#FF5722] text-white px-6 py-2 rounded-lg hover:bg-[#E64A19] transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            </GlassCard>
          </div>
        )}

        {activeTab === "resume" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Edit Resume</h2>
            <GlassCard className="p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={resumeForm.fullName}
                    onChange={handleResumeChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-2">
                    Job Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={resumeForm.title}
                    onChange={handleResumeChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="summary" className="block text-sm font-medium mb-2">
                  Professional Summary
                </label>
                <textarea
                  id="summary"
                  name="summary"
                  value={resumeForm.summary}
                  onChange={handleResumeChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent transition-all"
                ></textarea>
              </div>
            </GlassCard>

            <GlassCard className="p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Experience</h3>
                <button onClick={addExperience} className="flex items-center gap-1 text-sm text-[#FF5722]">
                  <Plus size={16} />
                  <span>Add Experience</span>
                </button>
              </div>

              <div className="space-y-6">
                {resumeForm.experiences.map((exp, index) => (
                  <div key={index} className="p-4 bg-white/5 rounded-lg">
                    <div className="flex justify-between mb-4">
                      <h4 className="font-medium">Experience {index + 1}</h4>
                      <button onClick={() => removeExperience(index)} className="text-gray-400 hover:text-red-500">
                        <Trash size={16} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Job Title</label>
                        <input
                          type="text"
                          value={exp.title}
                          onChange={(e) => handleExperienceChange(index, "title", e.target.value)}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Company</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Location</label>
                        <input
                          type="text"
                          value={exp.location}
                          onChange={(e) => handleExperienceChange(index, "location", e.target.value)}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Start Date</label>
                        <input
                          type="month"
                          value={exp.startDate}
                          onChange={(e) => handleExperienceChange(index, "startDate", e.target.value)}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">End Date</label>
                        <input
                          type="month"
                          value={exp.endDate}
                          onChange={(e) => handleExperienceChange(index, "endDate", e.target.value)}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <textarea
                        value={exp.description}
                        onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent transition-all"
                      ></textarea>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <div className="flex justify-end">
              <button className="bg-[#FF5722] text-white px-6 py-2 rounded-lg hover:bg-[#E64A19] transition-colors">
                Save Resume
              </button>
            </div>
          </div>
        )}

        {activeTab === "contact" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <GlassCard className="p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">Edit Contact Details</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleContactChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={contactForm.phone}
                    onChange={handleContactChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={contactForm.location}
                    onChange={handleContactChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">Social Links</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="github" className="block text-sm font-medium mb-2">
                    GitHub
                  </label>
                  <input
                    type="url"
                    id="github"
                    name="github"
                    value={contactForm.github}
                    onChange={handleContactChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="instagram" className="block text-sm font-medium mb-2">
                    Instagram
                  </label>
                  <input
                    type="url"
                    id="instagram"
                    name="instagram"
                    value={contactForm.instagram}
                    onChange={handleContactChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button className="bg-[#FF5722] text-white px-6 py-2 rounded-lg hover:bg-[#E64A19] transition-colors">
                  Save Changes
                </button>
              </div>
            </GlassCard>
          </div>
        )}

        {activeTab === "messages" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Messages</h2>
            <GlassCard className="p-6 overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4">Name</th>
                    <th className="text-left py-3 px-4">Email</th>
                    <th className="text-left py-3 px-4">Subject</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-right py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((message) => (
                    <tr
                      key={message.id}
                      className={`border-b border-white/5 hover:bg-white/5 ${!message.read ? "bg-white/5" : ""}`}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          {message.name}
                          {!message.read && <span className="ml-2 w-2 h-2 bg-[#FF5722] rounded-full"></span>}
                        </div>
                      </td>
                      <td className="py-3 px-4">{message.email}</td>
                      <td className="py-3 px-4">{message.subject}</td>
                      <td className="py-3 px-4">{new Date(message.created_at).toLocaleDateString()}</td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => markMessageAsRead(message.id)}
                          className="px-3 py-1 text-sm bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </GlassCard>
          </div>
        )}

        {activeTab === "settings" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Settings</h2>
            <GlassCard className="p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">Account Settings</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="admin-email" className="block text-sm font-medium mb-2">
                    Admin Email
                  </label>
                  <input
                    type="email"
                    id="admin-email"
                    defaultValue="admin@example.com"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="current-password" className="block text-sm font-medium mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="current-password"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="new-password" className="block text-sm font-medium mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="new-password"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirm-password"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent transition-all"
                  />
                </div>

                <div className="flex justify-end">
                  <button className="bg-[#FF5722] text-white px-6 py-2 rounded-lg hover:bg-[#E64A19] transition-colors">
                    Update Account
                  </button>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-xl font-bold mb-4">Website Settings</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="site-title" className="block text-sm font-medium mb-2">
                    Site Title
                  </label>
                  <input
                    type="text"
                    id="site-title"
                    defaultValue="Karthikeya | Full-Stack Developer & UI/UX Designer"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="site-description" className="block text-sm font-medium mb-2">
                    Site Description
                  </label>
                  <textarea
                    id="site-description"
                    defaultValue="Portfolio of Karthikeya, a full-stack developer and UI/UX designer focused on creating innovative digital experiences with React and Next.js."
                    rows={3}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent transition-all"
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button className="bg-[#FF5722] text-white px-6 py-2 rounded-lg hover:bg-[#E64A19] transition-colors">
                    Save Settings
                  </button>
                </div>
              </div>
            </GlassCard>
          </div>
        )}
      </div>
    </div>
  )
}

function SidebarLink({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg transition-colors ${
        active ? "bg-[#FF5722]/20 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
      }`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
      {active && (
        <motion.div
          layoutId="activeIndicator"
          className="w-1 h-6 bg-[#FF5722] absolute right-0 rounded-l-full"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </button>
  )
}

function MobileNavItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode
  label?: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      className={`flex items-center gap-3 w-full px-3 py-3 rounded-lg transition-colors ${
        active ? "bg-[#FF5722]/20 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
      }`}
      onClick={onClick}
    >
      {icon}
      {label && <span>{label}</span>}
    </button>
  )
}

function DashboardCard({
  title,
  value,
  icon,
  color,
}: {
  title: string
  value: string
  icon: React.ReactNode
  color: string
}) {
  return (
    <GlassCard className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <div className="p-3 rounded-full" style={{ backgroundColor: `${color}20` }}>
          <div style={{ color }}>{icon}</div>
        </div>
      </div>
    </GlassCard>
  )
}

