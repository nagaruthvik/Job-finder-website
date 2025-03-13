import React, { useState } from 'react'

import "./JobDisplayComp.css"
import { useNavigate } from 'react-router'
export default function JobDisplayComp({id,url,position,skills,location,salary,remote}) {





    const navigate = useNavigate()

    const [clicked,setClicked] = useState(false)

    const handleClick = ()=>{
        setClicked(!clicked)
    }

    const handleButton = ()=>{
        navigate(`/JobView/${id}`)
    }
  return (
    <div id='mainCont' onClick={handleClick}>
        <div id='hoverred' style={{backgroundColor : clicked ? "#ED5353" :"white"}}></div>

        <div id='imgPart'>
            <img id="imageDisplay" src= {url} alt="" />
        </div>
        <div id='mainPart1'>
            <h3>{position}</h3>
            
            <div id='subPart1'>
                <p>₹ {salary}</p>
                
                <p>  {location}</p>
                
            </div>
            <p id='remote'>
                {remote}
            </p>
        </div>
        <div id='mainPart2'>
            <div id='subPart2'>{
                skills.map((item,index)=>(<p key={index}>{item}</p>))
                }</div>
            <button onClick={handleButton}>View details</button>
        </div>
    </div>
  )
}
