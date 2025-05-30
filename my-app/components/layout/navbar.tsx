'use client'

import TwoXL_navbar from './responsive_navbar/TwoXL_navbar';
import XL_navbar from './responsive_navbar/XL_navbar';
import LG_navbar from './responsive_navbar/LG_navbar';
import MD_navbar from './responsive_navbar/MD_navbar';
import SM_navbar from './responsive_navbar/SM_navbar';


const Navbar = () => {
  return (
    // <div className="text-white bg-[#0c7ba5] sticky top-0 z-50 w-full opacity-90 h-auto">
    // <div className="text-white bg-[#09394f] sticky top-0 z-50 w-full opacity-90 h-auto">
    <div className="text-white bg-blue-950 sticky top-0 z-50 w-full h-auto">
        <TwoXL_navbar/>
        <XL_navbar/>
        <LG_navbar/>
        <MD_navbar/>
        <SM_navbar/>
    </div>
  )
}



export default Navbar