import { connect } from '../../../lib/db';
import bcrypt from 'bcryptjs';
import { sendOTP } from '../../../lib/twilio'; // This function will use Twilio to send OTP.

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, phone_number, password } = req.body;

        try {
            const db = await connect();

            // Check if phone number already exists
            const [userExists] = await db.query('SELECT * FROM users WHERE phone_number = ?', [phone_number]);
            if (userExists.length > 0) {
                return res.status(400).json({ message: 'Phone number already exists' });
            }

            // Hash the password
            const hashedPassword = await b-crypt.hash(password, 10);

            // Generate OTP and send via Twilio
            const otp = Math.floor(100000 + Math.random() * 900000); // 6 digit OTP
            await sendOTP(phone_number, otp); // Send OTP using Twilio

            // Insert new user into the database
            const result = await db.query('INSERT INTO users (email, phone_number, password, otp) VALUES (?, ?, ?, ?)', [email, phone_number, hashedPassword, otp]);

            return res.status(200).json({ message: 'User created, OTP sent' });
        } catch (error) {
            return res.status(500).json({ message: 'Something went wrong', error });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}