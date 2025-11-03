
'use client';
import { apiService } from '@/services/apiService';
import _navbar from '@/components/nav_bar/navbar';
import Footer from "@/components/layout/footer";
import Home_page from '@/components/home_page/home_page';

const Home = () => {
  const getUser = async () => {
    const data = await apiService.getUsers()
    console.log(data)
    return data
  }
  getUser()
  return (
    <div>
      <_navbar/>
      <Home_page/>
      <Footer/>
    </div>
  );
};

export default Home;