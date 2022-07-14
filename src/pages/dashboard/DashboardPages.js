import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

//ROUTES
import dashboardRoutes from "../dashboard-routes";
//LAYOUTS
import Header from "./layout/header/Header.layout";

import MainPage from "../main/MainPage";

const DashbaordPages = () => {
   return (
      <Routes>
         <Route exact path="/main" element={<MainPage />} />

         <Route exact path="*" element={
            <div className="dashboard-page">
               <Header />
               <Routes> { dashboardRoutes.map((component) => { return (
                  <Route exact path={component.path} element={<component.component />} key={component.path}/>
               ); }) }
                  <Route exact path="/" element={<Navigate to="/topics" />}/>
               </Routes>
            </div>
            } />
      </Routes>
   );
};

export default DashbaordPages;
