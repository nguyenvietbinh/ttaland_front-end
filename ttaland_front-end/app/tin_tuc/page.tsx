
'use client'
import _navbar from "@/components/nav_bar/navbar"
import News_listing from "@/components/news/news_listing"
import Footer from "@/components/layout/footer"
const about = () => {

  return (
    <div className="bg-black">
      <_navbar/>
      <div className="container mx-auto">
        
        <div className="w-2/3 flex mx-auto">
        
          <News_listing/>
          <div className="w-1/3">
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default about