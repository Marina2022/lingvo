import React, {useCallback, useEffect, useState} from 'react';
import s from './AuthorsBlock.module.scss'
import SearchBlock from "./SearchBlock/SearchBlock";
import Pagination from "./Pagination/Pagination";
// import arrowDown from '../../../assets/images/admin/arrowDown.svg'
import AuthorsTableRow from "./AuthorsTableRow/AuthorsTableRow";
import axios from '../../../config/axios.config'
import {RotatingLines} from 'react-loader-spinner';
import {toast} from "react-toastify";

const AuthorsBlock = () => {

  const [page, setPage] = useState(1)
  const [pagesNumber, setPagesNumber] = useState(0)

  const [authorsAreLoading, setAuthorsAreLoading] = useState(false)
  const [authors, setAuthors] = useState([])

  const getAuthors = useCallback(async () => {
    setAuthorsAreLoading(true)
    try {
      const result = await axios(`authors/page?count=8&offset=${page - 1}`)
      setAuthors(result.data.content)
      setPagesNumber(result.data.totalPages)
    } catch (err) {
      console.log('ошибочка:', err)
      toast(err.message)
    } finally {
      setAuthorsAreLoading(false)
    }

  }, [page])

  useEffect(() => {
    getAuthors()
  }, [page, getAuthors]);


  // сортировка:
  // const [sort, setSort] = useState(false)
  // const sortClickHandler = () => {
  //   console.log(`Запрос с сортировкой `)
  // }


  return (
      <div className={s.authorsBlock}>
        <div className={s.top}>
          <SearchBlock getAuthors={getAuthors} authors={authors}/>
          <Pagination page={page} setPage={setPage} pageNumber={pagesNumber}/>
        </div>
        <div className={s.tableHeader}>
          <div className={s.nick}>Ник автора</div>
          {/*<button onClick={sortClickHandler} className={s.lang}><span>Язык</span> <img src={arrowDown} alt=""/></button>*/}
          <button className={s.lang}><span>Язык</span></button>
          <div className={s.onnOff}>Включить/выключить показ</div>
          <div className={s.actions}>Действия</div>
        </div>

        <ul className={s.table}>
          {
              authorsAreLoading && <div style={{'textAlign': 'center', 'padding': 150}}><RotatingLines
                  strokeColor="#1E62E5"/></div>
          }
          {
              !authorsAreLoading && authors.map((author, index) => {
                return <AuthorsTableRow index={index} key={author.id} user={author.user} id={author.id} show={author.show}
                                        getAuthors={getAuthors}/>
              })
          }
        </ul>
      </div>
  );
};

export default AuthorsBlock;