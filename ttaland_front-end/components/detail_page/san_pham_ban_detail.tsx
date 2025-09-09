'use client'
import { useEffect, useState } from "react";
import Media_displayer from "./media_displayer/media_displayer";
import San_pham_ban_detail_infor from "./detail_infor/san_pham_ban_detail_infor";
import { detail_infor } from "./detail_infor/san_pham_ban_detail_infor";
import { MediaItem } from "./media_displayer/media_displayer";
import Similar_produc from "./similar_product/similar_product";
import { convertYouTubeToEmbed, convertTikTokToEmbed } from "../../utils/media-utils";
import { apiService, Townhouse } from "../../services/apiService";

interface San_pham_ban_details_props {
  id: string | null;
}

const San_pham_ban_detail = ({ id }: San_pham_ban_details_props) => {
  const [propertyData, setPropertyData] = useState<Townhouse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUsingMockData, setIsUsingMockData] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const result = await apiService.getTownhouseDetailsWithFallback(id);
        
        setPropertyData(result.data);
        setIsUsingMockData(result.isUsingMockData);
        setError(result.error || null);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load property data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPropertyData();
  }, [id]);

  const get_media_data_from_api = (apiData: Townhouse | null): MediaItem[] => {
    const data: MediaItem[] = [];
    
    if (!apiData) {
      // Fallback to default media if no API data
      data.push({
        type: 'image' as const,
        url: '/img/example/showcase0.jpg'
      });
      return data;
    }
    
    // Thêm YouTube video nếu có
    if (apiData.youtube_url) {
      const embedUrl = convertYouTubeToEmbed(apiData.youtube_url);
      if (embedUrl) {
        data.push({
          type: 'youtube' as const,
          url: apiData.youtube_url,
          embedUrl: embedUrl
        });
      }
    }
    
    // Thêm TikTok video nếu có
    if (apiData.tiktok_url) {
      const embedUrl = convertTikTokToEmbed(apiData.tiktok_url);
      if (embedUrl) {
        data.push({
          type: 'tiktok' as const,
          url: apiData.tiktok_url,
          embedUrl: embedUrl
        });
      }
    }
    
    // Thêm hình ảnh từ API
    if (apiData.media && apiData.media.length > 0) {
      apiData.media.forEach((mediaItem) => {
        if (mediaItem.media_type === 'image') {
          data.push({
            type: 'image' as const,
            url: mediaItem.file_url || mediaItem.file
          });
        } else if (mediaItem.media_type === 'video') {
          data.push({
            type: 'video' as const,
            url: mediaItem.file_url || mediaItem.file,
            format: 'mp4'
          });
        }
      });
    }
    
    // Nếu không có media nào từ API, thêm media mặc định
    if (data.filter(item => item.type === 'image').length === 0) {
      data.push({
        type: 'image' as const,
        url: '/img/example/showcase0.jpg'
      });
    }
    
    return data;
  };

  const convertApiDataToDetailInfor = (apiData: Townhouse | null): detail_infor => {
    if (!apiData) {
      // Fallback data when no API data available
      return {
        price: '1 Tỷ',
        sqr: 100,
        legal: 'Có sổ hồng',
        location: '22 Nguyễn Huệ, Quận 1, TP.HCM',
        structure: '1 trệt - 3 lầu',
        bed_room: 4,
        bath_room: 3,
        interior: 'Đầy đủ',
        description: ['Ngang 5,6m, nở hậu 16m; Dài 25m', 'Tổng diện tích sử dụng ~ 300m2', 'Đang cho thuê 20tr/tháng, dòng tiền ổn định', 'Sổ riêng chính chủ'],
        youtubeUrl: 'https://www.youtube.com/watch?v=dQj7hrKQxU8',
        tiktokUrl: 'https://www.tiktok.com/@tuananh_nhadat/video/7401361660478246162'
      };
    }

    const details = apiData.townhouse_details;
    
    return {
      price: apiData.price_formatted,
      sqr: parseFloat(apiData.area),
      legal: 'Có sổ hồng', // Default value as API doesn't provide this
      location: apiData.location,
      structure: details.structure || `${details.floors} tầng`,
      bed_room: details.bedrooms,
      bath_room: details.bathrooms,
      interior: details.interior,
      description: [
        apiData.description,
        `Diện tích: ${apiData.area_formatted}`,
        `Vị trí: ${apiData.location}`,
        `Garage: ${details.garage} chỗ`,
        details.living_room ? 'Có phòng khách' : 'Không có phòng khách'
      ].filter(Boolean),
      youtubeUrl: apiData.youtube_url || undefined,
      tiktokUrl: apiData.tiktok_url || undefined
    };
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto p-2 flex justify-center items-center min-h-[400px]">
        <div className="text-xl">Đang tải thông tin sản phẩm...</div>
      </div>
    );
  }

  // No ID provided
  if (!id) {
    return (
      <div className="container mx-auto p-2">
        <div className="text-center text-xl text-red-500">
          Không tìm thấy ID sản phẩm
        </div>
      </div>
    );
  }

  const media_data = get_media_data_from_api(propertyData);
  const information_data = convertApiDataToDetailInfor(propertyData);

  return (
    <div className="container mx-auto p-2">
      {/* Mock Data Warning */}
      {isUsingMockData && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          <p className="font-bold">⚠️ TESTING MODE</p>
          <p className="text-sm">
            API không khả dụng, đang sử dụng dữ liệu mock để test. 
            {error && <span className="block">Chi tiết lỗi: {error}</span>}
          </p>
        </div>
      )}
      
      {propertyData || isUsingMockData ? (
        <div>
          <h1 className="w-full text-center text-4xl font-bold mt-6">
            {propertyData?.title || 'Tên sản phẩm'}
          </h1>
          <div className="lg:flex lg:gap-4 h-auto mt-6">
            <Media_displayer location={information_data.location} mediaItems={media_data}/>
            <div className="w-0.5 block border-[1px] border-gray-600"></div>
            <San_pham_ban_detail_infor information_data={information_data}/>
          </div>
          <Similar_produc productId={propertyData?.id}/>
        </div>
      ) : (
        <div className="text-center text-xl text-red-500">
          Không tìm thấy sản phẩm
          {error && (
            <div className="text-sm text-gray-500 mt-2">
              Lỗi: {error}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default San_pham_ban_detail