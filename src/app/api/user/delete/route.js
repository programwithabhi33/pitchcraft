import { auth } from "@/auth";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import Output from "@/models/Output";

export async function DELETE() {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const userId = session.user.id;

    // 1. Delete all generated outputs (history)
    await Output.deleteMany({ userId });

    // 2. Delete the user account
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Note: NextAuth session will be invalidated on client side via signOut()
    return NextResponse.json({ message: "Account and data successfully deleted" });
  } catch (error) {
    console.error("Account deletion error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
