import { connect } from '../../../lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { phone_number, password } = req.body;

        try {
            const db = await connect();

            // Find user by phone number
            const [user] = await db.query('SELECT * FROM users WHERE phone_number = ?', [phone_number]);
            if (user.length === 0) {
                return res.status(400).json({ message: 'User not found' });
            }

            // Check password
            const isMatch = await bcrypt.compare(password, user[0].password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Incorrect password' });
            }

            // Generate JWT token
            const token = jwt.sign({ id: user[0].id, phone_number: user[0].phone_number }, process.env.JWT_SECRET, { expiresIn: '1h' });

            return res.status(200).json({ token });
        } catch (error) {
            return res.status(500).json({ message: 'Something went wrong', error });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}