'use client'
import NavBar from "@/components/nav_bar/navbar"
import Dang_san_pham_container from "@/components/dang_san_pham/dang_san_pham_container"
import Footer from "@/components/layout/footer"

const Dang_san_pham = () => {

  return (
    <div className="bg-white">
      <NavBar/>
      <div className="container mx-auto">
        <Dang_san_pham_container/>
      </div>
      <Footer/>
    </div>
  )
}


export default Dang_san_pham