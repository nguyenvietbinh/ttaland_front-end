
'use client';

import { NextResponse } from 'next/server';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Home = () => {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/');
        const res = NextResponse.json(response.data);
        const data = await res.json();
        setMessage(data.message);
      } catch (error) {
        console.error('Error fetching data from API:', error);
        setMessage('Error fetching data');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-gray-600">{message || 'Loading...'}</h1>
      <div className='text-white'>
        blbal
      </div>
    </div>
  );
};

export default Home;
