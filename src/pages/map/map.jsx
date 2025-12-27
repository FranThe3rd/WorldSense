import React, { useEffect,useState } from 'react'
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './map.css'
import { MagnifyingGlass,ArrowLeft,ArrowRight } from 'phosphor-react';
import CrimeCard from '../../components/CrimeCard/CrimeCard';
import ArtificialButton from '../../components/ArtificalButton/ArtificialButton';
import DropDownButton from '../../components/DropDownButton/DropDownButton';
import { GoogleGenAI } from "@google/genai";

const Map = () => {

  const [apiData,setData] = useState([])
  const [displayData,setDisplayData] = useState({})
  const [artificialExplanation,setArtificialExplanation] = useState("")
  const [showInfo,setShowInfo] = useState(false)



// This a function that simply generates content from google's LLM in order to display content
  const geminiKey = String(process.env.REACT_APP_GEMINI_KEY)

const ai = new GoogleGenAI({ apiKey: geminiKey });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Give detailed information as a ai analyzer, zero pleasantries on this information, data: ${JSON.stringify(displayData)}`,

  });
  console.log(response.text);
  setArtificialExplanation(response.text);
}




  // This function called getData() just allows me to fetch my data from my own api that was created with .NET
  async function getData() {
  const url = "https://localhost:7194/api/crime?page=1";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result)
    setData(result)
    console.log("My data array" , apiData)
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


  useEffect(()=> {
    console.log(showInfo)
  },[showInfo])


  return (
    <div className='map-page'>
      <DropDownButton/>

        <div id="map" style={{ width: "100%", height: "100vh" }}></div>
      <div className="map-sidebar">
        <div className='map-input-div'>
          <MagnifyingGlass/>
          <input className="searchInput" type="text" placeholder='Search for crime information here'/>
        </div>

        <div className='map-display-info'>
          <div className='display-button-div'><ArtificialButton onClick={()=>{setShowInfo(true);main()}}/></div>
          <div className="display-information">
            <ul>
{
  !showInfo ? 
    Object.entries(displayData).map(([key,value])=> (
      <li key={key}>
        {key} : {value}
      </li>
    ))
  :
    <li>{artificialExplanation}</li>
}
</ul>          </div>

        </div>
    <div className="map-page-buttons">

          <button className="left-button"><ArrowLeft color='white'/></button>
          <button className="right-button"><ArrowRight color='white'/></button>
    </div>
        <div className='display-cards-grid' > 

          {apiData.map((item,index)=> (
          
          <CrimeCard
            key={item.index}
            className="crime-card"
            subject={item.crimeCodeDesc}
            location={item.location}
            date={item.dateOccurred}
            onClick={()=>{setDisplayData(item);setShowInfo(false)}}
          />
          ))}
         

        </div>
      </div>

      
    </div>
  )
}

export default Map
