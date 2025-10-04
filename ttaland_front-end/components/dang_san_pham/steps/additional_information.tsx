'use client'
import Select_component from "@/components/utils/select_component"
import { useState } from "react"
interface Additional_information_props {
  property_type: 'Nhà Phố' | 'Biệt Thự' | 'Đất Nền' | 'Căn Hộ'
}


const Additional_information = ({property_type}: Additional_information_props) => {
  const [numberOfBedrooms, setNumberOfBedRoom] = useState<string>()
  const [numberOfBathRoooms, setNumberOfBathRoons] = useState<string>()
  console.log(numberOfBathRoooms, numberOfBedrooms)
  return (
    <div>
      {property_type === 'Đất Nền' ? (
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
                <input className="w-full outline-0 border-1 border-gray-400 hover:border-gray-700 focus:border-gray-700 hover:bg-gray-100 focus:bg-gray-100 rounded-3xl py-2 px-4 shadow-lg" placeholder="VD: có sổ hồng " type="text" name="" id="" />
              </div>
              <div className="w-full">
                <p>Kết cấu</p>
                <input className="w-full outline-0 border-1 border-gray-400 hover:border-gray-700 focus:border-gray-700 hover:bg-gray-100 focus:bg-gray-100 rounded-3xl py-2 px-4 shadow-lg" placeholder="VD: tuổi thọ kết cấu 100 năm " type="text" name="" id="" />
              </div>
              <div className="w-full">
                <p>Nội thất:</p>
                <input className="w-full outline-0 border-1 border-gray-400 hover:border-gray-700 focus:border-gray-700 hover:bg-gray-100 focus:bg-gray-100 rounded-3xl py-2 px-4 shadow-lg" placeholder="VD: nội thất sang trọng " type="text" name="" id="" />
              </div>
              <div className="w-full">
                <p>Đường vào:</p>
                <input className="w-full outline-0 border-1 border-gray-400 hover:border-gray-700 focus:border-gray-700 hover:bg-gray-100 focus:bg-gray-100 rounded-3xl py-2 px-4 shadow-lg" placeholder="VD: hẻm rộng 2m " type="text" name="" id="" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Additional_information