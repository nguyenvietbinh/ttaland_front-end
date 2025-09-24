'use client'
import MapComponent from "../debug/mapComponent"
import { place_infor } from "../debug/mapComponent"

interface Map_window_props {
  place_infor: place_infor
}

const Map_window = ({ place_infor }: Map_window_props) => {
  return (
    <div className="w-full mt-5 h-auto">
      <p className='text-3xl sm:text-4xl mb-2'>Vị trí:</p>
      <div className="ml-4">
        <div className="w-full h-40 md:h-60 rounded-lg overflow-hidden cursor-pointer relative border-gray-700 border-2">
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