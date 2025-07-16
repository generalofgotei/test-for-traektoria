import { useRef, useEffect } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from './use-map';
import { Vehicle } from '../../types';

type MapProps = {
  className?: string;
  vehicles: Vehicle[];
  activeVehicle?: Vehicle | null;
}

function Map({ className, vehicles, activeVehicle }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  
  // Используем координаты первой машины для центрирования карты
  const center = vehicles.length > 0 ? {
    lat: vehicles[0].latitude,
    lng: vehicles[0].longitude
  } : null;
  
  const map = useMap({ mapRef, center, zoom: 11 });

  const URL_MARKER_DEFAULT = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
  const URL_MARKER_CURRENT = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png';

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  useEffect(() => {
    if (map && vehicles.length > 0) {
      console.log('Adding markers for vehicles:', vehicles);
      
      // Удаляем старые маркеры
      map.eachLayer((layer) => {
        if (layer instanceof leaflet.Marker) {
          map.removeLayer(layer);
        }
      });

      // Добавляем маркеры для каждой машины
      vehicles.forEach((vehicle) => {
        const marker = leaflet
          .marker([vehicle.latitude, vehicle.longitude], {
            icon: (vehicle.id === activeVehicle?.id)
              ? currentCustomIcon
              : defaultCustomIcon,
          });

        // Попап с информацией о машине
        marker.bindPopup(`
          <div>
            <h3>${vehicle.name}</h3>
            <p>Model: ${vehicle.model}</p>
            <p>Year: ${vehicle.year}</p>
            <p>Price: $${vehicle.price.toLocaleString()}</p>
            <p>Color: ${vehicle.color}</p>
          </div>
        `);

        marker.addTo(map);
      });

      // Центрируем карту по первой машине
      map.setView([vehicles[0].latitude, vehicles[0].longitude], 11);
    }
  }, [map, vehicles, activeVehicle, currentCustomIcon, defaultCustomIcon]);

  // Если нет данных
  if (vehicles.length === 0) {
    return (
      <section className={`map ${className || ''}`}>
        <div className= 'leaflet-error'>
          Нет данных для отображения на карте
        </div>
      </section>
    );
  }

  return (
    <section
      className={`map ${className || ''}`}
      ref={mapRef}
    >
    </section>
  );
}

export default Map;