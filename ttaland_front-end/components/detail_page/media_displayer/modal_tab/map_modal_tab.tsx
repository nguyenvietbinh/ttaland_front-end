'use client'

import MapComponent from "@/components/utils/location_map_component"
import { place_infor } from "@/components/utils/location_map_component"

interface Map_modal_tab_props {
  place_infor: place_infor
}

const Map_modal_tab = ({ place_infor }: Map_modal_tab_props) => {

  return (
    <div className="h-full absolute top-0 -z-10 pt-14 pr-0 md:pr-4 w-full text-black">
      <MapComponent places={[place_infor]}/>
    </div>
  )
}


export default Map_modal_tab