import React, { useEffect } from "react";
import { connect } from "react-redux";
//ROUTES
import AuthRoutes from "./pages/auth/AuthPages";
import DashboardRoutes from "./pages/dashboard";

//ACTIONS
import { getLanguagesListAsync } from "./redux/common/common.actions";
import "./App.scss";
import { useTranslation } from "react-i18next";

function App(props) {
   const { token, languagesList, getLanguagesListAsync } = props;
   const View = token ? <DashboardRoutes /> : <AuthRoutes />;

   // const { t, i18n } = useTranslation();
   useTranslation();

   useEffect(() => {
      token && !languagesList && getLanguagesListAsync();
   }, [getLanguagesListAsync, languagesList, token]);

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
   const { auth, common } = state;
   return {
      token: auth.token,
      languagesList: common.languagesList,
   };
};

const mapDispatchToProps = (dispatch) => ({
   getLanguagesListAsync: () => dispatch(getLanguagesListAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
