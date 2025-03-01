import {createConnection} from '@/lib/db.js';
import {NextResponse} from 'next/server'

export async function GET(req, res) {
    try {
      const db = await createConnection();
      const premiums = await db.query('SELECT * FROM properties WHERE is_premium = TRUE;');
      return NextResponse.json(premiums)
    } catch (error) {
      console.error('Error fetching categories:', error);
      return  NextResponse.json({error: error.message});
    }
  }

