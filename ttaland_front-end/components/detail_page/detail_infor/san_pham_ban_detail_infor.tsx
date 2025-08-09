'use client'

export type detail_infor = {
  price: string,
  sqr: number,
  legal: string,
  structure: string,
  bed_room: number,
  bath_room: number,
  interior: string,
  description: string[],
  youtubeUrl?: string,
  tiktokUrl?: string
}

interface san_pham_ban_detail_infor_props {
  information_data: detail_infor
}


const San_pham_ban_detail_infor = ({ information_data }: san_pham_ban_detail_infor_props) => {
  return (
    <div className="lg:w-2/5 w-full h-full overflow-y-auto">
      {/* Thông tin chi tiết */}
      <h1 className="text-2xl mt-4 lg:mt-0">Thông Tin Chi Tiết:</h1>
      <ul className="grid-cols-2 grid gap-4 w-full text-nowrap">
        <li className="border-b-[1px] border-gray-400 px-2 pt-2 pb-0.5 flex justify-between">
          <p className="w-1/2">Mức giá:</p>
          <p className="w-1/2 overflow-auto">{information_data.price}.</p>            
        </li>
        <li className="border-b-[1px] border-gray-400 px-2 pt-2 pb-0.5 flex justify-between">
          <p className="w-1/2">Diện tích:</p>
          <p className="w-1/2 overflow-auto">{information_data.sqr} m².</p>            
        </li>
        <li className="border-b-[1px] border-gray-400 px-2 pt-2 pb-0.5 flex justify-between">
          <p className="w-1/2">Pháp lý:</p>
          <p className="w-1/2 overflow-auto">{information_data.legal}.</p>            
        </li>
        <li className="border-b-[1px] border-gray-400 px-2 pt-2 pb-0.5 flex justify-between">
          <p className="w-1/2">Kết cấu:</p>
          <p className="w-1/2 overflow-auto">{information_data.structure}.</p>            
        </li>
        <li className="border-b-[1px] border-gray-400 px-2 pt-2 pb-0.5 flex justify-between">
          <p className="w-1/2">Phòng ngủ:</p>
          <p className="w-1/2 overflow-auto">{information_data.bed_room}.</p>            
        </li>
        <li className="border-b-[1px] border-gray-400 px-2 pt-2 pb-0.5 flex justify-between">
          <p className="w-1/2">Phòng tắm:</p>
          <p className="w-1/2 overflow-auto">{information_data.bath_room}.</p>            
        </li>
        <li className="border-b-[1px] border-gray-400 px-2 pt-2 pb-0.5 flex justify-between">
          <p className="w-1/2">Nội thất:</p>
          <p className="w-1/2 overflow-auto">{information_data.interior}.</p>            
        </li>
      </ul>

      {/* Mô tả đặc điểm */}
      <h1 className="text-2xl mt-4">Mô Tả Đặc Điểm:</h1>
      <ul className="space-y-4 p-2">
        {information_data.description.map((item, index) => (
          <li key={index}>- {item}.</li>
        ))}
      </ul>
    </div>
  )
}


export default San_pham_ban_detail_infor