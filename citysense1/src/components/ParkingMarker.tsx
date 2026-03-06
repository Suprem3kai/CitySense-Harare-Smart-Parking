import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

interface ParkingMarkerProps {
  spot: any;
  onSelect: (spot: any) => void;
}

export default function ParkingMarker({ spot, onSelect }: ParkingMarkerProps) {
  const getMarkerColor = () => {
    return spot.status === 'available' ? '#28a745' : '#dc3545';
  };

  const getBorderColor = () => {
    if (spot.parking_status === 'incorrect') return '#fd7e14';
    if (spot.payment_status === 'unpaid') return '#ffc107';
    return 'white';
  };

  const icon = L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background-color: ${getMarkerColor()}; 
      width: 14px; 
      height: 14px; 
      border-radius: 50%; 
      border: 3px solid ${getBorderColor()};
      box-shadow: 0 0 5px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [14, 14],
  });

  return (
    <Marker position={[spot.latitude, spot.longitude]} icon={icon}>
      <Popup>
        <div style={styles.popup}>
          <h4 style={styles.title}>{spot.road_name}</h4>
          <div style={styles.info}>
            <strong>ID:</strong> {spot.sensor_id}
          </div>
          <div style={styles.info}>
            <strong>Zone:</strong> {spot.zone}
          </div>
          <div style={styles.info}>
            <strong>Status:</strong> 
            <span style={{color: spot.status === 'available' ? '#28a745' : '#dc3545', fontWeight: 'bold'}}>
              {' '}{spot.status.toUpperCase()}
            </span>
          </div>
          {spot.payment_status && (
            <div style={styles.info}>
              <strong>Payment:</strong> 
              <span style={{color: spot.payment_status === 'paid' ? '#28a745' : '#ffc107'}}>
                {' '}{spot.payment_status.toUpperCase()}
              </span>
            </div>
          )}
          {spot.parking_status && (
            <div style={styles.info}>
              <strong>Parking:</strong> 
              <span style={{color: spot.parking_status === 'correct' ? '#28a745' : '#fd7e14'}}>
                {' '}{spot.parking_status.toUpperCase()}
              </span>
            </div>
          )}
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
  popup: {
    minWidth: '200px',
  },
  title: {
    margin: '0 0 10px 0',
    fontSize: '16px',
    color: '#2c3e50',
  },
  info: {
    marginBottom: '6px',
    fontSize: '13px',
  },
  button: {
    width: '100%',
    padding: '8px 16px',
    background: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
    fontSize: '13px',
  }
};
