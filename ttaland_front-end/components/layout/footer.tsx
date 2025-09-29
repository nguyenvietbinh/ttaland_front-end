
'use client'
import Link from "next/link"

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-950 mt-20 py-10 text-white">
          <div className="flex justify-center gap-28">
              <div>
                <Link href='/' className="flex items-center cursor-pointer h-24 group">
                  <img src="/img/logo.png" className="h-24" alt="" />
                  <div className="flex flex-col">
                    <p className="text-right text-gray-400">.netlify.app</p>
                    <p className="text-4xl group-hover:underline">TTALand</p>
                  </div>
                </Link>
                <ul className="text-right mt-10">
                  <li className="hover:text-gray-400 cursor-pointer">Về chúng tôi</li>
                  <li className="hover:text-gray-400 cursor-pointer">Báo giá và hỗ trợ</li>
                  <li className="hover:text-gray-400 cursor-pointer">Câu hỏi thường gặp</li>
                  <li className="hover:text-gray-400 cursor-pointer">Sitemap</li>
                </ul>
              </div>
              <div>
                <Link href='/' className="flex items-center cursor-pointer h-24 group">
                  <img src="/img/icons/phone_call.png" className="h-12 mx-4" alt="" />
                  <div className="flex flex-col">
                    <p className="text-gray-400">liên hệ</p>
                    <p className="text-2xl group-hover:underline">6677 1508</p>
                  </div>
                </Link>
                <ul className="text-right mt-10">
                  <li className="hover:text-gray-400 cursor-pointer">Góp ý, báo lỗi</li>
                  <li className="hover:text-gray-400 cursor-pointer">Quy định đăng tin</li>
                  <li className="hover:text-gray-400 cursor-pointer">Quy chế hoạt động</li>
                </ul>
              </div>
              <div>
                <Link href='/' className="flex items-center cursor-pointer h-24 group">
                  <img src="/img/icons/support.png" className="h-10 mx-4" alt="" />
                  <div className="flex flex-col">
                    <p className="text-gray-400">hỗ trợ</p>
                    <p className="text-2xl group-hover:underline">support@ttaland.com.vn</p>
                  </div>
                </Link>
                <ul className="text-right mt-10">
                  <li className="hover:text-gray-400 cursor-pointer">Điều khoản bảo mật</li>
                  <li className="hover:text-gray-400 cursor-pointer">Chính sách bảo mật</li>
                  <li className="hover:text-gray-400 cursor-pointer">Giải quyết khiếu nại</li>
                </ul>
              </div>
          </div>



      </footer>
    </div>
  )
}


export default Footer