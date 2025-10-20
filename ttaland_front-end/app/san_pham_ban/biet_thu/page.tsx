'use client'

import { Suspense } from "react"
import Listing from "@/components/listing/listing"
import NavBar from "@/components/nav_bar/navbar"
import Footer from "@/components/layout/footer"


const San_pham_ban_biet_thu = () => {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar/>
      <Listing currentPropertyType="villa" isForSale={true} isForRent={false}/>
      <Footer/>
    </Suspense>
  )
}


export default San_pham_ban_biet_thu