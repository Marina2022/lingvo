import {useCloseModalHook} from "../../../../effects/useCloseModal";
import s from "./Modal.module.scss";
import React, {useRef} from "react";
import AuthorListItem from "./AuthorListItem";

const AuthorListModal = ({show, setShow, foundAuthorsList, setAuthorIdToAdd, setAuthorFoundIsOpen, setNicknameToAdd, authors}) => {

  const modalRef = useRef()

  useCloseModalHook(modalRef, show, setShow)
  const onAuthorClick = (author) => {    
    setAuthorIdToAdd(author.id)
    setAuthorFoundIsOpen(true)
    setShow(false)
    setNicknameToAdd(author.nickname)
  }

  return (
      <>
        {
            show && (
                <div className={s.modalWrapper}>
                  <div onClick={() => setShow(false)} className={s.overlay}></div>
                  <div ref={modalRef} className={s.listModal}>                   
                    <h2 className={s.foundTitle}>Найдены авторы:</h2>
                    <ul>
                      {
                        foundAuthorsList.map((author) => <AuthorListItem 
                            authors={authors} 
                            key={author.id} 
                            author={author} 
                            onAuthorClick={onAuthorClick} />)
                      }
                    </ul>
                  </div>
                </div>
            )
        }
      </>
  )
}

export default AuthorListModal;