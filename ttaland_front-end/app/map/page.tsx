'use client'
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import('@/components/debug/mapComponent'), {
  ssr: false,
});


const Map = () => {

  return (
    <div className="h-[100vh] w-[100vw]">
      <MapComponent locations={['22 Nguyễn Huệ, Quận 1, TP.HCM']}/>
    </div>
  )
}


export default Map