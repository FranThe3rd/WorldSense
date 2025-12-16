import React from 'react';
import './home.css'


export const Home = () => {
    return (
        <div className='Home'>
            <div className='home-text-div'>
                <h1 className='title'>World Sense</h1>
                <p className='caption1'>Discover information about the world that is not known</p>
                <p className='caption2'>
                    World Sense is an interactive, map-based platform that brings together public data from multiple trusted sources. Explore FBI Most Wanted listings, crime statistics, and other real-world information, all visualized on a single interactive map to help you better understand what’s happening around you in real time.
                </p>
            </div>
        </div>
    )
}

export default Home;