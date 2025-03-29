"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"
import { projects, about, resume, contact, messages } from "@/lib/schema"
import { eq } from "drizzle-orm"

// Project actions
export async function getProjects() {
  try {
    return await db.select().from(projects).orderBy(projects.createdAt)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return []
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    const result = await db.select().from(projects).where(eq(projects.slug, slug))
    return result[0] || null
  } catch (error) {
    console.error(`Error fetching project with slug ${slug}:`, error)
    return null
  }
}

export async function createProject(projectData: any) {
  try {
    await db.insert(projects).values(projectData)
    revalidatePath("/work")
    revalidatePath("/admin/dashboard")
    return { success: true }
  } catch (error) {
    console.error("Error creating project:", error)
    return { success: false, error: "Failed to create project" }
  }
}

export async function updateProject(id: number, projectData: any) {
  try {
    await db.update(projects).set(projectData).where(eq(projects.id, id))
    revalidatePath("/work")
    revalidatePath(`/work/${projectData.slug}`)
    revalidatePath("/admin/dashboard")
    return { success: true }
  } catch (error) {
    console.error(`Error updating project with id ${id}:`, error)
    return { success: false, error: "Failed to update project" }
  }
}

export async function deleteProject(id: number) {
  try {
    await db.delete(projects).where(eq(projects.id, id))
    revalidatePath("/work")
    revalidatePath("/admin/dashboard")
    return { success: true }
  } catch (error) {
    console.error(`Error deleting project with id ${id}:`, error)
    return { success: false, error: "Failed to delete project" }
  }
}

// About actions
export async function getAbout() {
  try {
    const result = await db.select().from(about)
    return result[0] || null
  } catch (error) {
    console.error("Error fetching about data:", error)
    return null
  }
}

export async function updateAbout(aboutData: any) {
  try {
    const existingAbout = await getAbout()

    if (existingAbout) {
      await db.update(about).set(aboutData).where(eq(about.id, existingAbout.id))
    } else {
      await db.insert(about).values(aboutData)
    }

    revalidatePath("/about")
    revalidatePath("/admin/dashboard")
    return { success: true }
  } catch (error) {
    console.error("Error updating about data:", error)
    return { success: false, error: "Failed to update about data" }
  }
}

// Resume actions
export async function getResume() {
  try {
    const result = await db.select().from(resume)
    return result[0] || null
  } catch (error) {
    console.error("Error fetching resume data:", error)
    return null
  }
}

export async function updateResume(resumeData: any) {
  try {
    const existingResume = await getResume()

    if (existingResume) {
      await db.update(resume).set(resumeData).where(eq(resume.id, existingResume.id))
    } else {
      await db.insert(resume).values(resumeData)
    }

    revalidatePath("/resume")
    revalidatePath("/admin/dashboard")
    return { success: true }
  } catch (error) {
    console.error("Error updating resume data:", error)
    return { success: false, error: "Failed to update resume data" }
  }
}

// Contact actions
export async function getContact() {
  try {
    const result = await db.select().from(contact)
    return result[0] || null
  } catch (error) {
    console.error("Error fetching contact data:", error)
    return null
  }
}

export async function updateContact(contactData: any) {
  try {
    const existingContact = await getContact()

    if (existingContact) {
      await db.update(contact).set(contactData).where(eq(contact.id, existingContact.id))
    } else {
      await db.insert(contact).values(contactData)
    }

    revalidatePath("/contact")
    revalidatePath("/admin/dashboard")
    return { success: true }
  } catch (error) {
    console.error("Error updating contact data:", error)
    return { success: false, error: "Failed to update contact data" }
  }
}

// Message actions
export async function submitMessage(messageData: any) {
  try {
    // Log the message data for debugging
    console.log("Submitting message:", messageData)

    // Insert the message into the database
    const result = await db.insert(messages).values(messageData).returning()
    console.log("Message submitted successfully:", result)

    revalidatePath("/admin/dashboard")
    return { success: true }
  } catch (error) {
    console.error("Error submitting message:", error)
    return { success: false, error: "Failed to submit message" }
  }
}

export async function getMessages() {
  try {
    // Get all messages ordered by creation date (newest first)
    const result = await db.select().from(messages).orderBy(messages.createdAt, "desc")
    console.log("Retrieved messages:", result.length)
    return result
  } catch (error) {
    console.error("Error fetching messages:", error)
    return []
  }
}

export async function markMessageAsRead(id: number) {
  try {
    await db.update(messages).set({ read: true }).where(eq(messages.id, id))
    revalidatePath("/admin/dashboard")
    return { success: true }
  } catch (error) {
    console.error(`Error marking message with id ${id} as read:`, error)
    return { success: false, error: "Failed to mark message as read" }
  }
}

// Authentication actions
export async function loginUser(email: string, password: string) {
  try {
    // In a real app, you would fetch the user from the database and verify the password
    // For demo purposes, we'll use a hardcoded admin user
    if (email === "admin@example.com" && password === "password") {
      return { success: true, user: { id: 1, email, name: "Admin" } }
    }
    return { success: false, error: "Invalid email or password" }
  } catch (error) {
    console.error("Error logging in:", error)
    return { success: false, error: "Failed to log in" }
  }
}

