'use client'

type LocationData = {
  don_vi_hanh_chinh_cap_tinh: string[],
  don_vi_hanh_chinh_cap_huyen: Record<string, string[]>
}


import { useEffect, useState } from 'react'
import dataJson from '../location.json'
const data = dataJson as LocationData;
import Search from '../input_components/search'
import DualRangeSlider from '../input_components/dual_input_range'


const San_pham_ban_filter_form = () => {
  const [tinh_thanh_pho_input_value, set_tinh_thanh_pho_input_value] = useState<string>('')
  const [disable_dvhc_cap_huyen_input, set_disable_dvhc_cap_huyen_input] = useState<boolean>(true)
  function removeVietnameseTones(str: string): string {
    str = str.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, "a");
    str = str.replace(/[èéẹẻẽêềếệểễ]/g, "e");
    str = str.replace(/[ìíịỉĩ]/g, "i");
    str = str.replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, "o");
    str = str.replace(/[ùúụủũưừứựửữ]/g, "u");
    str = str.replace(/[ỳýỵỷỹ]/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/[ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ]/g, "A");
    str = str.replace(/[ÈÉẸẺẼÊỀẾỆỂỄ]/g, "E");
    str = str.replace(/[ÌÍỊỈĨ]/g, "I");
    str = str.replace(/[ÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠ]/g, "O");
    str = str.replace(/[ÙÚỤỦŨƯỪỨỰỬỮ]/g, "U");
    str = str.replace(/[ỲÝỴỶỸ]/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
  }
  useEffect(() => {
    if ((data.don_vi_hanh_chinh_cap_tinh.includes(tinh_thanh_pho_input_value)) && (tinh_thanh_pho_input_value !== data.don_vi_hanh_chinh_cap_tinh[0])) {
      console.log()
      set_disable_dvhc_cap_huyen_input(false)
    } else {
      set_disable_dvhc_cap_huyen_input(true)
    }
  }, [tinh_thanh_pho_input_value])

  return (
    <div className='space-y-4'>
      <div>
        <p className='text-sm my-1 ml-1'>1. Địa Chỉ</p>
        <div className="flex space-x-2">
          <Search keywords={data.don_vi_hanh_chinh_cap_tinh} placeholder="Tỉnh / Thành Phố" setData={set_tinh_thanh_pho_input_value} disable={false}/>
          <Search keywords={data.don_vi_hanh_chinh_cap_huyen[removeVietnameseTones(tinh_thanh_pho_input_value)] ? data.don_vi_hanh_chinh_cap_huyen[removeVietnameseTones(tinh_thanh_pho_input_value)] : []} placeholder="Quận / Huyện" disable={disable_dvhc_cap_huyen_input}/>
        </div>
      </div>
      <div>
        <p className='text-sm my-1 ml-1'>2. Loại Tài Sản</p>
        <select defaultValue="Tất Cả" className="select focus:outline-0 w-full">
          <option>Tất Cả</option>
          <option>Nhà Phố</option>
          <option>Biệt Thự</option>
          <option>Đất Nền</option>
          <option>Căn Hộ</option>
        </select>
      </div>
      <div>
        <p className='text-sm my-1 ml-1'>3. Giá</p>
        <DualRangeSlider min={0} max={6000} step={10} type='price'/>
      </div>
    </div>
  )
}


export default San_pham_ban_filter_form