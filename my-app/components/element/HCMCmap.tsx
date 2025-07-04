"use client";

import { MapContainer, GeoJSON, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { GeoJsonObject } from 'geojson';
import { useEffect, useState, useRef } from 'react';

type FeatureProperties = {
  name: string;
};

type Feature = GeoJSON.Feature<GeoJSON.Geometry, FeatureProperties>;

export default function HCMap({ geoJsonData }: { geoJsonData: GeoJsonObject }) {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<string[]>([])
  const selectedFeatureRef = useRef<string[]>([]);

  useEffect(() => {
    selectedFeatureRef.current = selectedFeature;
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
          setSelectedFeature(preVal => (preVal.includes(feature.properties.name) ? [...preVal].filter(item => item !== feature.properties.name) : [...preVal, feature.properties.name]))
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
  }

  const secondaryStyle = {
    fillColor: '#3b82f6',
    weight: 1,
    color: 'white',
    dashArray: '2',
    fillOpacity: 0.4,
  }

  const style = (feature?: GeoJSON.Feature<GeoJSON.Geometry, FeatureProperties>) => {
    if (hoveredFeature === feature?.properties?.name) {
      return primaryStyle
    } else {
      if (feature?.properties?.name) {
        if (selectedFeature.includes(feature?.properties?.name)) {
          return primaryStyle
        } else {
          return secondaryStyle
        }
      }
    }
    return secondaryStyle
  };
  

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