'use client'

import { Suspense } from "react"
import NavBar from "@/components/nav_bar/navbar"
import San_pham_ban_detail from "@/components/detail_page/san_pham_ban_detail"
import Footer from "@/components/layout/footer"
import { useSearchParams } from "next/navigation"

const San_pham_ban_detail_page = () => {
  const searchParams = useSearchParams()

  const id = searchParams?.get('id')


  return (
    <div className="bg-white w-full min-h-screen text-black">
      <NavBar/>
      {id && (
        <San_pham_ban_detail id={id}/>
      )}
      <Footer/>
    </div>
  )
}

const Wraped_san_pham_ban_detail_page = () => {
  
  return (
    <Suspense fallback={<div className="bg-white min-h-screen">Loading...</div>}>
      <San_pham_ban_detail_page/>
    </Suspense>
  )
} 

export default Wraped_san_pham_ban_detail_page