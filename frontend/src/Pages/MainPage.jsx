import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import JobDisplayComp from "../components/JobDisplayComp";
import { useLocation } from "react-router-dom";
import Select from "react-select"; 
import "./MainPage.css";

export default function MainPage() {
  const [apiData, setApiData] = useState([]);
  const [filterData, setFilterData] = useState({
    search: "",
    skills: [],
  });

  const location = useLocation();
  const LoginTrue = location.state?.isLogin || false;


  const apiFetchhing = async () => {
    try {
      const api = await fetch("https://job-finder-website.onrender.com/api/job/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await api.json();
      setApiData(data);
    } catch (error) {
      window.alert("something went wrong",error)
    }
  };

  useEffect(() => {
    apiFetchhing();
  }, []);

  const handleSearchChange = (event) => {
    setFilterData((prev) => ({
      ...prev,
      search: event.target.value,
    }));
  };

  const handleSkillsChange = (selectedOptions) => {
    setFilterData((prev) => ({
      ...prev,
      skills: selectedOptions ? selectedOptions.map((option) => option.value) : [],
    }));
  };

  const handleClear =(e)=>{
    e.preventDefault()
    setFilterData({ search: "", skills: [] })
  }

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const api = await fetch(
        `http://localhost:4000/api/job?name=${filterData.search}&skills=${filterData.skills.join(",")}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await api.json();
      setApiData(data);
    } catch (error) {
      window.alert("something went wrong",error)
    }
  };

  const skillsOptions = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "Node.js", label: "Node.js" },
    { value: "mongoDB", label: "MongoDB" },
    { value: "react.js", label: "React" },
  ];

  return (
    <div>
      <NavBar login={LoginTrue} />

      <div id="displayJob">
        <form id="searchBox">
          <input
            type="text"
            id="search"
            placeholder="Type any job title"
            value={filterData.search}
            onChange={handleSearchChange}
          />
          <div id="btns">
            
            <Select
              options={skillsOptions}
              isMulti
              value={skillsOptions.filter((option) => filterData.skills.includes(option.value))}
              onChange={handleSkillsChange}
              placeholder="Select skills"
            />

            <input
              onClick={handleSearchSubmit}
              type="submit"
              value="Apply Filter"
              id="submit"
            />
            <button  id="clear" onClick={handleClear}>
              Clear
            </button>
          </div>
        </form>

        {apiData.map((item) => (
          <JobDisplayComp
            key={item._id}
            id={item._id}
            url = {item.url}
            position={item.position}
            skills={item.skills}
            location={item.location}
            salary={item.salary}
            remote={item.remote}
          />
        ))}
      </div>
    </div>
  );
}
