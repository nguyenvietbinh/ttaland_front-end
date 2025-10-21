'use client'


const Listing_sidebar = () => {
// django-storages[boto3]
  return (
    <div className="sidebar_container gap-8">
      <div className="flex flex-col gap-2 p-4 rounded-lg bg-gray-50 border-gray-100 shadow-sm">
        <p className="text-xl font-bold mb-2">Lọc theo khoảng giá</p>
        <p className="cursor-pointer hover:underline underline">Tất cả khoảng giá</p>
        <p className="cursor-pointer hover:underline">Dưới 500 triệu</p>
        <p className="cursor-pointer hover:underline">500 - 800 triệu</p>
        <p className="cursor-pointer hover:underline">800 triệu - 1 tỷ</p>
        <p className="cursor-pointer hover:underline">1 - 2 tỷ</p>
        <p className="cursor-pointer hover:underline">2 - 3 tỷ</p>
        <p className="cursor-pointer hover:underline">3 - 5 tỷ</p>
        <p className="cursor-pointer hover:underline">5 - 7 tỷ</p>
        <p className="cursor-pointer hover:underline">7 - 10 tỷ / tháng</p>

        
      </div>
      <div className="flex flex-col gap-2 p-4 rounded-lg">
        <p className="text-xl font-bold mb-2">Sản phẩm khác</p>
        <p className="hover:text-gray-700 cursor-pointer">Khoảng gíá tương tự</p>
        <p className="hover:text-gray-700 cursor-pointer">Diện tích tương tự</p>
        <p className="hover:text-gray-700 cursor-pointer">Cùng vị trí</p>
      </div>
    </div>
  )
}


export default Listing_sidebar