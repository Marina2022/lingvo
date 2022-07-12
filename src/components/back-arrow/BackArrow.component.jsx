import React from "react";
import { useNavigate } from "react-router-dom";

//IMAGES
import backArrow from "../../assets/images/components/back-arrow-icon.png";

const BackArrow = ({ text }) => {
   const navigate = useNavigate();

   const goBack = () => {
      navigate(-1);
   };
   return (
      <div className="back-arrow" onClick={goBack}>
         <img src={backArrow} alt="backArrow" />
         <span>{text}</span>
      </div>
   );
};

export default BackArrow;
