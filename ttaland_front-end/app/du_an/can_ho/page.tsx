'use client'

import { Suspense } from "react"
import NavBar from "@/components/nav_bar/navbar"
import Footer from "@/components/layout/footer"


const Du_an_can_ho = () => {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar/>
      <div className="container mx-auto">
      </div>
      <Footer/>
    </Suspense>
  )
}


export default Du_an_can_ho