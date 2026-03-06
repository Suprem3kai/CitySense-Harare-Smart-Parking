import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

interface ParkingMarkerProps {
  spot: any;
  onSelect: (spot: any) => void;
}

export default function ParkingMarker({ spot, onSelect }: ParkingMarkerProps) {
  const icon = L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color: ${spot.status === 'available' ? '#28a745' : '#dc3545'}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>`,
    iconSize: [12, 12],
  });

  return (
    <Marker position={[spot.latitude, spot.longitude]} icon={icon}>
      <Popup>
        <div>
          <h4>{spot.road_name}</h4>
          <p>Zone: {spot.zone}</p>
          <p>Status: <strong>{spot.status}</strong></p>
          {spot.status === 'available' && (
            <button onClick={() => onSelect(spot)} style={styles.button}>
              Navigate Here
            </button>
          )}
        </div>
      </Popup>
    </Marker>
  );
}

const styles: any = {
  button: { padding: '8px 16px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};
