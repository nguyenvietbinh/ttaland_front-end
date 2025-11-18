'use client'
import ZaloContact from "./zalo";
import CopyPhoneButton from "./phoneNumber";
const Detail_sidebar = () => {

  return (
    <div className="sidebar_container gap-8">
      <div className="p-4 sticky top-24 bg-white border-gray-300 transition-all duration-300 flex flex-col gap-2">
          <ZaloContact 
            phoneNumber="0343694403"
            defaultMessage="Tôi quan tâm đến căn hộ Quận 1 - 50m² giá 3.5 tỷ. Xin tư vấn thêm."
          />
    <CopyPhoneButton/>
      </div>
      <div className="flex flex-col gap-2 bg-gray-100 p-4 rounded-lg">
        <p className="text-xl font-bold mb-2">Hỗ trợ tiện ích</p>
        <p onClick={() => window.location.href = 'https://batdongsan.com.vn/ho-tro-tien-ich/ht-xem-huong-nha'} className="hover:text-gray-700 cursor-pointer">Tư vấn phong thủy</p>
        <p onClick={() => window.location.href = 'https://batdongsan.com.vn/ho-tro-tien-ich/ht-du-toan-chi-tiet'} className="hover:text-gray-700 cursor-pointer">Dự tính chi phí</p>
        <p onClick={() => window.location.href = 'https://batdongsan.com.vn/ho-tro-tien-ich/ht-tinh-lai-suat'} className="hover:text-gray-700 cursor-pointer">Tính lãi suất</p>
        <p onClick={() => window.location.href = 'https://batdongsan.com.vn/ho-tro-tien-ich'} className="hover:text-gray-700 cursor-pointer">Quy trình xây nhà</p>
      </div>
    </div>
  )
}


export default Detail_sidebar