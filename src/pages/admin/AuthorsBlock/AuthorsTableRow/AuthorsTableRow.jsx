import React, {useState} from 'react';
import s from './AuthorsTableRow.module.scss'
import arrowDown from '../../../../assets/images/admin/arrowDown.svg'
import ToggleShowingModal from "../../modals/Modal/ToggleShowingModal";
import DeleteAuthorModal from "../../modals/Modal/DeleteAuthorModal";

const AuthorsTableRow = ({name, language, show, id, index}) => {

  const [toggleShowingIsOpen, setToggleShowingIsOpen] = useState(false)
  const [deleteAuthorIsOpen, setDeleteAuthorIsOpen] = useState(false)

  const even = index % 2 !== 0

  const showClickHandler = (id) => {
    setToggleShowingIsOpen(true)    
  }
  const deleteClickHandler = (id) => {
    setDeleteAuthorIsOpen(true)   
  }
  
  const yesToggleShowClickHandler = () => {
    // Идет запрос, disable & spinner на кнопку.  
    console.log('Запрос - Переключить показ автора с id ', id)
    
    //По окончании запроса закрыть окно
    setToggleShowingIsOpen(false)    
  }
  
  const yesDeleteClickHandler = () => {
    // Идет запрос на удаление, disable & spinner на кнопку.  
    console.log('Запрос - Удалить автора с id ', id)
    //По окончании запроса закрыть окно
    setDeleteAuthorIsOpen(false)
  }

  return (
      <>
        <li className={`${s.tableRow}  ${even ? s.even : ''}`}>
          <div className={s.nick}>{name}</div>
          <div className={s.lang}>{language}</div>
          <button onClick={() => showClickHandler(id)} className={s.onnOff}>
            <span>{show ? 'Выключить' : 'Включить'} </span> <img src={arrowDown} alt=""/>
          </button>
          <button onClick={() => deleteClickHandler(id)} className={s.actionsBtn}>Удалить</button>
        </li>
        
        <ToggleShowingModal show={toggleShowingIsOpen} setShow={setToggleShowingIsOpen} showIsOn={show} yesClickHandler={yesToggleShowClickHandler} />
        <DeleteAuthorModal show={deleteAuthorIsOpen} setShow={setDeleteAuthorIsOpen} name={name} yesClickHandler={yesDeleteClickHandler}  />
      </>
  );
};

export default AuthorsTableRow;