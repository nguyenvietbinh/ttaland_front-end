"use client";

import { MapContainer, GeoJSON, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { GeoJsonObject } from 'geojson';
import { useState } from 'react';

type FeatureProperties = {
  name: string;
  // Thêm các thuộc tính khác nếu cần
};

type Feature = GeoJSON.Feature<GeoJSON.Geometry, FeatureProperties>;

export default function HCMap({ geoJsonData }: { geoJsonData: GeoJsonObject }) {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  const onEachFeature = (feature: Feature, layer: L.Layer) => {
    if (feature.properties && feature.properties.name) {
      layer.bindTooltip(feature.properties.name);
      
      layer.on({
        mouseover: (e) => {
          setHoveredFeature(feature.properties.name);
          const layer = e.target;
          layer.setStyle({
            weight: 2,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7,
            fillColor: '#f97316', // Màu cam khi hover
          });
          layer.bringToFront();
        },
        mouseout: (e) => {
          setHoveredFeature(null);
          const layer = e.target;
          layer.setStyle({
            weight: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.5,
            fillColor: '#3b82f6', // Màu xanh mặc định
          });
        },
      });
    }
  };


  return (
    <div className="h-[600px] w-full rounded-box shadow-lg">
      <MapContainer 
        center={[10.762622, 106.660172]} 
        zoom={11} 
        style={{ height: '100%', width: '100%', borderRadius: 'var(--rounded-box)' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeoJSON
          data={geoJsonData}
          onEachFeature={onEachFeature}
        />
      </MapContainer>
    </div>
  );
}