'use client'
import _listing from "@/components/listing/listing"
import _navbar from '@/components/layout/navbar';
import Footer from "@/components/layout/footer";
const listing = () => {
  return (
    <div>
      <_navbar/>
      <_listing/>
      <Footer/>
    </div>
  )
}

export default listing