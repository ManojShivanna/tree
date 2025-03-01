import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req) {
  const { phone_number, otp, new_password } = await req.json();

  // Verify OTP
  const [user] = await db.query("SELECT otp, otp_expires FROM users WHERE phone_number = ?", [phone_number]);

  if (!user || user.otp !== otp || new Date() > new Date(user.otp_expires)) {
    return NextResponse.json({ message: "Invalid or expired OTP" }, { status: 400 });
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(new_password, 10);

  // Update password & clear OTP
  await db.query("UPDATE users SET password = ?, otp = NULL, otp_expires = NULL WHERE phone_number = ?", [
    hashedPassword,
    phone_number,
  ]);

  return NextResponse.json({ message: "Password reset successfully" }, { status: 200 });
}
