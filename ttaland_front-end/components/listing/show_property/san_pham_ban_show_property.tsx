'use client'

import Link from "next/link"
import { ShowProperty, TownhouseShowProperty, VillaShowProperty, ApartmentShowProperty } from '@/types/product'


interface San_pham_ban_propertyProps {
  property: ShowProperty
}



const San_pham_ban_property = ({ property }: San_pham_ban_propertyProps) => {

  const urlToDetail = () => {
    return `/san_pham_ban/chi_tiet?id=${property?.id}`
  }

  function formatNumber(value: number, unit: string) {
    // Làm tròn đến 1 chữ số thập phân nếu cần
    if (Math.abs(value) >= 10) {
        // Nếu giá trị >= 10, làm tròn đến số nguyên
        return Math.round(value) + ' ' + unit;
    } else {
        // Nếu giá trị < 10, làm tròn đến 1 chữ số thập phân
        const rounded = Math.round(value * 10) / 10;
        
        // Kiểm tra nếu là số nguyên thì không hiển thị phần thập phân
        if (rounded === Math.floor(rounded)) {
            return Math.round(value) + ' ' + unit;
        } else {
            return rounded.toFixed(1).replace('.', ',') + ' ' + unit;
        }
    }
}

  const get_price_per_square_meter = (price: number, area: number) => {
    const price_per_square_meter = price/area

        if (Math.abs(price_per_square_meter) >= 1000000000) {
        // Tỷ
        const ty = price_per_square_meter / 1000000000;
        return formatNumber(ty, 'tỷ');
    } else if (Math.abs(price_per_square_meter) >= 1000000) {
        // Triệu
        const trieu = price_per_square_meter / 1000000;
        return formatNumber(trieu, 'tr');
    } else if (Math.abs(price_per_square_meter) >= 1000) {
        // Nghìn
        const nghin = price_per_square_meter / 1000;
        return formatNumber(nghin, 'k');
    } else {
        // Dưới 1000
        return Math.round(price_per_square_meter).toString();
    }
  }

  console.log(property)

  const garage = ((property as TownhouseShowProperty)?.garage || (property as VillaShowProperty)?.garage || 0)
  const bedrooms = ((property as TownhouseShowProperty)?.bedrooms || (property as VillaShowProperty)?.bedrooms || (property as ApartmentShowProperty)?.bedrooms || 0)
  const bathrooms = ((property as TownhouseShowProperty)?.bathrooms || (property as VillaShowProperty)?.bathrooms || (property as ApartmentShowProperty)?.bathrooms || 0) 

  return (
    <Link href={urlToDetail()} className="bg-gray-200 h-auto border-[1px] m-1  border-white hover:shadow-md rounded-sm">
      <div className="w-full h-80 rounded-sm gap-[2px] flex overflow-hidden">
        <div className="h-full relative md:w-2/3 w-full overflow-hidden ">
          <img className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" src={(property)?.main_images![0]} alt={property.title} />
        </div>
        <div className="w-1/3 h-full hidden md:block flex-col space-y-[2px] overflow-hidden ">
          <div className="w-full h-1/2 overflow-hidden">
            <img className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" src={(property)?.main_images![1]} alt={property.title} />
          </div>
          <div className="w-full relative h-1/2  overflow-hidden">
            <img className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" src={(property)?.main_images![2]} alt={property.title} />
          </div>
        </div>
      </div>

      <div className="px-2 pt-2 text-black">
        {/* info */}
        <div className="">
          <div className="font-bold hover:underline text-3xl  wrap-break-word line-clamp-1">
            {property.title}
          </div>
          <div className="flex justify-start gap-2 mb-2 items-baseline">
            <p className="text-red-600 font-extrabold text-2xl">{property.area_formatted}</p> <div className="text-gray-400">·</div>
            <p className="text-red-600 font-extrabold text-2xl">{property.price_formatted}</p> <div className="text-gray-400">·</div>
            <p className="">{get_price_per_square_meter(Number(property.price), Number(property.area))}/m²</p> <div className="text-gray-400">·</div>
            {(bedrooms > 0) && (
              <p className="flex items-baseline"><img src="/img/icons/bed.png" className="h-4" alt="" />{bedrooms}</p>
            )}
            {(bedrooms > 0) && (
              <div className="text-gray-400">·</div>
            )}
            {(bathrooms > 0) && (
              <p className="flex items-baseline gap-0.5"><img src="/img/icons/bath.png" className="h-3.5" alt="" />{bathrooms}</p>
            )}
            {(bathrooms > 0) && (
              <div className="text-gray-400">·</div>
            )}
            {(garage > 0) && (
              <p className="flex items-baseline gap-1"><img src="/img/icons/car.png" className="h-4.5" alt="" />{garage}</p>
            )}
            {(garage > 0) && (
              <div className="text-gray-400">·</div>
            )}
            <p className=''>{property.location.split(',').slice(-2)[0]},{property.location.split(',').slice(-2)[1]}</p>
          </div>
          <div className="mb-2 text-sm line-clamp-2">Biệt thự nguyên căn gồm phòng ngủ lớn phòng ngủ nhỏ,thự nguyên căn gồm: - 4 phòng ngủ lớn + 1 phòng ngủ nhỏ, 5 toilet tiện nghi. - 2 khu bếp ăn trong tiện nghi. - 2 khu bếp ăn trong thự nguyên căn gồm: - 4 phòng ngủ lớn + 1 phòng ngủ nhỏ, 5 toilet tiện nghi. - 2 khu bếp ăn trongnhà và ngoài trời Sân vườn lớn, hồ cá Koi. - Nội thất cao cấp sẵn có đầy đủ, chỉ cần xách vali vào là ở. - Nhà vị trí 2 mặt tiền thoáng mát, view sông cực đẹp.</div>
        </div>

      </div>
    </Link>
  )
}

export default San_pham_ban_property
