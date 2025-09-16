'use client'
import { useEffect, useState } from "react";
import Media_displayer from "./media_displayer/media_displayer";
import San_pham_ban_detail_infor from "./detail_infor/san_pham_ban_detail_infor";
import { detail_infor } from "./detail_infor/san_pham_ban_detail_infor";
import { MediaItem } from "./media_displayer/media_displayer";
import Similar_produc from "./similar_product/similar_product";
import { convertYouTubeToEmbed, convertTikTokToEmbed } from "../../utils/media-utils";
import { Apartment, apiService, LandLot, Townhouse, Villa } from "../../services/apiService";
import Map_window from "./map_window";

interface San_pham_ban_details_props {
  id: string | null;
}

const San_pham_ban_detail = ({ id }: San_pham_ban_details_props) => {
  const [propertyData, setPropertyData] = useState<Townhouse | Villa | LandLot | Apartment>();
  const [isLoading, setIsLoading] = useState(true);
  const [mediaData, setMediaData] = useState<MediaItem[]>()
  const [informationData, setInformationData] = useState<detail_infor>()

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const result = await apiService.getPropertyDetails(id);
        setPropertyData(result);
        console.log(result)
      } catch (err) {
        console.error(err instanceof Error ? err.message : 'Failed to load property data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPropertyData();
  }, [id]);

  const get_media_data_from_api = (apiData: Townhouse | Villa | LandLot | Apartment): MediaItem[] => {
    const data: MediaItem[] = [];
    
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
    
    
    return data;
  };

  const getDetailInformation = (apiData: Townhouse | Villa | LandLot | Apartment): detail_infor => {
    let productDetail
    if (apiData.type === 'townhouse') {
        productDetail = apiData.townhouse_details;
    } else if (apiData.type === 'villa') {
        productDetail = apiData.villa_details;
    } else if (apiData.type === 'land') {
        productDetail = apiData.land_details;
    } else if (apiData.type === 'apartment') {
        productDetail = apiData.apartment_details;
    }
    const result: detail_infor = {
      price: apiData.price_formatted,
      sqr: Number(apiData.area),
      location: apiData.location,
      description: apiData.description
    }
    if (productDetail) {
      if ('policy' in productDetail && productDetail.policy) {
        result.policy = productDetail.policy;
      }
      if ('structure' in productDetail && productDetail.structure) {
        result.structure = productDetail.structure;
      }
      if ('bedrooms' in productDetail && productDetail.bedrooms) {
        result.bedrooms = productDetail.bedrooms;
      }
      if ('bathrooms' in productDetail && productDetail.bathrooms) {
        result.bathrooms = productDetail.bathrooms;
      }
      if ('interior' in productDetail && productDetail.interior) {
        result.interior = productDetail.interior;
      }
    }
    return result
  };

  
  useEffect(() => {
    if (propertyData) {
      setMediaData(get_media_data_from_api(propertyData))
      setInformationData(getDetailInformation(propertyData))
    }
  }, [propertyData])

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto p-2 flex justify-center items-center min-h-[400px]">
        <div className="text-xl">Đang tải thông tin sản phẩm...</div>
      </div>
    );
  }



  return (
    <div className="container mx-auto p-2">
      {propertyData && mediaData && informationData ? (
        <div>
          <h1 className="w-full text-center text-5xl font-bold mt-6">
            {propertyData?.title || 'Tên sản phẩm'}
          </h1>
          <div className="lg:flex lg:gap-4 h-auto mt-6">
            <div className="h-auto w-full lg:w-[65%]">
              <Media_displayer mediaItems={mediaData}/>
              <div className="hidden lg:block">
                <Similar_produc productId={propertyData?.id || id || '12345'}/>
              </div>
            </div>
            <div className="h-auto w-full lg:w-[35%]">
              <San_pham_ban_detail_infor information_data={informationData}/>
              <Map_window/>
            </div>
            <div className="block lg:hidden">
              <Similar_produc productId={propertyData?.id || id || '12345'}/>
            </div>
          </div>
        </div>
      ) : (
        <div>
          Không tìm thấy sản phẩm!
        </div>
      )}
    </div>
  )
}

export default San_pham_ban_detail