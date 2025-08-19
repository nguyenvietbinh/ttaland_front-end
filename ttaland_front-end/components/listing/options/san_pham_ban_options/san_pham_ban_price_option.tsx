'use client'

import { usePathname, useSearchParams } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import Link from "next/link";

const San_pham_ban_price_option = () => {
  const path_name = usePathname()
  const list_path = path_name?.split('/') || []
  const searchParams = useSearchParams()
  const [showOption, setShowOptions] = useState<boolean>(false)
  const tagName = (searchParams?.get('price_min') && searchParams?.get('price_max')) ? `${searchParams?.get('price_min')} - ${searchParams?.get('price_max')}` : 'Mức Giá'
  const optionContainerRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const priceList = [
    'Tất Cả',
    'Từ: 0 Triệu - Đến: 500 Triệu',
    'Từ: 500 Triệu - Đến: 800 Triệu',
    'Từ: 800 Triệu - Đến: 1 Tỷ',
    'Từ: 1 Tỷ - Đến: 2 Tỷ',
    'Từ: 2 Tỷ - Đến: 3 Tỷ',
    'Từ: 3 Tỷ - Đến: 5 Tỷ',
    'Từ: 5 Tỷ - Đến: 7 Tỷ',
    'Từ: 7 Tỷ - Đến: 10 Tỷ',
    'Từ: 10 Tỷ - Đến: 20 Tỷ',
    'Từ: 20 Tỷ - Đến: 30 Tỷ',
    'Từ: 30 Tỷ - Đến: 40 Tỷ',
    'Từ: 40 Tỷ - Đến: 50 Tỷ',
    'Từ: 50 Tỷ - Đến: 60 Tỷ'
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tagRef.current && 
        !tagRef.current.contains(event.target as Node) &&
        optionContainerRef.current && 
        !optionContainerRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const moveTo = (price_min: string, price_max: string) => {
      const sqr_min = searchParams?.get('sqr_min')
      const sqr_max = searchParams?.get('sqr_max')
      const locations = searchParams?.get('locations')
      const bed_room_min = searchParams?.get('bed_room_min')
      const bed_room_max = searchParams?.get('bed_room_max')
      const bath_room_min = searchParams?.get('bath_room_min')
      const bath_room_max = searchParams?.get('bath_room_max')

      const queryParams: Record<string, string> = {};

      queryParams.price_min = price_min
      queryParams.price_max = price_max
      if (sqr_min) queryParams.sqr_min = sqr_min
      if (sqr_max) queryParams.sqr_max = sqr_max
      if (locations) queryParams.locations = locations
      if (bed_room_min) queryParams.bed_room_min = bed_room_min;
      if (bed_room_max) queryParams.bed_room_max = bed_room_max;
      if (bath_room_min) queryParams.bath_room_min = bath_room_min;
      if (bath_room_max) queryParams.bath_room_max = bath_room_max;

      const queryString = new URLSearchParams(queryParams).toString();
      return `/${list_path[1]}/${list_path[2]}?${queryString}`
  }

  const urlOption = (spanContent: string) => {
    if (spanContent === 'Tất Cả' || spanContent === null) {
      return moveTo('Từ: 0 Triệu', 'Đến: 60 Tỷ')
    } else {
      return moveTo(spanContent.split(' - ')[0], spanContent.split(' - ')[1])
    }
  };

  return (
    <div>
      <div ref={tagRef} onClick={() => {setShowOptions(preVal => !preVal)}} className="border-[1px] backdrop-blur-3xl bg-black/10 border-gray-400 p-1 px-4 flex gap-2 cursor-pointer hover:border-white rounded-sm">
        <p className=" overflow-auto text-nowrap">{ tagName }</p>
        <div className="flex items-center">
          <img src="/img/icons/arrow.png" alt="" className={`h-2 ${(showOption) ? 'rotate-180' : 'rotate-0'} transition-all duration-200`}/>
        </div>
      </div>
      {showOption && (
        <div ref={optionContainerRef} className="absolute text-nowrap mt-2 z-49 backdrop-blur-md bg-black/60 text-white inline-block p-4 rounded-box max-h-80 overflow-auto shadow-lg">
          <div className="gap-2 flex-col space-y-2">
            {priceList.map((price, index) => {
              return (
                <Link key={index} href={urlOption(price)} onClick={() => {setShowOptions(false)}} className="flex gap-8 justify-between cursor-pointer hover:bg-white/10 py-2 px-4 rounded">
                  <span>{ price }</span>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default San_pham_ban_price_option