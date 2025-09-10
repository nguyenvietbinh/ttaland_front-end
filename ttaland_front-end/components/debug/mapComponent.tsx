'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export interface place {
  location: string,
  coordinate: [number, number]
}

interface mapComponentProps {
  places: place[]
}

const MapComponent = ({ places }: mapComponentProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const center: [number, number] = (places.length === 1) ? places[0].coordinate : [106.660172, 10.762622]

  useEffect(() => {
    if (!mapContainer.current) return;

    // Avoid SSR
    if (typeof window === 'undefined') return;

    // Khởi tạo bản đồ tại TP.HCM
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: center,
      zoom: 12,
    });

    map.current.addControl(new mapboxgl.NavigationControl());

    const fetchMarkers = async () => {
      for (const place of places) {
        const [lng, lat] = place.coordinate
        if (lat && lng && map.current) {
          const popupContent = `
            <div class="p-2 max-w-xs text-sm text-gray-800">
              <h3 class="text-base font-semibold mb-1">${place.location}</h3>
              <img src="/img/example/showcase1.jpg" alt="${place.location}" class="rounded-md mb-2" />
              <p class="text-xs">Đây là mô tả chi tiết cho địa điểm <strong>${place.location}</strong>.</p>
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