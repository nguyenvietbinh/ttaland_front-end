'use client'
import { useEffect, useState } from "react"
import Sale_or_rent from "./steps/sale_or_rent"
import Select_location from "./steps/select_location"
import Discribe_component from "./steps/discribe"
import Information_component from "./steps/information"
import { CustomGeoJSON } from "./steps/select_location_on_map"
import Additional_information from "./steps/additional_information"
import { point, booleanPointInPolygon } from '@turf/turf';
import rawData from '@/public/data/hcm.json';
const HCMGeoJSON = rawData as CustomGeoJSON;


export interface Information {
  property_type: 'Nhà Phố' | 'Biệt Thự' | 'Đất Nền' | 'Căn Hộ'
  price: string
  area: string
}

export interface Discribe {
  title: string
  images: File[]
  video?: string
  discribe: string
}


const Dang_san_pham_container = () => {
  const [step, setStep] = useState<number>(0)
  const [isForSale, setIsForSale] = useState<boolean>(false)
  const [isForRent, setIsForRent] = useState<boolean>(false)
  const [location, setLocation] = useState<string>()
  const [coordinate, setCoordinate] = useState<[number, number]>()
  const [Information, setInformation] = useState<Information>()
  const [discribeData, setDiscribeData] = useState<Discribe>()

  const moveBack = (targetStep: number, currentStep: number) => {
    if (targetStep < currentStep) {
      setStep(targetStep)
      if (targetStep === 3) {
        setDiscribeData(undefined)
      } else if (targetStep === 2) {
        setDiscribeData(undefined)
        setInformation(undefined)
      } else if (targetStep === 1) {
        setDiscribeData(undefined)
        setInformation(undefined)
        setLocation(undefined)
        setCoordinate(undefined)
      } else if (targetStep === 0) {
        setDiscribeData(undefined)
        setIsForRent(false)
        setIsForSale(false)
        setLocation(undefined)
        setCoordinate(undefined)
        setInformation(undefined)
      }
    }
  }

  useEffect(() => {
    let stepCount = 0
    if (isForRent || isForSale) {
      stepCount ++
      if ((coordinate && location)) {
        for (let i = 0; i < HCMGeoJSON.features.length; i ++) {
          if (HCMGeoJSON.features[i].properties.name === location && booleanPointInPolygon(point(coordinate), HCMGeoJSON.features[i].geometry.geometries[0])) {
            stepCount ++
            if (Information) {
              stepCount ++
                if (discribeData) {
                  stepCount ++
                }
            }
          }
        }
      }
    }
    setStep(stepCount)
  }, [isForRent, isForSale, coordinate, location, Information, discribeData])


  return (
    <div className="">
      <div className="w-full">
        <ul className="steps w-full steps-vertical lg:steps-horizontal my-8 text-black">
          <li onClick={() => moveBack(0, step)} className={`step ${step >= 0 ? 'step-primary cursor-pointer' : ''}`}>{isForRent ? 'Cho thuê' : (isForSale) ? 'Bán': 'Nhu cầu'}</li>
          <li onClick={() => moveBack(1, step)} className={`step ${step >= 1 ? 'step-primary cursor-pointer' : ''}`}>{ location ? location : 'Vị trí' }</li>
          <li onClick={() => moveBack(2, step)} className={`step ${step >= 2 ? 'step-primary cursor-pointer' : ''}`}>{Information ? Information.property_type : 'Thông tin chính'}</li>
          <li onClick={() => moveBack(3, step)} className={`step ${step >= 3 ? 'step-primary cursor-pointer' : ''}`}>Mô tả & Hình ảnh</li>
          <li onClick={() => moveBack(4, step)} className={`step ${step >= 4 ? 'step-primary cursor-pointer' : ''}`}>Thông tin thêm</li>
        </ul>
      </div>
      <div className="w-2/3 mx-auto px-4 py-6 mt-10 rounded-3xl bg-white text-black flex flex-col gap-6">
        {step === 0 && (
          <Sale_or_rent isForRent={isForRent} isForSale={isForSale} setIsForRent={setIsForRent} setIsForSale={setIsForSale}/>
        )}
        {step === 1 && (
          <Select_location setCoordinateProps={setCoordinate} setLocation={setLocation}/>
        )}
        {step === 2 && (
          <Information_component isForSale={isForSale} setInformationProp={setInformation}/>
        )}
        {step === 3 && (
          <Discribe_component setData={setDiscribeData}/>
        )}
        {step === 4 && Information && (
          <Additional_information property_type={Information.property_type}/>
        )}
      </div>
    </div>
  )
}



export default Dang_san_pham_container