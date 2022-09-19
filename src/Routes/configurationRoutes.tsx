import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Components/Home/Home";
import { CompanyCardControl } from "../Components/Cards/companyCardControl";
import { CompanyViewControl } from "../Components/InterView/CompanyViewControl";

const ConfigRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/InterViews" element={<CompanyCardControl  />} />
      <Route path="/InterViews/:id" element={<CompanyViewControl />} />
    </Routes>
  );
};

export default ConfigRoutes;
