'use client'
import { ProductType } from "@/types/product"
import { formatVietnameseNumber } from "@/components/listing/show_property/san_pham_ban_show_property"

interface Detail_infor_props {
  information_data: ProductType
}


const Detail_infor = ({ information_data }: Detail_infor_props) => {

  return (
    <div className="w-full h-auto flex flex-col gap-2">
      <h1 className="text-xl font-bold text-left">Thông Tin Mô Tả</h1>
      <p className="whitespace-pre-wrap pl-2">{information_data.discription}</p>
      <h1 className="text-xl font-bold text-left mt-6">Đặc Điểm Bất Động Sản</h1>
      <div className="flex flex-col lg:flex-row gap-0 lg:gap-4 2xl:gap-8">
        <div className="w-full">
          <div className="flex items-center justify-between border-y-1 border-gray-100 p-2">
            <div className="flex w-full gap-2 items-center">
              <img className="h-6 mb-1" src="/img/icons/dong.png" alt="" />
              <p className="w-full">Khoảng giá:</p>
            </div>
            <div className="w-full">
              <p>{formatVietnameseNumber(Number(information_data.price))}{(information_data.isForSale ? '' : '/Tháng')}</p>
            </div>
          </div>
          <div className="flex items-center justify-between border-y-1 border-gray-100 p-2">
            <div className="flex w-full gap-2 items-center">
              <img className="h-6 mb-1" src="/img/icons/shape.png" alt="" />
              <p className="w-full">Diện tích:</p>
            </div>
            <div className="w-full">
              <p>{information_data.area} m²</p>
            </div>
          </div>
          {(information_data.type !== 'land') && (
            <div className="flex items-center justify-between border-y-1 border-gray-100 p-2">
              <div className="flex w-full gap-2 items-center">
                <img className="h-6 mb-1.5" src="/img/icons/bed.png" alt="" />
                <p className="w-full">Phòng Ngủ:</p>
              </div>
              <div className="w-full">
                <p>{information_data.bedroom}</p>
              </div>
            </div>
          )}
          {(information_data.type !== 'land') && (
            <div className="flex items-center justify-between border-y-1 border-gray-100 p-2">
              <div className="flex w-full gap-2 items-center">
                <img className="h-6 mb-1.5" src="/img/icons/bathtub.png" alt="" />
                <p className="w-full">Phòng Tắm:</p>
              </div>
              <div className="w-full">
                <p>{information_data.bathroom}</p>
              </div>
            </div>
          )}
        </div>
        <div className="w-full">
          <div className="flex items-center justify-between border-y-1 border-gray-100 p-2">
            <div className="flex w-full gap-2 items-center">
              <img className="h-6 mb-1" src="/img/icons/google.png" alt="" />
              <p className="w-full">Pháp lý:</p>
            </div>
            {(information_data.policy) ? (
              <p className="w-full">{information_data.policy}</p>
            ) : (
              <p className="w-full">Đang cập nhật</p>
            )}
          </div>
          {(information_data.type !== 'land') && (
            <div className="flex items-center justify-between border-y-1 border-gray-100 p-2">
              <div className="flex w-full gap-2 items-center">
                <img className="h-6 mb-1" src="/img/icons/apartment.png" alt="" />
                <p className="w-full">Số tầng:</p>
              </div>
              {(information_data.numberOfFloors) ? (
                <p className="w-full">{information_data.numberOfFloors}</p>
              ) : (
                <p className="w-full">Đang cập nhật</p>
              )}
            </div>
          )}
          {(information_data.type !== 'land') && (
            <div className="flex items-center justify-between border-y-1 border-gray-100 p-2">
              <div className="flex w-full gap-2 items-center">
                <img className="h-6 mb-1" src="/img/icons/rest.png" alt="" />
                <p className="w-full">Nội thất:</p>
              </div>
              {(information_data.interior) ? (
                <p className="w-full">{information_data.interior}</p>
              ) : (
                <p className="w-full">Đang cập nhật</p>
              )}
            </div>  
          )}
          <div className="flex items-center justify-between border-y-1 border-gray-100 p-2">
            <div className="flex w-full gap-2 items-center">
              <img className="h-6 mb-1" src="/img/icons/road.png" alt="" />
              <p className="w-full">Lối vào:</p>
            </div>
            {(information_data.entranceWay) ? (
              <p className="w-full">{information_data.entranceWay}</p>
            ) : (
              <p className="w-full">Đang cập nhật</p>
            )}
          </div>           
    
        </div>
      </div>
    </div>
  )
}


export default Detail_infor