'use client'

import { useEffect, useState } from "react"
import { useRouter, usePathname } from 'next/navigation'
import NProgress from 'nprogress'
import { apiService, type Townhouse } from '@/services/apiService'

interface San_pham_ban_propertyProps {
  townhouse?: Townhouse
}

const San_pham_ban_property = ({ townhouse }: San_pham_ban_propertyProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const [numberOfImg, setNumberOfImg] = useState<number>(0)
  const [listOfImg, setListOfImg] = useState<number[]>([])

  // If townhouse data is provided, use it. Otherwise fall back to mock data
  const isUsingRealData = !!townhouse
  
  const getRandomNumber = (x: number, y: number) => {
    return Math.floor(Math.random() * (y - x + 1)) + x
  }

  useEffect(() => {
    if (isUsingRealData && townhouse?.media) {
      // Use real media data
      setNumberOfImg(townhouse.media.length)
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
  }, [isUsingRealData, townhouse])

  const handleNavigateToDetail = () => {
    const currentPath = pathname?.split('/') || []
    const detailId = isUsingRealData ? townhouse!.id : listOfImg.join('')
    const detailPath = `/${currentPath[1] || ''}/${currentPath[2] || ''}/chi_tiet?id=${detailId}`
    NProgress.start()
    router.push(detailPath)
  }

  // Get image URLs
  const getImageUrl = (index: number): string => {
    if (isUsingRealData && townhouse?.media?.[index]) {
      return apiService.getMediaUrl(townhouse.media[index].file)
    }
    return `/img/example/showcase${listOfImg[index] || 0}.jpg`
  }

  // Get property data
  const title = isUsingRealData ? townhouse!.title : "QUỸ CĂN GIÁ RẺ NHẤT TẠI VINHOMES WONDER CITY CÓ HỘI VÀNG CHỈ 150 TRIỆU/M2"
  const area = isUsingRealData ? `${townhouse!.area} m²` : "100 m²"
  const garage = isUsingRealData ? townhouse!.garage : 1
  const price = isUsingRealData ? `${townhouse!.price} Tỷ` : "1 Tỷ"
  const bedrooms = isUsingRealData ? townhouse!.bedrooms : 4
  const bathrooms = isUsingRealData ? townhouse!.bathrooms : 3
  const location = isUsingRealData ? townhouse!.location : "Phường 2, Thủ Đức"

  return (
    <div className="bg-gray-200 h-auto border-[1px] m-1 border-white hover:shadow-md rounded-sm">
      <div className="w-full h-80 rounded-sm gap-[2px] flex overflow-hidden" onClick={handleNavigateToDetail}>
        <div className="h-full relative md:w-2/3 w-full overflow-hidden cursor-pointer">
          <img className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" src={getImageUrl(0)} alt={title} />
          <div className="absolute bg-black/50 p-1 rounded-sm right-2 bottom-2 md:hidden">{numberOfImg - 1}+</div>
        </div>
        <div className="w-1/3 h-full hidden md:block flex-col space-y-[2px] overflow-hidden cursor-pointer">
          <div className="w-full h-1/2 overflow-hidden">
            <img className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" src={getImageUrl(1)} alt={title} />
          </div>
          <div className="w-full relative h-1/2 cursor-pointer">
            <div className="w-full h-full absolute bg-black/50 transition-all duration-200 hover:bg-black/80 flex justify-center items-center">
              <div className="flex gap-1 items-center text-white">
                <p>{numberOfImg - 3}+</p>
              </div>
            </div>
            <img className="w-full h-full object-cover" src={getImageUrl(2)} alt={title} />
          </div>
        </div>
      </div>





      <div className="px-2 pt-4 text-black">

        {/* info */}
        <div className="">
          <h1 className="font-bold text-2xl cursor-pointer hover:underline wrap-break-word line-clamp-2" onClick={handleNavigateToDetail}>
            {title}
          </h1>
          <div className="grid md:grid-cols-3 grid-cols-2 gap-2 py-3 text-left text-xl text-nowrap border-y-[1px] font-bold border-gray-600">
            <div className="flex items-center gap-1">
              <img src="/img/icons/sqr.png" alt="" className="h-6 hidden md:block"/>
              <p className="">Diện tích:</p>
              <p className="overflow-auto no-scrollbar">{area}</p>
            </div>
            <div className="flex items-center gap-1">
              <img src="/img/icons/car.png" alt="" className="h-6 hidden md:block"/>
              <p className="">Garage:</p>
              <p className="overflow-auto no-scrollbar">{garage}</p>
            </div>
            <div className="flex items-center gap-1">
              <img src="/img/icons/vnd.png" alt="" className="h-6 hidden md:block"/>
              <p className="">Giá:</p>
              <p className="overflow-auto no-scrollbar">{price}</p>
            </div>
            <div className="flex items-center gap-1">
              <img src="/img/icons/bed.png" alt="" className="h-6 hidden md:block"/>
              <p className="">Phòng ngủ:</p>
              <p className="overflow-auto no-scrollbar">{bedrooms}</p>
            </div>
            <div className="flex items-center gap-1">
              <img src="/img/icons/bath.png" alt="" className="h-6 hidden md:block"/>
              <p className="">Phòng tắm:</p>
              <p className="overflow-auto no-scrollbar">{bathrooms}</p>
            </div>
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

export default San_pham_ban_property