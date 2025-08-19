'use client'

import { useEffect, useState } from "react"
import { useRouter, usePathname } from 'next/navigation'
import { FaHeart, FaRegHeart, FaMapMarkerAlt, FaImages } from 'react-icons/fa'
import NProgress from 'nprogress'

interface SimilarProductCardProps {
  id?: string
  title?: string
  price?: string
  area?: string
  location?: string
  images?: string[]
  isLiked?: boolean
}

const SimilarProductCard = ({
  id,
  title = "2PN rẻ nhất Masteri Centre Point, bàn giao full nội thất",
  price = "4,6 tỷ",
  area = "70 m²",
  location = "Quận 9, Hồ Chí Minh",
  images,
  isLiked = false
}: SimilarProductCardProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const [numberOfImg, setNumberOfImg] = useState<number>(6)
  const [listOfImg, setListOfImg] = useState<number[]>([])
  const [liked, setLiked] = useState<boolean>(isLiked)

  const getRandomNumber = (x: number, y: number) => {
    return Math.floor(Math.random() * (y - x + 1)) + x
  }

  useEffect(() => {
    if (!images) {
      const randomNum = getRandomNumber(4, 9)
      setNumberOfImg(randomNum)

      const uniqueNumbers = new Set<number>()
      while (uniqueNumbers.size < randomNum) {
        uniqueNumbers.add(getRandomNumber(0, 12))
      }
      setListOfImg(Array.from(uniqueNumbers))
    }
  }, [images])

  const handleNavigateToDetail = () => {
    const currentPath = pathname?.split('/') || []
    const productId = id || listOfImg.join('')
    const detailPath = `/${currentPath[1] || ''}/chi_tiet?id=${productId}`
    NProgress.start()
    router.push(detailPath)
  }

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    setLiked(!liked)
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer w-50 md:w-90 lg:w-60 xl:w-75 2xl:w-90 flex flex-col mx-auto">
      {/* Image Section - Fixed height */}
      <div className="relative h-25 md:h-50 lg:h-40 xl:h-50 2xl:h-60 overflow-hidden flex-shrink-0" onClick={handleNavigateToDetail}>
        <img 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
          src={images?.[0] || `/img/example/showcase${listOfImg[0]}.jpg`} 
          alt={title}
        />
        
        {/* Image count indicator */}
        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-sm xl:text-md flex items-center gap-1">
          <FaImages size={12} />
          {numberOfImg}
        </div>

        {/* Heart icon */}
        <button 
          onClick={toggleLike}
          className="absolute top-2 left-2 p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors duration-200"
        >
          {liked ? (
            <FaHeart className="text-red-500" size={16} />
          ) : (
            <FaRegHeart className="text-white" size={16} />
          )}
        </button>
      </div>

      {/* Content Section - Fixed height with flex layout */}
      <div className="p-1 flex flex-col justify-between" onClick={handleNavigateToDetail}>
        <div className="flex flex-col">
          {/* Title - Fixed height with 2 lines max */}
          <h3 className="font-semibold text-gray-800 text-sm xl:text-lg line-clamp-2 h-[3em] mb-1 hover:text-blue-600 transition-colors duration-200 leading-6">
            {title}
          </h3>

          {/* Price and Area */}
          <div className="flex items-center gap-4 mb-2">
            <span className="text-lg xl:text-2xl font-bold text-red-600">{price}</span>
            <span className="text-lg xl:text-2xl font-bold text-red-600">{area}</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1 text-gray-500 text-sm xl:text-lg">
            <FaMapMarkerAlt size={12} />
            <span className="line-clamp-1 mb-1">{location}</span>
          </div>
        </div>

        {/* Status - Pushed to bottom */}
        <div className="text-xs text-gray-400 mt-auto">
          Đăng hôm nay
        </div>
      </div>
    </div>
  )
}

export default SimilarProductCard
