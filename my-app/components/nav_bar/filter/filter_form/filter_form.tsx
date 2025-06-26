'use client'
import San_pham_ban_filter_form from './san_pham_ban_filter_form'

const Filter_form = () => {

  

  return (
      <div className="">
        <div className="space-y-4">
          {/* san_pham_ban */}
          <div className="tabs tabs-border">
            <input type="radio" value='filter_tab_1' name="filter_tab" className="tab tab_1" aria-label="Sản Phẩm Bán" defaultChecked/>
            <div className="tab-content border-gray-700 bg-black rounded-md p-4">
              {/* content */}
              <San_pham_ban_filter_form/>
            </div>

            {/* san_pham_cho_thue */}
            <input type="radio" value='filter_tab_2' name="filter_tab" className="tab tab_2" aria-label="Sản Phẩm Cho Thuê" />
            <div className="tab-content border-gray-700 bg-black rounded-md p-4">
              {/* content */}
            </div>

            {/* du_an */}
            <input type="radio" value='filter_tab_3' name="filter_tab" className="tab tab_3" aria-label="Dự Án" />
            <div className="tab-content border-gray-700 bg-black rounded-md p-4">
              {/* content */}
            </div>
          </div>
        </div>
      </div>
  )
}

export default Filter_form