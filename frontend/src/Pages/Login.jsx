import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LoginContext } from "../LoginContext"; 

export default function Login() {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext); 
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:4000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `HTTP error! Status: ${response.status}`);
      }

      window.alert("Login successfully!");
      setIsLoggedIn(true); 

      navigate("/MainPage", { state: { isLogin: true } });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="mainPage">
      <div id="sideCont">
        <form onSubmit={handleSubmit} id="content">
          <h1 id="sideContentText">Already have an account?</h1>
          <p id="sideContentPara">Your personal job finder is here</p>

          <input
            type="email"
            name="email"
            value={formData.email}
            className="input"
            placeholder="Email"
            required
            onChange={handleChange}
            disabled={loading}
          />
          <br />
          <input
            type="password"
            name="password"
            value={formData.password}
            className="input"
            placeholder="Password"
            required
            onChange={handleChange}
            disabled={loading}
          />
          <br />

          <button type="submit" id="signbtn" disabled={loading}>
            Sign in
          </button>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <p>
            Don’t have an account? <Link to="/Registration">Register</Link>
          </p>
        </form>
      </div>
      <div id="imageCont">
        <h1>Your Personal Job Finder</h1>
        <img src="./spaceman.png" alt="space" />
      </div>
    </div>
  );
}
