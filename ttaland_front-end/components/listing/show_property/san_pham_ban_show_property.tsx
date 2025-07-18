'use client'

import { useEffect, useState } from "react"
import { useRouter, usePathname } from 'next/navigation'
import NProgress from 'nprogress'



const San_pham_ban_property = () => {
  const router = useRouter()
  const pathname = usePathname()
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

  const handleNavigateToDetail = () => {
    const currentPath = pathname
    const detailPath = `${currentPath}/chi_tiet?id=${listOfImg.join('')}`
    NProgress.start()
    router.push(detailPath)
  }

  return (
    <div className="bg-gray-200 h-auto border-[1px] border-gray-400 hover:border-gray-200 rounded-sm">
      <div className="w-full h-80 rounded-sm gap-[2px] flex overflow-hidden" onClick={handleNavigateToDetail}>
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





      <div className="px-2 pt-4 text-black">

        {/* info */}
        <div className="">
          <h1 className="font-bold text-xl cursor-pointer hover:underline" onClick={handleNavigateToDetail}>QUỸ CĂN GIÁ RẺ NHẤT TẠI VINHOMES WONDER CITY CÓ HỘI VÀNG CHỈ 150 TRIỆU/M2</h1>
          <div className="grid grid-cols-3 gap-2 py-3 text-left text-lg text-nowrap border-y-[1px] font-bold border-gray-600">
            <div className="flex items-center gap-1">
              <img src="/img/icons/sqr.png" alt="" className="h-6 hidden md:block"/>
              <p className="">Diện tích:</p>
              <p className="overflow-auto no-scrollbar"> 100 m²</p>
            </div>
            <div className="flex items-center gap-1">
              <img src="/img/icons/car.png" alt="" className="h-6 hidden md:block"/>
              <p className="">Garage:</p>
              <p className="overflow-auto no-scrollbar">1</p>
            </div>
            <div className="flex items-center gap-1">
              <img src="/img/icons/vnd.png" alt="" className="h-6 hidden md:block"/>
              <p className="">Giá:</p>
              <p className="overflow-auto no-scrollbar">1 Tỷ</p>
            </div>
            <div className="flex items-center gap-1">
              <img src="/img/icons/bed.png" alt="" className="h-6 hidden md:block"/>
              <p className="">Phòng ngủ:</p>
              <p className="overflow-auto no-scrollbar">4</p>
            </div>
            <div className="flex items-center gap-1">
              <img src="/img/icons/bath.png" alt="" className="h-6 hidden md:block"/>
              <p className="">Phòng tắm:</p>
              <p className="overflow-auto no-scrollbar">3</p>
            </div>
            <div className="flex items-center gap-1">
              <img src="/img/icons/loc.png" alt="" className="h-6 hidden md:block"/>
              <p className="overflow-auto no-scrollbar">Phường 2, Thủ Đức</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between w-full my-3 items-center">
          <div className="btn w-[90%]" onClick={handleNavigateToDetail}>Thông tin thêm</div>
          <div className="w-[10%] cursor-pointer tooltip " data-tip="Quan tâm sản phẩm này">
            <img src="/img/icons/heart.png" alt="" className="h-8 mx-auto"/>
          </div>
        </div>  
      </div>
    </div>
  )
}

export default San_pham_ban_property