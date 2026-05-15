import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import crypto from "crypto";
import { sendEmail, getResetPasswordTemplate } from "@/lib/mail";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const lowerEmail = email.toLowerCase().trim();

    await dbConnect();

    const user = await User.findOne({ email: lowerEmail });

    if (!user) {
      // For security, don't reveal if user exists. Just say email sent.
      return NextResponse.json({ message: "Reset link has been sent to your email" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
    await user.save();

    const resetUrl = `${process.env.AUTH_URL}/auth/reset-password?token=${resetToken}`;

    await sendEmail({
      to: lowerEmail,
      subject: "Reset your PitchCraft AI password",
      html: getResetPasswordTemplate(resetUrl),
    });

    return NextResponse.json({ message: "Reset link has been sent to your email" });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
