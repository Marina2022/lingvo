import React from "react";

import "./_pagination.scss";

const Pagination = () => {
   return (
      <ul className="pagination">
         <li>
            <a href="/#"> &#60; </a>
         </li>
         <li>
            <a className="active" href="/#">
               {" "}
               1{" "}
            </a>
         </li>
         <li>
            <a href="/#"> 2 </a>
         </li>
         <li>
            <a href="/#"> 3 </a>
         </li>
         <li>
            <a href="/#"> 4 </a>
         </li>
         <li>
            <a href="/#"> &#62; </a>
         </li>
      </ul>
   );
};

export default Pagination;
