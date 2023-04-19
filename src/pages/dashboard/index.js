import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

//ROUTES
import dashboardRoutes from "./routes";
//LAYOUTS
import Header from "./layout/header";
import Footer from './layout/footer'

import MainPage from "../main/MainPage";
import PromptAddToHomeScreen from "../../components/prompt-add-to-home"
import GetMediaContent from "../../components/get-media-content";
import { Grid } from "@mui/material";
import { BuildBreadcrumbs } from "./layout/breadcrumbs";

/**
 * 
 * @param {*} routes 
 * @param {[]} crumbsProps 
 * @param {String} parentKey 
 * @returns 
 */
const mapRoutes = (routes, crumbsProps, parentKey = '/') => {
  return routes.map((route) => { 
    const key = `${parentKey}/${route.path}`
    return (
      <Route exact path={route.path} element={<route.component crumbsProps={crumbsProps} />} key={key}>
        { Array.isArray(route.routes) ?  mapRoutes(route.routes, key) : "" }
      </Route>
    ); 
  })
}

const DashboardPages = () => {
  
  const [crumbs, setCrumbs] = useState([])
  
  return (
    <>
      <Routes>
        <Route exact path="/main" element={<MainPage />} />

        <Route exact path="*" element={
            
          <div className="dashboard-page">

            <GetMediaContent contentList={{xSmall:<></>, large:<Header/>}} />

            <Grid container spacing={2} sx={{ justifyContent: 'center', alignContent: 'flex-start', padding: '2rem 1rem', flexGrow:undefined, flexBasis:undefined }}>
              <Grid item xs={12} sm={9}>
                  <BuildBreadcrumbs crumbs={crumbs} />
              </Grid>
              <Grid item xs={12} sm={9}>

                <Routes> { 
                  mapRoutes(dashboardRoutes, [crumbs, setCrumbs])
                }
                  <Route exact path="/" element={<Navigate to="/topics" />}/>
                </Routes>
              
              </Grid>
            </Grid>

            <GetMediaContent contentList={{xSmall:<Footer/>, large:<></>}} />

          </div>

        } />
      </Routes>
      <PromptAddToHomeScreen />
    </>
  );
};

export default DashboardPages;
