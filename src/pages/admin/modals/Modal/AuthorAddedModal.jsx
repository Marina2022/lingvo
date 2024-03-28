import React from 'react';
import s from "./Modal.module.scss";
import Modal from "./Modal";
import ok from "../../../../assets/images/admin/ok.svg";
const AuthorAddedModal = ({show, setShow}) => {
  return (
      <Modal show={show} setShow={setShow}>
        <img width="88" height="88" className={s.img} src={ok} alt="ok"/>
        <p className={s.text}>Автор добавлен</p>
      </Modal>
  );
};
export default AuthorAddedModal;