import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

//This route is getting all members 
export async function GET() {
  try {
    const members = await prisma.member.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        department: true,
        joinDate: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(
      { 
        message: 'Members retrieved successfully',
        data: members 
      }, 
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching members:', error);
    return NextResponse.json(
      { 
        message: 'Error fetching members',
        error: 'Internal server error' 
      }, 
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, role, department, status = 'ACTIVE' } = body;

    // Basic validation
    if (!name || !email || !role || !department) {
      return NextResponse.json(
        { 
          message: 'Missing required fields',
          error: 'Bad request' 
        }, 
        { status: 400 }
      );
    }

    const existingMember = await prisma.member.findUnique({
      where: { email },
    });

    if (existingMember) {
      return NextResponse.json(
        { 
          message: 'Member already exists',
          error: 'Conflict' 
        }, 
        { status: 409 }
      );
    }

    const member = await prisma.member.create({
      data: {
        name,
        email,
        role,
        department,
        status,
        joinDate: new Date(),
      },
    });

    return NextResponse.json(
      {
        message: 'Member created successfully',
        data: member,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating member:', error);
    return NextResponse.json(
      {
        message: 'Error creating member',
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { 
          message: 'Member ID is required',
          error: 'Bad request' 
        }, 
        { status: 400 }
      );
    }

    const member = await prisma.member.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(
      {
        message: 'Member updated successfully',
        data: member,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating member:', error);
    return NextResponse.json(
      {
        message: 'Error updating member',
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { 
          message: 'Member ID is required',
          error: 'Bad request' 
        }, 
        { status: 400 }
      );
    }

    await prisma.member.delete({
      where: { id },
    });

    return NextResponse.json(
      {
        message: 'Member deleted successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting member:', error);
    return NextResponse.json(
      {
        message: 'Error deleting member',
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}