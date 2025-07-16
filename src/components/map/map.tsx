import {useRef, useEffect} from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from './use-map.ts';
import type { OfferType, OfferDetailType, OffersType } from '../../types/offers';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const.ts';

type MapProps = {
  className?: string;
  offers: OffersType;
  activeOffer?: OfferType | OfferDetailType | null;
}

function Map({className, offers, activeOffer}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const city = offers.length > 0 ? offers[0].city : null;
  const map = useMap({mapRef, city});

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (map && offers.length > 0) {
      map.eachLayer((layer) => {
        if (layer instanceof leaflet.Marker) {
          map.removeLayer(layer);
        }
      });

      map.setView([offers[0].city.location.latitude, offers[0].city.location.longitude], offers[0].city.location.zoom);

      offers.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: (offer.id === activeOffer?.id)
              ? currentCustomIcon
              : defaultCustomIcon,
          })
          .addTo(map);
      });
    }
  }, [map, offers, activeOffer, currentCustomIcon, defaultCustomIcon]);

  return (
    <section
      className={`map ${className || ''}`}
      ref={mapRef}
    >
    </section>
  );
}

export default Map;
