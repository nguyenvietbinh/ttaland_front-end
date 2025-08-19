'use client'

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation"
import { useState, useEffect, useRef } from "react"

const San_pham_cho_thue_sqr_option = () => {
  const path_name = usePathname()
  const list_path = path_name?.split('/') || []
  const searchParams = useSearchParams()
  const [showOptions, setShowOptions] = useState<boolean>(false)
  const tagName = (searchParams?.get('sqr_min') && searchParams?.get('sqr_max')) ? `${searchParams?.get('sqr_min')} - ${searchParams?.get('sqr_max')}` : 'Diện Tích'
  const optionContainerRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const sqrList = [
    'Tất Cả',
    'Từ: 0 m² - Đến: 30 m²',
    'Từ: 30 m² - Đến: 50 m²',
    'Từ: 50 m² - Đến: 100 m²',
    'Từ: 100 m² - Đến: 150 m²',
    'Từ: 200 m² - Đến: 250 m²',
    'Từ: 300 m² - Đến: 350 m²',
    'Từ: 400 m² - Đến: 500 m²'
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

  const moveTo = (sqr_min: string, sqr_max: string) => {
      const price_min = searchParams?.get('price_min')
      const price_max = searchParams?.get('price_max')
      const locations = searchParams?.get('locations')
      const bed_room_min = searchParams?.get('bed_room_min')
      const bed_room_max = searchParams?.get('bed_room_max')
      const bath_room_min = searchParams?.get('bath_room_min')
      const bath_room_max = searchParams?.get('bath_room_max')

      const queryParams: Record<string, string> = {};

      queryParams.sqr_min = sqr_min
      queryParams.sqr_max = sqr_max
      if (price_min) queryParams.price_min = price_min
      if (price_max) queryParams.price_max = price_max
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
      return moveTo('Từ: 0 m²', 'Đến: 500 m²')
    } else {
      return moveTo(spanContent.split(' - ')[0], spanContent.split(' - ')[1])
    }
  };

  return (
    <div>
      <div ref={tagRef} onClick={() => {setShowOptions(preVal => !preVal)}} className="border-[1px] border-gray-400 backdrop-blur-3xl bg-black/10 p-1 px-4 flex gap-2 cursor-pointer hover:border-white rounded-sm">
        <p className=" overflow-auto text-nowrap">{ tagName }</p>
        <div className="flex items-center">
          <img src="/img/icons/arrow.png" alt="" className={`h-2 ${(showOptions) ? 'rotate-180' : 'rotate-0'} transition-all duration-200`}/>
        </div>
      </div>
      {showOptions && (
        <div ref={optionContainerRef} className="absolute text-nowrap mt-2 z-49 backdrop-blur-md bg-black/60  text-white inline-block p-4 rounded-box max-h-80 overflow-auto shadow-lg">
          <div className="gap-2 flex-col space-y-2">
            {sqrList.map((sqr, index) => {
              return (
                <Link key={index} href={urlOption(sqr)} onClick={() => {setShowOptions(false)}} className="flex gap-8 justify-between cursor-pointer hover:bg-white/10 py-2 px-4 rounded">
                  <span>{ sqr }</span>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default San_pham_cho_thue_sqr_option