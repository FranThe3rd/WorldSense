import React from 'react'
import './DropDownButton.css'
import { useNavigate } from 'react-router-dom'

const DropDownButton = () => {
  const navigate = useNavigate();



  return (
    <div className="select">
  <div
    className="selected"
    data-default="Select Topic"
    data-one="option-1"
    data-two="option-2"
    data-three="option-3"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 512 512"
      className="arrow"
    >
      <path
        d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
      ></path>
    </svg>
  </div>
  <div className="options">
    <div title="all">
  <input id="all" name="option" type="radio" defaultChecked />
  <label  className="option" htmlFor="all" data-txt="Select Topic"></label>
</div>
    <div title="option-1">
      <input id="option-1" name="option" type="radio" />
            <label role='button' onClick={()=> navigate("/map-page")} className="option" for="option-2" data-txt="Crime in Los Angeles (2020-2025)"></label>

    </div>
    <div title="option-2">
      <input id="option-2" name="option" type="radio" />
      <label role='button' onClick={()=> navigate("/electric-page")} className="option" for="option-1" data-txt="Electric Vehicle Population Data"></label>
    </div>
    <div title="option-3">
      <input id="option-3" name="option" type="radio" />
      <label role='button' onClick={()=> navigate("/restaurants-page")} className="option" for="option-1" data-txt="Restaurants Based in USA"></label>
    </div>
  </div>
</div>

  )
}

export default DropDownButton
