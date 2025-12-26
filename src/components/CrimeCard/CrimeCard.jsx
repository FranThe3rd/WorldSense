import React from 'react'
import './CrimeCard.css'

const CrimeCard = (props) => {
  return (
    <div className={props.className}>
            <div className='crime-card-subject'> 
              <h1>{props.subject}</h1>
              <p>{props.location}</p>
            </div>
             <div className='crime-card-date'> 
              <p>{props.date}</p>

            </div>
  </div>
  )
}

export default CrimeCard
