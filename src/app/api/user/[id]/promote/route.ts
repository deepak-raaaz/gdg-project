import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type Context = {
  params: Promise<{ id: string }>;
};

export async function PUT(req: NextRequest, context: Context) {
  try {
    const params = await context.params;
    const userId = params.id;
    const { role, department } = await req.json();

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (existingUser.email) {
      const existingMember = await prisma.member.findUnique({
        where: { email: existingUser.email },
      });

      if (existingMember) {
        return NextResponse.json(
          { error: "Member already exists with this email" },
          { status: 400 }
        );
      }
    }

    // Data is stored in the member table
    const newMember = await prisma.member.create({
      data: {
        name: existingUser.name || "",
        email: existingUser.email || "",
        role: role,
        department: department,
        status: "ACTIVE",
        joinDate: new Date(),
      },
    });

    return NextResponse.json({
      message: "User promoted to member successfully",
      data: newMember,
    });
  } catch (error) {
    console.error("Error in promotion:", error);
    return NextResponse.json(
      { error: "Failed to promote user to member" },
      { status: 500 }
    );
  }
}
