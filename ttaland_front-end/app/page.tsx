
'use client';

import _navbar from '@/components/nav_bar/navbar';
import Footer from "@/components/layout/footer";
import Home_page from '@/components/home_page/home_page';

const Home = () => {
  return (
    <div>
      <_navbar/>
      <Home_page/>
      <Footer/>
    </div>
  );
};

export default Home;