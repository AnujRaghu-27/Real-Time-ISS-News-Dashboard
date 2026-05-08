import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Higher quality satellite icon
const issIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2043/2043425.png', 
  iconSize: [45, 45],
  iconAnchor: [22, 22],
  popupAnchor: [0, -22],
});

// Component to recenter map
function RecenterMap({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.panTo([position.lat, position.lon], { animate: true, duration: 1 });
    }
  }, [position, map]);
  return null;
}

const ISSTrackerMap = ({ position, history = [] }) => {
  const pathCoordinates = history.map(p => [p.lat, p.lon]);

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer 
        center={position ? [position.lat, position.lon] : [20, 0]} 
        zoom={3} 
        className="w-full h-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; CARTO'
        />
        
        {/* Orbit Trail */}
        <Polyline 
          positions={pathCoordinates} 
          pathOptions={{ 
            color: '#f43f5e', 
            weight: 3, 
            opacity: 0.5,
            dashArray: '10, 10'
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
