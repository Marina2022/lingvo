import React, {useState} from 'react';
import s from './SearchBlock.module.scss'
import search from '../../../../assets/images/admin/search.svg'
import AuthorNotFoundModal from "../../modals/Modal/AuthorNotFoundModal";
import AuthorFoundModal from "../../modals/Modal/AuthorFoundModal";
import * as PropTypes from "prop-types";
import AuthorAddedModal from "../../modals/Modal/AuthorAddedModal";

AuthorAddedModal.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func
};
const SearchBlock = () => {

  const [inputValue, setInputValue] = useState('')

  const [authorNotFoundIsOpen, setAuthorNotFoundIsOpen] = useState(false)  
  const [authorFoundIsOpen, setAuthorFoundIsOpen] = useState(false)  
  const [authorAddedIsOpen, setAuthorAddedIsOpen] = useState(false)
  const onCheckAuthorClick = (name) => {
    console.log(`Запрос автора по имени `, name)
    
    // при пустом поле поиска пока вот эту модалку показываем:
    if (name === '') setAuthorNotFoundIsOpen(true)

    // при непустом - другую:
    if (name !== '') setAuthorFoundIsOpen(true)
  }

  //обработчик нажатия на Да в окне Автор найден
  const yesClickHandler = () => {
    // пошел запрос на добавление автора, кнопку Да - disable + какой-нибудь спинер на нее
    // при успешном запросе:
    setAuthorFoundIsOpen(false)
   setAuthorAddedIsOpen(true)
  }
  
  return (
      <>
        <div className={s.searchBlock}>
          <div className={s.imageWrapper}>
            <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} className={s.searchInput}
                   type="text" placeholder='Имя автора'/>
            <img className={s.searchIcon} src={search} alt="search icon"/>
          </div>
          <button onClick={() => onCheckAuthorClick(inputValue)} className={s.searchBtn}>
            Проверить
          </button>
        </div>

        <AuthorNotFoundModal show={authorNotFoundIsOpen} setShow={setAuthorNotFoundIsOpen} />        
        <AuthorFoundModal show={authorFoundIsOpen} setShow={setAuthorFoundIsOpen} name={inputValue} yesClickHandler={yesClickHandler} />
        <AuthorAddedModal show={authorAddedIsOpen} setShow={setAuthorAddedIsOpen}  />
      </>
  );
};

export default SearchBlock;
