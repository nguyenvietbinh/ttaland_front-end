'use client'

import { usePathname } from 'next/navigation'
import { FaMapMarkerAlt, FaImages } from 'react-icons/fa'
import Link from "next/link"
import { SimilarProductItem } from "@/types/similar"

interface SimilarProductCardProps {
  similerproductIteam: SimilarProductItem
}

const SimilarProductCard = ({ similerproductIteam }: SimilarProductCardProps) => {
  const pathname = usePathname()
  const created_at = similerproductIteam.created_at.slice(0, 10).split('-')
  const urlToDetail = () => {
    const currentPath = pathname?.split('/') || []
    return `/${currentPath[1] || ''}/chi_tiet?id=${similerproductIteam.id}`
  }

  return (
    <div className="bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer flex flex-col mx-auto">
      {/* Image Section - Fixed height */}
      <Link className="relative aspect-video overflow-hidden flex-shrink-0"  href={urlToDetail()}>
        <img 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
          src={similerproductIteam.main_image} 
          alt={similerproductIteam.title}
        />
        
        {/* Image count indicator */}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-base xl:text-md flex items-center gap-1">
          <FaImages size={12} />
          {similerproductIteam.num_images}
        </div>
      </Link>

      {/* Content Section - Fixed height with flex layout */}
      <Link className="p-1 flex flex-col justify-between" href={urlToDetail()}>
        <div className="flex flex-col">
          {/* Title - Fixed height with 2 lines max */}
          <h3 className="font-semibold text-gray-800 text-base xl:text-xl line-clamp-2 h-[2.2em] mb-1 hover:text-blue-600 transition-colors duration-200 leading-6">
            {similerproductIteam.title}
          </h3>

          {/* Price and Area */}
          <div className="flex items-center gap-4">
            <span className="text-md xl:text-2xl font-bold text-red-600">{similerproductIteam.price_formatted}</span>
            <span className="text-md xl:text-2xl font-bold text-red-600">{similerproductIteam.area_formatted}</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1 text-gray-800 text-base xl:text-xl">
            <FaMapMarkerAlt size={12} />
            <span className="line-clamp-1 ">{similerproductIteam.location}</span>
          </div>
        </div>

        {/* Status - Pushed to bottom */}
        <div className="text-sm text-gray-600 mt-auto">
          {created_at[2]}/{created_at[1]}/{created_at[0]}
        </div>
      </Link>
    </div>
  )
}

export default SimilarProductCard
