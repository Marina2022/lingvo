import React from 'react';
import Modal from "./Modal";
import s from "./Modal.module.scss";
import exclamation from "../../../../assets/images/admin/exclamation.svg";
import {TailSpin} from "react-loader-spinner";

const ToggleShowingModal = ({show, setShow, showIsOn, yesClickHandler, requestIsSending}) => {
  return (
      <Modal show={show} setShow={setShow}>
        <img width="88" height="88" className={s.img} src={exclamation} alt="exclamation"/>
        <p className={s.text}>{showIsOn ? 'Выключить' : 'Включить'} показ?</p>
        <div className={s.buttons}>        
          <button disabled={requestIsSending} onClick={yesClickHandler} className={s.yesBtn}>{requestIsSending ?<TailSpin  height="20"  width="20" /> : 'Да'}</button>
          <button disabled={requestIsSending} onClick={() => setShow(false)} className={`${s.notFoundCloseBtn} ${s.noBtn}`}>Нет</button>
        </div>
      </Modal>
  );
};

export default ToggleShowingModal;