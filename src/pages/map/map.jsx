import React, { useEffect } from 'react'
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';




const Map = () => {

    useEffect(()=> {
        const map = new maplibregl.Map({
    container: 'map', // container id
        style: 'https://tiles.openfreemap.org/styles/bright',
    center: [0, 0], // starting position [lng, lat]
    zoom: 1.5 // starting zoom
});
    },[])





  return (
    <div className='map-page'>
        <div id="map" style={{ width: "100%", height: "100vh" }}></div>

      
    </div>
  )
}

export default Map
