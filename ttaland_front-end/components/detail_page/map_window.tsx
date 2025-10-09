'use client'
import MapComponent from "../utils/location_map_component"
import { place_infor } from "../utils/location_map_component"

interface Map_window_props {
  place_infor: place_infor
}

const Map_window = ({ place_infor }: Map_window_props) => {
  return (
    <div className="">
      <p className='text-xl font-bold'>Vị trí</p>
      <div className="mt-2">
        <div className="w-full h-60 rounded-lg overflow-hidden cursor-pointer relative border-gray-700 border-2">
          <MapComponent places={[place_infor]}/>
          <div
            className="absolute top-2 left-2 text-blue-600 link px-1 bg-white"
            onClick={() => {
              window.open(`https://www.google.com/maps?q=${place_infor.coordinate[1]},${place_infor.coordinate[0]}`, "_blank");
            }}
          >
            xem trên google map
          </div>
        </div>
      </div>
    </div>
  )
}


export default Map_window