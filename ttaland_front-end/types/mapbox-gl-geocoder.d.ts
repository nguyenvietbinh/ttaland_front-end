// types/mapbox-gl-geocoder.d.ts
declare module '@mapbox/mapbox-gl-geocoder' {
  import mapboxgl from 'mapbox-gl';

  export interface GeocoderOptions {
    accessToken: string;
    mapboxgl: typeof mapboxgl;
    marker?: boolean | mapboxgl.MarkerOptions;
    placeholder?: string;
    zoom?: number;
    flyTo?: boolean;
    [key: string]: any;
  }

  export default class MapboxGeocoder {
    constructor(options: GeocoderOptions);
    on(type: string, fn: (...args: any[]) => void): void;
    off(type: string, fn: (...args: any[]) => void): void;
    addTo(map: mapboxgl.Map): void;
    setInput(value: string): void;
    clear(): void;
    query(query: string): void;
  }
}
