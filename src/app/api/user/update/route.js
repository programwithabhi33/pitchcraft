import { auth } from "@/auth";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function POST(req) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    await dbConnect();

    // Prevent direct email updates via this route for Google users
    const existingUser = await User.findById(session.user.id);
    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // List of allowed fields to update
    const allowedFields = [
      'name', 'avatar', 'senderName', 'senderRole', 
      'senderCompany', 'senderWebsite', 'senderTone'
    ];

    const updates = {};
    allowedFields.forEach(field => {
      if (body[field] !== undefined) {
        updates[field] = body[field];
      }
    });

    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    return NextResponse.json({ 
      message: "Profile updated successfully", 
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
        senderName: updatedUser.senderName,
        senderRole: updatedUser.senderRole,
        senderCompany: updatedUser.senderCompany,
        senderWebsite: updatedUser.senderWebsite,
        senderTone: updatedUser.senderTone,
        avatar: updatedUser.avatar,
      }
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
