'use client'

import { Suspense } from "react"
import Listing from "@/components/listing/listing"
import NavBar from "@/components/nav_bar/navbar"
import Footer from "@/components/layout/footer"
import { useTownhouses } from "@/hooks/useTownhouses"


const San_pham_ban_nha_pho = () => {
  const properties = useTownhouses({for_sale: true})
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar/>
      <Listing listing_return={properties}/>
      <Footer/>
    </Suspense>
  )
}


export default San_pham_ban_nha_pho