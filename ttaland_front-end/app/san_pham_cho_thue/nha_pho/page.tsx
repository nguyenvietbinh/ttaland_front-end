'use client'

import Footer from "@/components/layout/footer"
import Listing from "@/components/listing/listing"
import NavBar from "@/components/nav_bar/navbar"
import { Suspense } from "react"


const San_pham_cho_thue_nha_pho = () => {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar/>
      <div className="container mx-auto">
        <Listing currentPropertyType="townhouse" isForSale={false} isForRent={true}/>
      </div>
      <Footer/>
    </Suspense>
  )
}


export default San_pham_cho_thue_nha_pho