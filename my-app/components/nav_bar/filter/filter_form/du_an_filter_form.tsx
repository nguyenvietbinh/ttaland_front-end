'use client'

import HCMap from '@/components/element/HCMCmap';
interface CustomFeature {
  type: "Feature";
  properties: {
    gid: number;
    name: string;
  };
  geometry: {
    type: string;
    geometries: {
      type: string;
      coordinates: number[][][][];
    }[];
  };
}

interface CustomGeoJSON {
  type: "FeatureCollection";
  features: CustomFeature[];
}

// Sử dụng type assertion khi import
import rawData from '@/public/data/hcm.json';
const hcmGeoJson = rawData as CustomGeoJSON;



import DualRangeSlider from '../input_components/dual_input_range'
import { useState } from 'react';

const Du_an_filter_form = ({}) => {
  const [locations, setLocation] = useState<string[]>([])
  const [reset, setreset] = useState<boolean>(false)

  return (
    <div className='space-y-4 flex-col'>
      <div>
        <p className='text-sm my-1 ml-1'>1. Vị Trí</p>
        <div className="flex px-2 justify-between  items-center">
          <div className='max-h-36 overflow-auto pr-4'>
            {locations.map((item, index) => (
              <p key={index} className='text-md text-nowrap'>{ item },</p>
            ))}
          </div>
          <div className='flex btn gap-2 border-[1px] rounded-sm border-gray-600 bg-black hover:border-white p-2 cursor-pointer items-center' onClick={() => (document.getElementById('du_an_map') as HTMLDialogElement)?.showModal()}>
            <img src="/img/icons/map.png" alt="" className='h-6'/>
            <p className='text-sm text-nowrap'>Bản đồ</p>
            <dialog id={'du_an_map'} className="modal">
              <div className="modal-box absolute top-[12%] bg-black p-4 pb-8 max-w-2xl max-h-5xl h-auto">
                <div className="modal-action flex justify-start items-center mt-0 mb-2 px-2">
                  <form method="dialog">
                    <button className='cursor-pointer'>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                      </svg>
                    </button>
                  </form>
                </div>                
                <HCMap onSendData={setLocation} reset={reset} geoJsonData={hcmGeoJson}/>
                <div className="modal-action gap-0 justify-between mt-4">
                  <button className='btn bg-gray-800 w-[16%]' onClick={() => setreset(preVal => !preVal)}>Đặt Lại</button>
                  <form method="dialog" className='w-[84%] px-2'>
                    <button className="btn w-full bg-red-600">Xác nhận</button>
                  </form>
                </div>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
          </div>
        </div>
      </div>
      <div>
        <p className='text-sm my-1 ml-1'>2. Loại Tài Sản</p>
        <select defaultValue="Tất Cả" className="select focus:outline-0 w-full du_an_property_type">
          <option value='tat_ca'>Tất Cả</option>
          <option value='nha_pho'>Nhà Phố</option>
          <option value='biet_thu'>Biệt Thự</option>
          <option value='dat_nen'>Đất Nền</option>
          <option value='can_ho'>Căn Hộ</option>
        </select>
      </div>
      <div>
        <p className='text-sm my-1 ml-1'>3. Giá</p>
        <DualRangeSlider dual_input_range_name='du_an_price' min={0} max={100} step={10} type='du_an_price'/>
      </div>
      <div>
        <p className='text-sm my-1 ml-1'>4. Diện Tích</p>
        <DualRangeSlider dual_input_range_name='du_an_sqr' min={0} max={500} step={50} type='sqr'/>
      </div>
    </div>
  )
}


export default Du_an_filter_form