import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/home';
import Navbar from './components/Navbar/Navbar.jsx'
import MapPage from './pages/map/map.jsx';
import './App.css'
function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map-page" element={<MapPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
