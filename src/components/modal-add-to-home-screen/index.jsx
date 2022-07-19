import { t } from 'i18next';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { isMobile, isStandalone } from '../../utilities/appPromptHelper';
import "./index.scss"

const IOsActionIcon = () => <>
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-up" viewBox="0 0 16 16">
    <path fill-fill-rule="evenodd" d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1h-2z"/>
    <path fill-fill-rule="evenodd" d="M7.646.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 1.707V10.5a.5.5 0 0 1-1 0V1.707L5.354 3.854a.5.5 0 1 1-.708-.708l3-3z"/>
  </svg>
</>

const promptList = {
  IOs: () => <>{t("misc.install_app.ios1", {device:"device"})} <IOsActionIcon /> {t("misc.install_app.ios2")}</>,
  IPhone: () => <>{t("misc.install_app.ios1", {device:"iPhone"})} <IOsActionIcon /> {t("misc.install_app.iphone2")}</>,
  IPad: () => <>{t("misc.install_app.ios1", {device:"iPad"})} <IOsActionIcon /> {t("misc.install_app.ipad2")}</>,
  IPod: () => <>{t("misc.install_app.ios1", {device:"iPod"})} <IOsActionIcon /> {t("misc.install_app.ipod2")}</>,
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
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-square-fill" viewBox="0 0 16 16">
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"/>
            </svg>
          </div>
          <div className='prompt-to-install'>
            <Prompt />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

