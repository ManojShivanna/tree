"use client";

import { useState } from 'react';
import axios from 'axios';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/api/auth/signup', { email, phone_number: phoneNumber, password });
            alert('Signup successful, OTP sent');
        } catch (error) {
            alert('Error: ' + error.response.data.message);
        }
    };

    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone Number" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}