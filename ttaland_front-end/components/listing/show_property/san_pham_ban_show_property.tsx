'use client'

import Link from "next/link"
import { ProductType } from "@/types/product"
import { usePathname } from "next/navigation"

interface San_pham_ban_propertyProps {
  property: ProductType
}


 export function formatNumber(value: number, unit: string) {
    if (Math.abs(value) >= 10) {
        return Math.round(value) + ' ' + unit;
    } else {
        const rounded = Math.round(value * 10) / 10;
        
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
  const pathname = usePathname();
  const urlToDetail = () => {
    return `${pathname}/${property.id}`
  }

  return (
    <Link href={urlToDetail()}>
      <div className="w-full h-70 gap-0.5 flex overflow-hidden relative">
        <div className="flex absolute bottom-2 z-10 right-2 items-center gap-2">
          <img src="/img/icons/picture.png" alt="" className="h-6"/>
          <p className="text-white text-2xl font-extrabold">{property.images.length}</p>
        </div>
        <div className="h-full lg:w-2/3 w-full overflow-hidden ">
          <img className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" src={(property)?.images![0]} alt={property.title} />
        </div>
        <div className="w-1/3 h-full hidden lg:block flex-col space-y-0.5 overflow-hidden ">
          <div className="w-full h-1/2 overflow-hidden">
            <img className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" src={(property)?.images![1]} alt={property.title} />
          </div>
          <div className="w-full h-1/2 overflow-hidden flex gap-0.5">
            <div className="w-full 2xl:w-1/2 h-full overflow-hidden">
              <img className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" src={(property)?.images![2]} alt={property.title} />
            </div>
            <div className="w-1/2 hidden 2xl:block h-full overflow-hidden">
              <img className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" src={(property)?.images![3]} alt={property.title} />
            </div>
          </div> 
        </div>
      </div>

      <div className="shadow-sm p-2">
        {/* info */}
        <div className="">
          <div className="font-bold hover:underline text-3xl wrap-break-word line-clamp-1">
            {property.title}
          </div>
          <div className="flex justify-start gap-2 items-baseline">
            <p className="text-red-600 font-extrabold text-2xl">{property.area} m²</p> <div className="text-gray-400">·</div>
            <p className="text-red-600 font-extrabold text-2xl">{formatVietnameseNumber(Number(property.price))}</p> <div className="text-gray-400">·</div>
            <p className="hidden lg:flex">{get_price_per_square_meter(Number(property.price), Number(property.area))}/m²</p> <div className="text-gray-400 hidden lg:flex">·</div>
            {!(property.type === 'land') && (
              <p className="hidden lg:flex items-baseline gap-0.5"><img src="/img/icons/bed.png" className="h-3.5" alt="" />{property.bedroom}</p>
            )}
            {!(property.type === 'land') && (
              <div className="text-gray-400 hidden lg:flex">·</div>
            )}
            {!(property.type === 'land') && (
              <p className="items-baseline gap-0.5 hidden lg:flex"><img src="/img/icons/bathtub.png" className="h-3.5" alt="" />{property.bathroom}</p>
            )}
            {!(property.type === 'land') && (
              <div className="text-gray-400 hidden lg:flex">·</div>
            )}
            <p className=''>{property.location}, HỒ CHÍ MINH</p>
          </div>
          <div className="line-clamp-2 text-sm text-gray-900">{property.discription}</div>
        </div>

      </div>
    </Link>
  )
}

export default San_pham_ban_property
