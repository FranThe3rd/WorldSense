import React, { useEffect,useState,useRef} from 'react'
import Map from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import './map.css'
import { MagnifyingGlass,ArrowLeft,ArrowRight } from 'phosphor-react';
import CrimeCard from '../../components/CrimeCard/CrimeCard';
import ArtificialButton from '../../components/ArtificalButton/ArtificialButton';
import DropDownButton from '../../components/DropDownButton/DropDownButton';
import { GoogleGenAI } from "@google/genai";
import Markdown from 'react-markdown'

import { MapContainer, TileLayer, Marker, Popup, Circle, Polygon, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import 'leaflet/dist/leaflet.css';
const MapPage = () => {

  const [apiData,setData] = useState([])
  const [displayData,setDisplayData] = useState({})
  const [artificialExplanation,setArtificialExplanation] = useState("")
  const [showInfoState,setShowInfoState] = useState(false)
  const [pageNumber,setPageNumber] = useState(1)
  const [pageCapacity,setPageCapacity] = useState(500)
  const [totalPages, setTotalPages] = useState(1);
  const [nameSearchState,setNameSearchState] = useState(false)
  const [nameText,setSearchNameText] = useState("")

  const geminiKey = String(process.env.REACT_APP_GOOGLE_KEY)
  const mapKey = String(process.env.REACT_APP_MAP_KEY)

  const ai = new GoogleGenAI({ apiKey: geminiKey });

  // This a function that simply generates content from google's LLM in order to display content
  async function main() {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: `Give detailed information as a ai analyzer, zero pleasantries on this information and state your name as "WorldSense AI Anaylzer, try to explain it in detail first give summary what it's about in a couple of sentence and take a deep dive on the information, data: ${JSON.stringify(displayData)}`,

    });
    console.log(response.text);
    setArtificialExplanation(response.text);

  }




  // This function called getData() just allows me to fetch my data from my own api that was created with .NET
  async function getData() {

    const url = nameSearchState != "" ? `https://localhost:7194/api/crime/name?text=${nameText}&page=${pageNumber}&pageSize=${pageCapacity}` :  `https://localhost:7194/api/crime/all?page=${pageNumber}&pageSize=${pageCapacity}`
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result)
      setData(result.data)
      setTotalPages(result.totalPages)
      console.log("My data array" , apiData)
    } catch (error) {
      console.error(error.message);
    }
  }



  // This just allows me to use the async function that is currently fetching for my data.

  useEffect(()=> {
    getData();
  },[pageNumber,nameText])


  useEffect(()=> {
    console.log(showInfoState)
  },[showInfoState])


  const decrementPage = () => {
    if (pageNumber <= 1) {
      setPageNumber(1)
    } else {
      setPageNumber(pageNumber -1)
    }
  }

  const handleNameSearchChange = (e) => {
    const value = e.target.value;
    setSearchNameText(value)
    setNameSearchState(value.length > 0);
  }


// Anything functions or variables below here are for the map

const center = [51.505, -0.09]
  



  return (
    <div className='map-page'>
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

    </MapContainer>
      <DropDownButton/>

      <div className="map-sidebar">
        <div className='map-input-div'>
          <MagnifyingGlass/>
          <input 

            className="searchInput" 
            type="text" 
            placeholder='Search for crime information here'
            value={nameText}
            onChange={handleNameSearchChange}

          />
        </div>

        <div className='map-display-info'>
          <div className='display-button-div'>
            <ArtificialButton 
              onClick={() => {setShowInfoState(!showInfoState); main()}}
              checked={showInfoState}
            /></div>
          <div className="display-information">
            <ul>
              {
                !showInfoState ? 
                  Object.entries(displayData).map(([key,value])=> (
                    <li className="data-card" key={key}>
                      {key} : {value}
                    </li>
                  ))
                  :
                  <Markdown>{artificialExplanation}</Markdown>
              }
            </ul>          </div>

        </div>
        <div className="map-page-buttons">

          <button onClick={()=> decrementPage()} className="left-button"><ArrowLeft color='white'/></button>

          <p>{pageNumber}/{totalPages}</p>
          <button onClick={()=> setPageNumber(pageNumber+1)}  className="right-button"><ArrowRight color='white'/></button>
          <input
            placeholder="Page Number"
            value = {pageNumber}
            onChange={(e) => { const val = Number(e.target.value); setPageNumber(val)}}
          />


          <input
            placeholder="Page Capacity"
            value = {pageCapacity}
            onChange={(e) => { const val = Number(e.target.value); setPageCapacity(val) }}
          />
        </div>
        <div className='display-cards-grid' > 

          {apiData.map((item,index)=> (

            <CrimeCard
              key={item.index}
              className="crime-card"
              subject={item.crimeCodeDesc}
              location={item.location}
              date={item.dateOccurred}
              onClick={()=>{setDisplayData(item);setShowInfoState(false); setArtificialExplanation("")}}
            />
          ))}


        </div>
      </div>


    </div>
  )
}

export default MapPage
