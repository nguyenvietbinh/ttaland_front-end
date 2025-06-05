'use client'
import { useState, useEffect } from 'react';
import TwoXL_navbar from './responsive_navbar/TwoXL_navbar';
import XL_navbar from './responsive_navbar/XL_navbar';
import LG_navbar from './responsive_navbar/LG_navbar';
import MD_navbar from './responsive_navbar/MD_navbar';
import SM_navbar from './responsive_navbar/SM_navbar';


export default function NavBar() {
  const [NavbarComponent, setNavbarComponent] = useState(() => SM_navbar);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      if (width < 768) {
        setNavbarComponent(() => SM_navbar);
      } else if (width < 1024) {
        setNavbarComponent(() => MD_navbar);
      } else if (width < 1280) {
        setNavbarComponent(() => LG_navbar);
      }else if (width < 1536) {
        setNavbarComponent(() => XL_navbar);
      } else {
        setNavbarComponent(() => TwoXL_navbar);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const CurrentNavbar = NavbarComponent;

  return (
    <div className="text-white bg-blue-950 sticky top-0 z-50 w-full h-auto">
      <CurrentNavbar />
    </div>
  );
}