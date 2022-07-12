import React from "react";
import ReactDropZone from "react-dropzone";
import classNames from "classnames";

//BASE COMPONENTS
import Button from "../../components/button/Button.component";
import IsVisible from "../../components/is-visible/IsVisible.component";

const DropZone = (props) => {
   const {
      title,
      files,
      handleFiles,
      className,
      buttonText,
      showName = true,
      buttonAction,
   } = props;

   const dropZoneClasses = classNames({
      "custom-drop-zone": true,
      [className]: className !== undefined,
   });

   return (
      <div className={dropZoneClasses}>
         <ReactDropZone onDrop={(acceptedFiles) => handleFiles(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
               <section>
                  <IsVisible isVisible={buttonText && buttonAction}>
                     <Button
                        onClick={() => (buttonAction ? buttonAction() : false)}>
                        {buttonText}
                     </Button>
                  </IsVisible>
                  <div
                     {...getRootProps()}
                     className="custom-drop-zone__content">
                     <input {...getInputProps()} />
                     <IsVisible
                        isVisible={
                           (files && files?.length <= 0) || showName === false
                        }>
                        <IsVisible isVisible={buttonText && !buttonAction}>
                           <Button>{buttonText}</Button>
                        </IsVisible>
                        <div className="custom-drop-zone__content-title">
                           {title}
                        </div>
                     </IsVisible>
                     <IsVisible
                        isVisible={files && files?.length > 0 && showName}>
                        <div className="uploaded-files__info-block">
                           {files.map((file, idx) => (
                              <div key={idx}>{file?.name}</div>
                           ))}
                        </div>
                     </IsVisible>
                  </div>
               </section>
            )}
         </ReactDropZone>
      </div>
   );
};

export default DropZone;
