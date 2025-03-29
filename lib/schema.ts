import { pgTable, serial, text, varchar, timestamp, boolean, json } from "drizzle-orm/pg-core"

// Projects table
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  fullDescription: text("full_description"),
  image: varchar("image", { length: 255 }),
  images: json("images").$type<string[]>(),
  techStack: json("tech_stack").$type<string[]>(),
  liveLink: varchar("live_link", { length: 255 }),
  githubLink: varchar("github_link", { length: 255 }),
  purpose: text("purpose"),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// About table
export const about = pgTable("about", {
  id: serial("id").primaryKey(),
  bio: text("bio").notNull(),
  philosophy: text("philosophy"),
  skills: json("skills").$type<string[]>(),
  profileImage: varchar("profile_image", { length: 255 }),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Resume table
export const resume = pgTable("resume", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  summary: text("summary"),
  experiences:
    json("experiences").$type<
      {
        title: string
        company: string
        location: string
        startDate: string
        endDate: string
        description: string
      }[]
    >(),
  education:
    json("education").$type<
      {
        institution: string
        degree: string
        field: string
        startDate: string
        endDate: string
      }[]
    >(),
  skills: json("skills").$type<string[]>(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Contact table
export const contact = pgTable("contact", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  location: varchar("location", { length: 255 }),
  github: varchar("github", { length: 255 }),
  instagram: varchar("instagram", { length: 255 }),
  linkedin: varchar("linkedin", { length: 255 }),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Messages table
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 255 }),
  message: text("message").notNull(),
  read: boolean("read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
})

// Admin users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
})

