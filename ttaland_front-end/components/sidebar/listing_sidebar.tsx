'use client'
import { useEffect, useState } from 'react'
import location from '../dang_san_pham/location.json'

interface Listing_sidebar_props {
  for_sale: boolean
}

const Listing_sidebar = ({for_sale}: Listing_sidebar_props) => {
  const for_sale_price_range_lable = ['< 500 triệu', '500 - 800 triệu', '800 triệu - 1 tỷ', '1 - 2 tỷ', '2 - 3 tỷ', '3 - 5 tỷ', '5 - 7 tỷ', '7 - 10 tỷ', '10 - 20 tỷ', '30 - 40 tỷ', '40 - 60 tỷ', '> 60 tỷ']
  const rental_price_range_lable = ['< 5 triệu/tháng', '5 - 10 triệu/tháng', '10 - 15 triệu/tháng', '15 - 25 triệu/tháng', '25 - 40 triệu/tháng', '40 - 60 triệu/tháng', '60 - 100 triệu/tháng', '100 - 150 triệu/tháng', '150 - 250 triệu/tháng', '250 - 500 triệu/tháng', '> 500 triệu/tháng']
  const area_range_lable = ['< 30 m²', '30 - 50 m²', '50 - 70 m²', '70 - 100 m²', '100 - 150 m²', '150 - 200 m²', '200 - 250 m²', '250 - 300 m²', '300 - 500 m²', '> 500 m²']
  const [priceRangeLable, setPriceRangeRangeLable] = useState<string[]>([])
  useEffect(() => {
    if (for_sale) {
      setPriceRangeRangeLable(for_sale_price_range_lable)
    } else {
      setPriceRangeRangeLable(rental_price_range_lable)
    }
  }, [])
  return (
    <div className="sidebar_container gap-8">
      <div className="flex flex-col gap-2 p-4 rounded-lg bg-gray-50 border-gray-100 shadow-sm">
        <p className="text-xl font-bold mb-2">Lọc theo khoảng giá</p>
        {priceRangeLable.map((item, index) => (
          <label key={index} className="label items-center">
            <input type="checkbox" className="checkbox mb-1 checkbox-sm bg-gray-200 checked:bg-gray-200 text-gray-700" />
            <p className='text-black'>{item}</p>
          </label>   
        ))}
      </div>
      <div className="flex flex-col gap-2 p-4 rounded-lg bg-gray-50 border-gray-100 shadow-sm">
        <p className="text-xl font-bold mb-2">Lọc theo vị trí</p>
        {location.district.map((item, index) => (
          <label key={index} className="label items-center">
            <input type="checkbox" className="checkbox mb-1 checkbox-sm bg-gray-200 checked:bg-gray-200 text-gray-700" />
            <p className='text-black'>{item}</p>
          </label>   
        ))} 
      </div>
      <div className="flex flex-col gap-2 p-4 rounded-lg bg-gray-50 border-gray-100 shadow-sm">
        <p className="text-xl font-bold mb-2">Lọc theo diện tích</p>
        {area_range_lable.map((item, index) => (
          <label key={index} className="label items-center">
            <input type="checkbox" className="checkbox mb-1 checkbox-sm bg-gray-200 checked:bg-gray-200 text-gray-700" />
            <p className='text-black'>{item}</p>
          </label>   
        ))}      
      </div>
    </div>
  )
}


export default Listing_sidebar