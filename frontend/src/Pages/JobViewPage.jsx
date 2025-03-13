import React, { useEffect, useState } from 'react'
import "./JobViewPage.css"
import { useNavigate, useParams } from 'react-router'
import NavBar from '../components/NavBar'
import { useLocation } from "react-router-dom";
export default function JobViewPage() {
    const location = useLocation();
    const LoginTrue = location.state?.isLogin || false;
    const [apiData,setApiData] = useState([])
    const {id} = useParams()
    const navigate = useNavigate()
    const fetchingApi = async()=>{

      try {
        const api = await fetch(`https://job-finder-website.onrender.com/api/job/${id}`,{
          
          method :"GET",
            headers :{
              "Content-Type" : "application/json",
            } 
        })

        const result = await api.json()
        setApiData(result)
        console.log(result)

        
      } catch (error) {
        console.log(error)
      }
    }

    const handleEditBtn =()=>{
      navigate(`/EditJobPage/${id}`)
    }

    const handleDeleteJob = async () => {
      console.log(id)
      try {
        const response = await fetch(`https://job-finder-website.onrender.com/api/job/${id}`, {
          method: "DELETE",
          credentials: "include"
        });
    
        if (!response.ok) {
          window.alert("You are not allowed to delete this Job");
          return;
        }
    
        window.alert("Job Deleted");
        navigate("/MainPage");
      } catch (error) {
        console.error("Error deleting job:", error);
        window.alert("An error occurred while deleting the job");
      }
    };
    

    useEffect(()=>{
      fetchingApi()
    },[])

    console.log(typeof apiData.skills)

    
  return (
    
    <div>
        <NavBar login={LoginTrue}/>
        <div id='jobMainCont'>
            <div id='part1'>
              <h3>{apiData.position} {apiData.jobType} at {apiData.company}</h3>
            </div>
            <div id='part2'>
              <div id='basic1'>
                <p className='grey'>{apiData.jobType}</p>
                <p  className='grey'>{apiData.company}</p>
              </div>

              

              <div id='basic2'>
                <h1>{apiData.company}</h1>
                <div className='btnFlex'>
                  <button onClick={handleEditBtn}>Edit job</button>
                  
                  <button onClick={handleDeleteJob}>Delete job</button>
                </div>
                
              </div>
              <p  id='jobLocation'>{apiData.location}</p>
              <p  className='grey'>Salary/Stipend</p>
              <p  className='jobSalary'>{apiData.salary}</p>
              <h4>About company</h4>
              <p>{apiData.about}</p>

              <h4>About the  job/internship</h4>
              <p>{apiData.description}</p>

              <h4>Skill(s) required</h4>
              <p>{apiData.skills}</p>
              

              <h4>Additional Information</h4>
              <p>{apiData.information}</p>
              
            </div>
        </div>
        
    </div>
  )
}
