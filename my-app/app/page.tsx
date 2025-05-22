
'use client';

import _search_bar from "@/components/home_page/search_bar"
import _navbar from '@/components/layout/navbar';
import Footer from "@/components/layout/footer";

const Home = () => {
  return (
    <div>
      <_navbar/>
      <_search_bar/>
      <Footer/>
    </div>
  );
};

export default Home;