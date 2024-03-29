import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/utils/prisma";

export async function POST(req) {
  const { username, email, password } = await req.json();

  try {
    // Create hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create user to database
    const createUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: 'user',
      },
    });

    return NextResponse.json(
      { data: createUser, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { errorMessage: "Something went wrong. Please try again later" },
      { status: 500 }
    );
  }
}
