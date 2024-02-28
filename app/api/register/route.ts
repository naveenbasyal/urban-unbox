import { db } from "@/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
export const POST = async (req: Request, res: NextResponse) => {
  const { username, email, password } = await req.json();
  try {
    const userExist = await db.user.findFirst({
      where: {
        email,
      },
    });
    
    if (userExist) {
      
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // new user
    const user = await db.user.create({
      data: {
        name: username,
        email,
        hashedPassword,
      },
    });
    const { hashedPassword: _, ...rest } = user;
    return NextResponse.json(
      { message: "User created", user: rest },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
