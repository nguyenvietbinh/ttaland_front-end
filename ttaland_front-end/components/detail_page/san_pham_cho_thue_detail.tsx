'use client'
import { useEffect, useState } from "react";
import Media_displayer from "./media_displayer/media_displayer";
import Detail_info from "./detail_infor/detail_infor";
import { MediaItem } from "./media_displayer/media_displayer";
import { convertYouTubeToEmbed, convertTikTokToEmbed } from "../../utils/media-utils";
import { getProduct } from "@/network/GET/product";
import { ProductType } from "@/types/product";
import { formatVietnameseNumber } from "../listing/show_property/san_pham_ban_show_property";
import Map_window from "./map_window";
import Detail_sidebar from "../sidebar/detail_sidebar";

interface San_pham_cho_thue_details_props {
  id: string,
  table: 'townhouses' | 'villas' | 'land' | 'apartments'
}

const San_pham_cho_thue_detail = ({ id, table }: San_pham_cho_thue_details_props) => {
  const [propertyData, setPropertyData] = useState<ProductType>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const result = await getProduct.getProductWithID(id, table);
        setPropertyData(result);
      } catch (err) {
        console.error(err instanceof Error ? err.message : 'Failed to load property data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPropertyData();
  }, [id]);

  const get_media_data_from_api = (apiData: ProductType): MediaItem[] => {
    const data: MediaItem[] = [];
    if (apiData.videoUrl) {
      if (apiData.videoUrl.includes('youtube')) {
        const embedUrl = convertYouTubeToEmbed(apiData.videoUrl);
        if (embedUrl) {
          data.push({
            type: 'youtube' as const,
            url: apiData.videoUrl,
            embedUrl: embedUrl
          });
        }
      } else if (apiData.videoUrl.includes('tiktok')) {
      const embedUrl = convertTikTokToEmbed(apiData.videoUrl);
        if (embedUrl) {
          data.push({
            type: 'tiktok' as const,
            url: apiData.videoUrl,
            embedUrl: embedUrl
          });
        }
      }
    }
    apiData.images.forEach((mediaItem) => {
      data.push({
        type: 'image' as const,
        url: mediaItem
      });
    });
    return data;
  };



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
      {propertyData ? (
        <div className="main_container">
          <div className="content_container flex flex-col gap-8">
            <div>
              <Media_displayer mediaItems={get_media_data_from_api(propertyData)} place_infor={{location: propertyData.location, coordinate: [Number(propertyData.coordinate.longitude), Number(propertyData.coordinate.latitude)], title: propertyData.title }}/>
              <p className="text-4xl mt-4">{propertyData.title}</p>
              <p className="text-xl text-gray-800">{propertyData.location}</p>
            </div>
            <div className="flex justify-start gap-8 lg:gap-16 border-y-1 border-gray-500 py-2">
              <div>
                <p className="text-2xl text-gray-500">Khoảng giá</p>
                <p className="text-3xl ">{formatVietnameseNumber(Number(propertyData.price))}/Tháng</p>
              </div>
              <div>
                <p className="text-2xl text-gray-500">Diện tích</p>
                <p className="text-3xl ">{propertyData.area} m²</p>
              </div>
              {(propertyData.type !== 'land') && (
                <div>
                  <p className="text-2xl text-gray-500">Phòng ngủ</p>
                  <p className="text-3xl  text-center">{propertyData.bedroom}</p>
                </div>
              )}
              {(propertyData.type !== 'land') && (
                <div>
                  <p className="text-2xl text-gray-500">Phòng Tắm</p>
                  <p className="text-3xl  text-center">{propertyData.bathroom}</p>
                </div>
              )}
            </div>
            <Detail_info information_data={propertyData}/>
            <Map_window place_infor={{location: propertyData.location, coordinate: [Number(propertyData.coordinate.longitude), Number(propertyData.coordinate.latitude)], title: propertyData.title }}/>
          </div>
          <Detail_sidebar/>
        </div>
      ) : (
        <div>
          Không tìm thấy sản phẩm!
        </div>
      )}
    </div>
  )
}

export default San_pham_cho_thue_detail