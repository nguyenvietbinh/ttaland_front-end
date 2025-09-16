'use client'


import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

interface Sub_navbar_props {
  currentPropertyType: 'townhouse' | 'villa' | 'apartment' | 'land'
}

const Sub_navbar = ({currentPropertyType}: Sub_navbar_props) => {
  const path_name = usePathname()
  const searchParams = useSearchParams()
  const list_path = path_name?.split('/') || []
  let locations = searchParams?.get('locations')?.split(',') || ['Thành phố Hồ Chí Minh']
  if (locations[0] === '') {
    locations = ['Thành phố Hồ Chí Minh']
  }
  return (
    <div className={`flex-col sticky z-40 rounded-b-lg transition-all duration-500 top-0 mb-2 mt-8 px-2`}>
      <div className={`text-3xl flex transition-all duration-100 text-nowrap`}>
        <p className='hidden md:flex'>Bất động sản tại:&ensp;</p>
        <div className='flex'>{locations?.map((loc, index) => (
            <p key={index} className='cursor-pointer'>{loc}{(index === locations.length - 1) ? '' : ','}&ensp;</p>
        ))}</div>
      </div>
      <div className={`hidden h-auto md:flex mx-4 xl:mx-0 justify-between text-4xl`}>
        <Link className={(currentPropertyType === 'townhouse') ? "w-full text-center border-solid border-gray-300 border-t-2 border-r-2 py-2 rounded-t-sm" : "w-full text-gray-400 text-center py-2 border-solid border-gray-300 border-b-2"} href={`/${list_path[1]}/nha_pho${(searchParams?.toString()) ? `?${searchParams?.toString}` : ''}`}>Nhà Phố</Link>
        <Link className={(currentPropertyType === 'villa') ? "w-full text-center border-solid border-gray-300 border-t-2 border-x-2 py-2 rounded-t-sm" : "w-full text-gray-400 text-center py-2 border-solid border-gray-300 border-b-2"} href={`/${list_path[1]}/biet_thu${(searchParams?.toString()) ? `?${searchParams?.toString}` : ''}`}>Biệt Thự</Link>
        <Link className={(currentPropertyType === 'land') ? "w-full text-center border-solid border-gray-300 border-t-2 border-x-2 py-2 rounded-t-sm" : "w-full text-gray-400 text-center py-2 border-solid border-gray-300 border-b-2"} href={`/${list_path[1]}/dat_nen${(searchParams?.toString()) ? `?${searchParams?.toString}` : ''}`}>Đất Nền</Link>
        <Link className={(currentPropertyType === 'apartment') ? "w-full text-center border-solid border-gray-300 border-t-2 border-l-2 py-2 rounded-t-sm" : "w-full text-gray-400 text-center py-2 border-solid border-gray-300 border-b-2"} href={`/${list_path[1]}/can_ho${(searchParams?.toString()) ? `?${searchParams?.toString}` : ''}`}>Căn Hộ</Link>
      </div>
      

    </div>
    
  )
}

export default Sub_navbar