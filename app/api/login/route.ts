import { db } from "@/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
export const POST = async (req: Request, res: NextResponse) => {
  const { email, password } = await req.json();
  try {
    const user = await db.user.findFirst({
      where: {
        email,
      },
    });
    if (
      user &&
      (await bcrypt.compare(password, user?.hashedPassword as string))
    ) {
      const { hashedPassword, ...rest } = user;
      return NextResponse.json({ message: "Logged In", rest }, { status: 200 });
    }
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
