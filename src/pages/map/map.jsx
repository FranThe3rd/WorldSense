import React, { useEffect,useState,useRef} from 'react'
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './map.css'
import { MagnifyingGlass,ArrowLeft,ArrowRight } from 'phosphor-react';
import CrimeCard from '../../components/CrimeCard/CrimeCard';
import ArtificialButton from '../../components/ArtificalButton/ArtificialButton';
import DropDownButton from '../../components/DropDownButton/DropDownButton';
import { GoogleGenAI } from "@google/genai";
import Markdown from 'react-markdown'
const Map = () => {

  const [apiData,setData] = useState([])
  const [displayData,setDisplayData] = useState({})
  const [artificialExplanation,setArtificialExplanation] = useState("")
  const [showInfoState,setShowInfoState] = useState(false)
  const [pageNumber,setPageNumber] = useState(1)
  const [pageCapacity,setPageCapacity] = useState(500)
  const [totalPages, setTotalPages] = useState(1);
  const [inputValue1, setInputValue1] = useState("")
  const [inputValue2,setInputValue2] = useState("")


  const geminiKey = String(process.env.REACT_APP_GEMINI_KEY)
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
    const url = `https://localhost:7194/api/crime?page=${pageNumber}&pageSize=${pageCapacity}`;
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


  // This useEffect just initializes the MapLibre, by using their free open-source api

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = new maplibregl.Map({
        container: mapRef.current,
        style: 'https://tiles.openfreemap.org/styles/bright',
        center: [0, 0],
        zoom: 1.5
      });
    }
  }, []);

  // This useEffect adds a marker from the longitude and latitude from my api.

  useEffect(() => {
    if (!mapInstanceRef.current || !apiData) return;

    apiData.forEach((item) => {
      if (item.longitude && item.latitude) {
        new maplibregl.Marker()
          .setLngLat([Number(item.longitude), Number(item.latitude)])
          .addTo(mapInstanceRef.current);
      }
    });
  }, [apiData]);


  // This just allows me to use the async function that is currently fetching for my data.

  useEffect(()=> {
    getData();
  },[pageNumber])


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



  return (
    <div className='map-page'>
      <DropDownButton/>

      <div id="map" ref={mapRef} style={{ width: "100%", height: "100vh" }}></div>
      <div className="map-sidebar">
        <div className='map-input-div'>
          <MagnifyingGlass/>
          <input className="searchInput" type="text" placeholder='Search for crime information here'/>
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
            onChange={(e) => { const val = Number(e.target.value); setInputValue2(val); setPageCapacity(val) }}
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

export default Map
