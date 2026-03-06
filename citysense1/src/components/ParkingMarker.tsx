import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

interface ParkingMarkerProps {
  spot: any;
  onSelect: (spot: any) => void;
}

export default function ParkingMarker({ spot, onSelect }: ParkingMarkerProps) {
  const getMarkerColor = () => {
    return spot.status === 'available' ? '#27ae60' : '#e74c3c';
  };

  const getBorderColor = () => {
    if (spot.parking_status === 'overstayed') return '#8e44ad';
    if (spot.parking_status === 'incorrect') return '#e67e22';
    if (spot.payment_status === 'unpaid') return '#f39c12';
    return 'white';
  };

  const icon = L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background-color: ${getMarkerColor()}; 
      width: 16px; 
      height: 16px; 
      border: 3px solid ${getBorderColor()};
      box-shadow: 0 0 5px rgba(0,0,0,0.4);
    "></div>`,
    iconSize: [16, 16],
  });

  const formatTime = (time: string) => {
    if (!time) return 'N/A';
    return new Date(time).toLocaleString();
  };

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
            <span style={{color: spot.status === 'available' ? '#27ae60' : '#e74c3c', fontWeight: '600'}}>
              {' '}{spot.status.toUpperCase()}
            </span>
          </div>
          {spot.payment_status && (
            <div style={styles.info}>
              <strong>Payment:</strong> 
              <span style={{color: spot.payment_status === 'paid' ? '#27ae60' : '#f39c12'}}>
                {' '}{spot.payment_status.toUpperCase()}
              </span>
            </div>
          )}
          {spot.parking_status && (
            <div style={styles.info}>
              <strong>Parking:</strong> 
              <span style={{
                color: spot.parking_status === 'correct' ? '#27ae60' : 
                       spot.parking_status === 'overstayed' ? '#8e44ad' : '#e67e22'
              }}>
                {' '}{spot.parking_status.toUpperCase()}
              </span>
            </div>
          )}
          {spot.session_start && (
            <div style={styles.info}>
              <strong>Started:</strong> {formatTime(spot.session_start)}
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
    minWidth: '220px',
  },
  title: {
    margin: '0 0 12px 0',
    fontSize: '16px',
    color: '#2c3e50',
    fontWeight: '600',
  },
  info: {
    marginBottom: '7px',
    fontSize: '13px',
    lineHeight: '1.4',
  },
  button: {
    width: '100%',
    padding: '10px 16px',
    background: '#3498db',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    marginTop: '12px',
    fontSize: '13px',
    fontWeight: '600',
  }
};
