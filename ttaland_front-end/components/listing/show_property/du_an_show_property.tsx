'use client'

import { useEffect, useState } from "react"



const Du_an_property = () => {
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





      <div className="px-2 pt-4 text-black rounded-lg overflow-hidden shadow-md">

        {/* info */}
        <div className=" cursor-pointer">
          <h1 className="font-bold text-xl">QUỸ CĂN GIÁ RẺ NHẤT TẠI VINHOMES WONDER CITY CÓ HỘI VÀNG CHỈ 150 TRIỆU/M2</h1>
          <div className="flex flex-wrap mt-2 gap-2 mb-3">
              <span className="bg-blue-200 text-red-600 px-2 py-0.5 rounded text-lg font-bold">13,2 Triệu/m²</span>
              <span className="bg-blue-200 text-red-600 px-2 py-0.5 rounded text-lg font-bold">88 m²</span>
              <span className="bg-blue-200 px-2 py-0.5 rounded text-md font-medium">Đan Phượng, Hà Nội</span>
          </div>
          <div className="wrap-break-word line-clamp-2 text-gray-700">
          Gia đình cần tiền gấp, bán nhanh căn nhà ở ngõ 72 Nguyễn Trãi giá 12,5 Tỷ, có thương lượng-Diện tích 38.5m sổ vuông vắn Gia đình cần tiền gấp, bán nhanh căn nhà ở ngõ 72 Nguyễn Trãi giá 12,5 Tỷ, có thương lượng-Diện tích 38.5m sổ vuông vắn Gia đình cần tiền gấp, bán nhanh căn nhà ở ngõ 72 Nguyễn Trãi giá 12,5 Tỷ, có thương lượng-Diện tích 38.5m sổ vuông vắn....
          </div>
        </div>
        
        
        {/* contact */}
        <div className="border-t-[1px] border-gray-400 p-2 flex items-center justify-between">
          <div className="flex items-center cursor-pointer group">
            <div className="bg-red-300 rounded-full w-10 h-10 flex items-center justify-center mr-2">
              <span className="font-bold">A</span>
            </div>
            <div className="flex-col ">
              <p className="text-gray-800 text-xl group-hover:underline">Nguyễn Văn A</p>
              <p className="text-gray-400 text-sm">Đăng hôm nay</p>
            </div>
          </div>
          <div className="text-right flex gap-2 px-2 cursor-pointer bg-gray-700 border-none text-white rounded-sm p-1 items-center group">
            <img className="h-4" src="/img/icons/contact.png" alt="" />
            <p className="">0989 790 ***</p>
            <p>·</p>
            <p className="group-hover:underline">Hiện số</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Du_an_property