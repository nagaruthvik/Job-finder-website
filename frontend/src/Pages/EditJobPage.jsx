import React, { useEffect, useState } from 'react'
import "./EditJobPage.css"
import { useParams } from 'react-router'


export default function EditJobPage() {

    const {id} = useParams()

    const [skillset,setSkill] = useState([])
    const [formData,setFormData] = useState({
        company : "",
        url : "",
        position :"",
        salary : 0,
        jobType : "",
        remote : "",
        location : "",
        description : "",
        about : "",
        skills : [],
        information : ""

    })

    

    const handleChange = (e)=>{
        const {name,value} = e.target

        setFormData(prev=>({
            ...prev,
            [name] : value
        }))
    }

     const  handleSubmit =async e=>{
        e.preventDefault()

        const data = {...formData}

        try {
            const api = await fetch(`https://job-finder-website.onrender.com/api/job/update/${id}`,{
                method: "PUT",
                headers : {
                    "Content-Type" :"application/json"
                },
                credentials: "include",
                body : JSON.stringify(data)
            })

            if(!api){
               window.alert("something went wrong")
            }
            else{
                const result = await api.json()
                window.alert("Form submited")
            }
        } catch (error) {
            window.alert("something went wrong",error)
        }
           
    }
    const handleSkill = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const newSkill = e.target.value.trim();
            if (newSkill) {
                setSkill(prev => [...prev, newSkill]);
                setFormData(prev => ({
                    ...prev,
                    skills: [...prev.skills, newSkill]  
                }));
                e.target.value = "";  
            }
        }
    };
    
    

    const handleRemove = (e) => {
        const id = parseInt(e.target.value);
        setSkill(prev => prev.filter((_, index) => index !== id));
    };
    
    
    
   





  return (
    <div id='mainPage'>
        

        <form onSubmit={handleSubmit} id='sideContAdd'>

            <h1>Add job description</h1>
            <div>
                <label htmlFor="">Company Name </label>
                
                <input className='inputAdd' type="text"  name="company" value={formData.company} onChange={handleChange} placeholder='Enter your company name here'/>
            </div>
            <div>
                <label htmlFor="">Add logo URL</label>
                <input className='inputAdd' type="text" name='url' value={formData.url}  onChange={handleChange} placeholder='Enter the link'/>
            </div>
            <div>
                <label htmlFor="">Job position</label>
                <input className='inputAdd' type="text" name='position' value={formData.position}  onChange={handleChange} placeholder='Enter job position'/>
            </div>
            <div>
                <label htmlFor="">Monthly salary</label>
                <input className='inputAdd' type="text" name='salary' value={formData.salary}  onChange={handleChange} placeholder='Enter Amount in rupees'/>
            </div>
            <div>
                <label htmlFor="">Job Type</label>
                <select value={formData.jobType} className='dropAdd'  onChange={handleChange} name="jobType" id=""> 
                    <option value="">Select</option>
                    
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                    <option value="Full Time">Full-time</option>
                    <option value="Part time">Part-time</option>
                    
                </select>
            </div>
            <div>
                <label htmlFor="">Remote/office</label>
                <select value={formData.remote} className='dropAdd'  onChange={handleChange} name="remote" id=""> 
                                      
                    <option value="Remote">Remote</option>
                    <option value="Office">Office</option>
                                             
                </select>
            </div>
            <div>
                <label htmlFor="">Location</label>
                <input value={formData.location} className='inputAdd' name='location'  onChange={handleChange} type="text"  placeholder='Enter Location'/>
            </div>
            <div>
                <label htmlFor="">Job Description</label>
                <textarea className='textAdd' value={formData.description} name='description'  onChange={handleChange} placeholder='Type the job description'></textarea>
            </div>
            <div>
                <label htmlFor="">About Company</label>
                <textarea className='textAdd' value={formData.about} name='about'  onChange={handleChange} placeholder='Type about your company' ></textarea>
            </div>

            <div>
                <label htmlFor="">Skills Required</label>
                <input 
                className='inputAdd' 
                name='skills' 
                onKeyDown={handleSkill}  
                type="text"  
                placeholder='Enter skills required'
            />
                
            </div>

            <div id='skillSet'>
                {skillset.map((item, key) => (
                <p key={key}>{item} <button id='remove' value={key} onClick={handleRemove}>x</button></p>
            ))}
            </div>


            
            <div>
                <label htmlFor="">Information</label>
                <input className='inputAdd' type="text" value={formData.information} name='information' onChange={handleChange} placeholder='Enter the additional information'/>
            </div>
            <div className='btnAdd'>
                <input className='cancle' type="button" value="Cancle"  />
                <input className='submit' type="submit" value="+ Add Job" />
            </div>
            
        </form>

        <div id='imgCont'>
            <h1>Recruiter add job details here</h1>
            <img src="./AddJob.png" alt="NO IMG" />
        </div>
      
    </div>
  )
}
