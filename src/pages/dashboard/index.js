import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

//ROUTES
import dashboardRoutes from "./routes";
//LAYOUTS
import Header from "./layout/header";
import Footer from './layout/footer'

import MainPage from "../main/MainPage";
import PromptAddToHomeScreen from "../../components/prompt-add-to-home"
import GetMediaContent from "../../components/get-media-content";

const mapRoutes = (routes, parentKey = '/') => {
  return routes.map((route) => { 
    const key = `${parentKey}/${route.path}`
    return (
      <Route exact path={route.path} element={<route.component />} key={key}>
        { Array.isArray(route.routes) ?  mapRoutes(route.routes, key) : "" }
      </Route>
    ); 
  })
}

const DashboardPages = () => {
  return (
    <>
      <Routes>
        <Route exact path="/main" element={<MainPage />} />

        <Route exact path="*" element={
            
          <div className="dashboard-page">

            <GetMediaContent contentList={{xSmall:<></>, large:<Header/>}} />

            <Routes> { 
              mapRoutes(dashboardRoutes)
            }
              <Route exact path="/" element={<Navigate to="/topics" />}/>
            </Routes>

            <GetMediaContent contentList={{xSmall:<Footer/>, large:<></>}} />

          </div>

        } />
      </Routes>
      <PromptAddToHomeScreen />
    </>
  );
};

export default DashboardPages;
