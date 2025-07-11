'use client';

import dynamic from 'next/dynamic';
import L from 'leaflet';
import { GeoJsonObject } from 'geojson';
import { useEffect, useState, useRef } from 'react';

// Dynamic import các component từ react-leaflet
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const GeoJSON = dynamic(
  () => import('react-leaflet').then((mod) => mod.GeoJSON),
  { ssr: false }
);

type FeatureProperties = {
  name: string;
};

type Feature = GeoJSON.Feature<GeoJSON.Geometry, FeatureProperties>;

type HCMCmapProps = {
  onSendData: (data: string[]) => void;
  reset: boolean
};

export default function HCMap({ geoJsonData, onSendData, reset }: { geoJsonData: GeoJsonObject } & HCMCmapProps) {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);
  const selectedFeatureRef = useRef<string[]>([]);
  
  useEffect(() => {
    setSelectedFeature([])
  }, [reset])

  useEffect(() => {
    setIsClient(true);
    selectedFeatureRef.current = selectedFeature;
    onSendData(selectedFeatureRef.current)
  }, [selectedFeature]);

  const onEachFeature = (feature: Feature, layer: L.Layer) => {
    if (feature.properties && feature.properties.name) {
      layer.bindTooltip(feature.properties.name);

      layer.on({
        mouseover: (e) => {
          setHoveredFeature(feature.properties.name);
          const layer = e.target;
          layer.bringToFront();
        },
        mouseout: (e) => {
          setHoveredFeature(null);
          const layer = e.target;
          if (!selectedFeatureRef.current.includes(feature.properties.name)) {
            layer.bringToBack();
          }
        },
        click: (e) => {
          setSelectedFeature(preVal => 
            preVal.includes(feature.properties.name) 
              ? [...preVal].filter(item => item !== feature.properties.name) 
              : [...preVal, feature.properties.name]
          );
          const layer = e.target;
          layer.bringToFront();
        }
      });
    }
  };

  const primaryStyle = {
    fillColor: '#f97316',
    weight: 2,
    color: '#666',
    dashArray: '',
    fillOpacity: 0.7,
  };

  const secondaryStyle = {
    fillColor: '#3b82f6',
    weight: 1,
    color: 'white',
    dashArray: '2',
    fillOpacity: 0.4,
  };

  const style = (feature?: Feature) => {
    if (!feature?.properties?.name) return secondaryStyle;
    
    if (hoveredFeature === feature.properties.name) {
      return primaryStyle;
    }
    
    return selectedFeatureRef.current.includes(feature.properties.name) 
      ? primaryStyle 
      : secondaryStyle;
  };

  if (!isClient) return null;

  return (
    <div className="h-[600px] w-full">
      <MapContainer 
        center={[10.762622, 106.660172]} 
        zoom={11} 
        scrollWheelZoom={false}
        doubleClickZoom={false}
        touchZoom={false}  
        className='h-full w-full rounded-lg'
      >
        
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeoJSON
          data={geoJsonData}
          style={style}
          onEachFeature={onEachFeature}
        />
      </MapContainer>
    </div>
  );
}