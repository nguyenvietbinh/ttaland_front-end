'use client'

import { useEffect, useState } from "react"
import { usePathname } from 'next/navigation'
import { FaMapMarkerAlt, FaImages } from 'react-icons/fa'
import Link from "next/link"

interface SimilarProductCardProps {
  id?: string
  title?: string
  price?: string
  area?: string
  location?: string
  images?: string[]
}

const SimilarProductCard = ({
  id,
  title = "2PN rẻ nhất Masteri Centre Point, bàn giao full nội thất",
  price = "4,6 tỷ",
  area = "70 m²",
  location = "Quận 9, Hồ Chí Minh",
  images,
}: SimilarProductCardProps) => {
  const pathname = usePathname()
  const [numberOfImg, setNumberOfImg] = useState<number>(1)
  const [listOfImg, setListOfImg] = useState<number[]>([])

  const getRandomNumber = (x: number, y: number) => {
    return Math.floor(Math.random() * (y - x + 1)) + x
  }

  useEffect(() => {
    if (images && images.length > 0) {
      setNumberOfImg(images.length)
    } else {
      // Fallback to random images for mock data
      const randomNum = getRandomNumber(4, 9)
      setNumberOfImg(randomNum)

      const uniqueNumbers = new Set<number>()
      while (uniqueNumbers.size < randomNum) {
        uniqueNumbers.add(getRandomNumber(0, 12))
      }
      setListOfImg(Array.from(uniqueNumbers))
    }
  }, [images])

  const urlToDetail = () => {
    const currentPath = pathname?.split('/') || []
    // Use the actual product ID if available, otherwise fallback to generated ID
    const productId = id || listOfImg.join('')
    return `/${currentPath[1] || ''}/chi_tiet?id=${productId}`
  }

  // Get the main image URL
  const getMainImage = () => {
    if (images && images.length > 0) {
      return images[0]
    }
    // Fallback to example image
    return `/img/example/showcase${listOfImg[0] || 0}.jpg`
  }


  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer flex flex-col mx-auto">
      {/* Image Section - Fixed height */}
      <Link className="relative aspect-video overflow-hidden flex-shrink-0"  href={urlToDetail()}>
        <img 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
          src={getMainImage()} 
          alt={title}
        />
        
        {/* Image count indicator */}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-base xl:text-md flex items-center gap-1">
          <FaImages size={12} />
          {numberOfImg}
        </div>


      </Link>

      {/* Content Section - Fixed height with flex layout */}
      <Link className="p-1 flex flex-col justify-between" href={urlToDetail()}>
        <div className="flex flex-col">
          {/* Title - Fixed height with 2 lines max */}
          <h3 className="font-semibold text-gray-800 text-base xl:text-xl line-clamp-2 h-[2.2em] mb-1 hover:text-blue-600 transition-colors duration-200 leading-6">
            {title}
          </h3>

          {/* Price and Area */}
          <div className="flex items-center gap-4">
            <span className="text-md xl:text-2xl font-bold text-red-600">{price}</span>
            <span className="text-md xl:text-2xl font-bold text-red-600">{area}</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1 text-gray-500 text-base xl:text-xl">
            <FaMapMarkerAlt size={12} />
            <span className="line-clamp-1 ">{location}</span>
          </div>
        </div>

        {/* Status - Pushed to bottom */}
        <div className="text-sm text-gray-400 mt-auto">
          Đăng hôm nay
        </div>
      </Link>
    </div>
  )
}

export default SimilarProductCard
