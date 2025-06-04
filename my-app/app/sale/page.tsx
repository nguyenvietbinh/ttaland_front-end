
'use client'
import Submit_form from '@/components/sale/submit_form';
import Navbar from '@/components/nav_bar/navbar';
import Footer from '@/components/layout/footer';
const FormSale = () => {


  return (
    <div>
      <Navbar/>
      <div className="p-6 max-w-4xl max-h-3xl my-6 md:my-12 px-0 md:px-4 mx-auto bg-gray-800 rounded-none md:rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center md:text-left">Thông Tin Sản Phẩm</h1>
        <div className="space-y-4">
          {/* san_pham_ban */}
          <div className="tabs tabs-border">
            <input type="radio" value='tab_1' name="my_tabs_2" className="tab tab_1" aria-label="Sản Phẩm Bán" defaultChecked/>
            <div className="tab-content border-base-300 bg-gray-950 rounded-md p-10">
              <Submit_form tab='san_pham_ban'/>
            </div>

            {/* san_pham_cho_thue */}
            <input type="radio" value='tab_2' name="my_tabs_2" className="tab tab_2" aria-label="Sản Phẩm Cho Thuê" />
            <div className="tab-content border-base-300 bg-gray-950 rounded-md p-10">
              <Submit_form tab='san_pham_cho_thue'/>
            </div>

            {/* du_an */}
            <input type="radio" value='tab_3' name="my_tabs_2" className="tab tab_3" aria-label="Dự Án" />
            <div className="tab-content border-base-300 bg-gray-950 rounded-md p-10">
              <Submit_form tab='du_an'/>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default FormSale;