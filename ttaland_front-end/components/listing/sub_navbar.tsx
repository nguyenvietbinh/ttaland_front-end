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

  return (
    <div className={`flex-col hidden md:block pt-6`}>
      <div className={`h-auto flex justify-between text-2xl`}>
        <Link className={(currentPropertyType === 'townhouse') ? "w-full text-center border-solid border-gray-600 border-t-2 border-r-2 py-2" : "w-full text-gray-400 text-center py-2 border-solid border-gray-600 border-b-2"} href={`/${list_path[1]}/nha_pho${(searchParams?.toString()) ? `?${searchParams?.toString}` : ''}`}>Nhà Phố</Link>
        <Link className={(currentPropertyType === 'villa') ? "w-full text-center border-solid border-gray-600 border-t-2 border-x-2 py-2" : "w-full text-gray-400 text-center py-2 border-solid border-gray-600 border-b-2"} href={`/${list_path[1]}/biet_thu${(searchParams?.toString()) ? `?${searchParams?.toString}` : ''}`}>Biệt Thự</Link>
        <Link className={(currentPropertyType === 'land') ? "w-full text-center border-solid border-gray-600 border-t-2 border-x-2 py-2" : "w-full text-gray-400 text-center py-2 border-solid border-gray-600 border-b-2"} href={`/${list_path[1]}/dat_nen${(searchParams?.toString()) ? `?${searchParams?.toString}` : ''}`}>Đất Nền</Link>
        <Link className={(currentPropertyType === 'apartment') ? "w-full text-center border-solid border-gray-600 border-t-2 border-l-2 py-2" : "w-full text-gray-400 text-center py-2 border-solid border-gray-600 border-b-2"} href={`/${list_path[1]}/can_ho${(searchParams?.toString()) ? `?${searchParams?.toString}` : ''}`}>Căn Hộ</Link>
      </div>
      

    </div>
    
  )
}

export default Sub_navbar