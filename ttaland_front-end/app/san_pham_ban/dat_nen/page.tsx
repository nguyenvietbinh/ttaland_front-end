'use client'
import Listing from "@/components/listing/listing"
import NavBar from "@/components/nav_bar/navbar"
import Footer from "@/components/layout/footer"


const San_pham_ban_dat_nen = () => {

  return (
    <div>
      <NavBar/>
      <div className="container mx-auto">
        <Listing currentPropertyType="land" isForSale={true} isForRent={false}/>
      </div>
      <Footer/>
    </div>
  )
}


export default San_pham_ban_dat_nen