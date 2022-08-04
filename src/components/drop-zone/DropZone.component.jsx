import React from "react";
import ReactDropZone from "react-dropzone";
import classNames from "classnames";

//BASE COMPONENTS
import Button from "../../components/button/Button.component";
import IsVisible from "../../components/is-visible/IsVisible.component";

const DropZone = (props) => {
  const {
    children,
    title,
    files,
    handleFiles,
    className,
    buttonText,
    showName = true,
    maxFiles = 1,
    accept = {},
    buttonAction,
  } = props;

  const dropZoneClasses = classNames({
    "custom-drop-zone": true,
    [className]: className !== undefined,
  });

  const LocalButton = () => children ?
    <span onClick={ buttonAction ?? undefined }>{children}</span>:
    <Button onClick={ buttonAction ?? undefined }>{buttonText}</Button>

  return (
    <div className={dropZoneClasses}>
      <ReactDropZone accept={accept} maxFiles={maxFiles} onDrop={(acceptedFiles) => handleFiles(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <IsVisible isVisible={buttonText && buttonAction}>
              <LocalButton />
            </IsVisible>
            <div {...getRootProps()} className="custom-drop-zone__content">
              <input {...getInputProps()} />
              <IsVisible isVisible={(files && files?.length <= 0) || showName === false}>
                <IsVisible isVisible={buttonText && !buttonAction}>
                  <LocalButton />
                </IsVisible>
                <div className="custom-drop-zone__content-title">
                  {title}
                </div>
              </IsVisible>
              <IsVisible isVisible={files && files?.length > 0 && showName}>
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
