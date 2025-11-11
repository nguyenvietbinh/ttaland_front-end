'use client'
import NavBar from "@/components/nav_bar/navbar"
import Footer from "@/components/layout/footer"
import { usePathname } from "next/navigation"
import San_pham_cho_thue_detail from "@/components/detail_page/san_pham_cho_thue_detail"

const Detail = () => {
  const paths = usePathname()?.split('/') || ''

  return (
    <div>
      <NavBar/>
      <San_pham_cho_thue_detail id={paths[3]} table="townhouses"/>
      <Footer/>
    </div>
  )
}

export default Detail