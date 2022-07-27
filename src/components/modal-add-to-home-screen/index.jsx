import { t } from 'i18next';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { isMobile, isStandalone } from '../../utilities/appPromptHelper';
import "./index.scss"
import { ReactComponent as PlusSquareFill } from "../../assets/images/icons/plus-square-fill.svg"
import { ReactComponent as BoxArrowUp } from '../../assets/images/icons/box-arrow-up.svg';
import { Col, Container, Form, Row } from 'react-bootstrap';

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

/**
 * 
 * @returns {Boolean}
 */
const getShowParam = () => {
  return window.localStorage.getItem('installPromptIsShown')
}
/**
 * 
 * @param {Boolean} isShown 
 * @returns 
 */
const setShowParam = (isShown) => {
  window.localStorage.setItem('installPromptIsShown', isShown)
}

export default function ModalAddToHomeScreen() {
  const init1 = !isStandalone()
  const init2 = JSON.parse(getShowParam())
  const initState = init1 && (init2 ?? true)
  const [show, setShow] = useState(initState);
  
  const onClick = ({target}) => {
    setShowParam(!target.checked)
  }

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
          <Container>
            <Row  className="justify-content-md-center align-items-md-center">
              <Col xs={2} md={1} className='plus-square-fill'>
                  <PlusSquareFill />
              </Col>
              <Col xs={9} md={8} className='prompt-to-install'>
                  <Prompt />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer  className="does-not-install">
          <Form>
            <div key='default-checkbox' className="mb-3">
              <Form.Check 
                type='checkbox' 
                id='default-checkbox' 
                label={t("messages.info.does_not_show")} 
                onClick={onClick}
              />
            </div>
          </Form>
        </Modal.Footer>
      </Modal>
    </>
  );
}
