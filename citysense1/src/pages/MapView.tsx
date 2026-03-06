import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ParkingMarker from '../components/ParkingMarker';
import MapLegend from '../components/MapLegend';
import DashboardStats from '../components/DashboardStats';
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
    html: '<div style="background-color: #007bff; width: 18px; height: 18px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.4);"></div>',
    iconSize: [18, 18],
  });

  return (
    <div style={styles.container}>
      <DashboardStats />
      <MapContainer center={[-17.8292, 31.0522]} zoom={14} style={styles.map}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {spots.map(spot => (
          <ParkingMarker key={spot.id} spot={spot} onSelect={handleSelectSpot} />
        ))}
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup>Your Location</Popup>
          </Marker>
        )}
        {route && <Polyline positions={route} color="#007bff" weight={3} />}
        <MapLegend />
      </MapContainer>
      
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
        <div style={{...styles.panel, top: '200px'}}>
          <h3 style={styles.panelTitle}>Active Session</h3>
          <div style={styles.panelInfo}>
            <p>Spot: {activeSession.parking_spot}</p>
          </div>
          <button onClick={endParking} style={{...styles.button, background: '#dc3545'}}>
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
    top: '120px',
    left: '20px',
    background: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
    zIndex: 1000,
    minWidth: '280px',
  },
  panelTitle: {
    margin: '0 0 15px 0',
    fontSize: '18px',
    color: '#2c3e50',
  },
  panelInfo: {
    fontSize: '14px',
    lineHeight: '1.6',
  },
  button: {
    width: '100%',
    padding: '12px',
    background: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '15px',
    fontSize: '14px',
    fontWeight: 'bold',
  }
};
