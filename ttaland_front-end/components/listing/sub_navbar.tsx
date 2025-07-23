'use client'

import San_pham_ban_price_option from "./options/san_pham_ban_options/san_pham_ban_price_option"
import San_pham_ban_sqr_option from "./options/san_pham_ban_options/san_pham_ban_sqr_option"
import San_pham_cho_thue_price_option from "./options/san_pham_cho_thue_options/san_pham_cho_thue_price_option"
import San_pham_cho_thue_sqr_option from "./options/san_pham_cho_thue_options/san_pham_cho_thue_sqr_option"
import Du_an_price_option from "./options/du_an_options/du_an_price_option"
import Du_an_sqr_option from "./options/du_an_options/du_an_sqr_option"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

const Sub_navbar = () => {
  const path_name = usePathname()
  const searchParams = useSearchParams()
  const list_path = path_name.split('/')
  let locations = searchParams.get('locations')?.split(',') || ['Thành phố Hồ Chí Minh']
  if (locations[0] === '') {
    locations = ['Thành phố Hồ Chí Minh']
  }

  return (
    <div className={`flex-col sticky z-40 rounded-b-lg transition-all duration-500 top-0 mb-2 mt-8 px-2`}>
      <div className={`text-3xl flex transition-all duration-100 text-nowrap`}>
        <p className='hidden md:flex'>Bất động sản tại:&ensp;</p>
        <div className='flex overflow-auto'>{locations?.map((loc, index) => (
            <p key={index} className='cursor-pointer'>{loc}{(index === locations.length - 1) ? '' : ','}&ensp;</p>
        ))}</div>
      </div>
      <div className={`hidden h-auto md:flex mx-4 xl:mx-0 justify-between text-3xl`}>
        <Link className={(list_path[2] === 'nha_pho') ? "w-full text-center border-solid border-gray-300 border-t-2 border-r-2 py-2 rounded-t-sm" : "w-full text-gray-400 text-center py-2 border-solid border-gray-300 border-b-2"} href={`/${list_path[1]}/nha_pho?${searchParams.toString()}`}>Nhà Phố</Link>
        <Link className={(list_path[2] === 'biet_thu') ? "w-full text-center border-solid border-gray-300 border-t-2 border-x-2 py-2 rounded-t-sm" : "w-full text-gray-400 text-center py-2 border-solid border-gray-300 border-b-2"} href={`/${list_path[1]}/biet_thu?${searchParams.toString()}`}>Biệt Thự</Link>
        <Link className={(list_path[2] === 'dat_nen') ? "w-full text-center border-solid border-gray-300 border-t-2 border-x-2 py-2 rounded-t-sm" : "w-full text-gray-400 text-center py-2 border-solid border-gray-300 border-b-2"} href={`/${list_path[1]}/dat_nen?${searchParams.toString()}`}>Đất Nền</Link>
        <Link className={(list_path[2] === 'can_ho') ? "w-full text-center border-solid border-gray-300 border-t-2 border-l-2 py-2 rounded-t-sm" : "w-full text-gray-400 text-center py-2 border-solid border-gray-300 border-b-2"} href={`/${list_path[1]}/can_ho?${searchParams.toString()}`}>Căn Hộ</Link>
      </div>
      
      <div className="md:flex items-center hidden space-y-2 md:space-y-0 py-2 gap-4">
        {(list_path[1] === 'san_pham_ban') ? (<San_pham_ban_price_option />) : (list_path[1] === 'san_pham_cho_thue') ? (<San_pham_cho_thue_price_option />) : (<Du_an_price_option />)}
        {(list_path[1] === 'san_pham_ban') ? (<San_pham_ban_sqr_option />) : (list_path[1] === 'san_pham_cho_thue') ? (<San_pham_cho_thue_sqr_option />) : (<Du_an_sqr_option />)}
      </div>
    </div>
    
  )
}

export default Sub_navbar