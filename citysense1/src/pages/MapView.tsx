import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ParkingMarker from '../components/ParkingMarker';
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
    html: '<div style="background-color: #007bff; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white;"></div>',
    iconSize: [16, 16],
  });

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2>CitySense</h2>
        <div style={styles.stats}>
          <p>Total Spots: {spots.length}</p>
          <p>Available: {spots.filter(s => s.status === 'available').length}</p>
        </div>
        {selectedSpot && (
          <div style={styles.panel}>
            <h3>Selected Spot</h3>
            <p>{selectedSpot.road_name}</p>
            <p>Zone: {selectedSpot.zone}</p>
            {userLocation && (
              <p>Distance: {calculateDistance(userLocation.lat, userLocation.lng, selectedSpot.latitude, selectedSpot.longitude).toFixed(2)} km</p>
            )}
            {!activeSession && <button onClick={startParking} style={styles.button}>Start Parking</button>}
          </div>
        )}
        {activeSession && (
          <div style={styles.panel}>
            <h3>Active Session</h3>
            <p>Spot: {activeSession.parking_spot}</p>
            <button onClick={endParking} style={{...styles.button, background: '#dc3545'}}>End Parking</button>
          </div>
        )}
      </div>
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
        {route && <Polyline positions={route} color="blue" />}
      </MapContainer>
    </div>
  );
}

const styles: any = {
  container: { display: 'flex', height: '100vh' },
  sidebar: { width: '300px', background: '#2c3e50', color: 'white', padding: '20px', overflowY: 'auto' },
  map: { flex: 1 },
  stats: { background: '#34495e', padding: '15px', borderRadius: '8px', marginBottom: '20px' },
  panel: { background: '#34495e', padding: '15px', borderRadius: '8px', marginTop: '20px' },
  button: { width: '100%', padding: '12px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }
};
