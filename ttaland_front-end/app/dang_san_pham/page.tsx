'use client'
import NavBar from "@/components/nav_bar/navbar"
import Dang_san_pham_container from "@/components/dang_san_pham/dang_san_pham_container"

const Dang_san_pham = () => {

  return (
    <div className="">
      <NavBar/>
      <div className="container mx-auto">
        <Dang_san_pham_container/>
      </div>
    </div>
  )
}


export default Dang_san_pham