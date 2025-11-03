'use client'
import Search from "@/components/utils/search"
import location from '../location.json'
import Select_location_on_map from "./select_location_on_map"
import { useEffect, useState } from "react"


interface Select_location_props {
  setLocation: (val: string) => void
  setCoordinateProps: (val: [number, number]) => void
}

const Select_location = ({setLocation, setCoordinateProps}: Select_location_props) => {
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
      <div className="p-2 flex flex-col gap-4">
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