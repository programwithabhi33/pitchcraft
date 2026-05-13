import { auth } from "@/auth";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    
    // Explicitly find the user and return ALL needed fields
    const user = await User.findById(session.user.id).lean();

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: user._id.toString(),
      name: user.name || "",
      email: user.email || "",
      avatar: user.avatar || "",
      plan: user.plan || "free",
      usageCount: user.usageCount || 0,
      totalLimit: 10,
      senderName: user.senderName || user.name || "",
      senderRole: user.senderRole || "",
      senderTone: user.senderTone || "Friendly",
    });
  } catch (error) {
    console.error("Fetch user data error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
