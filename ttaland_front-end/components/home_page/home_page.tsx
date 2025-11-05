'use client'
import News_listing from "../news/news_listing"
const Home_page = () => {

  return (
    <div className="w-full min-h-screen">
      <div className="w-full relative">
        <img className="w-full h-175 bg-center object-cover brightness-55" src="/img/background.jpg" alt="" />
        <div className="absolute w-[40%] h-175 top-0 left-[50%] -translate-x-[50%]">
          <p className="text-6xl text-white text-center mt-40 ">Nền tảng bất động sản dành riêng cho thành phố Hồ Chí Minh</p>
        </div>
      </div>
      <div className="main_container">
        <div className="content_container">
          <p className="text-4xl font-bold mt-10">Tin tức nổi bật</p>
          <News_listing/>
          <p className="text-4xl font-bold mt-10">Bất động sản hàng đầu</p>
          <p className="text-4xl font-bold mt-10">Về chúng tôi</p>
          <p className="content_container text-2xl/10">TTALand.com khẳng định vị thế là nền tảng bất động sản chuyên biệt, uy tín hàng đầu tại Thành phố Hồ Chí Minh. Chúng tôi mang đến một kho dữ liệu đa dạng và phong phú, từ căn hộ chung cư hiện đại, nhà phố, biệt thự sang trọng cho đến các mặt bằng kinh doanh tiềm năng, đáp ứng mọi nhu cầu từ tìm kiếm nhà ở, đầu tư sinh lời đến phát triển kinh doanh. Với hàng ngàn tin rao được kiểm duyệt chặt chẽ và cập nhật liên tục, TTALand.com cam kết cung cấp cho khách hàng những thông tin chính xác, minh bạch nhất. Đội ngũ chuyên gia giàu kinh nghiệm của chúng tôi luôn sẵn sàng tư vấn và đồng hành để bạn đưa ra quyết định đầu tư thông thái nhất trên thị trường bất động sản sôi động bậc nhất Việt Nam.</p>
        </div>
        <div className="sidebar_container">
          <div className="h-150">
            <img className="h-full bg-center object-cover" src="/img/background.jpg" alt="" />
          </div>
          <div className="h-150 mt-8">
            <img className="h-full bg-center object-cover" src="/img/background.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home_page