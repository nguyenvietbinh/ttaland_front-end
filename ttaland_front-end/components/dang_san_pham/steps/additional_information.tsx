'use client'
import Select_component from "@/components/utils/select_component"
import { useState } from "react"
import { AdditionalInformation } from "../dang_san_pham_container"


interface Additional_information_props {
  property_type: 'townhouse' | 'villa' | 'land' | 'apartment'
  setAdditionalInfo: (val: AdditionalInformation) => void
}


const Additional_information = ({property_type, setAdditionalInfo}: Additional_information_props) => {
  const [numberOfBedrooms, setNumberOfBedRoom] = useState<string>('1')
  const [numberOfBathRoooms, setNumberOfBathRoons] = useState<string>('1')
  const [policy, setPolicy] = useState<string>()
  const [numberOfFloors, setNumberOfFloors] = useState<string>()
  const [interior, setInterior] = useState<string>()
  const [entranceWay, setEntranceWay] = useState<string>()
  return (
    <div>
      {property_type === 'land' ? (
          <div className="flex flex-col">
            <div className="grid grid-cols-2 gap-4 border-gray-200 border-1 p-2 pb-8 rounded-2xl">
              <div className="w-full">
                <p>Pháp lí:</p>
                <input className="w-full outline-0 border-1 border-gray-400 hover:border-gray-700 focus:border-gray-700 hover:bg-gray-100 focus:bg-gray-100 rounded-3xl py-2 px-4 shadow-lg" placeholder="VD: có sổ hồng " type="text" name="" id="" />
              </div>
              <div className="w-full">
                <p>Đường vào:</p>
                <input className="w-full outline-0 border-1 border-gray-400 hover:border-gray-700 focus:border-gray-700 hover:bg-gray-100 focus:bg-gray-100 rounded-3xl py-2 px-4 shadow-lg" placeholder="VD: hẻm rộng 2m " type="text" name="" id="" />
              </div>
            </div>
            <button onClick={() => setAdditionalInfo({
              policy: policy,
              entranceWay: entranceWay
            })} className="p-1 w-full mt-8 text-xl bg-red-600 btn">Đăng bài</button>
          </div>
      ): (
        <div className="flex flex-col gap-8">
          <div className="flex flex-col">
            <div className="flex w-full justify-between gap-4 border-gray-200 border-1 p-2 pb-8 rounded-2xl">
              <div className="w-full">
                Số phòng ngủ:
                <Select_component options={['1', '2', '3', '4', '5', '5+']} default_value="1" setData={setNumberOfBedRoom}/>
              </div>
              <div className="w-full">
                Số phòng tắm, vệ sinh:
                <Select_component options={['1', '2', '3', '4', '5', '5+']} default_value="1" setData={setNumberOfBathRoons}/>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-gray-800">Thông tin khác (không bắt buộc)</p>
            <div className="grid grid-cols-2 gap-4 border-gray-200 border-1 p-2 pb-8 rounded-2xl">
              <div className="w-full">
                <p>Pháp lí:</p>
                <input onChange={(e) => setPolicy(e.target.value)} className="w-full outline-0 border-1 border-gray-400 hover:border-gray-700 focus:border-gray-700 hover:bg-gray-100 focus:bg-gray-100 rounded-3xl py-2 px-4 shadow-lg" placeholder="VD: có sổ hồng " type="text" name="" id="" />
              </div>
              <div className="w-full">
                <p>Số tầng</p>
                <input onChange={(e) => setNumberOfFloors(e.target.value)} className="w-full outline-0 border-1 border-gray-400 hover:border-gray-700 focus:border-gray-700 hover:bg-gray-100 focus:bg-gray-100 rounded-3xl py-2 px-4 shadow-lg" placeholder="VD: 2 tầng sinh hoạt + 1 tầng thượng " type="text" name="" id="" />
              </div>
              <div className="w-full">
                <p>Nội thất:</p>
                <input onChange={(e) => setInterior(e.target.value)} className="w-full outline-0 border-1 border-gray-400 hover:border-gray-700 focus:border-gray-700 hover:bg-gray-100 focus:bg-gray-100 rounded-3xl py-2 px-4 shadow-lg" placeholder="VD: nội thất sang trọng " type="text" name="" id="" />
              </div>
              <div className="w-full">
                <p>Đường vào:</p>
                <input onChange={(e) => setEntranceWay(e.target.value)} className="w-full outline-0 border-1 border-gray-400 hover:border-gray-700 focus:border-gray-700 hover:bg-gray-100 focus:bg-gray-100 rounded-3xl py-2 px-4 shadow-lg" placeholder="VD: hẻm rộng 2m " type="text" name="" id="" />
              </div>
            </div>
            <button onClick={() => setAdditionalInfo({
              bedroom: numberOfBedrooms,
              bathroom: numberOfBathRoooms,
              policy: policy,
              numberOfFloors: numberOfFloors,
              interior: interior,
              entranceWay: entranceWay
            })} className="p-1 w-full mt-8 text-xl bg-red-600 btn">Đăng bài</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Additional_information