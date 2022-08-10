import React from "react";
import { createRoot } from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

//APP COMPONENT
import App from "./App";
// REDUX TOOLS
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
//AXIOS CONFIG
import "./config/axios.config";
import "./i18n";
import 'react-i18next';

//STYLES
import "./index.scss";

// https://dev.to/maciejtrzcinski/100vh-problem-with-ios-safari-3ge9
const appHeight = () => {
   const doc = document.documentElement
   const appHeight = window.innerHeight
   doc.style.setProperty('--app-height', `${appHeight}px`)
   const footerElement = document.getElementById("app-footer")
   let footerHeight = 0
   if (footerElement) {
      doc.style.setProperty('--app-footer-height', `${(footerHeight = footerElement.clientHeight)}px`)
   } else {
      doc.style.setProperty('--app-footer-height', `${footerHeight}px`)      
   }
   const headerElement = document.getElementById("app-header")
   let headerHeight = 0
   if (headerElement) {
      doc.style.setProperty('--app-header-height', `${(headerHeight = headerElement.clientHeight)}px`)
   } else {
      doc.style.setProperty('--app-header-height', `${headerHeight}px`)   
   }
   doc.style.setProperty('--app-body-height', `${appHeight - footerHeight - headerHeight}px`)
   // console.log('height:', {appHeight, headerHeight, bodyHeight: (appHeight - footerHeight - headerHeight), footerHeight });
}
window.addEventListener('resize', appHeight)
window.addEventListener('content-changed', appHeight)

appHeight()

const theme = createTheme({
   // typography: { fontSize: 14 },
});

const root = createRoot(
   document.getElementById("root")
);

root.render(
   <Provider store={store}>
      <React.Suspense fallback={<div>Please wait...</div>}>
         <BrowserRouter>
            <PersistGate persistor={persistor}>
               <ThemeProvider theme={theme}>
                  <App />
               </ThemeProvider>
            </PersistGate>
         </BrowserRouter>
      </React.Suspense>      
   </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
