import React, { useEffect } from 'react'
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './map.css'
import { MagnifyingGlass } from 'phosphor-react';
import CrimeCard from '../../components/CrimeCard/CrimeCard';



const Map = () => {

  // This function called getData() just allows me to fetch my data from my own api that was created with .NET
  async function getData() {
  const url = "https://localhost:7194/api/crime?page=1";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}


 // This useEffect just initializes the MapLibre, by using their free open-source api
 
    useEffect(()=> {
        const map = new maplibregl.Map({
    container: 'map', // container id
        style: 'https://tiles.openfreemap.org/styles/bright',
    center: [0, 0], // starting position [lng, lat]
    zoom: 1.5 // starting zoom
});
    },[])



  // This just allows me to use the async function that is currently fetching for my data.

  useEffect(()=> {
    getData();
  },[])


  return (
    <div className='map-page'>

        <div id="map" style={{ width: "100%", height: "100vh" }}></div>
      <div className="map-sidebar">
        <div className='map-input-div'>
          <MagnifyingGlass/>
          <input className="searchInput" type="text" placeholder='Search for crime information here'/>
        </div>

        <div className='map-display-info'>
          test
        </div>

        <div className='display-cards-grid' > 

          <CrimeCard
            className="crime-card"
            subject="Bob The Builder Robbed You"
            location="ur mama house"
            date="Happened yesterday at ur butcheeks location"
          />

          
         

        </div>
      </div>

      
    </div>
  )
}

export default Map
