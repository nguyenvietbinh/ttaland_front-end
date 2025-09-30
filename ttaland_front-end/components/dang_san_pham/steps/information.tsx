'use client'
import { useState } from "react"
import { Information } from "../dang_san_pham_container"
import { get_price_per_square_meter, formatVietnameseNumber } from "@/components/listing/show_property/san_pham_ban_show_property"
interface Information_props {
  setInformationProp: (val: Information) => void
  isForSale: boolean
}


const Information_component = ({setInformationProp, isForSale}: Information_props) => {
  const [propertType, setPropertyType] = useState<string>('Nhà Phố')
  const [price, setPrice] = useState<string>()
  const [area, setArea] = useState<string>()






  return (
    <div className="flex flex-col border-1 border-gray-300 rounded-3xl overflow-hidden shadow-lg">
      <div className="p-2 gap-2 w-full  flex px-8 border-b-1 border-gray-300">

        <div className="flex w-1/3 border-r-1 border-gray-300 px-2">
          <input value={price} onChange={(e) => setPrice(() => {return (Number(e.target.value) < 1000000000000 && Number(e.target.value) >= 0) ? e.target.value : '100000000000'})} className="outline-0  text-center w-full no-spinner" type="number" />
          <p className="bg-blue-100 rounded-sm px-1">{isForSale ? 'VND' : 'VND/Tháng'}</p>
        </div>
        <div className="flex w-1/3 border-r-1 border-gray-300 px-2">
          <input value={area} onChange={(e) => setArea(() => {return (Number(e.target.value) < 1000000000000 && Number(e.target.value) >= 0) ? e.target.value : '100000000000'})} className="outline-0 w-full text-center no-spinner" type="number" />
          <p className="bg-blue-100 rounded-sm px-1">M²</p>
        </div>
        <select onChange={(e) => setPropertyType(e.target.value)} className="outline-0 w-1/3" name="" id="">
          <option>Nhà Phố</option>
          <option>Biệt Thự</option>
          <option>Đất Nền</option>
          <option>Căn Hộ</option>
        </select>
      </div>
      <div className="flex gap-2 p-2 w-full">
        <div className="w-1/3 text-center font-bold">{isForSale ? `${price ? formatVietnameseNumber(Number(price)) : '0'} Đồng` : `${price ? formatVietnameseNumber(Number(price)) : '0'} Đồng/Tháng`}</div>
        <div className="w-1/3 text-center font-bold pr-6">{isForSale ? `${(area && price) ? (get_price_per_square_meter(Number(price), Number(area))) : 0}/m²` : ''}</div>
        <div className="w-1/3"></div>
      </div>


      <button onClick={() => (propertType === 'Nhà Phố' || propertType === 'Biệt Thự' || propertType === 'Đất Nền' || propertType === 'Căn Hộ') && (price && area) ? setInformationProp({ property_type: propertType, price: price, area: area}) : ''} disabled={(price && area)? false : true} className="p-1 w-full ml-auto bg-gray-900 btn">Xong</button>
    </div>
  )
}


export default Information_component