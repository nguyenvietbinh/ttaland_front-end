'use client'
import Area_map_component from "@/components/utils/area_map_component"
import { point, booleanPointInPolygon } from '@turf/turf';

interface Area_map_component_props {
  district: string
}

export interface CustomFeature {
  type: "Feature";
  properties: {
    gid: number;
    name: string;
  };
  geometry: {
    type: "GeometryCollection";
    geometries: {
      type: "MultiPolygon";
      coordinates: number[][][][];
    }[];
  };
}

interface CustomGeoJSON {
  type: "FeatureCollection";
  features: CustomFeature[];
}

import rawData from '@/public/data/hcm.json';
import { useEffect, useState } from "react";
const HCMGeoJSON = rawData as CustomGeoJSON;




const Select_location_on_map = ({district} : Area_map_component_props) => {
  const [coordinate, setCoordinate] = useState<[number, number]>()
  const [isValidCoordinate, setIsValidCoordinate] = useState<boolean>(true)
  const [feature, setFeature] = useState<CustomFeature[]>() 

  useEffect(() => {
    for (let i = 0; i < HCMGeoJSON.features.length; i ++) {
      if (HCMGeoJSON.features[i].properties.name === district) {
        setFeature([HCMGeoJSON.features[i]])
      }
    }
  }, [district])


  useEffect(() => {
    if (coordinate && feature) {
    const pt = point(coordinate)
      if (booleanPointInPolygon(pt, feature[0].geometry.geometries[0])) {
        setIsValidCoordinate(true)
      } else {
        setIsValidCoordinate(false)
      }
    }
  }, [coordinate])

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
      {feature && (
        <Area_map_component
          coordinate={[106.6933149, 10.7736503]}
          districtGeoJSONFeature={feature}
          onCenterChange={(lngLat) => {
            setCoordinate(lngLat)
          }}
        />
      )}
      <div className="absolute top-4 left-4">
        {coordinate && (
          <div className="bg-white p-2 rounded-md">
            <div>Longtitute: {coordinate[0]}</div>
            <div>Latitute: {coordinate[1]}</div>
          </div>
        )}
      </div>
      <div className="absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%]">
        {isValidCoordinate ? (
        <svg width="24" height="24" viewBox="0 0 24 24" aria-label="Plus" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        ) : (
          <svg 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle 
              cx="12" cy="12" r="10" 
              fill="none" 
              stroke="currentColor" 
              stroke-width="2"
            />
            <line 
              x1="5" y1="5" x2="19" y2="19" 
              stroke="currentColor" 
              stroke-width="2" 
              stroke-linecap="round"
            />
          </svg>
        )}
      </div>
      <div className="absolute bottom-4 right-4">
        <button disabled={!isValidCoordinate} className="btn bg-red-600 text-xl">Tiếp</button>
      </div>
    </div>

  )
}

export default Select_location_on_map