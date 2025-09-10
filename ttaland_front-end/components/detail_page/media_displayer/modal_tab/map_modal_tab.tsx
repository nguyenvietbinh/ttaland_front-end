'use client'

import MapComponent from "@/components/debug/mapComponent"
import { place } from "@/components/debug/mapComponent"

const Map_modal_tab = () => {
    const places: place[] = [
      {
        location: '40 Nguyễn Đình Chi, Phường 9, Quận 6, Hồ Chí Minh 700000, Việt Nam',
        coordinate: [106.660172, 10.762622]
      }
    ]

  return (
    <div className="h-full absolute top-0 -z-10 pt-14 pr-0 md:pr-4 w-full text-black">
      <MapComponent places={places}/>
    </div>
  )
}


export default Map_modal_tab