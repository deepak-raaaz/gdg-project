import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

//GET req of  user by providing their id in the body or url

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching user", error },
      { status: 500 }
    );
  }
}


export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();

    console.log("Updated Data:", data);

    // Respond with a success message
    return NextResponse.json(
      { message: "Data updated successfully", data },
      { status: 200 }
    );
  } catch (error) {
    //Error handling
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Invalid request", details: error.message },
        { status: 400 }
      );
    }
  }
}
