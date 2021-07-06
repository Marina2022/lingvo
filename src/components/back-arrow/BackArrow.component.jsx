import React from "react";
import { useHistory } from "react-router-dom";

//IMAGES
import backArrow from "assets/images/components/back-arrow-icon.png";

const BackArrow = ({ text }) => {
   const history = useHistory();

   const goBack = () => {
      history.goBack();
   };
   return (
      <div className="back-arrow" onClick={goBack}>
         <img src={backArrow} alt="backArrow" />
         <span>{text}</span>
      </div>
   );
};

export default BackArrow;
