import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Satellite icon
const issIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/1118/1118833.png', // Higher quality satellite icon
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20],
});

// Component to recenter map
function RecenterMap({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView([position.lat, position.lon], map.getZoom());
    }
  }, [position, map]);
  return null;
}

const ISSTrackerMap = ({ position, history = [] }) => {
  const pathCoordinates = history.map(p => [p.lat, p.lon]);

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer 
        center={position ? [position.lat, position.lon] : [0, 0]} 
        zoom={3} 
        className="w-full h-full"
        scrollWheelZoom={true}
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        
        {/* Orbit Trail */}
        <Polyline 
          positions={pathCoordinates} 
          pathOptions={{ 
            color: '#ef4444', 
            weight: 2, 
            opacity: 0.6,
            dashArray: '5, 10' 
          }} 
        />

        {/* Current Position Marker */}
        {position && (
          <Marker position={[position.lat, position.lon]} icon={issIcon} />
        )}

        <RecenterMap position={position} />
      </MapContainer>
    </div>
  );
};

export default ISSTrackerMap;
