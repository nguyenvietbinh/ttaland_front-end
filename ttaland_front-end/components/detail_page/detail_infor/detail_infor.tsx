'use client'


export type detail_infor = {
  price: string,
  area: string,
  policy?: string,
  location: string,
  structure?: string,
  bedrooms?: number,
  bathrooms?: number,
  interior?: string,
  description: string,
  latitude: string,
  longitude: string,
  road_frontage_formatted?: string,
}

interface Detail_infor_props {
  information_data: detail_infor
}


const Detail_infor = ({ information_data }: Detail_infor_props) => {

  return (
    <div className="w-full h-auto flex flex-col gap-2">
      <h1 className="text-xl font-bold text-left">Thông Tin Mô Tả</h1>
      <p className="whitespace-pre-wrap pl-2">{information_data.description}</p>
      <h1 className="text-xl font-bold text-left mt-6">Đặc Điểm Bất Động Sản</h1>
      <div className="flex flex-col lg:flex-row gap-0 lg:gap-4 2xl:gap-8">
        <div className="w-full">
          <div className="flex items-center justify-between border-y-1 border-gray-100 p-2">
            <div className="flex w-full gap-2 items-center">
              <img className="h-6 mb-1" src="/img/icons/dong.png" alt="" />
              <p className="w-full">Khoảng giá:</p>
            </div>
            <div className="w-full">
              <p>{information_data.price}</p>
            </div>
          </div>
          <div className="flex items-center justify-between border-y-1 border-gray-100 p-2">
            <div className="flex w-full gap-2 items-center">
              <img className="h-6 mb-1" src="/img/icons/shape.png" alt="" />
              <p className="w-full">Diện tích:</p>
            </div>
            <div className="w-full">
              <p>{information_data.area}</p>
            </div>
          </div>
          {information_data.bedrooms && (
            <div className="flex items-center justify-between border-y-1 border-gray-100 p-2">
              <div className="flex w-full gap-2 items-center">
                <img className="h-6 mb-1.5" src="/img/icons/bed.png" alt="" />
                <p className="w-full">Phòng Ngủ:</p>
              </div>
              <div className="w-full">
                <p>{information_data.bedrooms}</p>
              </div>
            </div>
          )}
          {information_data.bathrooms && (
            <div className="flex items-center justify-between border-y-1 border-gray-100 p-2">
              <div className="flex w-full gap-2 items-center">
                <img className="h-6 mb-1.5" src="/img/icons/bathtub.png" alt="" />
                <p className="w-full">Phòng Tắm:</p>
              </div>
              <div className="w-full">
                <p>{information_data.bathrooms}</p>
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
          {information_data.bedrooms && (
            <div className="flex items-center justify-between border-y-1 border-gray-100 p-2">
              <div className="flex w-full gap-2 items-center">
                <img className="h-6 mb-1" src="/img/icons/apartment.png" alt="" />
                <p className="w-full">Cấu trúc:</p>
              </div>
              {(information_data.structure) ? (
                <p className="w-full">{information_data.structure}</p>
              ) : (
                <p className="w-full">Đang cập nhật</p>
              )}
            </div>
          )}
          {information_data.bedrooms && (
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
            {(information_data.road_frontage_formatted) ? (
              <p className="w-full">{information_data.road_frontage_formatted}</p>
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