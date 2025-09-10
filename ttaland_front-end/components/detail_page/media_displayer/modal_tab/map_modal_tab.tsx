'use client'

import MapComponent from "@/components/debug/mapComponent"


const Map_modal_tab = () => {

  return (
    <div className="h-full absolute top-0 -z-10 pt-14 pr-0 md:pr-4 w-full text-black">
      <MapComponent locations={['']}/>
    </div>
  )
}


export default Map_modal_tab