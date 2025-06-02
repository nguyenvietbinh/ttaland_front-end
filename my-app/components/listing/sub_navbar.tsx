'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"

const SubNavbar = () => {
  const path_name = usePathname()
  const list_path = path_name.split('/')
  
  return (
    <div>
      <div className="hidden h-auto md:flex mx-4 mb-4 xl:mx-0 justify-between text-3xl">
        <Link className={list_path[2] === 'nha_pho' ? "w-full text-center border-solid border-gray-300 border-t-2 border-r-2 py-2 rounded-t-sm" : "w-full text-gray-400 text-center py-2 border-solid border-gray-300 border-b-2"} href={`/${list_path[1]}/nha_pho`}>Nhà Phố</Link>
        <Link className={list_path[2] === 'biet_thu' ? "w-full text-center border-solid border-gray-300 border-t-2 border-x-2 py-2 rounded-t-sm" : "w-full text-gray-400 text-center py-2 border-solid border-gray-300 border-b-2"} href={`/${list_path[1]}/biet_thu`}>Biệt Thự</Link>
        <Link className={list_path[2] === 'dat_nen' ? "w-full text-center border-solid border-gray-300 border-t-2 border-x-2 py-2 rounded-t-sm" : "w-full text-gray-400 text-center py-2 border-solid border-gray-300 border-b-2"} href={`/${list_path[1]}/dat_nen`}>Đất Nền</Link>
        <Link className={list_path[2] === 'can_ho' ? "w-full text-center border-solid border-gray-300 border-t-2 border-l-2 py-2 rounded-t-sm" : "w-full text-gray-400 text-center py-2 border-solid border-gray-300 border-b-2"} href={`/${list_path[1]}/can_ho`}>Căn Hộ</Link>
      </div>
    </div>
    
  )
}

export default SubNavbar