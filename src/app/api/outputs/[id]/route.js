import { auth } from "@/auth";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Output from "@/models/Output";

export async function DELETE(req, { params }) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await dbConnect();

    const output = await Output.findOneAndDelete({
      _id: id,
      userId: session.user.id,
    });

    if (!output) {
      return NextResponse.json({ message: "Output not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Output deleted successfully" });
  } catch (error) {
    console.error("Delete output error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
