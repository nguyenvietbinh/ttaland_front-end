'use client'
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"


const SubNavbar = () => {
  const path_name = usePathname()
  const searchParams = useSearchParams()
  const list_path = path_name.split('/')
  const priceTagName = (searchParams.get('price_min') && searchParams.get('price_max')) ? `${searchParams.get('price_min')} - ${searchParams.get('price_max')}` : 'Mức Giá'
  const sqrTagName = (searchParams.get('sqr_min') && searchParams.get('sqr_max')) ? `${searchParams.get('sqr_min')} - ${searchParams.get('sqr_max')}` : 'Diện Tích'
  return (
    <div className="flex-col mt-1 mb-4">
      <div className="hidden h-auto md:flex mx-4 xl:mx-0 justify-between text-3xl">
        <Link className={(list_path[2] === 'nha_pho') ? "w-full text-center border-solid border-gray-300 border-t-2 border-r-2 py-2 rounded-t-sm" : "w-full text-gray-400 text-center py-2 border-solid border-gray-300 border-b-2"} href={`/${list_path[1]}/nha_pho?${searchParams.toString()}`}>Nhà Phố</Link>
        <Link className={(list_path[2] === 'biet_thu') ? "w-full text-center border-solid border-gray-300 border-t-2 border-x-2 py-2 rounded-t-sm" : "w-full text-gray-400 text-center py-2 border-solid border-gray-300 border-b-2"} href={`/${list_path[1]}/biet_thu?${searchParams.toString()}`}>Biệt Thự</Link>
        <Link className={(list_path[2] === 'dat_nen') ? "w-full text-center border-solid border-gray-300 border-t-2 border-x-2 py-2 rounded-t-sm" : "w-full text-gray-400 text-center py-2 border-solid border-gray-300 border-b-2"} href={`/${list_path[1]}/dat_nen?${searchParams.toString()}`}>Đất Nền</Link>
        <Link className={(list_path[2] === 'can_ho') ? "w-full text-center border-solid border-gray-300 border-t-2 border-l-2 py-2 rounded-t-sm" : "w-full text-gray-400 text-center py-2 border-solid border-gray-300 border-b-2"} href={`/${list_path[1]}/can_ho?${searchParams.toString()}`}>Căn Hộ</Link>
      </div>
      <div className="md:flex items-center inline-block space-y-2 md:space-y-0 py-2 gap-4">
        <div className="border-[1px] border-gray-400 p-1 px-4 flex gap-2 cursor-pointer hover:border-white rounded-sm">
          <p className=" overflow-auto text-nowrap">{ priceTagName }</p>
          <div className="flex items-center">
            <img src="/img/icons/arrow.png" alt="" className="h-2"/>
          </div>
        </div>
        <div className="border-[1px] border-gray-400 p-1 px-4 flex gap-2 cursor-pointer hover:border-white rounded-sm">
          <p className=" overflow-auto text-nowrap">{ sqrTagName }</p>
          <div className="flex items-center">
            <img src="/img/icons/arrow.png" alt="" className="h-2"/>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default SubNavbar