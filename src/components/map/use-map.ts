import { useEffect, useState, useRef } from 'react';
import leaflet from 'leaflet';

type UseMapType = {
  mapRef: React.RefObject<HTMLElement>;
  center?: { lat: number; lng: number };
  zoom?: number;
}

function useMap({ mapRef, center, zoom = 10 }: UseMapType) {
  const [map, setMap] = useState<leaflet.Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current && !isRenderedRef.current && center) {
      console.log('Initializing map with center:', center);
      
      try {
        const instance = leaflet.map(mapRef.current, {
          center: {
            lat: center.lat,
            lng: center.lng,
          },
          zoom: zoom,
        });

        leaflet
          .tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
              maxZoom: 18,
            },
          )
          .addTo(instance);

        setMap(instance);
        isRenderedRef.current = true;
        console.log('Map initialized successfully');
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    }
  }, [mapRef, center, zoom]);

  return map;
}

export default useMap;