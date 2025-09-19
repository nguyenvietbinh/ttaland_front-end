'use client'

import { useState } from "react"

export type detail_infor = {
  price: string,
  sqr: number,
  policy?: string,
  location: string,
  structure?: string,
  bedrooms?: number,
  bathrooms?: number,
  interior?: string,
  description: string,
  latitude: string,
  longitude: string,
  road_frontage_formatted?: string,
}

interface Detail_infor_props {
  information_data: detail_infor
}


const Detail_infor = ({ information_data }: Detail_infor_props) => {
  const [expanded, setExpanded] = useState(false);


  return (
    <div className="w-full h-auto">
      {/* Thông tin chi tiết */}
      <h1 className="text-3xl mt-4 lg:mt-0">Thông Tin Chi Tiết:</h1>
      <ul className="grid-cols-1 gap-4 w-full text-nowrap">
        <li className="border-b-[1px] border-gray-400 px-2 pt-2 pb-0.5 flex justify-between">
          <p className="w-1/2">Mức giá:</p>
          <p className="w-1/2 overflow-auto no-scrollbar">{information_data.price}.</p>            
        </li>
        <li className="border-b-[1px] border-gray-400 px-2 pt-2 pb-0.5 flex justify-between">
          <p className="w-1/2">Diện tích:</p>
          <p className="w-1/2 overflow-auto no-scrollbar">{information_data.sqr} m².</p>            
        </li>
        <li className="border-b-[1px] border-gray-400 px-2 pt-2 pb-0.5 flex justify-between">
          <p className="w-1/2">Vị Trí:</p>
          <p className="w-1/2 overflow-auto no-scrollbar">{information_data.location}.</p>            
        </li>
        {(information_data.policy) ? (
        <li className="border-b-[1px] border-gray-400 px-2 pt-2 pb-0.5 flex justify-between">
          <p className="w-1/2">Pháp lý:</p>
          <p className="w-1/2 overflow-auto no-scrollbar">{information_data.policy}.</p>            
        </li>
        ) : (
          <div></div>
        )}
        {(information_data.structure) ? (
          <li className="border-b-[1px] border-gray-400 px-2 pt-2 pb-0.5 flex justify-between">
            <p className="w-1/2">Kết cấu:</p>
            <p className="w-1/2 overflow-auto no-scrollbar">{information_data.structure}.</p>            
          </li>
        ) : (
          <div></div>
        )}
        {(information_data.bedrooms) ? (
          <li className="border-b-[1px] border-gray-400 px-2 pt-2 pb-0.5 flex justify-between">
            <p className="w-1/2">Phòng ngủ:</p>
            <p className="w-1/2 overflow-auto no-scrollbar">{information_data.bedrooms}.</p>            
          </li>
        ) : (
          <div></div>
        )}
        {(information_data.bathrooms) ? (
          <li className="border-b-[1px] border-gray-400 px-2 pt-2 pb-0.5 flex justify-between">
            <p className="w-1/2">Phòng tắm:</p>
            <p className="w-1/2 overflow-auto">{information_data.bathrooms}.</p>            
          </li>
        ) : (
          <div></div>
        )}
        {(information_data.interior) ? (
          <li className="border-b-[1px] border-gray-400 px-2 pt-2 pb-0.5 flex justify-between">
            <p className="w-1/2">Nội thất:</p>
            <p className="w-1/2 overflow-auto">{information_data.interior}.</p>            
          </li>
        ) : (
          <div></div>
        )}
        {(information_data.road_frontage_formatted) ? (
          <li className="border-b-[1px] border-gray-400 px-2 pt-2 pb-0.5 flex justify-between">
            <p className="w-1/2">Đường vào:</p>
            <p className="w-1/2 overflow-auto">{information_data.road_frontage_formatted}.</p>            
          </li>
        ) : (
          <div></div>
        )}
      </ul>

      {/* Mô tả đặc điểm */}
      <div className="">
        <h1 className="text-3xl mt-4">Mô Tả Đặc Điểm:</h1>
        <ul className={`space-y-4 px-2 ${(expanded) ? '' : 'line-clamp-5'}`}>
            <div>{information_data.description}</div>
        </ul>
        <p onClick={() => setExpanded(true)} className={(expanded) ? 'hidden' : 'hover:underline flex justify-center text-xl cursor-pointer'}>Xem thêm</p>
      </div>
    </div>
  )
}


export default Detail_infor