'use client'
import { useEffect, useState } from "react"
import { Information } from "../dang_san_pham_container"
import Select_component from "@/components/utils/select_component"
import { get_price_per_square_meter, formatVietnameseNumber } from "@/components/listing/show_property/san_pham_ban_show_property"
interface Information_props {
  setInformationProp: (val: Information) => void
  isForSale: boolean
}


const Information_component = ({setInformationProp, isForSale}: Information_props) => {
  const [propertType, setPropertyType] = useState<string>('Nhà Phố')
  const [price, setPrice] = useState<string>('')
  const [area, setArea] = useState<string>('')
  const [isValidPrice, setIsValidPrice] = useState<boolean>(true)
  const [isValidArea, setIsValidArea] = useState<boolean>(true)
  const [priceDisplayVal, setPriceDisplayVal] = useState<string>('')
  const [areaDisplayVal, setAreaDisplayVal] = useState<string>('')
  const [openSuggestion, setOpenSuggestion] = useState<boolean>(false)


  const genPriceSuggest = (price: string, type: string) => {
    price = price + '00'
    const newPrice = price.split('').filter(char => char !== '0').join('')
    if (type === '1') {
      if (newPrice.length === 1) {
        return price.slice(0, 1)
      } else {
        return newPrice.slice(0, 1) + ',' + newPrice.slice(1)
      }
    } else if (type === '10') {
      if (newPrice.length <= 2) {
        return price.slice(0, 2)
      } else {
        return newPrice.slice(0, 2) + ',' + newPrice.slice(2)
      }
    } else if (type === '100') {
      if (newPrice.length <= 3) {
        return price.slice(0, 3)
      } else {
        return newPrice.slice(0, 3) + ',' + newPrice.slice(3)
      }
    }
    return '1'
  }



  const formatNumberWithDots = (value: string): string => {
    const onlyDigits = value.replace(/\D/g, '');
    return onlyDigits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    let digitsOnly = input.replace(/\D/g, '');
    if (Number(digitsOnly) > 100000) {
      setIsValidPrice(true)
    }
    if (digitsOnly.length > 5) {
        const digitsArray = digitsOnly.split('');
        for (let i = 5; i < digitsArray.length; i++) {
            digitsArray[i] = '0'; // Thay thế trực tiếp theo vị trí
        }
        digitsOnly = digitsArray.join('');
    }
    if (digitsOnly.length > 14 || digitsOnly[0] === '0') {
      digitsOnly = digitsOnly.slice(0, -1);
    }
    setPrice(digitsOnly);
    setPriceDisplayVal(formatNumberWithDots(digitsOnly))
  };


  useEffect(() => {
    setPriceDisplayVal(formatNumberWithDots(price))
    setAreaDisplayVal(formatNumberWithDots(area))
  }, [price, area])




  return (
    <div className="flex flex-col p-4 rounded-3xl overflow-hidden">
      <Select_component open={true} setData={setPropertyType} options={['Nhà Phố', 'Biệt Thự', 'Đất Nền', 'Căn Hộ']}/>
      <div className={`px-8 mt-8 text-xl shadow-lg py-2 border-1 rounded-3xl flex ${isValidArea ? 'border-gray-400 hover:bg-gray-100' : 'border-red-400'}`}>
        <input value={areaDisplayVal} onChange={(e) => {setArea(e.target.value.replace(/\D/g, '')); if (Number(e.target.value.replace(/\D/g, '')) > 0) {setIsValidArea(true)}}} className="w-full outline-0 no-spinner" type="text" inputMode="numeric" placeholder="Diện tích"/>
        <p className="bg-blue-100 px-1 rounded-sm">m²</p>
      </div>
      {!isValidArea && (
        <p className="text-red-600">Diện tích không hợp lệ !!!</p>
      )}
      <div className={`px-8 mt-8 relative text-xl shadow-lg py-2 border-1 ${isValidPrice ? 'border-gray-400 hover:bg-gray-100' : 'border-red-400'} rounded-3xl flex`}>
        <input onBlur={() => {setTimeout(() => {setOpenSuggestion(false)}, 300); }} onFocus={() => setOpenSuggestion(true)} value={priceDisplayVal} onChange={(e) => {handleInputChange(e)}} className="w-full outline-0 no-spinner" type="text" inputMode="numeric" placeholder="Giá thành"/>
        <p className="bg-blue-100 px-1 rounded-sm">VND</p>
      </div>
      {!isValidPrice && (
        <p className="text-red-600">Giá tiền phải trên 100.000 Đồng</p>
      )}
      {openSuggestion && price && (
      <div className="flex mt-4 gap-2">
        {!isForSale && (
          <div onClick={() => setPrice(val => (val?.slice(0, 5) + '0000').slice(0, 5) + '00')} className="px-4 shadow-lg cursor-pointer border-1 border-gray-300 hover:border-gray-400 hover:bg-gray-200 rounded-3xl flex gap-1"><p className="font-bold">{genPriceSuggest(price, '1')}</p> triệu/tháng</div>
        )}
        <div onClick={() => setPrice(val => (val?.slice(0, 5) + '0000').slice(0, 5) + '000')} className="px-4 shadow-lg cursor-pointer border-1 border-gray-300 hover:border-gray-400 hover:bg-gray-200 rounded-3xl flex gap-1"><p className="font-bold">{genPriceSuggest(price, '10')}</p> {isForSale ? 'triệu' : 'triệu/tháng'}</div>
        <div onClick={() => setPrice(val => (val?.slice(0, 5) + '0000').slice(0, 5) + '0000')} className="px-4 shadow-lg cursor-pointer border-1 border-gray-300 hover:border-gray-400 hover:bg-gray-200 rounded-3xl flex gap-1"><p className="font-bold">{genPriceSuggest(price, '100')}</p> {isForSale ? 'triệu' : 'triệu/tháng'}</div>
        <div onClick={() => setPrice(val => (val?.slice(0, 5) + '0000').slice(0, 5) + '00000')} className="px-4 shadow-lg cursor-pointer border-1 border-gray-300 hover:border-gray-400 hover:bg-gray-200 rounded-3xl flex gap-1"><p className="font-bold">{genPriceSuggest(price, '1')}</p> {isForSale ? 'tỷ' : 'tỷ/tháng'}</div>
        <div onClick={() => setPrice(val => (val?.slice(0, 5) + '0000').slice(0, 5) + '000000')} className="px-4 shadow-lg cursor-pointer border-1 border-gray-300 hover:border-gray-400 hover:bg-gray-200 rounded-3xl flex gap-1"><p className="font-bold">{genPriceSuggest(price, '10')}</p> {isForSale ? 'tỷ' : 'tỷ/tháng'}</div>
        {isForSale && (
          <div onClick={() => setPrice(val => (val?.slice(0, 5) + '0000').slice(0, 5) + '0000000')} className="px-4 shadow-lg cursor-pointer border-1 border-gray-300 hover:border-gray-400 hover:bg-gray-200 rounded-3xl flex gap-1"><p className="font-bold">{genPriceSuggest(price, '100')}</p> tỷ</div>
        )}
      </div>
      )}
      {price && (
        <div className="mt-4 flex gap-1">
          <p>Tổng giá trị: </p>
          <p className="font-bold">{formatVietnameseNumber(Number(price))} {isForSale ? '' : 'Đồng/Tháng'}</p>
          {isForSale && area && (
            <p>(~{get_price_per_square_meter(Number(price), Number(area))}/m²)</p>
          )}
        </div>
      )}
      <button onClick={() => {
        if (price && area && (propertType === 'Nhà Phố' || propertType === 'Biệt Thự' || propertType === 'Đất Nền' || propertType === 'Căn Hộ')) {
          if ((Number(area) <= 0) || (Number(area) > Number(price)) || (Number(area) > 1000000)) {
            setIsValidArea(false)
          } else if (Number(price) < 100000) {
            setIsValidPrice(false)
          } else {
            setInformationProp({ property_type: (propertType === 'Nhà Phố') ? 'townhouse' : (propertType === 'Biệt Thự') ? 'villa' : (propertType === 'Đất Nền') ? 'land' : 'apartment', price: Number(price), area: Number(area)})
          }
        }
      }} disabled={(price && area)? false : true} className="p-1 w-20 ml-auto bg-red-600 btn">Xong</button>
    </div>
  )
}


export default Information_component