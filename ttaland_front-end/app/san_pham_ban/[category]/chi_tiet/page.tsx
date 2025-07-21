'use client'
import NavBar from "@/components/nav_bar/navbar"
import San_pham_ban_project_detail from "@/components/detail_page/san_pham_ban_project_detail"
import Footer from "@/components/layout/footer"
import { useSearchParams } from "next/navigation"

const San_pham_ban_project_detail_page = () => {
  const searchParams = useSearchParams()

  const id = searchParams.get('id')


  return (
    <div className="bg-gray-300 w-full min-h-screen text-black h-auto">
      <NavBar/>
      <San_pham_ban_project_detail id={id}/>
      <Footer/>
    </div>
  )
}

export default San_pham_ban_project_detail_page