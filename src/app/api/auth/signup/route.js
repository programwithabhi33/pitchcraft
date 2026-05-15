import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { sendEmail, generateOTP, getOTPTemplate } from "@/lib/mail";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const lowerEmail = email.toLowerCase().trim();

    await dbConnect();

    const existingUser = await User.findOne({ email: lowerEmail });

    if (existingUser) {
      if (existingUser.isVerified) {
        return NextResponse.json(
          { message: "User already exists and is verified" },
          { status: 400 }
        );
      }
      
      const otp = generateOTP();
      existingUser.verificationOTP = otp;
      existingUser.verificationOTPExpires = new Date(Date.now() + 10 * 60 * 1000); 
      
      await existingUser.save();
      console.log(`Updated existing user ${lowerEmail} with OTP: ${otp}`);

      await sendEmail({
        to: lowerEmail,
        subject: "Verify your PitchCraft AI account",
        html: getOTPTemplate(otp),
      });

      return NextResponse.json(
        { message: "Verification code sent to email", email: lowerEmail },
        { status: 200 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();

    const newUser = await User.create({
      name,
      email: lowerEmail,
      password: hashedPassword,
      isVerified: false,
      verificationOTP: otp,
      verificationOTPExpires: new Date(Date.now() + 10 * 60 * 1000),
    });

    console.log(`Created new user ${lowerEmail} with OTP: ${newUser.verificationOTP}`);

    await sendEmail({
      to: lowerEmail,
      subject: "Verify your PitchCraft AI account",
      html: getOTPTemplate(otp),
    });

    return NextResponse.json(
      { message: "Verification code sent to email", email: lowerEmail },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
