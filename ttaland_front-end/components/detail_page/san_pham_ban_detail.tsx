'use client'
import { useEffect, useState } from "react";
import Media_displayer from "./media_displayer/media_displayer";
import Detail_info from "./detail_infor/detail_infor";
import { detail_infor } from "./detail_infor/detail_infor";
import { MediaItem } from "./media_displayer/media_displayer";
import Similar_produc from "./similar_product/similar_product";
import Watched_product from "./watched_product/watched_product";
import { convertYouTubeToEmbed, convertTikTokToEmbed } from "../../utils/media-utils";
import { apiService } from "../../services/apiService";
import { Apartment, Townhouse, Villa, LandLot } from "@/types/product";
import Map_window from "./map_window";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { get_price_per_square_meter } from "../listing/show_property/san_pham_ban_show_property";
import Detail_sidebar from "./detail_sidebar";

interface San_pham_ban_details_props {
  id: string
}

const San_pham_ban_detail = ({ id }: San_pham_ban_details_props) => {
  const [propertyData, setPropertyData] = useState<Townhouse | Villa | LandLot | Apartment>();
  const [isLoading, setIsLoading] = useState(true);
  const [mediaData, setMediaData] = useState<MediaItem[]>()
  const [informationData, setInformationData] = useState<detail_infor>()
  const { addWatchedProduct } = useLocalStorage()

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const result = await apiService.getPropertyDetails(id);
        addWatchedProduct(result.id)
        setPropertyData(result);
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
      area: apiData.area_formatted,
      location: apiData.location,
      description: apiData.description,
      latitude: apiData.latitude,
      longitude: apiData.longitude
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
      if ('road_frontage_formatted' in productDetail && productDetail.road_frontage_formatted) {
        result.road_frontage_formatted = productDetail.road_frontage_formatted;
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
    <div className="">
      {propertyData && mediaData && informationData ? (
        <div className="main_container">
          <div className="content_container flex flex-col gap-8">
            <div>
              <Media_displayer mediaItems={mediaData} place_infor={{location: propertyData.location, coordinate: [Number(propertyData.longitude), Number(propertyData.latitude)], image: propertyData.media[0].file_url, title: propertyData.title }}/>
              <p className="text-4xl mt-4">{propertyData.title}</p>
              <p className="text-xl text-gray-800">{propertyData.location}</p>
            </div>
            <div className="flex justify-start gap-8 lg:gap-16 border-y-1 border-gray-500 py-2">
              <div>
                <p className="text-2xl text-gray-500">Khoảng giá</p>
                <p className="text-3xl ">{propertyData.price_formatted}</p>
                <p className="text-gray-800">(~{get_price_per_square_meter(Number(propertyData.price), Number(propertyData.area))}/m²)</p>
              </div>
              <div>
                <p className="text-2xl text-gray-500">Diện tích</p>
                <p className="text-3xl ">{propertyData.area_formatted}</p>
              </div>
              {informationData.bedrooms && (
                <div>
                  <p className="text-2xl text-gray-500">Phòng ngủ</p>
                  <p className="text-3xl  text-center">{informationData.bedrooms}</p>
                </div>
              )}
              {informationData.bathrooms && (
                <div>
                  <p className="text-2xl text-gray-500">Phòng Tắm</p>
                  <p className="text-3xl  text-center">{informationData.bathrooms}</p>
                </div>
              )}
            </div>
            <Detail_info information_data={informationData}/>
            <Map_window place_infor={{location: propertyData.location, coordinate: [Number(propertyData.longitude), Number(propertyData.latitude)], image: propertyData.media[0].file_url, title: propertyData.title }}/>
            <Similar_produc productId={id}/>
            <Watched_product/>
          </div>
          <Detail_sidebar/>
        </div>
      ) : (
        <div className="main_container">
          Không tìm thấy sản phẩm!
        </div>
      )}
    </div>
  )
}

export default San_pham_ban_detail