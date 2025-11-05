'use client'
import Search from "@/components/utils/search"
import location from '../location.json'
import Select_location_on_map from "./select_location_on_map"
import { useEffect, useState } from "react"


interface Select_location_props {
  setLocation: (val: string) => void
  setCoordinateProps: (val: [number, number]) => void
  setDetaiLocation: (val: string) => void
}

const Select_location = ({setLocation, setCoordinateProps, setDetaiLocation}: Select_location_props) => {
  const [district, setDistric] = useState<string>()
  const [coordinate, setCoordinate] = useState<[number, number]>()

  useEffect(() => {
    if (district && location.district.includes(district)) {
      setLocation(district)
    }
  }, [district])
  useEffect(() => {
    if (coordinate) {
      setCoordinateProps(coordinate)
    }
  }, [coordinate])




  return (
    <div className="flex flex-col gap-2">
      <div className="p-2 flex flex-col gap-8">
        <div className={`px-8 text-xl shadow-lg py-2 border-1 rounded-3xl flex border-gray-300`}>
          <input onChange={(e) => {setDetaiLocation(e.target.value)}} className="w-full outline-0 no-spinner" type="text" placeholder="Vị trí đầy đủ (không bắt buộc)"/>
        </div>
        <label className="flex p-2 gap-2 w-full border-1 border-gray-300 rounded-3xl shadow-lg">
          <Search keywords={location.district} placeholder="Quận/Huyện" disable={false} setData={setDistric}/>
        </label>
        {district && location.district.includes(district) && (
          <Select_location_on_map setCoordinateProps={setCoordinate} district={district}/>
        )}
      </div>
    </div>
  )
}


export default Select_location