'use client'
import Media_displayer from "./detail_page_components/media_displayer";
import San_pham_ban_detail_infor from "./detail_infor/san_pham_ban_detail_infor";
import { detail_infor } from "./detail_infor/san_pham_ban_detail_infor";
import { MediaItem } from "./detail_page_components/media_displayer";

interface San_pham_ban_details_props {
  id: string | null;
}


const San_pham_ban_detail = ({ id }: San_pham_ban_details_props) => {

  const get_media_data_from_id = (id: string | null) => {
    const listOfImg = id?.split('')
    const data: MediaItem[] = [{
      type: 'video' as const,
      url: '/img/example/showcasevid.mp4',
      format: 'mp4',
    }]
    if (listOfImg?.length) {
      for (let i = 0; i < listOfImg.length; i ++) {
        data.push({
          type: 'image' as const,
          url: `/img/example/showcase${listOfImg[i]}.jpg`
        })
      }
      return data
    }
    return [{
      type: 'image' as const,
      url: '/img/example/show.jpg'
    }]
  }
  const media_data = get_media_data_from_id(id)

  const information_data: detail_infor = {
    price: '1 Tỷ',
    sqr: 100,
    legal: 'Có sổ hồng',
    structure: '1 trệt - 3 lầu',
    bed_room: 4,
    bath_room: 3,
    interior: 'Đầy đủ',
    description: ['Ngang 5,6m, nở hậu 16m; Dài 25m', 'Tổng diện tích sử dụng ~ 300m2', 'Đang cho thuê 20tr/tháng, dòng tiền ổn định', 'Sổ riêng chính chủ']
  }


  return (
      <div className="container mx-auto h-auto p-2">
        {(id?.length) ? (
          <div>
            <div className="lg:flex lg:gap-4 h-auto mt-6">
              <Media_displayer id={id} mediaItems={media_data}/>
              <div className="w-0.5 block border-[1px] border-gray-600"></div>
              <San_pham_ban_detail_infor information_data={information_data}/>
            </div>
            <div className="w-full h-150 border-t-[2px] border-gray-600 mt-6 p-4">
            </div>
          </div>
        ) : (
          <div>
            Không Tìm Thấy Sản Phẩm
          </div>
        )}
      </div>
  )
}


export default San_pham_ban_detail