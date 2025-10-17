'use client'


const Detail_sidebar = () => {

  return (
    <div className="sidebar_container gap-8">
      <div className="p-4 sticky top-24 bg-white border-gray-300 transition-all duration-300 flex flex-col gap-2">
        <div className="border-gray-300 border-1 hover:bg-gray-50 rounded-lg p-2 flex justify-center items-center gap-2 cursor-pointer">
          <img src="/img/icons/zalo.png" className="h-6" alt="" />
          Chat qua Zalo
        </div>
        <div className="border-gray-300 border-1 bg-blue-500 hover:bg-blue-500/90 rounded-lg p-2 flex justify-center items-center gap-2 cursor-pointer">
          <img src="/img/icons/phone-call.png" className="h-6" alt="" />
          <p className="text-xl">0971707779</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 bg-gray-100 p-4 rounded-lg">
        <p className="text-xl font-bold mb-2">Hỗ trợ tiện ích</p>
        <p className="hover:text-gray-700 cursor-pointer">Tư vấn phong thủy</p>
        <p className="hover:text-gray-700 cursor-pointer">Dự tính chi phí</p>
        <p className="hover:text-gray-700 cursor-pointer">Tính lãi suất</p>
        <p className="hover:text-gray-700 cursor-pointer">Quy trình xây nhà</p>
      </div>
      <div className="flex flex-col gap-2 bg-gray-100 p-4 rounded-lg">
        <p className="text-xl font-bold mb-2">Sản phẩm khác</p>
        <p className="hover:text-gray-700 cursor-pointer">Khoảng gíá tương tự</p>
        <p className="hover:text-gray-700 cursor-pointer">Diện tích tương tự</p>
        <p className="hover:text-gray-700 cursor-pointer">Cùng vị trí</p>
      </div>
    </div>
  )
}


export default Detail_sidebar