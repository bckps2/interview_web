import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Components/Home/Home";
import { CompanyControl } from "../Components/Forms/Company/companyControl";
import { CompanyInterviews } from "../Components/InterView/CompanyInterviews";

const ConfigRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/RegisterInterView" element={<CompanyControl />} /> */}
      <Route path="/InterViews" element={<CompanyControl  />} />
      <Route path="/InterViews/:id" element={<CompanyInterviews />} />
    </Routes>
  );
};

export default ConfigRoutes;
