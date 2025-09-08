'use client'
import Media_displayer from "./media_displayer/media_displayer";
import San_pham_ban_detail_infor from "./detail_infor/san_pham_ban_detail_infor";
import { detail_infor } from "./detail_infor/san_pham_ban_detail_infor";
import { MediaItem } from "./media_displayer/media_displayer";
import Similar_produc from "./similar_product/similar_product";
import { convertYouTubeToEmbed, convertTikTokToEmbed } from "../../utils/media-utils";

interface San_pham_ban_details_props {
  id: string | null;
}

const San_pham_ban_detail = ({ id }: San_pham_ban_details_props) => {

  const get_media_data_from_id = (id: string | null, information_data: detail_infor) => {
    const listOfImg = id?.split('')
    const data: MediaItem[] = []
    
    // Thêm YouTube video nếu có
    if (information_data.youtubeUrl) {
      const embedUrl = convertYouTubeToEmbed(information_data.youtubeUrl);
      if (embedUrl) {
        data.push({
          type: 'youtube' as const,
          url: information_data.youtubeUrl,
          embedUrl: embedUrl
        });
      }
    }
    
    // Thêm TikTok video nếu có
    if (information_data.tiktokUrl) {
      const embedUrl = convertTikTokToEmbed(information_data.tiktokUrl);
      if (embedUrl) {
        data.push({
          type: 'tiktok' as const,
          url: information_data.tiktokUrl,
          embedUrl: embedUrl
        });
      }
    }
    
    // Thêm hình ảnh
    if (listOfImg?.length) {
      // Danh sách các ảnh có sẵn trong thư mục example
      const availableImages = ['0', '1', '2', '5', '6', '7', '8', '9', '10', '11', '12'];
      
      for (let i = 0; i < listOfImg.length; i++) {
        const imgNumber = listOfImg[i];
        // Chỉ thêm ảnh nếu file tồn tại trong danh sách có sẵn
        if (availableImages.includes(imgNumber)) {
          data.push({
            type: 'image' as const,
            url: `/img/example/showcase${imgNumber}.jpg`
          });
        }
      }
      
      // Nếu sau khi filter mà không có ảnh nào hợp lệ, thêm một số ảnh mặc định
      if (data.filter(item => item.type === 'image').length === 0) {
        // Thêm một số ảnh mặc định
        ['0', '1', '2', '5', '6'].forEach(num => {
          data.push({
            type: 'image' as const,
            url: `/img/example/showcase${num}.jpg`
          });
        });
      }
      
      return data
    }
    
    // Nếu không có hình ảnh nào, thêm hình ảnh mặc định
    data.push({
      type: 'image' as const,
      url: '/img/example/showcase0.jpg' // Sử dụng showcase0.jpg thay vì show.jpg
    });
    
    return data;
  }
  
  // Luôn sử dụng data có đầy đủ thông tin bao gồm cả video URLs (như trước)
  const information_data: detail_infor = {
    price: '1 Tỷ',
    sqr: 100,
    legal: 'Có sổ hồng',
    location: '22 Nguyễn Huệ, Quận 1, TP.HCM',
    structure: '1 trệt - 3 lầu',
    bed_room: 4,
    bath_room: 3,
    interior: 'Đầy đủ',
    description: ['Ngang 5,6m, nở hậu 16m; Dài 25m', 'Tổng diện tích sử dụng ~ 300m2', 'Đang cho thuê 20tr/tháng, dòng tiền ổn định', 'Sổ riêng chính chủ'],
    // Luôn có video URLs để giữ nguyên UI như trước
    youtubeUrl: 'https://www.youtube.com/watch?v=dQj7hrKQxU8',
    tiktokUrl: 'https://www.tiktok.com/@tuananh_nhadat/video/7401361660478246162'
  }

  const media_data = get_media_data_from_id(id, information_data)


  return (
      <div className="container mx-auto p-2">
        {(id?.length) ? (
          <div>
            <h1 className="w-full text-center text-4xl font-bold mt-6">Tên sản phẩm</h1>
            <div className="lg:flex lg:gap-4 h-auto mt-6">
              <Media_displayer location={information_data.location} mediaItems={media_data}/>
              <div className="w-0.5 block border-[1px] border-gray-600"></div>
              <San_pham_ban_detail_infor information_data={information_data}/>
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


export default San_pham_ban_detail