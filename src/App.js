import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/home';
import Navbar from './components/Navbar/Navbar.jsx'
import CrimeMapPage from './pages/map/CrimeMap/CrimeMap.jsx';

import 'leaflet/dist/leaflet.css';
import './App.css'
function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map-page" element={<CrimeMapPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
