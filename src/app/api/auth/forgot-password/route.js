import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // Import database connection
import crypto from "crypto";

export async function POST(req) {
  const { phone_number } = await req.json();
  const otp = crypto.randomInt(100000, 999999).toString();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min expiry

  const result = await db.query(
    "UPDATE users SET otp = ?, otp_expires = ? WHERE phone_number = ?",
    [otp, otpExpires, phone_number]
  );

  if (result.affectedRows === 0) {
    return NextResponse.json({ message: "Phone number not found" }, { status: 404 });
  }

  console.log(`OTP for ${phone_number}: ${otp}`); // Replace with actual SMS service
  return NextResponse.json({ message: "OTP sent successfully" }, { status: 200 });
}
