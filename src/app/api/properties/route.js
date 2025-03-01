import {createConnection} from '@/lib/db.js';
import {NextResponse} from 'next/server'

export async function GET(req, res) {
    try {
      const db = await createConnection();
      const properties = await db.query('SELECT * FROM properties');
      return NextResponse.json(properties)
    } catch (error) {
      console.error('Error fetching categories:', error);
      return  NextResponse.json({error: error.message});
    }
  }


