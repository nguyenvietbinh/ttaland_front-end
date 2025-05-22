// pages/index.tsx

'use client'
import { NextPage } from 'next';
import Navbar from '@/components/layout/navbar';
import Displayer from '@/components/showcase/displayer';
import { usePathname } from "next/navigation"
import Footer from '@/components/layout/footer';

const HomePage: NextPage = () => {
  const path_name = usePathname().split('/')
  const mediaItems = [
    {
      type: 'image' as const,
      url: '/example/img/bla_img7.jpg',
      alt: 'Sample image 1',
      title: 'Beautiful Landscape',
      description: 'A scenic view of mountains and lakes'
    },
    {
      type: 'video' as const,
      url: '/example/vid/bla_vid1.mp4',
      poster: '/example/img/bla_img3.png',
      format: 'mp4',
      title: 'Nature Video',
      description: 'A short clip of wildlife'
    },
    {
      type: 'image' as const,
      url: '/example/img/bla_img2.jpg',
      alt: 'Sample image 2',
      title: 'City Skyline',
      description: 'Night view of a modern city'
    }
  ];

  return (
    <div>
      <Navbar/>
      <div className="w-full xl:w-[1280px] 2xl:w-[1536px] h-auto mx-auto mt-10 text-white">
        <div className={path_name[4] === 'displayer' ? 'block' : 'hidden'}>
          <Displayer mediaItems={mediaItems}/>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default HomePage;