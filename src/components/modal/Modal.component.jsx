import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";

//IMAGES
import closeIcon from "assets/images/components/X-close.png";

const Modal = ({
   children,
   className,
   modalChildClassName,
   isOpen,
   handleModalClose,
   modalChildId,
}) => {
   useEffect(() => {
      const escFunction = (event) => {
         if (event.keyCode === 27) handleModalClose();
      };

      document.addEventListener("keydown", escFunction, false);
      return () => {
         document.removeEventListener("keydown", escFunction, false);
      };
      //eslint-disable-next-line
   }, []);

   const modalStyles = classNames({
      "li-modal__overlay": true,
      [className]: className,
   });
   const modalChildStyles = classNames({
      children: true,
      [modalChildClassName]: modalChildClassName,
   });

   const handleModalBodyClick = (event) => {
      event.stopPropagation();
   };

   if (isOpen) {
      return ReactDOM.createPortal(
         <div className="li-modal" onMouseDown={handleModalClose}>
            <div className={modalStyles} onMouseDown={handleModalBodyClick}>
               <div className={modalChildStyles} id={modalChildId}>
                  {children}
               </div>
               <img
                  onClick={handleModalClose}
                  className="close"
                  src={closeIcon}
                  alt="closeIcon"
               />
            </div>
         </div>,
         document.getElementById("root")
      );
   } else {
      return null;
   }
};

export default Modal;
