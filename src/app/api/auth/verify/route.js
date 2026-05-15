import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function POST(req) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const lowerEmail = email.toLowerCase().trim();
    const cleanOtp = otp.trim();

    await dbConnect();

    console.log(`Attempting verification for ${lowerEmail} with code: ${cleanOtp}`);

    const user = await User.findOne({
      email: lowerEmail,
      verificationOTP: cleanOtp,
      verificationOTPExpires: { $gt: new Date() },
    });

    if (!user) {
      // Find user without OTP criteria to explain WHY it failed
      const userExists = await User.findOne({ email: lowerEmail });
      
      if (!userExists) {
        return NextResponse.json({ message: "No account found with this email" }, { status: 404 });
      }

      if (userExists.verificationOTP !== cleanOtp) {
        console.log(`Mismatch! Provided: "${cleanOtp}", Expected: "${userExists.verificationOTP}"`);
        return NextResponse.json({ message: "Invalid verification code" }, { status: 400 });
      }

      if (userExists.verificationOTPExpires < new Date()) {
        console.log(`Expired! Code was valid until: ${userExists.verificationOTPExpires}`);
        return NextResponse.json({ message: "Verification code has expired" }, { status: 400 });
      }

      return NextResponse.json(
        { message: "Verification failed. Please try signing up again." },
        { status: 400 }
      );
    }

    user.isVerified = true;
    user.verificationOTP = undefined;
    user.verificationOTPExpires = undefined;
    await user.save();

    console.log(`Successfully verified ${lowerEmail}`);

    return NextResponse.json(
      { message: "Account verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
