import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../Auth/ProtectedRoute";
import { CompanyView } from "../../Components/Company/companyView";
import { ProcessControl } from "../../Components/Process/processControl";
import LoginForm from "../../Components/Forms/LoginForm";
import UserProfile from "../../Components/Profile/UserProfile";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/Profile" element={<ProtectedRoute element={<UserProfile />} />} />
      <Route path="/Companies" element={<ProtectedRoute element={<CompanyView />} />} />
      <Route path="/Process/:companyName/:id" element={<ProtectedRoute element={<ProcessControl />} />} />
    </Routes>
  );
};

export default Routing;
