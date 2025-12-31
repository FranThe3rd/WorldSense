import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polygon, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapClick = () => {
  useMapEvents({
    click(e) {
      alert(`You clicked at ${e.latlng}`);
    },
  });
  return null;
};

const Test = () => {
  const center = [51.505, -0.09];

  return (
    <MapContainer center={center} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      <Marker position={[51.5, -0.09]}>
        <Popup>Hello world! I am a popup.</Popup>
      </Marker>

      <Circle
        center={[51.508, -0.11]}
        radius={500}
        pathOptions={{ color: 'red', fillColor: '#f03', fillOpacity: 0.5 }}
      >
        <Popup>I am a circle.</Popup>
      </Circle>

      <Polygon positions={[[51.509, -0.08], [51.503, -0.06], [51.51, -0.047]]}>
        <Popup>I am a polygon.</Popup>
      </Polygon>

      <MapClick />
    </MapContainer>
  );
};

export default Test;
