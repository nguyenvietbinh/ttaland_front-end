'use client'

import MapComponent from "@/components/debug/mapComponent"

interface Map_modal_tab_props {
  location: string,
}

const Map_modal_tab = ({ location }: Map_modal_tab_props) => {

  return (
    <div className="h-full absolute top-0 -z-10 pt-16 pr-4 w-full text-black">
      <MapComponent locations={[location]}/>
    </div>
  )
}


export default Map_modal_tab