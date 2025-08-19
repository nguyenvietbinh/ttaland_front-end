'use client'
import _navbar from '@/components/nav_bar/navbar';
import Footer from "@/components/layout/footer";
import Sub_navbar from '@/components/listing/sub_navbar';
const Du_an = () => {
  return (
    <div>
      <_navbar/>
      <div className="container mx-auto text-white">
        <Sub_navbar currentPropertyType='townhouse' isForRent={false} isForSale={false}/>
      </div>
      <Footer/>
    </div>
  )
}

export default Du_an