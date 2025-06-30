'use client'
import Du_an_filter_form from './du_an_filter_form'
import San_pham_ban_filter_form from './san_pham_ban_filter_form'
import San_pham_cho_thue_filter_form from './san_pham_cho_thue_filter_form'

const Filter_form = () => {

  

  return (
      <div className="">
        <div className="">
          {/* san_pham_ban */}
          <div className="tabs tabs-border">
            <input type="radio" value='filter_tab_1' name="filter_tab" className="tab tab_1" aria-label="Sản Phẩm Bán" defaultChecked/>
            <div className="tab-content border-gray-700 bg-black rounded-md p-4 pb-8">
              {/* content */}
              <San_pham_ban_filter_form/>
            </div>

            {/* san_pham_cho_thue */}
            <input type="radio" value='filter_tab_2' name="filter_tab" className="tab tab_2" aria-label="Sản Phẩm Cho Thuê" />
            <div className="tab-content border-gray-700 bg-black rounded-md p-4 pb-8">
              {/* content */}
              <San_pham_cho_thue_filter_form/>
            </div>

            {/* du_an */}
            <input type="radio" value='filter_tab_3' name="filter_tab" className="tab tab_3" aria-label="Dự Án" />
            <div className="tab-content border-gray-700 bg-black rounded-md p-4 pb-8">
              {/* content */}
              <Du_an_filter_form/>
            </div>
          </div>
        </div>
        <div className='flex justify-center pt-8 px-2'>
          <button className='btn text-black w-full bg-gray-300'>Tìm Kiếm</button>
        </div>
      </div>
  )
}

export default Filter_form