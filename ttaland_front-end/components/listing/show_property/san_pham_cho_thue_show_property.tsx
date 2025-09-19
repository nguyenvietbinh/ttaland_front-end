'use client'

import { type Townhouse, type Villa, type Apartment, type LandLot } from '@/types/product'
import Link from "next/link"



interface San_pham_ban_propertyProps {
  townhouse?: Townhouse
  villa?: Villa
  apartment?: Apartment
  land?: LandLot
}



const San_pham_cho_thue_show_property = ({ townhouse, villa, apartment, land }: San_pham_ban_propertyProps) => {

  const property = villa || townhouse || apartment || land
  


  const urlToDetail = () => {
    return `/san_pham_cho_thue/chi_tiet?id=${property?.id}`
  }



  // Get property data with type checking
  const title = property!.title
  const area = property!.area_formatted
  const price = property!.price_formatted
  const location = property!.location
  
  // Handle garage - only available for townhouse, villa
  const garage = ((property as Townhouse)?.townhouse_details?.garage || (property as Villa)?.villa_details?.garage || 0)
  
  // Handle bedrooms - not available for land
  const bedrooms = ((property as Townhouse)?.townhouse_details?.bedrooms || (property as Villa)?.villa_details?.bedrooms || (property as Apartment)?.apartment_details?.bedrooms || 0)
  
  // Handle bathrooms - not available for land  
  const bathrooms = ((property as Townhouse)?.townhouse_details?.bathrooms || (property as Villa)?.villa_details?.bathrooms || (property as Apartment)?.apartment_details?.bathrooms || 0) 

  return (
    <div className="bg-gray-200 h-auto border-[1px] m-1 border-white hover:shadow-md rounded-sm">
      <Link className="w-full h-80 rounded-sm gap-[2px] flex overflow-hidden" href={urlToDetail()}>
        <div className="h-full relative md:w-2/3 w-full overflow-hidden cursor-pointer">
          <img className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" src={(property)?.main_images![0]} alt={title} />
        </div>
        <div className="w-1/3 h-full hidden md:block flex-col space-y-[2px] overflow-hidden cursor-pointer">
          <div className="w-full h-1/2 overflow-hidden">
            <img className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" src={(property)?.main_images![1]} alt={title} />
          </div>
          <div className="w-full relative h-1/2 cursor-pointer overflow-hidden">
            <img className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" src={(property)?.main_images![2]} alt={title} />
          </div>
        </div>
      </Link>

      <div className="px-2 pt-4 text-black">
        {/* info */}
        <div className="">
          <Link className="font-bold text-3xl cursor-pointer hover:underline wrap-break-word line-clamp-2" href={urlToDetail()}>
            {title}
          </Link>
          <Link href={urlToDetail()} className='hover:underline cursor-pointer'>{location}</Link>
          <div className="grid md:grid-cols-3 grid-cols-2 gap-2 py-3 text-left text-xl text-nowrap border-t-[1px] font-bold border-gray-600">
            <div className="flex items-center gap-1">
              <img src="/img/icons/sqr.png" alt="" className="h-6 hidden md:block"/>
              <p className="">Diện tích:</p>
              <p className="overflow-auto no-scrollbar">{area}</p>
            </div>
            {garage > 0 && (
              <div className="flex items-center gap-1">
                <img src="/img/icons/car.png" alt="" className="h-6 hidden md:block"/>
                <p className="">Garage:</p>
                <p className="overflow-auto no-scrollbar">{garage}</p>
              </div>
            )}
            <div className="flex items-center gap-1">
              <img src="/img/icons/vnd.png" alt="" className="h-6 hidden md:block"/>
              <p className="">Giá:</p>
              <p className="overflow-auto no-scrollbar">{price}/Tháng</p>
            </div>
            {bedrooms > 0 && (
              <div className="flex items-center gap-1">
                <img src="/img/icons/bed.png" alt="" className="h-6 hidden md:block"/>
                <p className="">Phòng ngủ:</p>
                <p className="overflow-auto no-scrollbar">{bedrooms}</p>
              </div>
            )}
            {bathrooms > 0 && (
              <div className="flex items-center gap-1">
                <img src="/img/icons/bath.png" alt="" className="h-6 hidden md:block"/>
                <p className="">Phòng tắm:</p>
                <p className="overflow-auto no-scrollbar">{bathrooms}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between w-full my-3 items-center">
          <Link className="btn bg-black text-base w-[100%]" href={urlToDetail()}>Thông tin thêm</Link>

        </div>  
      </div>
    </div>
  )
}

export default San_pham_cho_thue_show_property
