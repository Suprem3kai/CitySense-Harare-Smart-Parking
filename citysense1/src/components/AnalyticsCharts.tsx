import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { analyticsAPI } from '../services/api';

export default function AnalyticsCharts() {
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

  const occupancyData = [
    { name: 'Available', value: stats.available_spots },
    { name: 'Occupied', value: stats.occupied_spots },
  ];

  const paymentData = [
    { name: 'Paid', value: stats.paid_sessions },
    { name: 'Unpaid', value: stats.unpaid_sessions },
  ];

  const zoneData = Object.entries(stats.zone_distribution || {}).map(([name, value]) => ({
    name: name.replace('UZ ', ''),
    value
  }));

  const COLORS = ['#27ae60', '#e74c3c', '#3498db', '#f39c12', '#8e44ad'];

  return (
    <div style={styles.container}>
      <div style={styles.chartCard}>
        <h4 style={styles.chartTitle}>Parking Occupancy</h4>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={occupancyData} cx="50%" cy="50%" outerRadius={60} fill="#8884d8" dataKey="value" label>
              {occupancyData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div style={styles.chartCard}>
        <h4 style={styles.chartTitle}>Payment Status</h4>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={paymentData} cx="50%" cy="50%" outerRadius={60} fill="#8884d8" dataKey="value" label>
              {paymentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? '#27ae60' : '#f39c12'} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div style={{...styles.chartCard, gridColumn: 'span 2'}}>
        <h4 style={styles.chartTitle}>Zone Distribution</h4>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={zoneData}>
            <XAxis dataKey="name" tick={{fontSize: 11}} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3498db" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const styles: any = {
  container: {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '15px',
    zIndex: 1000,
  },
  chartCard: {
    background: 'white',
    padding: '15px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    width: '300px',
  },
  chartTitle: {
    margin: '0 0 12px 0',
    fontSize: '14px',
    fontWeight: '600',
    color: '#2c3e50',
  }
};
