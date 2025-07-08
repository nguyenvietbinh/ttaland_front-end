'use client'

import Du_an_filter_form from './du_an_filter_form'
import San_pham_ban_filter_form from './san_pham_ban_filter_form'
import San_pham_cho_thue_filter_form from './san_pham_cho_thue_filter_form'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Filter_form = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<string>('tab1');
  const [locations, setLocations] = useState<string[]>([])

  const collect_filter_data = () => {
    interface Filter_data {
      type: 'san_pham_ban' | 'san_pham_cho_thue' | 'du_an';
      locations: string[];
      property_type: 'Tất Cả' | 'Nhà Phố' | 'Biệt Thự' | 'Đất Nền' | 'Căn Hộ';
      price_min: string;
      price_max: string;
      sqr_min: string;
      sqr_max: string;
      bed_room_min?: string;
      bed_room_max?: string;
      bath_room_min?: string;
      bath_room_max?: string;
    }

    const filter_data: Filter_data = {
      type: "san_pham_ban",
      locations: ['ca nuoc', ''],
      property_type: 'Tất Cả',
      price_min: 'Từ: 0 Triệu',
      price_max: 'Đến: 60.00 Tỷ',
      sqr_min: 'Từ: 0 m²',
      sqr_max: 'Đến: 500 m²'
    }

    const checkedTab = document.querySelector<HTMLInputElement>('input[name="filter_tab"]:checked')
    const property_type = document.querySelector<HTMLSelectElement>(`.${checkedTab?.value}_property_type`)
    const price = document.querySelectorAll<HTMLSpanElement>(`.${checkedTab?.value}_price`)
    const sqr = document.querySelectorAll<HTMLSpanElement>(`.${checkedTab?.value}_sqr`)
    const bed_room = document.querySelectorAll<HTMLSpanElement>(`.${checkedTab?.value}_bed_room`)
    const bath_room = document.querySelectorAll<HTMLSpanElement>(`.${checkedTab?.value}_bath_room`)

    filter_data.type = checkedTab?.value as 'san_pham_ban' | 'san_pham_cho_thue' | 'du_an'
    filter_data.locations = locations
    filter_data.property_type = property_type?.value as 'Tất Cả' | 'Nhà Phố' | 'Biệt Thự' | 'Đất Nền' | 'Căn Hộ'
    filter_data.price_min = price[0]?.textContent || ''
    filter_data.price_max = price[1]?.textContent || ''
    filter_data.sqr_min = sqr[0]?.textContent || ''
    filter_data.sqr_max = sqr[1]?.textContent || ''
    if (bed_room.length && bath_room.length) {
      filter_data.bed_room_min = bed_room[0]?.textContent || ''
      filter_data.bed_room_max = bed_room[1]?.textContent || ''
      filter_data.bath_room_min = bath_room[0]?.textContent || ''
      filter_data.bath_room_max = bath_room[1]?.textContent || ''
    }

    const queryParams: Record<string, string> = {
      price_min: filter_data.price_min,
      price_max: filter_data.price_max,
      sqr_min: filter_data.sqr_min,
      sqr_max: filter_data.sqr_max,
      locations: filter_data.locations.join(','),
    };

    if (filter_data.bed_room_min) queryParams.bed_room_min = filter_data.bed_room_min;
    if (filter_data.bed_room_max) queryParams.bed_room_max = filter_data.bed_room_max;
    if (filter_data.bath_room_min) queryParams.bath_room_min = filter_data.bath_room_min;
    if (filter_data.bath_room_max) queryParams.bath_room_max = filter_data.bath_room_max;

    const queryString = new URLSearchParams(queryParams).toString();
    router.push(`/${filter_data.type}/${filter_data.property_type}?${queryString}`);
  }

  return (
    <div className="">
      <div className="">
        <div className="tabs tabs-border">
          <input type="radio" value='san_pham_ban' name="filter_tab" className="tab tab_1" aria-label="Sản Phẩm Bán" defaultChecked onClick={() => {setActiveTab('tab1')}}/>
          <div className="tab-content border-gray-700 bg-black rounded-md p-4 pb-8">
            {activeTab === 'tab1' ? (
              <San_pham_ban_filter_form sendLocations={setLocations}/>
            ) : (
              <div></div>
            )}
          </div>

          <input type="radio" value='san_pham_cho_thue' name="filter_tab" className="tab tab_2" aria-label="Sản Phẩm Cho Thuê" onClick={() => {setActiveTab('tab2')}}/>
          <div className="tab-content border-gray-700 bg-black rounded-md p-4 pb-8"> 
            {activeTab === 'tab2' ? (
              <San_pham_cho_thue_filter_form sendLocaions={setLocations}/>
            ) : (
              <div></div>
            )}
          </div>

          <input type="radio" value='du_an' name="filter_tab" className="tab tab_3" aria-label="Dự Án" onClick={() => {setActiveTab('tab3')}}/>
          <div className="tab-content border-gray-700 bg-black rounded-md p-4 pb-8">
            {activeTab === 'tab3' ? (
              <Du_an_filter_form sendLocations={setLocations}/>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
      <div className='flex justify-center pt-8 px-2'>
        <button onClick={collect_filter_data} className='btn text-black w-full bg-gray-300'>Tìm Kiếm</button>
      </div>
    </div>
  )
}

export default Filter_form
