'use client'
import Listing from "@/components/listing/listing"
import NavBar from "@/components/nav_bar/navbar"
import Footer from "@/components/layout/footer"


const San_pham_ban_can_ho = () => {

  return (
    <div>
      <NavBar/>
      <div className="container mx-auto">
        <Listing currentPropertyType="apartment" isForSale={true} isForRent={false}/>
      </div>
      <Footer/>
    </div>
  )
}


export default San_pham_ban_can_ho