import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginProvider } from "./LoginContext"; 

import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import AddJobPage from "./Pages/AddJobPage";
import MainPage from "./Pages/MainPage";
import JobViewPage from "./Pages/JobViewPage";
import EditJobPage from "./Pages/EditJobPage";

export default function App() {
  return (
    <LoginProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path="/AddJob" element={<AddJobPage />} />
          <Route path="/MainPage" element={<MainPage />} />
          <Route path="/JobView/:id" element={<JobViewPage />} />
          <Route path="/EditJobPage/:id" element={<EditJobPage />} />
        </Routes>
      </BrowserRouter>
    </LoginProvider>
  );
}
