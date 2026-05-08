import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Reliable ISS Icon with fixed aspect ratio
const issIcon = new L.Icon({
  iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/International_Space_Station.svg',
  iconSize: [50, 30],
  iconAnchor: [25, 15],
});

// Component to handle map view updates and constraints
function MapController({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.panTo([position.lat, position.lon], { animate: true, duration: 1.5 });
    }
  }, [position, map]);

  return null;
}

const ISSTrackerMap = ({ position, history = [] }) => {
  const pathCoordinates = history.map(p => [p.lat, p.lon]);

  // Constraining bounds to prevent horizontal repetition
  const worldBounds = L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180));

  return (
    <div className="w-full h-full relative z-0 bg-[#f8f9fa]">
      <MapContainer
        center={position ? [position.lat, position.lon] : [20, 0]}
        zoom={3}
        minZoom={2}
        maxZoom={8}
        className="w-full h-full"
        scrollWheelZoom={true}
        zoomControl={false}
        maxBounds={worldBounds}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; CARTO'
          noWrap={true} // Prevents horizontal repetition
          bounds={worldBounds}
        />

        {/* Orbit Trail */}
        {pathCoordinates.length > 1 && (
          <Polyline
            positions={pathCoordinates}
            pathOptions={{
              color: '#ef4444',
              weight: 2,
              opacity: 0.5,
              dashArray: '5, 10'
            }}
          />
        )}

        {/* ISS Marker */}
        {position && (
          <Marker
            position={[position.lat, position.lon]}
            icon={issIcon}
          />
        )}

        <MapController position={position} />
      </MapContainer>
    </div>
  );
};

export default ISSTrackerMap;
