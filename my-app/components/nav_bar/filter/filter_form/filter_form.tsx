'use client'

import Du_an_filter_form from './du_an_filter_form'
import San_pham_ban_filter_form from './san_pham_ban_filter_form'
import San_pham_cho_thue_filter_form from './san_pham_cho_thue_filter_form'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Filter_form = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('tab1');

  const collect_filter_data = () => {
    interface Filter_data {
      type: 'san_pham_ban' | 'san_pham_cho_thue' | 'du_an';
      location: string[];
      property_type: 'Tất Cả' | 'Nhà Phố' | 'Biệt Thự' | 'Đất Nền' | 'Căn Hộ';
      price: string[];
      sqr: string[];
      bed_room?: string[];
      bath_room?: string[];
    }

    const filter_data: Filter_data = {
      type: "san_pham_ban",
      location: ['ca nuoc', ''],
      property_type: 'Tất Cả',
      price: ['Từ: 0 Triệu', 'Đến: 60.00 Tỷ'],
      sqr: ['Từ: 0 m²', 'Đến: 500 m²'],
    }

    const checkedTab = document.querySelector<HTMLInputElement>('input[name="filter_tab"]:checked')
    const loc_inputs = document.querySelectorAll<HTMLInputElement>(`.${checkedTab?.value}_loc`);
    const property_type = document.querySelector<HTMLSelectElement>(`.${checkedTab?.value}_property_type`)
    const price = document.querySelectorAll<HTMLSpanElement>(`.${checkedTab?.value}_price`)
    const sqr = document.querySelectorAll<HTMLSpanElement>(`.${checkedTab?.value}_sqr`)
    const bed_room = document.querySelectorAll<HTMLSpanElement>(`.${checkedTab?.value}_bed_room`)
    const bath_room = document.querySelectorAll<HTMLSpanElement>(`.${checkedTab?.value}_bath_room`)

    filter_data.type = checkedTab?.value as 'san_pham_ban' | 'san_pham_cho_thue' | 'du_an';
    filter_data.location = [(loc_inputs[0]?.value === '') ? 'ca nuoc' : loc_inputs[0]?.value, loc_inputs[1]?.value]
    filter_data.property_type = property_type?.value as 'Tất Cả' | 'Nhà Phố' | 'Biệt Thự' | 'Đất Nền' | 'Căn Hộ';
    filter_data.price = [price[0]?.textContent || '', price[1]?.textContent || '']
    filter_data.sqr = [sqr[0]?.textContent || '', sqr[1]?.textContent || '']
    if (bed_room.length && bath_room.length) {
      filter_data.bed_room = [bed_room[0]?.textContent || '', bed_room[1]?.textContent || '']
      filter_data.bath_room = [bath_room[0]?.textContent || '', bath_room[1]?.textContent || '']
    }

    router.push(`/${filter_data.type}/${filter_data.property_type}`)
  }

  return (
    <div className="">
      <div className="">
        <div className="tabs tabs-border">
          <input type="radio" value='san_pham_ban' name="filter_tab" className="tab tab_1" aria-label="Sản Phẩm Bán" defaultChecked onClick={() => {setActiveTab('tab1')}}/>
          <div className="tab-content border-gray-700 bg-black rounded-md p-4 pb-8">
            {activeTab === 'tab1' ? (
              <San_pham_ban_filter_form/>
            ) : (
              <div></div>
            )}
          </div>

          <input type="radio" value='san_pham_cho_thue' name="filter_tab" className="tab tab_2" aria-label="Sản Phẩm Cho Thuê" onClick={() => {setActiveTab('tab2')}}/>
          <div className="tab-content border-gray-700 bg-black rounded-md p-4 pb-8"> 
            {activeTab === 'tab2' ? (
              <San_pham_cho_thue_filter_form/>
            ) : (
              <div></div>
            )}
          </div>

          <input type="radio" value='du_an' name="filter_tab" className="tab tab_3" aria-label="Dự Án" onClick={() => {setActiveTab('tab3')}}/>
          <div className="tab-content border-gray-700 bg-black rounded-md p-4 pb-8">
            {activeTab === 'tab3' ? (
              <Du_an_filter_form/>
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
