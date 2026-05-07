import { auth } from "@/auth";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { role, service, clientName, industry, context, tone } =
      await req.json();

    await dbConnect();

    const user = await User.findById(session.user.id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Usage check
    if (user.usageCount >= 10) {
      return NextResponse.json(
        {
          message:
            "You have reached your monthly limit of 10 free generations.",
        },
        { status: 429 },
      );
    }

    const systemPrompt = `
      You are PitchCraft AI, an expert cold outreach specialist.
      Your goal is to write a highly personalized, conversion-focused cold email.

      User's Details:
      - Name/Role: ${role}
      - Service Offered: ${service}

      Client's Details:
      - Name/Company: ${clientName}
      - Industry: ${industry}

      Context/Notes: ${context || "None provided"}
      Tone: ${tone}

      Instructions:
      1. Provide 3 catchy subject lines.
      2. Write a short, punchy body (max 150 to 200 words).
      3. Use a "Low Friction" call to action.
      4. Avoid AI-sounding clichés (like "I hope this email finds you well" or "In today's fast-paced world").
      5. Strictly follow the tone: ${tone}.
      6. Output format: JSON-like structure with "subjects" (array of 3 strings) and "body" (string).
      7. Make sure that the email has proper paragraphs if and have followed the professionalism.
      8. Also the email should be that kind of email that one one want to avoid the email to read it.
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: "Generate the cold email now." },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 1024,
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(chatCompletion.choices[0].message.content);

    // Increment usage
    user.usageCount += 1;
    await user.save();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
