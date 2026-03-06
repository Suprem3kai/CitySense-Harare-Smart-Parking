export default function MapLegend() {
  return (
    <div style={styles.container}>
      <h4 style={styles.title}>Legend</h4>
      <div style={styles.item}>
        <div style={{...styles.marker, background: '#27ae60'}}></div>
        <span>Available</span>
      </div>
      <div style={styles.item}>
        <div style={{...styles.marker, background: '#e74c3c'}}></div>
        <span>Occupied</span>
      </div>
      <div style={styles.item}>
        <div style={{...styles.marker, background: '#e74c3c', border: '3px solid #f39c12'}}></div>
        <span>Unpaid Session</span>
      </div>
      <div style={styles.item}>
        <div style={{...styles.marker, background: '#e74c3c', border: '3px solid #e67e22'}}></div>
        <span>Incorrect Parking</span>
      </div>
      <div style={styles.item}>
        <div style={{...styles.marker, background: '#e74c3c', border: '3px solid #8e44ad'}}></div>
        <span>Overstayed Vehicle</span>
      </div>
      <div style={styles.item}>
        <div style={{...styles.marker, background: '#3498db'}}></div>
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
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    zIndex: 1000,
    minWidth: '200px'
  },
  title: {
    margin: '0 0 12px 0',
    fontSize: '14px',
    fontWeight: '600',
    color: '#2c3e50'
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    fontSize: '13px'
  },
  marker: {
    width: '18px',
    height: '18px',
    marginRight: '10px',
    border: '2px solid white',
    boxShadow: '0 0 3px rgba(0,0,0,0.3)',
    flexShrink: 0
  }
};
