import React from 'react';

import arrowLeft from '../../../../assets/images/admin/arrowLeft.svg'
import arrowRight from '../../../../assets/images/admin/arrowRight.svg'

import s from './Pagination.module.scss'
const Pagination = ({page, setPage, pageNumber}) => {
  
  const pagItems = Array.from({length: pageNumber }, (_, i) => i + 1)
  const paginationClickHandler = (page) => {
    setPage(page)
  }

  const leftBtnClickHandler = () => {
    if ((page - 1) < 1) return
    setPage(page - 1)   
  }
  const rightBtnClickHandler = () => {
    if ((page + 1) > pageNumber) return
    setPage(page + 1)    
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