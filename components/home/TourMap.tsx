'use client';

import { useState } from 'react';
import Map, { Marker, Popup, Source, Layer } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const tourCities = [
  {
    id: 'paris',
    name: 'Paris',
    description:
      'Showcases, rencontres partenaires, panels et sessions media pour ouvrir la tournee europeenne.',
    longitude: 2.3522,
    latitude: 48.8566,
  },
  {
    id: 'rome',
    name: 'Rome',
    description:
      'Leadership, coaching, performances selectionnees et networking international.',
    longitude: 12.4964,
    latitude: 41.9028,
  },
];

const routeGeoJson = {
  type: 'Feature' as const,
  properties: {},
  geometry: {
    type: 'LineString' as const,
    coordinates: tourCities.map((city) => [city.longitude, city.latitude]),
  },
};

export default function TourMap() {
  const [activeCity, setActiveCity] = useState<string | null>(null);

  if (!MAPBOX_TOKEN) {
    return null;
  }

  return (
    <div className="mt-16 h-[480px] overflow-hidden rounded-[2rem] border border-white/10">
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          longitude: 7.4,
          latitude: 45.4,
          zoom: 3.8,
        }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        attributionControl={false}
      >
        <Source id="ft2027-route" type="geojson" data={routeGeoJson}>
          <Layer
            id="ft2027-route-line"
            type="line"
            paint={{
              'line-color': '#C9A84C',
              'line-width': 2,
              'line-dasharray': [2, 2],
            }}
          />
        </Source>

        {tourCities.map((city) => (
          <Marker
            key={city.id}
            longitude={city.longitude}
            latitude={city.latitude}
            anchor="bottom"
          >
            <button
              type="button"
              onClick={() => setActiveCity(city.id)}
              aria-label={city.name}
              className="h-4 w-4 rounded-full border-2 border-black bg-[#C9A84C] shadow-[0_0_12px_rgba(201,168,76,0.8)]"
            />
          </Marker>
        ))}

        {tourCities
          .filter((city) => city.id === activeCity)
          .map((city) => (
            <Popup
              key={city.id}
              longitude={city.longitude}
              latitude={city.latitude}
              anchor="top"
              onClose={() => setActiveCity(null)}
              closeButton
              closeOnClick={false}
              className="ft2027-map-popup"
            >
              <p className="text-sm font-black uppercase tracking-[0.2em] text-black">
                {city.name}
              </p>
              <p className="mt-1 max-w-[220px] text-xs leading-5 text-black/70">
                {city.description}
              </p>
            </Popup>
          ))}
      </Map>
    </div>
  );
}
