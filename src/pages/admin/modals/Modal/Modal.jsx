import React, {useRef} from 'react';
import s from './Modal.module.scss'
import closeBtn from '../../../../assets/images/admin/close.svg'
import {useCloseModalHook} from "../../../../effects/useCloseModal";

const Modal = ({show, setShow, children}) => {

  const modalRef = useRef()
  useCloseModalHook(modalRef, show, setShow)

  return (
      <>
        {
            show && (
                <div className={s.modalWrapper}>
                  <div onClick={()=>setShow(false)} className={s.overlay}></div>
                  <div ref={modalRef} className={s.modal}>
                    <button onClick={() => setShow(false)}><img className={s.closeBtn} src={closeBtn} alt="close button"/>
                    </button>
                    {children}
                  </div>
                </div>
            )
        }
      </>
  )
}

export default Modal;