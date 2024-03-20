import React, {useState} from 'react';
import s from './AuthorsBlock.module.scss'
import SearchBlock from "./SearchBlock/SearchBlock";
import Pagination from "./Pagination/Pagination";
import arrowDown from '../../../assets/images/admin/arrowDown.svg'
import AuthorsTableRow from "./AuthorsTableRow/AuthorsTableRow";

const AuthorsBlock = () => {

  const authors = [
    {
      name: 'Eric', language: 'английский', show: false, id: 1,
    },
    {
      name: 'Marta', language: 'японский', show: true, id: 2,
    },
    {
      name: 'Eric', language: 'английский', show: false, id: 3,
    },
    {
      name: 'Marta', language: 'японский', show: true, id: 4,
    },
    {
      name: 'Eric', language: 'английский', show: false, id: 5,
    },
    {
      name: 'Marta', language: 'японский', show: true, id: 6,
    },
    {
      name: 'Eric', language: 'английский', show: false, id: 7,
    },
    {
      name: 'Marta', language: 'японский', show: true, id: 8,
    },
  ]

  const [page, setPage] = useState(1)
  const [sort, setSort] = useState(false)

  const sortClickHandler = () => {
    console.log(`Запрос с сортировкой `)
  }

  return (
      <div className={s.authorsBlock}>
        <div className={s.top}>
          <SearchBlock />
          <Pagination page={page} setPage={setPage}/>
        </div>
        <div className={s.tableHeader}>
          <div className={s.nick}>Ник автора</div>
          <button onClick={sortClickHandler} className={s.lang}><span>Язык</span> <img src={arrowDown} alt=""/></button>
          <div className={s.onnOff}>Включить/выключить показ</div>
          <div className={s.actions}>Действия</div>
        </div>     
        <ul className={s.table}>
          {
            authors.map((author, index)=>{
              return <AuthorsTableRow index={index} key={author.id} {...author} />
            })
          }          
        </ul>
      </div>
  );
};

export default AuthorsBlock;