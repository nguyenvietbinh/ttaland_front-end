'use client'

import Footer from "@/components/layout/footer"
import Listing from "@/components/listing/listing"
import NavBar from "@/components/nav_bar/navbar"
import { Suspense } from "react"
import { useLand } from "@/hooks/useLand"


const San_pham_cho_thue_dat_nen = () => {
  const properties = useLand({ for_sale: false})
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


export default San_pham_cho_thue_dat_nen