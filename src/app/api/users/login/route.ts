import { NextRequest, NextResponse } from "next/server"
import { ConnectDB } from "@/db/db"
import User from "@/models/userModel"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
  await ConnectDB()

  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 }) // don't leak email status
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 }) // unified error message
    }

    // Token payload
    const tokenPayload = {
      id: user._id,
      username: user.username,
      email: user.email,
    }

    const secret = process.env.SECRET
    if (!secret) throw new Error("JWT secret not configured.")

    const token = jwt.sign(tokenPayload, secret, { expiresIn: "1d" })

    const response = NextResponse.json(
      {
        message: "User logged in successfully.",
        success: true,
      },
      { status: 200 }
    )

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    })

    return response
  } catch (error: any) {
    console.error("Login error:", error.message)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
