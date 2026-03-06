import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MapView from './pages/MapView';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/map" element={<MapView />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/map" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
