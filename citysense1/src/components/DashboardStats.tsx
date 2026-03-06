import { useEffect, useState } from 'react';
import { analyticsAPI } from '../services/api';

export default function DashboardStats() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    loadStats();
    const interval = setInterval(loadStats, 120000);
    return () => clearInterval(interval);
  }, []);

  const loadStats = async () => {
    try {
      const response = await analyticsAPI.getDashboard();
      setStats(response.data);
    } catch (err) {
      console.error('Failed to load stats');
    }
  };

  if (!stats) return null;

  return (
    <div style={styles.container}>
      <div style={styles.grid}>
        <div style={styles.stat}>
          <div style={styles.value}>{stats.total_spots}</div>
          <div style={styles.label}>Total Spots</div>
        </div>
        <div style={styles.stat}>
          <div style={{...styles.value, color: '#28a745'}}>{stats.available_spots}</div>
          <div style={styles.label}>Available</div>
        </div>
        <div style={styles.stat}>
          <div style={{...styles.value, color: '#dc3545'}}>{stats.occupied_spots}</div>
          <div style={styles.label}>Occupied</div>
        </div>
        <div style={styles.stat}>
          <div style={{...styles.value, color: '#007bff'}}>{stats.active_sessions}</div>
          <div style={styles.label}>Active Sessions</div>
        </div>
        <div style={styles.stat}>
          <div style={{...styles.value, color: '#ffc107'}}>{stats.unpaid_sessions}</div>
          <div style={styles.label}>Unpaid</div>
        </div>
        <div style={styles.stat}>
          <div style={{...styles.value, color: '#fd7e14'}}>{stats.incorrect_parking}</div>
          <div style={styles.label}>Incorrect Parking</div>
        </div>
      </div>
    </div>
  );
}

const styles: any = {
  container: {
    position: 'absolute',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
    zIndex: 1000,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '20px',
  },
  stat: {
    textAlign: 'center',
    minWidth: '100px',
  },
  value: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  label: {
    fontSize: '12px',
    color: '#7f8c8d',
    marginTop: '5px',
  }
};
