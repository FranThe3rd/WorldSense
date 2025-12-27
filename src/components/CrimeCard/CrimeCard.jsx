import React from 'react'
import './CrimeCard.css'

const CrimeCard = (props) => {
  return (
    <div key={props.key} className={props.className} onClick={props.onClick}>
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
