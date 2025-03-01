"use client";
import { useState } from 'react';
import axios from 'axios';

export default function Login() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post('/api/auth/login', { phone_number: phoneNumber, password });
            localStorage.setItem('token', data.token);
            alert('Login successful');
        } catch (error) {
            alert('Error: ' + error.response.data.message);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone Number" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}