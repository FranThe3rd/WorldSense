import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/home';
import Navbar from './components/Navbar/Navbar.jsx'
import CrimeMapPage from './pages/map/CrimeMap/CrimeMap.jsx';
import ElectricMapPage from './pages/map/ElectricMap/ElectricMap.jsx';
import RestaurantMapPage from './pages/map/RestaurantMap/RestaurantMap.jsx';

import 'leaflet/dist/leaflet.css';
import './App.css'
function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map-page" element={<CrimeMapPage />} />
        <Route path="/electric-page" element={<ElectricMapPage />} />
        <Route path="/restaurants-page" element={<RestaurantMapPage />} />


        
      </Routes>
    </Router>
  );
}

export default App;
