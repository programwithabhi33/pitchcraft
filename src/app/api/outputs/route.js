import { auth } from "@/auth";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Output from "@/models/Output";

// POST /api/outputs - Save a generation
export async function POST(req) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { type, tone, inputs, content, model } = await req.json();

    await dbConnect();

    const newOutput = await Output.create({
      userId: session.user.id,
      type: type || 'cold_email',
      tone,
      inputs,
      content,
      model: model || 'groq/llama-3.3-70b',
    });

    return NextResponse.json(newOutput, { status: 201 });
  } catch (error) {
    console.error("Save error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// GET /api/outputs - Get user's history
export async function GET(req) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const outputs = await Output.find({ userId: session.user.id })
      .sort({ generatedAt: -1 })
      .limit(50); // Minimal pagination for now

    return NextResponse.json(outputs);
  } catch (error) {
    console.error("Fetch history error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
