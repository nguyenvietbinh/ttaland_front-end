'use client'
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import('@/components/debug/mapComponent'), {
  ssr: false,
});


const Map = () => {

  return (
    <div className="h-[100vh] w-[100vw]">
      <MapComponent locations={['40 Nguyễn Đình Chi, Phường 9, Quận 6, Hồ Chí Minh']}/>
    </div>
  )
}


export default Map