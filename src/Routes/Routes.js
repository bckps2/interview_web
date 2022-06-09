import {  Routes, Route } from "react-router-dom";
import React from "react";
import FormInterViewcontrol from '../Components/Forms/FormsInterView/FormsInterViewControl';

const ConfigRoutes = () => {
    return (
        <Routes>
            <Route exact path="/Registro" element={<FormInterViewcontrol />}/>
        </Routes>
    )
}

export default ConfigRoutes;