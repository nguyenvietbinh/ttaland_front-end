
'use client';

import _navbar from '@/components/nav_bar/navbar';
import Footer from "@/components/layout/footer";
import ApiTestComponent from '@/components/debug/ApiTestComponent';
import 'leaflet/dist/leaflet.css';

const Home = () => {
  return (
    <div>
      <_navbar/>
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center mb-8">API Connectivity Test</h1>
        <ApiTestComponent />
      </div>
      <Footer/>
    </div>
  );
};

export default Home;