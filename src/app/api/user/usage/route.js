import { auth } from "@/auth";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const user = await User.findById(session.user.id).select("name email usageCount plan avatar");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      name: user.name,
      email: user.email,
      usageCount: user.usageCount,
      totalLimit: 10,
      plan: user.plan,
      avatar: user.avatar,
    });
  } catch (error) {
    console.error("Fetch usage error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
