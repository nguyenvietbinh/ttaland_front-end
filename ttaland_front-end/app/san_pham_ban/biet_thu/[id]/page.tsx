'use client'
import NavBar from "@/components/nav_bar/navbar"
import Footer from "@/components/layout/footer"
import San_pham_ban_detail from "@/components/detail_page/san_pham_ban_detail"
import { usePathname } from "next/navigation"

const Detail = () => {
  const paths = usePathname()?.split('/') || ''

  return (
    <div>
      <NavBar/>
      <San_pham_ban_detail id={paths[3]} table="villas"/>
      <Footer/>
    </div>
  )
}

export default Detail