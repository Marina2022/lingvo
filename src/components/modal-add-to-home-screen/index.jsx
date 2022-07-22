import { t } from 'i18next';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { isMobile, isStandalone } from '../../utilities/appPromptHelper';
import "./index.scss"
import { ReactComponent as PlusSquareFill } from "../../assets/images/icons/plus-square-fill.svg"
import { ReactComponent as BoxArrowUp } from '../../assets/images/icons/box-arrow-up.svg';

const promptList = {
  IOs: () => <>{t("misc.install_app.ios1", {device:"device"})} <BoxArrowUp /> {t("misc.install_app.ios2")}</>,
  IPhone: () => <>{t("misc.install_app.ios1", {device:"iPhone"})} <BoxArrowUp /> {t("misc.install_app.ios2")}</>,
  IPad: () => <>{t("misc.install_app.ios1", {device:"iPad"})} <BoxArrowUp /> {t("misc.install_app.ios2")}</>,
  IPod: () => <>{t("misc.install_app.ios1", {device:"iPod"})} <BoxArrowUp /> {t("misc.install_app.ios2")}</>,
  Desktop: () => <>{t("misc.install_app.desktop")}</>,
  OtherMobile: () => <>{t("misc.install_app.other_mobile")}</>
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

