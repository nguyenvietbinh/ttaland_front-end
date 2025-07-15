
'use client'
import _sub_avbar from '@/components/listing/sub_navbar'
import { usePathname } from 'next/navigation';
import Du_an_property from './show_property/du_an_show_property';
import San_pham_ban_property from './show_property/san_pham_ban_show_property';
import San_pham_cho_thue_property from './show_property/san_pham_cho_thue_show_property';


const Listing = () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
  const path_name = usePathname()
  const category: string[] = ['dat_nen', 'nha_pho', 'biet_thu', 'can_ho', 'tat_ca']
  const list_path: string[] = path_name.split('/')

  return (
    <div>
      <div className="w-full xl:w-[1280px] 2xl:w-[1536px] h-auto mx-auto text-white">
        <_sub_avbar/>
        <div className={category.includes(list_path[2]) ? "bg-none px-2 xl:mx-0 grid grid-cols-1  lg:grid-cols-2 gap-8" : "hidden"}>
          {items.map((item, index) => (
            <div key={index}>
              {(list_path[1] === 'san_pham_ban') ? (<San_pham_ban_property />) : (list_path[1] === 'san_pham_cho_thue') ? (<San_pham_cho_thue_property />) : (<Du_an_property />)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


export default Listing