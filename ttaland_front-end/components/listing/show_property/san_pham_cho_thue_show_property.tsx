'use client'

import { useEffect, useState } from "react"



const San_pham_cho_thue_property = () => {
  const [numberOfImg, setNumberOfImg] = useState<number>(0)
  const [listOfImg, setListOfImg] = useState<number[]>([])

  const getRandomNumber = (x: number, y: number) => {
    return Math.floor(Math.random() * (y - x + 1)) + x
  }

    useEffect(() => {
    const randomNum = getRandomNumber(4, 9)
    setNumberOfImg(randomNum)

    const uniqueNumbers = new Set<number>()
    while (uniqueNumbers.size < randomNum) {
      uniqueNumbers.add(getRandomNumber(0, 9))
    }
    setListOfImg(Array.from(uniqueNumbers))
  }, [])



  return (
    <div className="bg-gray-200 h-auto border-[1px] border-gray-400 hover:border-gray-200 rounded-sm">
      <div className="w-full h-80 rounded-sm gap-[2px] flex overflow-hidden">
        <div className="h-full w-2/3 overflow-hidden cursor-pointer">
          <img className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" src={`/img/example/showcase${listOfImg[0]}.jpg`} alt="" />
        </div>
        <div className="w-1/3 h-full flex-col space-y-[2px] overflow-hidden cursor-pointer">
          <div className="w-full h-1/2 overflow-hidden">
            <img className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" src={`/img/example/showcase${listOfImg[1]}.jpg`} alt="" />
          </div>
          <div className="w-full relative h-1/2 cursor-pointer">
            <div className="w-full h-full absolute bg-black/50 transition-all duration-200 hover:bg-black/80 flex justify-center items-center">
              <div className="flex gap-1 items-center">
                <p>{numberOfImg - 3}+</p>
              </div>
            </div>
            <img className="w-full h-full object-cover" src={`/img/example/showcase${listOfImg[2]}.jpg`} alt="" />
          </div>
        </div>
      </div>
        <div className="text-black p-4 cursor-pointer flex-col space-y-2">
          <p className="font-bold text-center">Cho thuê Biệt Thự Q2, căn góc 2 mặt tiền đường Ven Sông Sài Gòn, View trực diện Landmark 81 và Q. 1</p>
          <div className="flex justify-end gap-2 text-lg">
            <p className="">Giá: 10 tỷ</p>
            <p>-</p>
            <p className="">Diện Tích: 100 m²</p>
            <p>-</p>
            <p>Vị Trí: blablablal</p>
          </div>
        </div>
    </div>
  )
}

export default San_pham_cho_thue_property