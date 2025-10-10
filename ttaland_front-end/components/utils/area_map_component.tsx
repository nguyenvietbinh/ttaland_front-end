'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;
import { CustomFeature } from '../dang_san_pham/steps/select_location_on_map';

interface Area_map_component_props {
  coordinate: [number, number]
  onCenterChange?: (lngLat: [number, number]) => void
  districtGeoJSONFeature: CustomFeature[]
}

const Area_map_component = ({ coordinate, onCenterChange, districtGeoJSONFeature }: Area_map_component_props) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const center: [number, number] = coordinate;

  useEffect(() => {
    if (!mapContainer.current) return;
    if (typeof window === 'undefined') return;

    if (!process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
      console.warn('Mapbox token không được cấu hình');
      return;
    }

    // Khởi tạo bản đồ
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center,
      zoom: 12,
    });

    map.current.addControl(new mapboxgl.NavigationControl());

    map.current.on('load', () => {
      // 2️⃣ Add GeoJSON source
      map.current!.addSource('district', {
        type: 'geojson',
        data: {
          type: "FeatureCollection",
          features: [districtGeoJSONFeature[0]]
        }
      });

      // 3️⃣ Fill layer (màu nhạt bên trong)
      map.current!.addLayer({
        id: 'district-fill',
        type: 'fill',
        source: 'district',
        paint: {
          'fill-color': '#0080ff',
          'fill-opacity': 0.1,
        },
      });

      // 4️⃣ Line layer (viền nét đứt)
      map.current!.addLayer({
        id: 'district-outline',
        type: 'line',
        source: 'district',
        paint: {
          'line-color': '#ff0000',
          'line-width': 2,
          'line-dasharray': [2, 2], // nét đứt
        },
      });

      const bounds = new mapboxgl.LngLatBounds();
      districtGeoJSONFeature[0].geometry.geometries[0].coordinates.forEach((polygon) => {
        polygon[0].forEach(([lng, lat]) => bounds.extend([lng, lat]));
      });

      map.current!.fitBounds(bounds, { padding: 40 });
    });


    // Lắng nghe sự kiện moveend để lấy center mới
    map.current.on('moveend', () => {
      if (!map.current) return;
      const center = map.current.getCenter();
      const lngLat: [number, number] = [center.lng, center.lat];
      if (onCenterChange) onCenterChange(lngLat);
    });

    return () => {
      map.current?.remove();
    };
  }, [districtGeoJSONFeature]);

  return (
    <div className="h-full w-full">
      <div ref={mapContainer} className="h-full w-full" />
    </div>
  );
};

export default Area_map_component;
