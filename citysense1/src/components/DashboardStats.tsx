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

  const StatCard = ({ value, label, color }: any) => (
    <div style={{...styles.card, borderLeft: `3px solid ${color}`}}>
      <div style={{...styles.value, color}}>{value}</div>
      <div style={styles.label}>{label}</div>
    </div>
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>UZ Campus Parking Dashboard</h2>
      <div style={styles.grid}>
        <StatCard value={stats.total_spots} label="Total Spots" color="#2c3e50" />
        <StatCard value={stats.available_spots} label="Available" color="#27ae60" />
        <StatCard value={stats.occupied_spots} label="Occupied" color="#e74c3c" />
        <StatCard value={stats.active_sessions} label="Active Sessions" color="#3498db" />
        <StatCard value={stats.paid_sessions} label="Paid" color="#27ae60" />
        <StatCard value={stats.unpaid_sessions} label="Unpaid" color="#f39c12" />
        <StatCard value={stats.incorrect_parking} label="Incorrect" color="#e67e22" />
        <StatCard value={stats.overstayed} label="Overstayed" color="#8e44ad" />
      </div>
      <div style={styles.metrics}>
        <div style={styles.metric}>
          <span style={styles.metricLabel}>Occupancy Rate:</span>
          <span style={{...styles.metricValue, color: stats.occupancy_rate > 80 ? '#e74c3c' : '#27ae60'}}>
            {stats.occupancy_rate}%
          </span>
        </div>
        <div style={styles.metric}>
          <span style={styles.metricLabel}>Avg Parking Time:</span>
          <span style={styles.metricValue}>{stats.average_parking_time} min</span>
        </div>
      </div>
    </div>
  );
}

const styles: any = {
  container: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    right: '20px',
    background: 'white',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    zIndex: 1000,
    maxWidth: '1400px',
    margin: '0 auto',
  },
  header: {
    margin: '0 0 20px 0',
    fontSize: '20px',
    color: '#2c3e50',
    fontWeight: '600',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: '15px',
    marginBottom: '20px',
  },
  card: {
    background: '#f8f9fa',
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  value: {
    fontSize: '26px',
    fontWeight: '600',
    lineHeight: '1',
  },
  label: {
    fontSize: '12px',
    color: '#7f8c8d',
  },
  metrics: {
    display: 'flex',
    gap: '30px',
    padding: '15px',
    background: '#f8f9fa',
  },
  metric: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  metricLabel: {
    fontSize: '14px',
    color: '#7f8c8d',
  },
  metricValue: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#2c3e50',
  }
};
