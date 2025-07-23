'use client'
import _listing from "@/components/listing/listing"
import _navbar from '@/components/nav_bar/navbar';
import Footer from "@/components/layout/footer";
import Sub_navbar from "@/components/listing/sub_navbar";
const San_pham_ban = () => {
  return (
    <div>
      <_navbar/>
      <div className="container mx-auto text-white">
        <Sub_navbar/>
        <_listing/>
      </div>
      <Footer/>
    </div>
  )
}

export default San_pham_ban