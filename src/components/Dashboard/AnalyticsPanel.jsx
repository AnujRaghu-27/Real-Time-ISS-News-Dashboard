import React from 'react';
import TelemetryCard from './TelemetryCard';

const AnalyticsPanel = ({ history = [] }) => {
  // Generate sparkline data from history with safety checks
  const speedData = history?.map(p => ({ value: p.speed })) || [];
  const altData = history?.map(p => ({ value: p.altitude })) || [];
  const latData = history?.map(p => ({ value: p.lat })) || [];
  
  const current = history.length > 0 ? history[history.length - 1] : {};

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <TelemetryCard 
        title="Orbital Velocity" 
        value={current.speed ? Math.round(current.speed).toLocaleString() : '27,600'} 
        unit="km/h"
        data={speedData}
        color="#2563eb"
      />
      <TelemetryCard 
        title="Current Altitude" 
        value={current.altitude ? current.altitude.toFixed(1) : '408.5'} 
        unit="km"
        data={altData}
        color="#7c3aed"
      />
      <TelemetryCard 
        title="Latitudinal Drift" 
        value={current.lat ? current.lat.toFixed(2) : '0.00'} 
        unit="deg"
        data={latData}
        color="#10b981"
      />
    </div>
  );
};

export default AnalyticsPanel;
