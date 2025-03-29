import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

// Use the neon serverless driver with the pooled connection URL
export const sql = neon(process.env.DATABASE_URL!)
export const db = drizzle(sql)

// Helper function for server components
export async function executeQuery(query: string, params: any[] = []) {
  try {
    return await sql(query, params)
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}

