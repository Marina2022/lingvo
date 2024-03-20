import React from 'react';

import arrowLeft from '../../../../assets/images/admin/arrowLeft.svg'
import arrowRight from '../../../../assets/images/admin/arrowRight.svg'

import s from './Pagination.module.scss'

const PAGE_NUMBER = 5
const Pagination = ({page, setPage}) => {

  const pagItems = Array.from({length: PAGE_NUMBER}, (_, i) => i + 1)

  const paginationClickHandler = (page) => {
    console.log('Запрос на page ', page)
    setPage(page)
  }

  const leftBtnClickHandler = () => {
    if ((page - 1) < 1) return
    setPage(page - 1)
    console.log('Запрос на page ', page)
  }

  const rightBtnClickHandler = () => {
    if ((page + 1) > PAGE_NUMBER) return
    setPage(page + 1)
    console.log('Запрос на page ', page)
  }

  return (
      <ul className={s.pagination}>
        <li>
          <button onClick={leftBtnClickHandler} className={s.leftBtn}><img src={arrowLeft} alt="previous page"/>
          </button>
        </li>
        {
          pagItems.map(item => {
            return <li className={`${s.pagItem} ${item === page ? s.activePage : ''}`} key={item}
                       onClick={() => paginationClickHandler(item)}>
              {item}
            </li>
          })
        }
        <li>
          <button onClick={rightBtnClickHandler} className={s.rightBtn}><img src={arrowRight}
                                                                             alt="next page"/></button>
        </li>
      </ul>
  );
};

export default Pagination;