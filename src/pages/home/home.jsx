import './home.css'
import worldMap from '../../assets/map.svg'
import { useState } from 'react';
import { MapPin } from 'phosphor-react';
import { easeInOut, motion } from "motion/react"

export const Home = () => {

    const [active, setActive] = useState(null)
    const [pins, setPins] = useState(null)


    const buttonActive = (topic) => {
        setActive(topic);
    };



    return (
        <div className='home'>
            <div className='home-text-div'>
                <motion.h1 
                
                className='title'
                initial={{y:-10, opacity:0}}
                animate={{y:0,opacity: 1}}
                transition={{duration:0.5 }}
                >World Sense</motion.h1>
                <motion.p className='caption1'
                initial={{y:-10, opacity:0}}
                animate={{y:0,opacity: 1}}
                transition={{duration:0.5,delay:0.5 }}

                >Discover information about the world that is not known</motion.p>
                <motion.p className='caption2'
                 initial={{y:-10, opacity:0}}
                animate={{y:0,opacity: 1}}
                transition={{duration:0.5,delay:0.7 }}
                >
                    World Sense is an interactive, map-based platform that brings together public data from multiple trusted sources. Explore FBI Most Wanted listings, crime statistics, and other real-world information, all visualized on a single interactive map to help you better understand what’s happening around you in real time.
                </motion.p>
                <motion.div className='home-button-div'
                
                 initial={{y:-10, opacity:0}}
                animate={{y:0,opacity: 1}}
                transition={{duration:0.5,delay:0.9 }}>
                    <motion.button
                        className='get-started-btn'
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.8 }}

                    >Get Started</motion.button>
                    <motion.button
                        className='signup-btn'
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.8 }}

                    >Sign Up</motion.button>
                </motion.div>


            </div>

            <div className='home-topics'>
                <button
                    onClick={() => buttonActive("crime")}
                    className={`topic1 ${active === "crime" ? "activeTopic" : ""}`}><h1>Crime Data</h1></button>

                <button
                    onClick={() => buttonActive("fbi")}
                    className={`topic1 ${active === "fbi" ? "activeTopic" : ""}`}><h1>FBI Most Wanted</h1></button>
                <button
                    onClick={() => buttonActive("electric")}
                    className={`topic1 ${active === "electric" ? "activeTopic" : ""}`}
                ><h1>Electric Vehicles</h1></button>
                <button
                    onClick={() => buttonActive("weather")}
                    className={`topic1 ${active === "weather" ? "activeTopic" : ""}`}><h1>Weather Warnings</h1></button>



            </div>

            <div className='home-image-div'>
                {active === "crime" && (
                    <>
                        <MapPin size={32} className="map-pin crime-pin1" weight="fill" />
                        <MapPin size={32} className="map-pin crime-pin2" weight="fill" />
                        <MapPin size={32} className="map-pin crime-pin3" weight="fill" />
                        <MapPin size={32} className="map-pin crime-pin4" weight="fill" />
                        <MapPin size={32} className="map-pin crime-pin5" weight="fill" />
                    </>
                )}

                {active === "fbi" && (
                    <>
                        <MapPin size={32} className="map-pin fbi-pin1" weight="fill" />
                        <MapPin size={32} className="map-pin fbi-pin2" weight="fill" />
                        <MapPin size={32} className="map-pin fbi-pin3" weight="fill" />
                        <MapPin size={32} className="map-pin fbi-pin4" weight="fill" />
                    </>
                )}

                {active === "electric" && (
                    <>
                        <MapPin size={32} className="map-pin ev-pin1" weight="fill" />
                        <MapPin size={32} className="map-pin ev-pin2" weight="fill" />
                        <MapPin size={32} className="map-pin ev-pin3" weight="fill" />
                    </>
                )}

                {active === "weather" && (
                    <>
                        <MapPin size={32} className="map-pin weather-pin1" weight="fill" />
                        <MapPin size={32} className="map-pin weather-pin2" weight="fill" />
                        <MapPin size={32} className="map-pin weather-pin3" weight="fill" />
                        <MapPin size={32} className="map-pin weather-pin4" weight="fill" />
                    </>
                )}



                <img className='home-worldmap' src={worldMap} />
            </div>

        </div>
    )
}

export default Home;