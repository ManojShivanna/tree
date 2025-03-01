"use client";

import { useState } from "react";

export default function ForgotPassword() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleRequestOTP = async () => {
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone_number: phoneNumber }),
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <input
        type="text"
        placeholder="Enter Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={handleRequestOTP}>Send OTP</button>
      {message && <p>{message}</p>}
    </div>
  );
}
