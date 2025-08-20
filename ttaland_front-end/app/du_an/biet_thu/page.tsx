'use client'

import { Suspense } from "react"
import Listing from "@/components/listing/listing"
import NavBar from "@/components/nav_bar/navbar"
import Footer from "@/components/layout/footer"


const Du_an_biet_thu = () => {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar/>
      <div className="container mx-auto">
        <Listing currentPropertyType="villa" isForSale={false} isForRent={false}/>
      </div>
      <Footer/>
    </Suspense>
  )
}


export default Du_an_biet_thu