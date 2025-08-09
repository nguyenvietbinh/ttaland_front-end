'use client'
import Media_displayer from "./detail_page_components/media_displayer";
import San_pham_cho_thue_detail_infor, { detail_infor } from "./detail_infor/san_pham_cho_thue_detail_infor";
import { MediaItem } from "./detail_page_components/media_displayer";
import Similar_produc from "./detail_page_components/similar_produc";

interface San_pham_cho_thue_detail_props {
  id: string | null;
}

const San_pham_cho_thue_detail = ({ id }: San_pham_cho_thue_detail_props) => {

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

  // Luôn sử dụng data cố định như trước (không có video URLs vì rental component không support)
  const information_data: detail_infor = {
    price: '25 Triệu/tháng',
    sqr: 100,
    legal: 'Hợp đồng cho thuê',
    structure: '1 trệt - 3 lầu',
    bed_room: 4,
    bath_room: 3,
    interior: 'Đầy đủ',
    description: ['Ngang 5,6m, nở hậu 16m; Dài 25m', 'Tổng diện tích sử dụng ~ 300m2', 'Đang cho thuê 20tr/tháng, dòng tiền ổn định', 'Sổ riêng chính chủ']
  }


  return (
      <div className="container mx-auto p-2">
        {(id?.length) ? (
          <div>
            <h1 className="w-full text-center text-3xl font-bold mt-6">Tên sản phẩm</h1>
            <div className="lg:flex lg:gap-4 h-auto mt-6">
              <Media_displayer id={id} mediaItems={media_data}/>
              <div className="w-0.5 block border-[1px] border-gray-600"></div>
              <San_pham_cho_thue_detail_infor information_data={information_data}/>
            </div>
          <Similar_produc/>
          </div>
        ) : (
          <div>
            Không Tìm Thấy Sản Phẩm
          </div>
        )}
      </div>
  )
}


export default San_pham_cho_thue_detail