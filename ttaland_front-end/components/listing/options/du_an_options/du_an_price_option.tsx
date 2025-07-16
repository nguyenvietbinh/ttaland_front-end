'use client'

import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from "react"

const Du_an_price_option = () => {
  const router = useRouter()
  const path_name = usePathname()
  const list_path = path_name.split('/')
  const searchParams = useSearchParams()
  const [showPriceOption, setShowPriceOption] = useState<boolean>(false)
  const priceTagName = (searchParams.get('price_min') && searchParams.get('price_max')) ? `${searchParams.get('price_min')} - ${searchParams.get('price_max')}` : 'Mức Giá'
  const optionContainerRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        priceRef.current && 
        !priceRef.current.contains(event.target as Node) &&
        optionContainerRef.current && 
        !optionContainerRef.current.contains(event.target as Node)
      ) {
        setShowPriceOption(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const moveTo = (price_min: string, price_max: string) => {
      const sqr_min = searchParams.get('sqr_min')
      const sqr_max = searchParams.get('sqr_max')
      const locations = searchParams.get('locations')
      const bed_room_min = searchParams.get('bed_room_min')
      const bed_room_max = searchParams.get('bed_room_max')
      const bath_room_min = searchParams.get('bath_room_min')
      const bath_room_max = searchParams.get('bath_room_max')

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
      router.push(`/${list_path[1]}/${list_path[2]}?${queryString}`);
  }

  const handleOptionsClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const spanElement = e.currentTarget.querySelector('span');
    
    if (spanElement) {
      const spanContent = spanElement.textContent;
      if (spanContent === 'Tất Cả' || spanContent === null) {
        moveTo('Từ: 0 Triệu/m²', 'Đến: 100 Triệu/m²')
      } else {
        moveTo(spanContent.split(' - ')[0], spanContent.split(' - ')[1])
      }

    }
    setShowPriceOption(false)
    
  };

  return (
    <div>
      <div ref={priceRef} onClick={() => {setShowPriceOption(preVal => !preVal)}} className="border-[1px] border-gray-400 backdrop-blur-3xl bg-black/10 p-1 px-4 flex gap-2 cursor-pointer hover:border-white rounded-sm">
        <p className=" overflow-auto text-nowrap">{ priceTagName }</p>
        <div className="flex items-center">
          <img src="/img/icons/arrow.png" alt="" className={`h-2 ${(showPriceOption) ? 'rotate-180' : 'rotate-0'} transition-all duration-200`}/>
        </div>
      </div>
      {showPriceOption && (
        <div ref={optionContainerRef} className="absolute text-nowrap mt-2 z-49 backdrop-blur-md bg-black/60  text-white inline-block p-4 rounded-box max-h-80 overflow-auto shadow-lg">
        <div className="gap-2 flex-col space-y-2">
          <div onClick={handleOptionsClick} className="flex gap-8 justify-between cursor-pointer hover:bg-white/10 py-2 px-4 rounded-md">
            <span>Tất Cả</span>
          </div>
          <div onClick={handleOptionsClick} className="flex gap-8 justify-between cursor-pointer hover:bg-white/10 py-2 px-4 rounded-md">
            <span>Từ: 0 Triệu/m² - Đến: 1 Triệu/m²</span>
          </div>
          <div onClick={handleOptionsClick} className="flex gap-8 justify-between cursor-pointer hover:bg-white/10 py-2 px-4 rounded-md">
            <span>Từ: 1 Triệu/m² - Đến: 2 Triệu/m²</span>
          </div>
          <div onClick={handleOptionsClick} className="flex gap-8 justify-between cursor-pointer hover:bg-white/10 py-2 px-4 rounded-md">
            <span>Từ: 2 Triệu/m² - Đến: 3 Triệu/m²</span>
          </div>
          <div onClick={handleOptionsClick} className="flex gap-8 justify-between cursor-pointer hover:bg-white/10 py-2 px-4 rounded-md">
            <span>Từ: 3 Triệu/m² - Đến: 5 Triệu/m²</span>
          </div>
          <div onClick={handleOptionsClick} className="flex gap-8 justify-between cursor-pointer hover:bg-white/10 py-2 px-4 rounded-md">
            <span>Từ: 5 Triệu/m² - Đến: 7 Triệu/m²</span>
          </div>
          <div onClick={handleOptionsClick} className="flex gap-8 justify-between cursor-pointer hover:bg-white/10 py-2 px-4 rounded-md">
            <span>Từ: 7 Triệu/m² - Đến: 10 Triệu/m²</span>
          </div>
          <div onClick={handleOptionsClick} className="flex gap-8 justify-between cursor-pointer hover:bg-white/10 py-2 px-4 rounded-md">
            <span>Từ: 10 Triệu/m² - Đến: 15 Triệu/m²</span>
          </div>
          <div onClick={handleOptionsClick} className="flex gap-8 justify-between cursor-pointer hover:bg-white/10 py-2 px-4 rounded-md">
            <span>Từ: 15 Triệu/m² - Đến: 20 Triệu/m²</span>
          </div>
          <div onClick={handleOptionsClick} className="flex gap-8 justify-between cursor-pointer hover:bg-white/10 py-2 px-4 rounded-md">
            <span>Từ: 20 Triệu/m² - Đến: 25 Triệu/m²</span>
          </div>          
          <div onClick={handleOptionsClick} className="flex gap-8 justify-between cursor-pointer hover:bg-white/10 py-2 px-4 rounded-md">
            <span>Từ: 25 Triệu/m² - Đến: 30 Triệu/m²</span>
          </div>          
          <div onClick={handleOptionsClick} className="flex gap-8 justify-between cursor-pointer hover:bg-white/10 py-2 px-4 rounded-md">
            <span>Từ: 30 Triệu/m² - Đến: 40 Triệu/m²</span>
          </div>          
          <div onClick={handleOptionsClick} className="flex gap-8 justify-between cursor-pointer hover:bg-white/10 py-2 px-4 rounded-md">
            <span>Từ: 40 Triệu/m² - Đến: 50 Triệu/m²</span>
          </div>          
          <div onClick={handleOptionsClick} className="flex gap-8 justify-between cursor-pointer hover:bg-white/10 py-2 px-4 rounded-md">
            <span>Từ: 50 Triệu/m² - Đến: 60 Triệu/m²</span>
          </div>
          <div onClick={handleOptionsClick} className="flex gap-8 justify-between cursor-pointer hover:bg-white/10 py-2 px-4 rounded-md">
            <span>Từ: 60 Triệu/m² - Đến: 70 Triệu/m²</span>
          </div>
          <div onClick={handleOptionsClick} className="flex gap-8 justify-between cursor-pointer hover:bg-white/10 py-2 px-4 rounded-md">
            <span>Từ: 70 Triệu/m² - Đến: 80 Triệu/m²</span>
          </div>
          <div onClick={handleOptionsClick} className="flex gap-8 justify-between cursor-pointer hover:bg-white/10 py-2 px-4 rounded-md">
            <span>Từ: 80 Triệu/m² - Đến: 90 Triệu/m²</span>
          </div>
          <div onClick={handleOptionsClick} className="flex gap-8 justify-between cursor-pointer hover:bg-white/10 py-2 px-4 rounded-md">
            <span>Từ: 90 Triệu/m² - Đến: 100 Triệu/m²</span>
          </div>
        </div>
        </div>
      )}
    </div>
  )
}

export default Du_an_price_option