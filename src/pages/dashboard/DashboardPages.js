import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

//ROUTES
import dashboardRoutes from "../dashboard-routes";
//LAYOUTS
import Header from "./layout/header/Header.layout";

const DashbaordPages = () => {
   return (
      <div className="dashboard-page">
         <Header />
         <Switch>
            {dashboardRoutes.map((component) => {
               return (
                  <Route
                     exact
                     path={component.path}
                     component={component.component}
                     key={component.path}
                  />
               );
            })}
            <Redirect to="/topics" />
         </Switch>
      </div>
   );
};

export default DashbaordPages;
