'use client'

import Footer from "@/components/layout/footer"
import Listing from "@/components/listing/listing"
import NavBar from "@/components/nav_bar/navbar"
import { Suspense } from "react"
import { useApartments } from "@/hooks/useApartments"


const San_pham_cho_thue_san_ho = () => {
  const properties = useApartments({ for_sale: false})
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar/>
      <div className="container mx-auto">
        <Listing listing_return={properties}/>
      </div>
      <Footer/>
    </Suspense>
  )
}


export default San_pham_cho_thue_san_ho