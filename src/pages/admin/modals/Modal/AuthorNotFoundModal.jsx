import React from 'react';
import Modal from "./Modal";
import exclamation from '../../../../assets/images/admin/exclamation.svg'
import s from './Modal.module.scss'
const AuthorNotFoundModal = ({show, setShow}) => {
  return (
      <Modal show={show} setShow={setShow}>
        <img className={s.img} src={exclamation} alt="exclamation"/>
        <p className={s.text}>Автор с таким именем не обнаружен</p>
        <button onClick={()=>setShow(false)} className={s.notFoundCloseBtn}>Закрыть</button>
      </Modal>
  );
};

export default AuthorNotFoundModal;