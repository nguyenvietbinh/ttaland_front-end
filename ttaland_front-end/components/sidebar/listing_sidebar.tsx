'use client'
import { useEffect, useState } from 'react'
import location from '../dang_san_pham/location.json'

interface Listing_sidebar_props {
  for_sale: boolean
  setPriceConditionLstProp: (val: string[]) => void
  setAreaConditionLstProp: (val: string[]) => void
  setLocationConditionLstProp: (val: string[]) => void
}

const Listing_sidebar = ({for_sale, setPriceConditionLstProp, setAreaConditionLstProp, setLocationConditionLstProp}: Listing_sidebar_props) => {
  const for_sale_price_range_lable = {
    '< 500 triệu': '< 500000000',
    '500 - 800 triệu': '500000000 - 800000000',
    '800 triệu - 1 tỷ': '800000000 - 1000000000',
    '1 - 2 tỷ': '1000000000 - 2000000000',
    '2 - 3 tỷ': '2000000000 - 3000000000',
    '3 - 5 tỷ': '3000000000 - 5000000000',
    '5 - 7 tỷ': '5000000000 - 7000000000',
    '7 - 10 tỷ': '7000000000 - 10000000000',
    '10 - 20 tỷ': '10000000000 - 20000000000',
    '20 - 30 tỷ': '20000000000 - 30000000000',
    '30 - 40 tỷ': '30000000000 - 40000000000',
    '40 - 60 tỷ': '40000000000 - 60000000000',
    '> 60 tỷ': '> 60000000000'
  }
  const rental_price_range_lable = {
    '< 5 triệu/tháng': '< 5000000',
    '5 - 10 triệu/tháng': '5000000 - 10000000',
    '10 - 15 triệu/tháng': '10000000 - 15000000',
    '15 - 25 triệu/tháng': '15000000 - 25000000',
    '25 - 40 triệu/tháng': '25000000 - 40000000',
    '40 - 60 triệu/tháng': '40000000 - 60000000',
    '60 - 100 triệu/tháng': '60000000 - 100000000',
    '100 - 150 triệu/tháng': '100000000 - 15000000',
    '150 - 250 triệu/tháng': '150000000 - 250000000',
    '250 - 500 triệu/tháng': '250000000 - 500000000',
    '> 500 triệu/tháng': '> 500000000'
  }
  const area_range_lable = ['< 30 m²', '30 - 50 m²', '50 - 70 m²', '70 - 100 m²', '100 - 150 m²', '150 - 200 m²', '200 - 250 m²', '250 - 300 m²', '300 - 500 m²', '> 500 m²']
  const [priceConditionLst, setPriceConditionLst] = useState<string[]>([])
  const [areaConditionLst, setAreaConditionLst] = useState<string[]>([])
  const [locationConditionLst, setLocationConditionLst] = useState<string[]>([])


  const handleCheckedPriceCondition = (item: string, checked: boolean) => {
    if (checked) {
      setPriceConditionLst(preVal => [...preVal, item])
    } else {
      setPriceConditionLst(preVal => preVal.filter(checkedItem => checkedItem !== item))
    }
  }
  const handleCheckedAreaCondition = (item: string, checked: boolean) => {
    if (checked) {
      setAreaConditionLst(preVal => [...preVal, item])
    } else {
      setAreaConditionLst(preVal => preVal.filter(checkedItem => checkedItem !== item))
    }
  }
  const handleCheckedLocationCondition = (item: string, checked: boolean) => {
    if (checked) {
      setLocationConditionLst(preVal => [...preVal, item])
    } else {
      setLocationConditionLst(preVal => preVal.filter(checkedItem => checkedItem !== item))
    }
  }

  useEffect(() => {
    setLocationConditionLstProp(locationConditionLst)
  }, [locationConditionLst])

  useEffect(() => {
    setAreaConditionLstProp(areaConditionLst)
  }, [areaConditionLst])

  useEffect(() => {
    setPriceConditionLstProp(priceConditionLst)
  }, [priceConditionLst])



  return (
    <div className="sidebar_container gap-8">
      <div className="flex flex-col gap-2 p-4 rounded-lg border-gray-100 shadow-sm">
        <p className="text-xl font-bold mb-2">Lọc theo khoảng giá</p>
        {for_sale ? (
          <div className='flex-col flex gap-2'>
            {Object.entries(for_sale_price_range_lable).map(([label, value], index) => (
              <label key={index} className="label items-center">
                <input onChange={(e) => handleCheckedPriceCondition(value, e.target.checked)} type="checkbox" className="checkbox mb-1 checkbox-sm bg-gray-200 checked:bg-gray-200 text-gray-700" />
                <p className='text-black'>{label}</p>
              </label>
            ))}
          </div>
        ) : (
          <div className='flex-col flex gap-2'>
            {Object.entries(rental_price_range_lable).map(([label, value], index) => (
              <label key={index} className="label items-center">
                <input onChange={(e) => handleCheckedPriceCondition(value, e.target.checked)} type="checkbox" className="checkbox mb-1 checkbox-sm bg-gray-200 checked:bg-gray-200 text-gray-700" />
                <p className='text-black'>{label}</p>
              </label>
            ))}        
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 p-4 rounded-lg border-gray-100 shadow-sm">
        <p className="text-xl font-bold mb-2">Lọc theo diện tích</p>
        {area_range_lable.map((item, index) => (
          <label key={index} className="label items-center">
            <input onChange={(e) => handleCheckedAreaCondition(item, e.target.checked)} type="checkbox" className="checkbox mb-1 checkbox-sm bg-gray-200 checked:bg-gray-200 text-gray-700" />
            <p className='text-black'>{item}</p>
          </label>   
        ))}      
      </div>
      <div className="flex flex-col gap-2 p-4 rounded-lg border-gray-100 shadow-sm">
        <p className="text-xl font-bold mb-2">Lọc theo vị trí</p>
        {location.district.map((item, index) => (
          <label key={index} className="label items-center">
            <input onChange={(e) => handleCheckedLocationCondition(item, e.target.checked)} type="checkbox" className="checkbox mb-1 checkbox-sm bg-gray-200 checked:bg-gray-200 text-gray-700" />
            <p className='text-black'>{item}</p>
          </label>   
        ))} 
      </div>
    </div>
  )
}


export default Listing_sidebar