'use client'

import { useEffect, useState } from "react"
import Link from "next/link"

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

  const urlToDetail = () => {
    return `/du_an/chi_tiet?id=${listOfImg.join('')}`
  }



  return (
    <div className="bg-gray-200 h-auto border-[1px] border-white hover:shadow-md rounded-sm">
      <Link className="w-full h-80 rounded-sm gap-[2px] flex overflow-hidden" href={urlToDetail()}>
        <div className="h-full relative md:w-2/3 w-full overflow-hidden cursor-pointer">
          <img className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" src={`/img/example/showcase${listOfImg[0]}.jpg`} alt="" />
          <div className="absolute bg-black/50 p-1 rounded-sm right-2 bottom-2 md:hidden">{numberOfImg - 1}+</div>
        </div>
        <div className="w-1/3 h-full hidden md:block flex-col space-y-[2px] overflow-hidden cursor-pointer">
          <div className="w-full h-1/2 overflow-hidden">
            <img className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" src={`/img/example/showcase${listOfImg[1]}.jpg`} alt="" />
          </div>
          <div className="w-full relative h-1/2 cursor-pointer">
            <div className="w-full h-full absolute bg-black/50 transition-all duration-200 hover:bg-black/80 flex justify-center items-center">
              <div className="flex gap-1 items-center text-white">
                <p>{numberOfImg - 3}+</p>
              </div>
            </div>
            <img className="w-full h-full object-cover" src={`/img/example/showcase${listOfImg[2]}.jpg`} alt="" />
          </div>
        </div>
      </Link>


 



      <div className="px-2 pt-4 text-black">

        {/* info */}
        <div className="">
          <Link className="font-bold text-2xl cursor-pointer hover:underline wrap-break-word line-clamp-2" href={urlToDetail()}>QUỸ CĂN GIÁ RẺ NHẤT TẠI VINHOMES WONDER CITY CÓ HỘI VÀNG CHỈ 150 TRIỆU/M2</Link>
          <div className="grid md:grid-cols-3 grid-cols-2 py-3 gap-2 text-left text-xl text-nowrap border-y-[1px] font-bold border-gray-600">
            <div className="flex items-center gap-1">
              <img src="/img/icons/sqr.png" alt="" className="h-6 hidden md:block"/>
              <p className="">Quy Mô:</p>
              <p className="overflow-auto no-scrollbar">3.75 ha</p>
            </div>
            <div className="flex items-center gap-1">
              <img src="/img/icons/clock.png" alt="" className="h-6 hidden md:block"/>
              <p className="">Bàn giao:</p>
              <p className="overflow-auto no-scrollbar">Quý 4/2025</p>
            </div>
            <div className="flex items-center gap-1">
              <img src="/img/icons/rule.png" alt="" className="h-6 hidden md:block"/>
              <p className="">Pháp lý:</p>
              <p className="overflow-auto no-scrollbar">Sổ hồng riêng</p>
            </div>
            <div className="flex items-center gap-1">
              <img src="/img/icons/houses.png" alt="" className="h-6 hidden md:block"/>
              <p className=""> Số lượng:</p>
              <p className="overflow-auto no-scrollbar">199 Căn</p>
            </div>
            <div className="flex items-center gap-1 ">
              <img src="/img/icons/house.png" alt="" className="h-6 hidden md:block"/>
              <p className="">Loại hình:</p>
              <p className="overflow-auto no-scrollbar">Nhà phố, Shophouse</p>
            </div>
            <div className="flex items-center gap-1 tooltip cursor-pointer tooltip-bottom" data-tip="Xem bản đồ">
              <img src="/img/icons/loc.png" alt="" className="h-6 hidden md:block"/>
              <p className="overflow-auto no-scrollbar">Đường Hoàng Phan Thái, Mỹ Yên, Bến Lức, Long An</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between w-full my-3 items-center">
          <Link className="btn bg-black text-white w-[80%] md:w-[90%]" href={urlToDetail()}>Thông tin thêm</Link>
          <div className="w-[20%] md:w-[10%] cursor-pointer">
            <img src="/img/icons/heart.png" alt="" className="h-8 mx-auto"/>
          </div>
        </div>  
      </div>
    </div>
  )
}

export default Du_an_property