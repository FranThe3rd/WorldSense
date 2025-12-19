import './home.css'
import worldMap from '../../assets/map.svg'
import { useState } from 'react';


export const Home = () => {

    const [active,setActive] = useState(null)


    const buttonActive = (topic) => {
        setActive(topic);
    };



    return (
        <div className='Home'>
            <div className='home-text-div'>
                <h1 className='title'>World Sense</h1>
                <p className='caption1'>Discover information about the world that is not known</p>
                <p className='caption2'>
                    World Sense is an interactive, map-based platform that brings together public data from multiple trusted sources. Explore FBI Most Wanted listings, crime statistics, and other real-world information, all visualized on a single interactive map to help you better understand what’s happening around you in real time.
                </p>
                <div className='home-button-div'>
                <button className='get-started-btn'>Get Started</button>
                <button className='signup-btn'>Sign Up</button>
                </div>
               

            </div>

             <div className='home-topics'>
                    <button 
                    onClick={()=>buttonActive("crime")}     
                    className={`topic1 ${active === "crime" ? "active" : ""}`}>Crime Data</button>

                    <button
                    onClick={()=> buttonActive("fbi")}
                    className={`topic1 ${active === "fbi" ? "active" : ""}`}><h1>FBI Most Wanted</h1></button>
                    <button 
                    onClick={()=> buttonActive("electric")}
                    className={`topic1 ${active === "electric" ? "active" : ""}`}
                    ><h1>Electric Vehicles</h1></button>
                    <button 
                    onClick={()=> buttonActive("weather")}
                    className={`topic1 ${active === "weather" ? "active" : ""}`}

                    ><h1>Weather Warnings</h1></button>



                </div>
                            <img className='home-worldmap' src={worldMap}/>

        </div>
    )
}

export default Home;