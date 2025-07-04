'use client'

import HCMap from '@/components/element/HCMCmap';
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
    <div className="flex items-center justify-center">
        <HCMap geoJsonData={hcmGeoJson} />
    </div>
  );
}