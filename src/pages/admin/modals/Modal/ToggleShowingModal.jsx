import React from 'react';
import Modal from "./Modal";
import s from "./Modal.module.scss";
import exclamation from "../../../../assets/images/admin/exclamation.svg";

const ToggleShowingModal = ({show, setShow, showIsOn, yesClickHandler}) => {
  return (
      <Modal show={show} setShow={setShow}>
        <img className={s.img} src={exclamation} alt="exclamation"/>
        <p className={s.text}>{showIsOn ? 'Включить' : 'Выключить'} показ?</p>
        <div className={s.buttons}>

          {/*обработчик на кнопку в пропсах приходит*/}
          <button onClick={yesClickHandler} className={s.yesBtn}>Да</button>
          <button onClick={() => setShow(false)} className={`${s.notFoundCloseBtn} ${s.noBtn}`}>Нет</button>
        </div>
      </Modal>
  );
};

export default ToggleShowingModal;