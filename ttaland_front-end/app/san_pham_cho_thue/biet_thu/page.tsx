'use client'

import Footer from "@/components/layout/footer"
import Listing from "@/components/listing/listing"
import NavBar from "@/components/nav_bar/navbar"
import { Suspense } from "react"


const San_pham_cho_thue_biet_thu = () => {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar/>
      <div className="container mx-auto">
        <Listing currentPropertyType="villa" isForSale={false} isForRent={true}/>
      </div>
      <Footer/>
    </Suspense>
  )
}


export default San_pham_cho_thue_biet_thu