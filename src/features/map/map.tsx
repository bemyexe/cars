import React from 'react';
import * as maptilersdk from '@maptiler/sdk';

import {useAppSelector} from '../../shared/store';
import {carsSelectors} from '../../shared/store/cars';
import type {Car} from '../vehicle-manager/api';

import '@maptiler/sdk/dist/maptiler-sdk.css';
import './map.scss';

maptilersdk.config.apiKey = import.meta.env.VITE_MAPTILER_API_KEY;

const Map = () => {
  const mapContainer = React.useRef<HTMLDivElement>(null);
  const map = React.useRef<maptilersdk.Map | null>(null);
  const loading = useAppSelector(carsSelectors.selectCarsLoading);
  const cars = useAppSelector(carsSelectors.selectCars);
  const [center, setCenter] = React.useState({lng: 0, lat: 0});
  const [zoom] = React.useState(9.79);

  React.useEffect(() => {
    const getCenter = (cars: Car[]) => {
      const avgLat =
        cars.reduce((sum, car) => sum + car.latitude, 0) / cars.length;
      const avgLng =
        cars.reduce((sum, car) => sum + car.longitude, 0) / cars.length;
      return {lng: avgLng, lat: avgLat};
    };
    if (cars.length > 0) {
      setCenter(getCenter(cars));
    }

    const mapInstance = new maptilersdk.Map({
      container: mapContainer.current!,
      style: maptilersdk.MapStyle.STREETS,
      center: [center.lng, center.lat],
      zoom: zoom,
    });

    map.current = mapInstance;

    mapInstance.on('load', () => {
      cars.forEach((car) => {
        if (car.latitude && car.longitude) {
          new maptilersdk.Marker({color: `${car.color}`})
            .setLngLat([car.longitude, car.latitude])
            .setPopup(
              new maptilersdk.Popup().setHTML(`
          <div>
            <p>${car.name}</p>
            <p>${car.model}</p>
            <p>Year:${car.year}</p>
            <p>Price:${car.price}</p>
          </div>
        `)
            )
            .addTo(mapInstance);
        }
      });
    });
  }, [cars, center.lat, center.lng, zoom]);

  if (loading) {
    return <div>map loading</div>;
  }

  return (
    <div className="map-wrapper">
      <div className="container">
        <div ref={mapContainer} className="map" />
      </div>
    </div>
  );
};

export default Map;
