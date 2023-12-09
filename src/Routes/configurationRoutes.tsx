import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Components/Shareds/Home/Home";
import { CompanyView } from "../Components/Views/companyView";
import { ProcessView } from "../Components/Views/processView";

const ConfigRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/InterViews" element={<CompanyView  />} />
      <Route path="/Process/:companyName/:id" element={<ProcessView />} />
    </Routes>
  );
};

export default ConfigRoutes;
