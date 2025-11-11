
'use client';
import _navbar from '@/components/nav_bar/navbar';
import Footer from "@/components/layout/footer";
import Home_page from '@/components/home_page/home_page';
import { getProduct } from '@/network/GET/product';
import { useEffect } from 'react';

const Home = () => {

  useEffect (() => {
    const res = getProduct.getTownhouses()
    res.finally(() => {
      console.log(res)
    })
  })

  return (
    <div>
      <_navbar/>
      <Home_page/>
      <Footer/>
    </div>
  );
};

export default Home;