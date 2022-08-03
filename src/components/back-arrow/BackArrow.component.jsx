import React from "react";
import { useNavigate } from "react-router-dom";

//IMAGES
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

const BackArrow = ({ text }) => {
   const navigate = useNavigate();

   const goBack = () => {
      navigate(-1);
   };
   return (
      <div className="back-arrow" onClick={goBack}>
         <ArrowBackOutlinedIcon />
         <span>{text}</span>
      </div>
   );
};

export default BackArrow;
