import React, { useEffect, useState, useRef } from 'react'
import './RestaurantMap.css'
import { MagnifyingGlass, ArrowLeft, ArrowRight, House } from 'phosphor-react';
import CrimeCard from '../../../components/CrimeCard/CrimeCard';
import ArtificialButton from '../../../components/ArtificalButton/ArtificialButton';
import DropDownButton from '../../../components/DropDownButton/DropDownButton';
import { GoogleGenAI } from "@google/genai";
import Markdown from 'react-markdown'
import { MapContainer, TileLayer, Marker, Popup, Circle, Polygon, useMapEvents, useMap, CircleMarker } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';


const RestaurantMapPage = () => {

  // For some stupid reason this makes my css work for the markers...
  // Source - https://stackoverflow.com/a
  // Posted by ghybs
  // Retrieved 2025-12-31, License - CC BY-SA 4.0
  delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  });

  const [apiData, setData] = useState([])
  const [displayData, setDisplayData] = useState({})
  const [artificialExplanation, setArtificialExplanation] = useState("")
  const [showInfoState, setShowInfoState] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)
  const [pageCapacity, setPageCapacity] = useState(500)
  const [totalPages, setTotalPages] = useState(1);
  const [nameSearchState, setNameSearchState] = useState(false)
  const [nameText, setSearchNameText] = useState("")
  const [flyPosition, setFlyPosition] = useState(null);

  const geminiKey = String(process.env.REACT_APP_GOOGLE_KEY)
  const mapKey = String(process.env.REACT_APP_MAP_KEY)

  const ai = new GoogleGenAI({ apiKey: geminiKey });

  // This a function that simply generates content from google's LLM in order to display content
  async function main() {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: `State your name as "WorldSense AI Anaylzer, try to explain it in detail first give summary what it's about in a couple of sentence and explain the information as if you were talking to a person in a conversation, you don't have to explain each field just explain what it is, data: ${JSON.stringify(displayData)}`,

    });
    console.log(response.text);
    setArtificialExplanation(response.text);

  }




  // This function called getData() just allows me to fetch my data from my own api that was created with .NET
  async function getData() {

    const url = nameSearchState != "" ? `https://localhost:7194/api/restaurant/name?text=${nameText}&page=${pageNumber}&pageSize=${pageCapacity}` : `https://localhost:7194/api/restaurant/all?page=${pageNumber}&pageSize=${pageCapacity}`
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result)
      setData(result.data)
      setTotalPages(result.totalPages)
      console.log("My data array", apiData)
    } catch (error) {
      console.error(error.message);
    }
  }



  // This just allows me to use the async function that is currently fetching for my data. It also updates depending when my pageNumber changes, or the text on searchbar

  useEffect(() => {
    getData();
  }, [pageNumber, nameText])


  // This prevents my api from getting errors since it can't take negative values, so whenever the page is lessthan or equal to one, it returns 1
  const decrementPage = () => {
    if (pageNumber <= 1) {
      setPageNumber(1)
    } else {
      setPageNumber(pageNumber - 1)
    }
  }

  const handleNameSearchChange = (e) => {
    const value = e.target.value;
    setSearchNameText(value)
    setNameSearchState(value.length > 0);
  }


  // Any functions or variables below here are for the map

  const center = [51.505, -0.09] // This is the starting location of the map




  // This function allows you to fly directly to the location of the card you selected

  const FlyToMarker = ({ position }) => {
    const map = useMap();

    if (position) {
      map.flyTo(position, 16, { duration: 1.5 });
    }

    return null;
  };




  return (
    <div className='restaurant-map-page'>
      <MapContainer center={center} zoom={13} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {apiData && apiData.map((restaurant, index) => {
          

          return (
            <Marker key={index} position={[restaurant.latitude, restaurant.longitude]}>
              <Popup>
                <div>
                  <h3>{restaurant.title}</h3>
                  <p>{`Rating: ${restaurant.rating}`}</p>
                    <p>{restaurant.category}</p>
                    <p>{restaurant.address}</p>



                </div>
              </Popup>
            </Marker>
          );
        })}

        {flyPosition && <FlyToMarker position={flyPosition} />}
      </MapContainer>
      <DropDownButton />

      <div className="restaurant-map-sidebar">
        <div className='restaurant-map-input-div'>
          <MagnifyingGlass />
          <input

            className="restaurant-searchInput"
            type="text"
            placeholder='Search for specific restaurant names here'
            value={nameText}
            onChange={handleNameSearchChange}

          />
        </div>

        <div className='restaurant-map-display-info'>
          <div className='restaurant-display-button-div'>
            <ArtificialButton
              onClick={() => { setShowInfoState(!showInfoState); main() }}
              checked={showInfoState}
            /></div>
          <div className="restaurant-display-information">
            <ul>
              {
                !showInfoState ?
                  Object.entries(displayData).map(([key, value]) => (
                    <li className="restaurant-data-card" key={key}>
                      {key} : {value}
                    </li>
                  ))
                  :
                  <Markdown>{artificialExplanation}</Markdown>
              }
            </ul>
          </div>

        </div>
        <div className="restaurant-map-page-buttons">

          <button onClick={() => decrementPage()} className="left-button"><ArrowLeft color='white' /></button>

          <p>{pageNumber}/{totalPages}</p>
          <button onClick={() => setPageNumber(pageNumber + 1)} className="right-button"><ArrowRight color='white' /></button>
          <input
            placeholder="Page Number"
            value={pageNumber}
            onChange={(e) => { const val = Number(e.target.value); setPageNumber(val) }}
          />


          <input
            placeholder="Page Capacity"
            value={pageCapacity}
            onChange={(e) => { const val = Number(e.target.value); setPageCapacity(val) }}
          />
        </div>
        <div className='restaurant-display-cards-grid' >

          {apiData.map((item, index) => (

            <CrimeCard
              key={index}
              className="restaurant-card"
              subject={item.title}
              location={item.category}
              date={item.address}
              onClick={() => { setDisplayData(item); setShowInfoState(false); setArtificialExplanation("");setFlyPosition([parseFloat(item.latitude), parseFloat(item.longitude)]); }}
            />
          ))}


        </div>
      </div>








    </div>
  )
}

export default RestaurantMapPage
