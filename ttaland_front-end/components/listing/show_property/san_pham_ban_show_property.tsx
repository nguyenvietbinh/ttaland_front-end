'use client'

import Link from "next/link"
import { ShowProperty, TownhouseShowProperty, VillaShowProperty, ApartmentShowProperty } from '@/types/api/showProperties'


interface San_pham_ban_propertyProps {
  property: ShowProperty
}


 export function formatNumber(value: number, unit: string) {
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

export function formatVietnameseNumber(n: number): string {
  if (n === 0) return '0';

  const units = ['', 'nghìn', 'triệu', 'tỷ', 'nghìn tỷ', 'triệu tỷ', 'tỷ tỷ'];
  const parts: string[] = [];

  const chunks = [];
  let num = n;
  while (num > 0) {
    chunks.push(num % 1000);
    num = Math.floor(num / 1000);
  }

  for (let i = chunks.length - 1; i >= 0; i--) {
    const val = chunks[i];
    if (val === 0) continue;

    const unit = units[i] || ''; // phòng trường hợp > tỷ tỷ
    parts.push(`${val} ${unit}`.trim());
  }

  return parts.join(' ').replace(/\s+/g, ' ').trim();
}

export const get_price_per_square_meter = (price: number, area: number) => {
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
      return formatNumber(nghin, 'nghìn');
  } else {
      // Dưới 1000
      return Math.round(price_per_square_meter).toString();
  }
}



const San_pham_ban_property = ({ property }: San_pham_ban_propertyProps) => {

  const urlToDetail = () => {
    return `/san_pham_ban/chi_tiet?id=${property?.id}`
  }

  const bedrooms = ((property as TownhouseShowProperty)?.bedrooms || (property as VillaShowProperty)?.bedrooms || (property as ApartmentShowProperty)?.bedrooms || 0)
  const bathrooms = ((property as TownhouseShowProperty)?.bathrooms || (property as VillaShowProperty)?.bathrooms || (property as ApartmentShowProperty)?.bathrooms || 0) 
  return (
    <Link href={urlToDetail()}>
      <div className="w-full h-70 gap-0.5 flex overflow-hidden relative">
        <div className="flex absolute bottom-2 z-10 right-2 items-center gap-2">
          <img src="/img/icons/picture.png" alt="" className="h-6"/>
          <p className="text-white text-2xl font-extrabold">{property.number_of_images}</p>
        </div>
        <div className="h-full lg:w-2/3 w-full overflow-hidden ">
          <img className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" src={(property)?.main_images![0]} alt={property.title} />
        </div>
        <div className="w-1/3 h-full hidden lg:block flex-col space-y-0.5 overflow-hidden ">
          <div className="w-full h-1/2 overflow-hidden">
            <img className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" src={(property)?.main_images![1]} alt={property.title} />
          </div>
          <div className="w-full h-1/2 overflow-hidden flex gap-0.5">
            <div className="w-full 2xl:w-1/2 h-full overflow-hidden">
              <img className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" src={(property)?.main_images![2]} alt={property.title} />
            </div>
            <div className="w-1/2 hidden 2xl:block h-full overflow-hidden">
              <img className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" src={(property)?.main_images![3]} alt={property.title} />
            </div>
          </div> 
        </div>
      </div>

      <div className="px-1 bg-gray-100 shadow-sm">
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
              <p className="hidden lg:flex items-baseline gap-0.5"><img src="/img/icons/bed.png" className="h-3.5" alt="" />{bedrooms}</p>
            )}
            {(bedrooms > 0) && (
              <div className="text-gray-400 hidden lg:flex">·</div>
            )}
            {(bathrooms > 0) && (
              <p className="items-baseline gap-0.5 hidden lg:flex"><img src="/img/icons/bathtub.png" className="h-3.5" alt="" />{bathrooms}</p>
            )}
            {(bathrooms > 0) && (
              <div className="text-gray-400 hidden lg:flex">·</div>
            )}
            <p className=''>{property.location.split(',').slice(-2)[0]},{property.location.split(',').slice(-2)[1]}</p>
          </div>
          <div className="mb-2 line-clamp-2 text-sm text-gray-800">{property.description}</div>
        </div>

      </div>
    </Link>
  )
}

export default San_pham_ban_property
