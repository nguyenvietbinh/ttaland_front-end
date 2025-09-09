'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

interface mapComponentProps {
  locations: string[],
}

const MapComponent = ({ locations }: mapComponentProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Avoid SSR
    if (typeof window === 'undefined') return;

    // Khởi tạo bản đồ tại TP.HCM
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [106.660172, 10.762622], // TP.HCM
      zoom: 12,
    });

    map.current.addControl(new mapboxgl.NavigationControl());

    const fetchMarkers = async () => {
      for (const location of locations) {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            location
          )}.json?access_token=${mapboxgl.accessToken}`
        );
        const data = await response.json();
        const [lng, lat] = data.features[0]?.center || [];

        if (lat && lng && map.current) {
          const popupContent = `
            <div class="p-2 max-w-xs text-sm text-gray-800">
              <h3 class="text-base font-semibold mb-1">${location}</h3>
              <img src="/img/example/showcase1.jpg" alt="${location}" class="rounded-md mb-2" />
              <p class="text-xs">Đây là mô tả chi tiết cho địa điểm <strong>${location}</strong>.</p>
            </div>
          `;

          new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .setPopup(new mapboxgl.Popup(
              { 
                offset: 25,
                closeButton: false
              }
            ).setHTML(popupContent))
            .addTo(map.current);

            
          
        }
      }
    };

    fetchMarkers();


    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <div className="h-full w-full">
      <div ref={mapContainer} className="h-full w-full" />
    </div>
  );
}


export default MapComponent