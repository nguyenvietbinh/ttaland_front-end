'use client'

import { Suspense } from "react"
import Listing from "@/components/listing/listing"
import NavBar from "@/components/nav_bar/navbar"
import Footer from "@/components/layout/footer"


const San_pham_ban_nha_pho = () => {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar/>
      <div className="container mx-auto">
        <Listing currentPropertyType="townhouse" isForSale={true} isForRent={false}/>
      </div>
      <Footer/>
    </Suspense>
  )
}


export default San_pham_ban_nha_pho