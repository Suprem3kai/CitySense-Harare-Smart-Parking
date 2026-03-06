import { useEffect, useState } from 'react';
import { analyticsAPI, sessionAPI } from '../services/api';
import { formatDuration } from '../utils/helpers';

export default function Dashboard() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [sessions, setSessions] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [analyticsRes, sessionsRes] = await Promise.all([
        analyticsAPI.getDashboard(),
        sessionAPI.getUserSessions()
      ]);
      setAnalytics(analyticsRes.data);
      setSessions(sessionsRes.data);
    } catch (err) {
      console.error('Failed to load dashboard');
    }
  };

  return (
    <div style={styles.container}>
      <h1>Dashboard</h1>
      {analytics && (
        <div style={styles.grid}>
          <div style={styles.card}>
            <h3>Total Spots</h3>
            <p style={styles.number}>{analytics.total_spots}</p>
          </div>
          <div style={styles.card}>
            <h3>Available</h3>
            <p style={styles.number}>{analytics.available_spots}</p>
          </div>
          <div style={styles.card}>
            <h3>Occupied</h3>
            <p style={styles.number}>{analytics.occupied_spots}</p>
          </div>
          <div style={styles.card}>
            <h3>Occupancy Rate</h3>
            <p style={styles.number}>{analytics.occupancy_rate}%</p>
          </div>
        </div>
      )}
      <h2>Your Sessions</h2>
      <div style={styles.table}>
        {sessions.map(session => (
          <div key={session.id} style={styles.row}>
            <p>Spot: {session.parking_spot}</p>
            <p>Duration: {session.duration ? formatDuration(session.duration) : 'Active'}</p>
            <p>Status: {session.payment_status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles: any = {
  container: { padding: '40px', maxWidth: '1200px', margin: '0 auto' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' },
  card: { background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' },
  number: { fontSize: '36px', fontWeight: 'bold', color: '#007bff', margin: '10px 0' },
  table: { background: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' },
  row: { padding: '20px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }
};
