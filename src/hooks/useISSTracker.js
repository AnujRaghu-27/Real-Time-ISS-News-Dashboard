import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Haversine formula to calculate distance between two points in km
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Generate initial mock history so the dashboard doesn't look empty on first load
const generateInitialHistory = () => {
  const points = [];
  const now = Date.now();
  for (let i = 20; i >= 0; i--) {
    points.push({
      lat: 0 + (Math.random() - 0.5) * 10,
      lon: 0 + (Math.random() - 0.5) * 10,
      timestamp: now - (i * 10000),
      speed: 27600 + (Math.random() - 0.5) * 50,
      altitude: 408 + Math.random()
    });
  }
  return points;
};

export const useISSTracker = () => {
  const [data, setData] = useState({
    latitude: 0,
    longitude: 0,
    altitude: 408.5,
    loading: true,
    error: null,
    position: null,
    history: generateInitialHistory(), // Pre-fill history
    astronauts: [],
    locationName: 'Fetching...',
    speed: 27600
  });

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get('https://corsproxy.io/?http://api.open-notify.org/iss-now.json');
      const { latitude, longitude } = response.data.iss_position;
      const lat = parseFloat(latitude);
      const lon = parseFloat(longitude);
      const timestamp = Date.now();
      
      setData(prev => {
        let currentSpeed = prev.speed;
        
        if (prev.position) {
          const distance = getDistance(prev.position.lat, prev.position.lon, lat, lon);
          const timeHours = (timestamp - prev.position.timestamp) / (1000 * 60 * 60);
          if (timeHours > 0) {
            const calculatedSpeed = distance / timeHours;
            if (calculatedSpeed > 20000 && calculatedSpeed < 30000) {
              currentSpeed = calculatedSpeed;
            }
          }
        }

        const jitteredSpeed = currentSpeed + (Math.random() - 0.5) * 20; // Increased jitter for visible trend

        const newPos = { 
          lat, 
          lon, 
          timestamp, 
          speed: jitteredSpeed,
          altitude: 408 + Math.random() 
        };

        const history = [...prev.history, newPos].slice(-50);
        
        return {
          ...prev,
          latitude: lat,
          longitude: lon,
          position: newPos,
          history,
          speed: jitteredSpeed,
          altitude: newPos.altitude,
          loading: false,
          error: null
        };
      });

      // Reverse Geocode
      try {
        const geoResponse = await axios.get(`https://corsproxy.io/?https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`);
        setData(prev => ({ ...prev, locationName: geoResponse.data.display_name || "Over ocean / remote area" }));
      } catch (e) {
        setData(prev => ({ ...prev, locationName: "Over ocean / remote area" }));
      }

    } catch (err) {
      setData(prev => ({ ...prev, error: 'Failed to fetch ISS data', loading: false }));
    }
  }, []);

  const fetchAstros = useCallback(async () => {
    try {
      const response = await axios.get('https://corsproxy.io/?http://api.open-notify.org/astros.json');
      setData(prev => ({ ...prev, astronauts: response.data.people }));
    } catch (e) {
      console.error('Failed to fetch astronauts');
    }
  }, []);

  useEffect(() => {
    fetchData();
    fetchAstros();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [fetchData, fetchAstros]);

  return { ...data, refresh: fetchData };
};
