
'use client'
import Link from "next/link"

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-200 text-black mt-20 py-20">
        <div className="footer_container lg:justify-between flex-col lg:flex-row">
          <div className="flex flex-col gap-8">
            <Link href='/' className="flex items-center-safe cursor-pointer h-24 group">
              <img src="/img/logo.png" className="h-32" alt="" />
              <div className="flex flex-col">
                <p className="text-right text-gray-700">.com</p>
                <p className="text-4xl group-hover:underline">TTALand</p>
              </div>
            </Link>
            <div className="ml-8 flex flex-col gap-4">
              <p className="text-2xl font-medium">CÔNG TY TNHH TTA Land</p>
              <div className="flex w-60 leading-4 items-center gap-2">
                <img className="h-8" src="/img/icons/placeholder.png" alt="" />
                <p className="hover:underline cursor-pointer font-medium">The Global City, Đỗ Xuân Hợp, Phú Hữu, Thủ Đức, Hồ Chí Minh</p>
              </div>
              <div className="flex w-60 leading-4 items-center gap-2">
                <img className="h-8" src="/img/icons/phone-call.png" alt="" />
                <p className="hover:underline cursor-pointer text-2xl">0971707779</p>
              </div>
              <div className="flex w-60 leading-4 items-center gap-2">
                <img className="h-8" src="/img/icons/admin.png" alt="" />
                <p className="hover:underline cursor-pointer text-2xl">support@ttaland.com.vn</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-6 lg:mt-11 gap-2 text-xl ml-8 lg:ml-0">
            <p className="text-3xl mb-2">HƯỚNG DẪN</p>
            <p className="hover:text-gray-700 cursor-pointer">Về chúng tôi</p>
            <p className="hover:text-gray-700 cursor-pointer">Báo giá và hỗ trợ</p>
            <p className="hover:text-gray-700 cursor-pointer">Câu hỏi thường gặp</p>
            <p className="hover:text-gray-700 cursor-pointer">Góp ý - Báo lỗi</p>
          </div>
          <div className="flex flex-col mt-6 lg:mt-11 gap-2 text-xl ml-8 lg:ml-0">
            <p className="text-3xl mb-2">QUY ĐỊNH</p>
            <p className="hover:text-gray-700 cursor-pointer">Quy định đăng</p>
            <p className="hover:text-gray-700 cursor-pointer">Quy chế hoạt động</p>
            <p className="hover:text-gray-700 cursor-pointer">Điều khoản thỏa thuận</p>
            <p className="hover:text-gray-700 cursor-pointer">Chính sách bảo mật</p>
          </div>
        </div>



      </footer>
    </div>
  )
}


export default Footer