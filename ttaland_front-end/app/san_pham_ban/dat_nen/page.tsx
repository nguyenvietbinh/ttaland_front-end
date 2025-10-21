'use client'

import { Suspense } from "react"
import Listing from "@/components/listing/listing"
import NavBar from "@/components/nav_bar/navbar"
import Footer from "@/components/layout/footer"
import { useLand } from "@/hooks/useLand"


const San_pham_ban_dat_nen = () => {
  const properties = useLand({ for_sale: true})
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar/>
      <Listing listing_return={properties}/>
      <Footer/>
    </Suspense>
  )
}


export default San_pham_ban_dat_nen