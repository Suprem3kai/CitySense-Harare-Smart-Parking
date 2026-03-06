export default function MapLegend() {
  return (
    <div style={styles.container}>
      <h4 style={styles.title}>Legend</h4>
      <div style={styles.item}>
        <div style={{...styles.marker, background: '#28a745'}}></div>
        <span>Available</span>
      </div>
      <div style={styles.item}>
        <div style={{...styles.marker, background: '#dc3545'}}></div>
        <span>Occupied</span>
      </div>
      <div style={styles.item}>
        <div style={{...styles.marker, background: '#dc3545', border: '3px solid #ffc107'}}></div>
        <span>Unpaid Parking</span>
      </div>
      <div style={styles.item}>
        <div style={{...styles.marker, background: '#dc3545', border: '3px solid #fd7e14'}}></div>
        <span>Incorrect Parking</span>
      </div>
      <div style={styles.item}>
        <div style={{...styles.marker, background: '#007bff'}}></div>
        <span>Your Location</span>
      </div>
    </div>
  );
}

const styles: any = {
  container: {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    background: 'white',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    zIndex: 1000,
    minWidth: '180px'
  },
  title: {
    margin: '0 0 10px 0',
    fontSize: '14px',
    fontWeight: 'bold'
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
    fontSize: '12px'
  },
  marker: {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    marginRight: '8px',
    border: '2px solid white',
    boxShadow: '0 0 3px rgba(0,0,0,0.3)'
  }
};
