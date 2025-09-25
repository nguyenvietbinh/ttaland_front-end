'use client'
import New_card from "./new_card"


const News_listing = () => {

  return (
    <div className="w-2/3 bg-black">
      <div className="w-full aspect-video bg-[url(/img/background.jpg)] bg-cover bg-center bg-no-repeat cursor-pointer ">
        <div className="h-full w-full bg-gradient-to-t from-black via-black/70  to-transparent py-4 px-6 flex flex-col justify-end">
          <p className="text-sm text-gray-500">25/09/2025</p>
          <p className="text-3xl line-clamp-2">Lộ Diện Đại Lý Phân Phối F1 Chiến Lược Dự Án Vinhomes Green Paradise Cần Giờ</p>
          <p className="text-base text-gray-400 line-clamp-3">SSM Group chính thức trở thành Đối tác phân phối F1 Chính thức dự án Vinhomes Green Paradise Cần Giờ – siêu đô thị biển mang tầm vóc quốc tế, mở ra cơ hội đầu tư mới đầy tiềm năng tại TP.HCM.</p>
        </div>
      </div>
      <New_card/>
      <New_card/>
      <New_card/>
      <New_card/>
      <New_card/>
      <New_card/>
      <New_card/>
      <New_card/>
    </div>
  )
}

export default News_listing