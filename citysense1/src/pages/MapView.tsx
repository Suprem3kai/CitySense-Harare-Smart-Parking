import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ParkingMarker from '../components/ParkingMarker';
import MapLegend from '../components/MapLegend';
import DashboardStats from '../components/DashboardStats';
import AnalyticsCharts from '../components/AnalyticsCharts';
import { parkingAPI, sessionAPI } from '../services/api';
import { getUserLocation, calculateDistance } from '../utils/helpers';

export default function MapView() {
  const [spots, setSpots] = useState<any[]>([]);
  const [userLocation, setUserLocation] = useState<any>(null);
  const [selectedSpot, setSelectedSpot] = useState<any>(null);
  const [activeSession, setActiveSession] = useState<any>(null);
  const [route, setRoute] = useState<any>(null);

  useEffect(() => {
    loadSpots();
    getUserLocation().then(setUserLocation).catch(() => {});
    const interval = setInterval(loadSpots, 120000);
    return () => clearInterval(interval);
  }, []);

  const loadSpots = async () => {
    try {
      const response = await parkingAPI.getSpots();
      setSpots(response.data);
    } catch (err) {
      console.error('Failed to load spots');
    }
  };

  const handleSelectSpot = (spot: any) => {
    setSelectedSpot(spot);
    if (userLocation) {
      setRoute([[userLocation.lat, userLocation.lng], [spot.latitude, spot.longitude]]);
    }
  };

  const startParking = async () => {
    if (!selectedSpot) return;
    try {
      const response = await sessionAPI.start(selectedSpot.id);
      setActiveSession(response.data);
      alert('Parking session started!');
      loadSpots();
    } catch {
      alert('Failed to start session');
    }
  };

  const endParking = async () => {
    if (!activeSession) return;
    try {
      await sessionAPI.end(activeSession.id);
      setActiveSession(null);
      alert('Parking session ended!');
      loadSpots();
    } catch {
      alert('Failed to end session');
    }
  };

  const userIcon = L.divIcon({
    className: 'user-marker',
    html: '<div style="background-color: #3498db; width: 20px; height: 20px; border: 3px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.5);"></div>',
    iconSize: [20, 20],
  });

  return (
    <div style={styles.container}>
      <DashboardStats />
      <MapContainer center={[-17.7840, 31.0535]} zoom={16} style={styles.map}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {spots.map(spot => (
          <ParkingMarker key={spot.id} spot={spot} onSelect={handleSelectSpot} />
        ))}
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup>Your Location</Popup>
          </Marker>
        )}
        {route && <Polyline positions={route} color="#3498db" weight={4} />}
        <MapLegend />
      </MapContainer>
      
      <AnalyticsCharts />
      
      {selectedSpot && (
        <div style={styles.panel}>
          <h3 style={styles.panelTitle}>Selected Spot</h3>
          <div style={styles.panelInfo}>
            <p><strong>{selectedSpot.road_name}</strong></p>
            <p>Zone: {selectedSpot.zone}</p>
            <p>ID: {selectedSpot.sensor_id}</p>
            {userLocation && (
              <p>Distance: {calculateDistance(userLocation.lat, userLocation.lng, selectedSpot.latitude, selectedSpot.longitude).toFixed(2)} km</p>
            )}
          </div>
          {!activeSession && (
            <button onClick={startParking} style={styles.button}>Start Parking</button>
          )}
        </div>
      )}
      
      {activeSession && (
        <div style={{...styles.panel, top: '220px'}}>
          <h3 style={styles.panelTitle}>Active Session</h3>
          <div style={styles.panelInfo}>
            <p>Spot: {activeSession.parking_spot}</p>
          </div>
          <button onClick={endParking} style={{...styles.button, background: '#e74c3c'}}>
            End Parking
          </button>
        </div>
      )}
    </div>
  );
}

const styles: any = {
  container: {
    position: 'relative',
    height: '100vh',
    width: '100vw',
  },
  map: {
    height: '100%',
    width: '100%',
  },
  panel: {
    position: 'absolute',
    top: '200px',
    right: '20px',
    background: 'white',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    zIndex: 1000,
    minWidth: '280px',
  },
  panelTitle: {
    margin: '0 0 15px 0',
    fontSize: '16px',
    color: '#2c3e50',
    fontWeight: '600',
  },
  panelInfo: {
    fontSize: '14px',
    lineHeight: '1.8',
  },
  button: {
    width: '100%',
    padding: '12px',
    background: '#27ae60',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    marginTop: '15px',
    fontSize: '14px',
    fontWeight: '600',
  }
};
