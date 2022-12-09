import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Components/Shareds/Home/Home";
import { ProcessControl } from "../Components/Process/processControl";
import { CompanyView } from "../Components/Company/companyView";

const ConfigRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/InterViews" element={<CompanyView  />} />
      <Route path="/InterViews/:id" element={<ProcessControl />} />
    </Routes>
  );
};

export default ConfigRoutes;
