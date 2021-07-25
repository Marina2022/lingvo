import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
//ROUTES
import AuthRoutes from "./pages/auth/AuthPages";
import DashbaordRoutes from "./pages/dashboard/DashboardPages";
import MainPage from "./pages/main/MainPage";
//ACTIONS
import { getLanguagesListAsync } from "redux/common/common.actions";
import "./App.scss";
import dashboardRoutes from "./pages/dashboard-routes";

function App(props) {
   const { token, getLanguagesListAsync } = props;
   const View = token ? <DashbaordRoutes /> : <AuthRoutes />;

   useEffect(() => {
      getLanguagesListAsync();
      //eslint-disable-next-line
   }, []);

   useEffect(() => {
      //remove btn class from bootstrap
      const btns = document.getElementsByClassName("btn");
      Array.from(btns).forEach((item) => {
         item.classList.remove("btn");
         item.classList.remove("btn-primary");
      });
   });

   return <div className="app">{View}</div>;
}
const mapStateToProps = (state) => {
   const { auth } = state;
   return {
      token: auth.token,
   };
};

const mapDispatchToProps = (dispatch) => ({
   getLanguagesListAsync: () => dispatch(getLanguagesListAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
