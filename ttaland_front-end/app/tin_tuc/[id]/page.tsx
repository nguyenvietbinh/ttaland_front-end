'use client'
import NavBar from "@/components/nav_bar/navbar"
import Footer from "@/components/layout/footer"
import { usePathname } from "next/navigation"
import News_detail from "@/components/news/news_detail"


const News_detail_page = () => {
  const paths = usePathname()?.split('/') || ''


  return (
    <div>
      <NavBar/>      
      <News_detail id={paths[2]}/>
      <Footer/>
    </div>
  )
}

export default News_detail_page