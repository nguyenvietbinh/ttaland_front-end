
'use client'
import _navbar from "@/components/nav_bar/navbar"
import News_listing from "@/components/news/news_listing"
import Footer from "@/components/layout/footer"
import News from "@/components/news/news"

const News_page = () => {
  return (
    <div className="">
      <_navbar/>
      <News/>
      <Footer/>
    </div>
  )
}

export default News_page