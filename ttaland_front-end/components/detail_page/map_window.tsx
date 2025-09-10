'use client'
import MapComponent from "../debug/mapComponent"


const Map_window = () => {

  return (
    <div className="w-[70%] rounded-lg overflow-hidden mt-10 h-80">
      <p className='text-3xl sm:text-4xl mb-2'>Xem bản đồ:</p>
      <MapComponent locations={['']}/>
    </div>
  )
}


export default Map_window