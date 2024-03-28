import React, {useState} from 'react';
import s from './SearchBlock.module.scss'
import search from '../../../../assets/images/admin/search.svg'
import AuthorNotFoundModal from "../../modals/Modal/AuthorNotFoundModal";
import AuthorFoundModal from "../../modals/Modal/AuthorFoundModal";
import * as PropTypes from "prop-types";
import AuthorAddedModal from "../../modals/Modal/AuthorAddedModal";
import axios from '../../../../config/axios.config'
import AuthorListModal from "../../modals/Modal/AuthorListModal";
import { toast } from 'react-toastify';

AuthorAddedModal.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func
};
const SearchBlock = ({getAuthors, authors}) => {

  const [inputValue, setInputValue] = useState('')

  const [authorNotFoundIsOpen, setAuthorNotFoundIsOpen] = useState(false)
  const [authorFoundIsOpen, setAuthorFoundIsOpen] = useState(false)
  const [authorAddedIsOpen, setAuthorAddedIsOpen] = useState(false)
  const [authorListIsOpen, setAuthorListIsOpen] = useState(false)
  const [foundAuthorsList, setFoundAuthorsList] = useState([])
  const [idAuthorToAdd, setAuthorIdToAdd] = useState([])
  const [nicknameToAdd, setNicknameToAdd] = useState([])

  const [requestIsSending, setRequestIsSending] = useState(false)
  
  const onCheckAuthorClick = async (name) => {    
    try {
      const results = await axios(`users/find/${name}`)

      if (results.data.length === 0) {
        setAuthorNotFoundIsOpen(true)
      } else if (results.data.length === 1) {

        setNicknameToAdd(results.data[0].nickname)
        setAuthorIdToAdd(results.data[0].id)
        setAuthorFoundIsOpen(true)
        setInputValue('')

      } else {
        setFoundAuthorsList(results.data)
        setAuthorListIsOpen(true)
        setInputValue('')
      }
    } catch (err) {
      console.log('ошибочка:', err)
      toast(err.message)
    }    
  }

  const yesClickHandler = async () => {

    setRequestIsSending(true)
    try {
      await axios.post('authors', {user: {id: idAuthorToAdd}})
      getAuthors()      
      setAuthorFoundIsOpen(false)
      setAuthorAddedIsOpen(true)  
    } catch (err) {
      toast(err.message)
      console.log('ошибочка:', err)
    } finally {
      setRequestIsSending(false)
    }
  }
  
  const onInputEnter = (e) => {
    if (e.target.value === '') return
    if (e.keyCode === 13) {      
      onCheckAuthorClick(inputValue)
    }
  }

  return (
      <>
        <div className={s.searchBlock}>
          <div className={s.imageWrapper}>
            <input onKeyDown={onInputEnter} 
                   value={inputValue} 
                   onChange={(e) => setInputValue(e.target.value)}
                   className={s.searchInput}
                   type="text" placeholder='Имя автора'/>
            <img className={s.searchIcon} src={search} alt="search icon"/>
          </div>
          <button onClick={() => onCheckAuthorClick(inputValue)} className={s.searchBtn}>
            Проверить
          </button>
          <AuthorListModal show={authorListIsOpen} 
                           setShow={setAuthorListIsOpen} 
                           foundAuthorsList={foundAuthorsList} 
                           setAuthorIdToAdd={setAuthorIdToAdd}
                           setAuthorFoundIsOpen={setAuthorFoundIsOpen} 
                           setNicknameToAdd={setNicknameToAdd}
                           authors={authors}
          />
        </div>

        <AuthorNotFoundModal show={authorNotFoundIsOpen} 
                             setShow={setAuthorNotFoundIsOpen}/>
        <AuthorAddedModal show={authorAddedIsOpen} 
                          setShow={setAuthorAddedIsOpen}/>
        <AuthorFoundModal show={authorFoundIsOpen} 
                          setShow={setAuthorFoundIsOpen} 
                          nicknameToAdd={nicknameToAdd} 
                          yesClickHandler={yesClickHandler} 
                          requestIsSending={requestIsSending} />
      </>
  );
};

export default SearchBlock;
