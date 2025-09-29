'use client'
import { useState } from "react"
import Property_type from "./steps/property_type"
import Select_location from "./steps/select_location"


const Dang_san_pham_container = () => {
  const [isForSale, setIsForSale] = useState<boolean>(false)
  const [isForRent, setIsForRent] = useState<boolean>(false)
  const [location, setLocation] = useState<string>()
  console.log(location)


  return (
    <div className="w-2/3 mx-auto px-4 py-6 mt-10 rounded-3xl bg-white text-black flex flex-col gap-6">
      {!(isForRent || isForSale) && (
        <Property_type isForRent={isForRent} isForSale={isForSale} setIsForRent={setIsForRent} setIsForSale={setIsForSale}/>
      )}
      {(isForRent || isForSale) && (
        <Select_location setLocation={setLocation}/>
      )}
    </div>
  )
}



export default Dang_san_pham_container