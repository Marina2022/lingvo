import React, {useState} from 'react';
import axios from '../../../../config/axios.config'
import {toast} from "react-toastify";

import ToggleShowingModal from "../../modals/Modal/ToggleShowingModal";
import DeleteAuthorModal from "../../modals/Modal/DeleteAuthorModal";

import s from './AuthorsTableRow.module.scss'
import arrowDown from '../../../../assets/images/admin/arrowDown.svg'

const AuthorsTableRow = ({user, show, id, index, getAuthors}) => {

  const [toggleShowingIsOpen, setToggleShowingIsOpen] = useState(false)
  const [deleteAuthorIsOpen, setDeleteAuthorIsOpen] = useState(false)
  const [requestIsSending, setRequestIsSending] = useState(false)

  const even = index % 2 !== 0

  const showClickHandler = (id) => {
    setToggleShowingIsOpen(true)
  }
  const deleteClickHandler = (id) => {
    setDeleteAuthorIsOpen(true)
  }

  const yesToggleShowClickHandler = async () => {

    setRequestIsSending(true)
    try {
      await axios.put(`authors/${id}/show/toggle`)
      setToggleShowingIsOpen(false)
      getAuthors()
    } catch (err) {
      console.log('Ошибка: ', err)
      toast(err.message)
    } finally {
      setRequestIsSending(false)
    }
  }
  const yesDeleteClickHandler = async (userShow) => {
    setRequestIsSending(true)


    try {
      await axios.delete(`authors/${id}`)

      if (userShow) {
        await axios.put(`authors/${id}/show/toggle`)
      }


      setToggleShowingIsOpen(false)
      setDeleteAuthorIsOpen(false)
      getAuthors()
    } catch (err) {
      console.log('Ошибка: ', err)
      toast(err.message)
    } finally {
      setRequestIsSending(false)
    }
  }

  return (
      <>
        <li className={`${s.tableRow}  ${even ? s.even : ''}`}>
          <div className={show ? s.nickInLenta : s.nick}>{user.nickname}</div>
          <div className={s.lang}>{user.foreignLanguages[0]?.value || ''}</div>
          <button onClick={() => showClickHandler(id)} className={s.onnOff}>
            <span>{show ? 'Выключить' : 'Включить'} </span> <img src={arrowDown} alt=""/>
          </button>
          <button onClick={() => deleteClickHandler(id)} className={s.actionsBtn}>Удалить</button>
        </li>
        <ToggleShowingModal requestIsSending={requestIsSending}
                            show={toggleShowingIsOpen}
                            setShow={setToggleShowingIsOpen}
                            showIsOn={show}
                            yesClickHandler={yesToggleShowClickHandler}/>
        <DeleteAuthorModal requestIsSending={requestIsSending}
                           show={deleteAuthorIsOpen}
                           setShow={setDeleteAuthorIsOpen}
                           nickname={user.nickname}
                           userShow={user.show}
                           yesClickHandler={yesDeleteClickHandler}/>
      </>
  );
};

export default AuthorsTableRow;