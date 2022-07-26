import { t } from 'i18next';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { isMobile, isStandalone } from '../../utilities/appPromptHelper';
import "./index.scss"
import { ReactComponent as PlusSquareFill } from "../../assets/images/icons/plus-square-fill.svg"
import { ReactComponent as BoxArrowUp } from '../../assets/images/icons/box-arrow-up.svg';

const promptList = {
  IOs: () => <>{t("messages.info.install_app.ios1", {device:"device"})} <BoxArrowUp /> {t("messages.info.install_app.ios2")}</>,
  IPhone: () => <>{t("messages.info.install_app.ios1", {device:"iPhone"})} <BoxArrowUp /> {t("messages.info.install_app.ios2")}</>,
  IPad: () => <>{t("messages.info.install_app.ios1", {device:"iPad"})} <BoxArrowUp /> {t("messages.info.install_app.ios2")}</>,
  IPod: () => <>{t("messages.info.install_app.ios1", {device:"iPod"})} <BoxArrowUp /> {t("messages.info.install_app.ios2")}</>,
  Desktop: () => <>{t("messages.info.install_app.desktop")}</>,
  OtherMobile: () => <>{t("messages.info.install_app.other_mobile")}</>
}

const Prompt = 
  isMobile.iPhone() ? promptList.IPhone :
  isMobile.iPad() ? promptList.IPad :
  isMobile.iPod() ? promptList.IPod :
  isMobile.any() ? promptList.OtherMobile : promptList.Desktop

export default function ModalAddToHomeScreen() {
  const initShow = !isStandalone()
  const [show, setShow] = useState(initShow);
  
  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          {/* <Modal.Title id="example-custom-modal-styling-title">
            Custom Modal Styling
          </Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <div className='plus-square-fill'>
            <PlusSquareFill />
          </div>
          <div className='prompt-to-install'>
            <Prompt />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

