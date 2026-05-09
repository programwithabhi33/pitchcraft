import { auth } from "@/auth";
import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const prompt = `
      You are an expert cold outreach coach. 
      Provide ONE short, actionable, and highly effective tip for writing cold emails that get replies.
      
      Requirements:
      1. Keep it under 40 words.
      2. Focus on psychology, personalization, or CTAs.
      3. Use a helpful, professional tone.
      4. Output format: JSON with "title" (3-5 words) and "body" (the tip text).
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "You generate outreach tips." },
        { role: "user", content: prompt },
      ],
      model: "llama-3.1-8b-instant", // Using a smaller, faster model for simple tips
      temperature: 0.8,
      response_format: { type: "json_object" },
    });

    const tip = JSON.parse(chatCompletion.choices[0].message.content);

    return NextResponse.json(tip);
  } catch (error) {
    console.error("Tip generation error:", error);
    // Fallback static tip if AI fails
    return NextResponse.json({
      title: "Keep it personalized",
      body: "Mention a specific recent achievement or post from your prospect to show you've done your research."
    });
  }
}
