import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    // Gọi API từ Django
    console.log('blabla')
    const response = await axios.get('http://localhost:8000/api/');
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching data from Django:", error);
    return NextResponse.json({ message: 'Error fetching data from Django' }, { status: 500 });
  }
}
