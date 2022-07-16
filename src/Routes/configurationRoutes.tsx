import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Components/Home/Home";
import { CompanyControl } from "../Components/Forms/Company/companyControl";
import { CompanyViewControl } from "../Components/InterView/CompanyViewControl";

const ConfigRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/RegisterInterView" element={<CompanyControl />} /> */}
      <Route path="/InterViews" element={<CompanyControl  />} />
      <Route path="/InterViews/:id" element={<CompanyViewControl />} />
    </Routes>
  );
};

export default ConfigRoutes;
