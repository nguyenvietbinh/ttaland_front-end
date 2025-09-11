'use client'
import MapComponent from "../debug/mapComponent"
import { place } from "../debug/mapComponent"

const Map_window = () => {
  const places: place[] = [
    {
      location: '40 Nguyễn Đình Chi, Phường 9, Quận 6, Hồ Chí Minh 700000, Việt Nam',
      coordinate: [106.660172, 10.762622]
    }
  ]
  return (
    <div className="w-full mt-5 h-auto">
      <p className='text-3xl sm:text-4xl mb-2'>Vị trí:</p>
      <div className="ml-4">
        <div className="w-full h-40 md:h-60 rounded-lg overflow-hidden cursor-pointer relative border-gray-700 border-2">
          <MapComponent places={places}/>
          <div
            className="absolute top-2 left-2 text-blue-600 link px-1 bg-white"
            onClick={() => {
              window.open(`https://www.google.com/maps?q=${106.660172},${10.762622}`, "_blank");
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