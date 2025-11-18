'use client'
import News_listing from "./news_listing"
import Detail_sidebar from "../sidebar/detail_sidebar"


const News = () => {
  return (
      <div className="">
        <h1 className="text-5xl text-center mt-12">Tin tức bất động sản mới nhất</h1>
        <h2 className="hidden lg:block text-center mx-auto w-200">Thông tin mới, đầy đủ, hấp dẫn về thị trường bất động sản Việt Nam thông qua dữ liệu lớn về giá, giao dịch, nguồn cung - cầu và khảo sát thực tế của đội ngũ phóng viên, biên tập của TTALand.com.vn.</h2>
        <div className="main_container">
          <div className="content_container">
            <News_listing/>
          </div>
          <Detail_sidebar/>
        </div>
      </div>
  )
}



export default News