'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export interface place_infor {
  location: string,
  coordinate: [number, number]
  image: string | undefined
  title: string
}

interface mapComponentProps {
  places: place_infor[]
  allow_interact: boolean
}

const MapComponent = ({ places, allow_interact }: mapComponentProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const center: [number, number] = places[0].coordinate

  useEffect(() => {
    if (!mapContainer.current) return;

    // Avoid SSR
    if (typeof window === 'undefined') return;

    // Check if Mapbox token is available
    if (!process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
      console.warn('Mapbox token không được cấu hình');
      return;
    }

    // Khởi tạo bản đồ tại TP.HCM
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: center,
      zoom: 12,
      interactive: allow_interact
    });

    map.current.addControl(new mapboxgl.NavigationControl());

    const fetchMarkers = async () => {
      for (const place of places) {
        const [lng, lat] = place.coordinate
        if (lat && lng && map.current) {
          const popupContent = `
            <div class="p-2 max-w-xs text-sm text-gray-800">
              <h3 class="text-base font-semibold line-clamp-2 mb-1">${place.location}</h3>
              <img src="${place.image}" alt="${place.location}" class="rounded-md mb-2" />
              <p class="text-xs line-clamp-2">${place.title}.</p>
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