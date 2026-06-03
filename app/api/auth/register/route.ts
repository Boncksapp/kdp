import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  console.log("POST /api/auth/register called");
  try {
    const body = await request.json();
    const { email, password } = body;
    console.log("Registration attempt for email:", email);

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }

    if (!/[A-Z]/.test(password)) {
      return NextResponse.json(
        { error: "Password must contain at least one uppercase letter." },
        { status: 400 }
      );
    }

    if (!/[a-z]/.test(password)) {
      return NextResponse.json(
        { error: "Password must contain at least one lowercase letter." },
        { status: 400 }
      );
    }

    if (!/[0-9]/.test(password)) {
      return NextResponse.json(
        { error: "Password must contain at least one number." },
        { status: 400 }
      );
    }

    // Check for existing user
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log(`Registration failed: User ${email} already exists`);
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    // Hash password and create user
    console.log(`Hashing password for ${email}...`);
    const passwordHash = await bcrypt.hash(password, 12);
    console.log(`Password hashed successfully for ${email}`);

    const user = await prisma.user.create({
      data: {
        email,
        password_hash: passwordHash,
      },
    });

    console.log(`User created successfully: ${user.id} (${email})`);

    return NextResponse.json(
      {
        message: "Account created successfully.",
        userId: user.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("CRITICAL REGISTRATION ERROR DETECTED:", error);
    if (error instanceof Error) {
      console.log("Error Message:", error.message);
      console.log("Error Stack:", error.stack);
    }
    return NextResponse.json(
      { error: `Registration failed: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
}