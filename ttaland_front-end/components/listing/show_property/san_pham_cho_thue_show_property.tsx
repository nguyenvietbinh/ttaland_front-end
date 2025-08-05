'use client'

import { useEffect, useState } from "react"
import { useRouter, usePathname } from 'next/navigation'
import NProgress from 'nprogress'
import { apiService, type Townhouse, type Villa, type Apartment, type Land } from '@/services/apiService'

interface San_pham_cho_thue_propertyProps {
  townhouse?: Townhouse
  villa?: Villa
  apartment?: Apartment
  land?: Land
}

const San_pham_cho_thue_property = ({ townhouse, villa, apartment, land }: San_pham_cho_thue_propertyProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const [numberOfImg, setNumberOfImg] = useState<number>(0)
  const [listOfImg, setListOfImg] = useState<number[]>([])

  // Use any available property data
  const property = villa || townhouse || apartment || land
  const isUsingRealData = !!property
  
  const getRandomNumber = (x: number, y: number) => {
    return Math.floor(Math.random() * (y - x + 1)) + x
  }

  useEffect(() => {
    if (isUsingRealData && property?.images) {
      // Use real media data
      setNumberOfImg(property.images.length)
    } else {
      // Use mock data
      const randomNum = getRandomNumber(4, 9)
      setNumberOfImg(randomNum)

      const uniqueNumbers = new Set<number>()
      while (uniqueNumbers.size < randomNum) {
        uniqueNumbers.add(getRandomNumber(0, 9))
      }
      setListOfImg(Array.from(uniqueNumbers))
    }
  }, [isUsingRealData, property])

  const handleNavigateToDetail = () => {
    const currentPath = pathname.split('/')
    const detailId = isUsingRealData ? property!.id : listOfImg.join('')
    const detailPath = `/${currentPath[1]}/${currentPath[2]}/chi_tiet?id=${detailId}`
    NProgress.start()
    router.push(detailPath)
  }

  // Get image URLs
  const getImageUrl = (index: number): string => {
    if (isUsingRealData && property?.images?.[index]) {
      return apiService.getMediaUrl(property.images[index])
    }
    return `/img/example/showcase${listOfImg[index] || 0}.jpg`
  }

  // Get property data with type checking
  const title = isUsingRealData ? property!.title : "QUỸ CĂN GIÁ RẺ NHẤT TẠI VINHOMES WONDER CITY CÓ HỘI VÀNG CHỈ 150 TRIỆU/M2"
  const area = isUsingRealData ? property!.area_formatted : "100 m²"
  const price = isUsingRealData ? property!.price_formatted : "1 Tỷ"
  const location = isUsingRealData ? property!.location : "Phường 2, Thủ Đức"
  
  // Handle garage - only available for townhouse, villa, some apartments
  const garage = isUsingRealData ? 
    ((property as Townhouse)?.garage || (property as Villa)?.garage || 0) : 1
  
  // Handle bedrooms - not available for land
  const bedrooms = isUsingRealData ? 
    ((property as Townhouse)?.bedrooms || (property as Villa)?.bedrooms || (property as Apartment)?.bedrooms || 0) : 4
  
  // Handle bathrooms - not available for land  
  const bathrooms = isUsingRealData ? 
    ((property as Townhouse)?.bathrooms || (property as Villa)?.bathrooms || (property as Apartment)?.bathrooms || 0) : 3

  return (
    <div className="bg-gray-200 h-auto border-[1px] m-1 border-white hover:shadow-md rounded-sm">
      <div className="w-full h-80 rounded-sm gap-[2px] flex overflow-hidden" onClick={handleNavigateToDetail}>
        <div className="h-full relative md:w-2/3 w-full overflow-hidden cursor-pointer">
          <img className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" src={getImageUrl(0)} alt={title} />
          {numberOfImg > 1 && (
            <div className="absolute bg-black/50 p-1 rounded-sm right-2 bottom-2 md:hidden flex items-center gap-1">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              <span className="text-white text-sm font-medium">{numberOfImg - 1}+</span>
            </div>
          )}
        </div>
        <div className="w-1/3 h-full hidden md:block flex-col space-y-[2px] overflow-hidden cursor-pointer">
          <div className="w-full h-1/2 overflow-hidden">
            <img className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" src={getImageUrl(1)} alt={title} />
          </div>
          <div className="w-full relative h-1/2 cursor-pointer">
            <img className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" src={getImageUrl(2)} alt={title} />
            {numberOfImg > 3 && (
              <div className="absolute bg-black/50 p-1 rounded-sm right-2 bottom-2 flex items-center gap-1">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                <span className="text-white text-sm font-medium">{numberOfImg - 3}+</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-2 pt-4 text-black">
        {/* info */}
        <div className="">
          <h1 className="font-bold text-xl cursor-pointer hover:underline wrap-break-word line-clamp-2" onClick={handleNavigateToDetail}>
            {title}
          </h1>
          <div className="grid md:grid-cols-3 grid-cols-2 gap-2 py-3 text-left text-lg text-nowrap border-y-[1px] font-bold border-gray-600">
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
              <p className="overflow-auto no-scrollbar">{price}</p>
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
            <div className="flex items-center gap-1">
              <img src="/img/icons/loc.png" alt="" className="h-6 hidden md:block"/>
              <p className="overflow-auto no-scrollbar">{location}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between w-full my-3 items-center">
          <div className="btn bg-black text-white w-[80%] md:w-[90%]" onClick={handleNavigateToDetail}>Thông tin thêm</div>
          <div className="w-[20%] md:w-[10%] cursor-pointer">
            <img src="/img/icons/heart.png" alt="" className="h-8 mx-auto"/>
          </div>
        </div>  
      </div>
    </div>
  )
}

export default San_pham_cho_thue_property
