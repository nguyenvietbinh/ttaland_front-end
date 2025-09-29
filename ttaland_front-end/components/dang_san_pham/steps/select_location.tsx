'use client'
import Search from "@/components/nav_bar/filter/input_components/search"
import location from '../location.json'
import Select_location_on_map from "./select_location_on_map"
import { useEffect, useState } from "react"

interface Select_location_props {
  setLocation: (val: string) => void
}

const Select_location = ({setLocation}: Select_location_props) => {
  const [district, setDistric] = useState<string>()

  useEffect(() => {
    if (district) {
      setLocation(district)
    }
  }, [district])
  return (
    <div className="flex flex-col gap-2">
      <p className="text-2xl font-bold">Địa chỉ BĐS</p>
      <div className="p-2 flex flex-col gap-4">
        <label className="flex p-2 gap-2 w-full border-1 border-gray-300 rounded-3xl shadow-lg">
          <Search keywords={location.district} placeholder="Quận/Huyện" disable={false} setData={setDistric}/>
        </label>
        {district && (
          <Select_location_on_map district={district}/>
        )}
      </div>
    </div>
  )
}


export default Select_location