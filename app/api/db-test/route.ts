import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { projects } from "@/lib/schema"

export async function GET() {
  try {
    // Try to query the database
    const result = await db.select().from(projects).limit(1)

    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      data: result,
      dbUrl: process.env.DATABASE_URL?.substring(0, 20) + "...", // Show part of the URL for verification
    })
  } catch (error) {
    console.error("Database connection error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Database connection failed",
        error: String(error),
      },
      { status: 500 },
    )
  }
}

