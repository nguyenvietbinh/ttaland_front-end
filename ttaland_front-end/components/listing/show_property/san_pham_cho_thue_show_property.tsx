'use client'

import Link from "next/link"
import { ShowProperty, TownhouseShowProperty, VillaShowProperty, ApartmentShowProperty } from '@/types/api/showProperties'




interface San_pham_cho_thue_propertyProps {
  property: ShowProperty
}



const San_pham_cho_thue_show_property = ({ property }: San_pham_cho_thue_propertyProps) => {
  
  const urlToDetail = () => {
    return `/san_pham_cho_thue/chi_tiet?id=${property?.id}`
  }


  
  const bedrooms = ((property as TownhouseShowProperty)?.bedrooms || (property as VillaShowProperty)?.bedrooms || (property as ApartmentShowProperty)?.bedrooms || 0)
  const bathrooms = ((property as TownhouseShowProperty)?.bathrooms || (property as VillaShowProperty)?.bathrooms || (property as ApartmentShowProperty)?.bathrooms || 0) 

  return (
    <Link href={urlToDetail()} className="bg-gray-200 h-auto border-[1px] m-1  border-white hover:shadow-md rounded-sm">
      <div className="w-full h-70 gap-0.5 flex overflow-hidden relative">
        <div className="flex absolute bottom-2 z-10 right-2 items-center gap-2">
          <img src="/img/icons/picture.png" alt="" className="h-6"/>
          <p className="text-white text-2xl font-extrabold">{property.number_of_images}</p>
        </div>
        <div className="h-full lg:w-2/3 w-full overflow-hidden ">
          <img className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" src={(property)?.main_images![0]} alt={property.title} />
        </div>
        <div className="w-1/3 h-full hidden lg:block flex-col space-y-0.5 overflow-hidden ">
          <div className="w-full h-1/2 overflow-hidden">
            <img className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" src={(property)?.main_images![1]} alt={property.title} />
          </div>
          <div className="w-full h-1/2 overflow-hidden flex gap-0.5">
            <div className="w-full 2xl:w-1/2 h-full overflow-hidden">
              <img className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" src={(property)?.main_images![2]} alt={property.title} />
            </div>
            <div className="w-1/2 hidden 2xl:block h-full overflow-hidden">
              <img className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" src={(property)?.main_images![3]} alt={property.title} />
            </div>
          </div> 
        </div>
      </div>


      <div className="shadow-sm p-2">
        {/* info */}
        <div className="">
          <div className="font-bold hover:underline text-3xl  wrap-break-word line-clamp-1">
            {property.title}
          </div>
          <div className="flex justify-start gap-2 mb-2 items-baseline">
            <p className="text-red-600 font-extrabold text-2xl">{property.area_formatted}</p> <div className="text-gray-400">·</div>
            <p className="text-red-600 font-extrabold text-2xl">{property.price_formatted}/Tháng</p> <div className="text-gray-400">·</div>
            {(bedrooms > 0) && (
              <p className="items-baseline gap-0.5 hidden lg:flex"><img src="/img/icons/bed.png" className="h-4" alt="" />{bedrooms}</p>
            )}
            {(bedrooms > 0) && (
              <div className="text-gray-400 hidden lg:flex">·</div>
            )}
            {(bathrooms > 0) && (
              <p className="items-baseline gap-0.5 hidden lg:flex"><img src="/img/icons/bathtub.png" className="h-3.5" alt="" />{bathrooms}</p>
            )}
            {(bathrooms > 0) && (
              <div className="text-gray-400 hidden lg:flex">·</div>
            )}
            <p className=''>{property.location.split(',').slice(-2)[0]},{property.location.split(',').slice(-2)[1]}</p>
          </div>
          <div className="text-sm line-clamp-2 text-gray-900">{property.description}</div>
        </div>

      </div>
    </Link>
  )
}

export default San_pham_cho_thue_show_property
