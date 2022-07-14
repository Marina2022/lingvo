import React from "react";
import { createRoot } from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

//APP COMPONENT
import App from "./App";
// REDUX TOOLS
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
//AXIOS CONFIG
import "./config/axios.config";

//STYLES
import "./index.scss";

const theme = createTheme({
   typography: { fontSize: 20 },
});

const root = createRoot(
   document.getElementById("root")
);

root.render(
   <Provider store={store}>
      <BrowserRouter>
         <PersistGate persistor={persistor}>
            <ThemeProvider theme={theme}>
               <App />
            </ThemeProvider>
         </PersistGate>
      </BrowserRouter>
   </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
