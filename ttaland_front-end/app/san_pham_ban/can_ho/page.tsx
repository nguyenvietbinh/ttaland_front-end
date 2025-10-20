'use client'

import { Suspense } from "react"
import Listing from "@/components/listing/listing"
import NavBar from "@/components/nav_bar/navbar"
import Footer from "@/components/layout/footer"
import { useApartments } from "@/hooks/useApartments"


const San_pham_ban_can_ho = () => {
  const properties = useApartments({ for_sale: true})
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar/>
      <Listing listing_return={properties}/>
      <Footer/>
    </Suspense>
  )
}


export default San_pham_ban_can_ho