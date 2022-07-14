import React, { Component } from "react";

import "./_mainPage.styles.scss";

import Header from "./slides/header";
import Top from "./slides/top";
import Offer from "./slides/offer";
import Can from "./slides/can";
import Tariff from "./slides/tariff";
import Profit from "./slides/profit";
import Reviews from "./slides/reviews";
import Footer from "./slides/footer";


export default class MainPage extends Component {
   render () {
      return (
         <div className="landing-page">            
            <Header />
            <Top />
            <Offer />
            <Can />
            <Tariff />
            <Profit />
            <Reviews />
            <Footer />
         </div>
      );
   }
}
