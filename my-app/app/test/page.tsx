'use client'

import HCMap from '@/components/test_component';
interface CustomFeature {
  type: "Feature";
  properties: {
    gid: number;
    name: string;
  };
  geometry: {
    type: string;
    geometries: {
      type: string;
      coordinates: number[][][][];
    }[];
  };
}

interface CustomGeoJSON {
  type: "FeatureCollection";
  features: CustomFeature[];
}

// Sử dụng type assertion khi import
import rawData from '@/public/data/hcm.json';
const hcmGeoJson = rawData as CustomGeoJSON;


export default function MapPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Bản đồ Thành phố Hồ Chí Minh</h1>
      <div className="bg-base-100 p-6 rounded-box">
        <HCMap geoJsonData={hcmGeoJson} />
      </div>
      <div className="mt-4 text-center text-sm text-gray-500">
        Di chuột vào các phường/xã để xem chi tiết
      </div>
    </div>
  );
}