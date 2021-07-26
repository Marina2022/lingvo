import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

//ROUTES
import dashboardRoutes from "../dashboard-routes";
//LAYOUTS
import Header from "./layout/header/Header.layout";

import MainPage from "../main/MainPage";

const DashbaordPages = () => {
   return (
      <>
         <Switch>
            <Route exact path="/main" component={MainPage} />

            <div className="dashboard-page">
               <Header />

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
            </div>
         </Switch>
      </>
   );
};

export default DashbaordPages;
