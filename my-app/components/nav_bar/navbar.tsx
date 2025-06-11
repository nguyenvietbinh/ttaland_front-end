'use client'
import TwoXL_navbar from './responsive_navbar/TwoXL_navbar';
import XL_navbar from './responsive_navbar/XL_navbar';
import LG_navbar from './responsive_navbar/LG_navbar';
import MD_navbar from './responsive_navbar/MD_navbar';
import SM_navbar from './responsive_navbar/SM_navbar';


export default function NavBar() {




  return (
    <div className="text-white bg-blue-950 sticky top-0 z-50 w-full h-auto">
      <SM_navbar/>
      <MD_navbar/>
      <LG_navbar/>
      <XL_navbar/>
      <TwoXL_navbar/>
    </div>
  );

}