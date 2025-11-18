'use client'
import News_listing from "../news/news_listing"
import Detail_sidebar from "../sidebar/detail_sidebar"
import Carousel from "./carousel"


const Home_page = () => {
const carouselItems = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/2132128/pexels-photo-2132128.jpeg",
    alt: "",
    title: "Bất động sản trung tâm",
    description: "Đầu tư thông minh - Sinh lời bền vững"
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/1337974/pexels-photo-1337974.jpeg",
    alt: "",
    title: "Bất động sản trung tâm",
    description: "Đầu tư thông minh - Sinh lời bền vững"
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/1217326/pexels-photo-1217326.jpeg",
    alt: "",
    title: "Bất động sản trung tâm",
    description: "Đầu tư thông minh - Sinh lời bền vững"
  },
];

  return (
    <div className="w-full min-h-screen">
      <section className="relative">
        <Carousel 
          items={carouselItems} 
          autoPlayInterval={10000}
        />
      </section>
      <div className="main_container">
        <div className="content_container">
          <p className="text-4xl font-bold mb-4">Tin tức nổi bật</p>
          <News_listing/>
          <p className="text-4xl font-bold mt-10">Về chúng tôi</p>
          <p className="content_container text-2xl/10">TTALand.com khẳng định vị thế là nền tảng bất động sản chuyên biệt, uy tín hàng đầu tại Thành phố Hồ Chí Minh. Chúng tôi mang đến một kho dữ liệu đa dạng và phong phú, từ căn hộ chung cư hiện đại, nhà phố, biệt thự sang trọng cho đến các mặt bằng kinh doanh tiềm năng, đáp ứng mọi nhu cầu từ tìm kiếm nhà ở, đầu tư sinh lời đến phát triển kinh doanh. Với hàng ngàn tin rao được kiểm duyệt chặt chẽ và cập nhật liên tục, TTALand.com cam kết cung cấp cho khách hàng những thông tin chính xác, minh bạch nhất. Đội ngũ chuyên gia giàu kinh nghiệm của chúng tôi luôn sẵn sàng tư vấn và đồng hành để bạn đưa ra quyết định đầu tư thông thái nhất trên thị trường bất động sản sôi động bậc nhất Việt Nam.</p>
        </div>
        <Detail_sidebar/>
      </div>
    </div>
  )
}

export default Home_page