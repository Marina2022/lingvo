import React from 'react';
import s from "./Modal.module.scss";

const AuthorListItem = ({author, onAuthorClick, authors}) => { 
  const isInLenta = authors.find(user=>user.user.nickname === author.nickname)  
  const onClick = () => {
    if (isInLenta) return 
    onAuthorClick(author) 
  }
  
  return (
      <li  className={s.authorItem} onClick={onClick}>
        <div className={s.authorItemWrapper}>  
                                <span className={s.listName}>
                                  {author.nickname}
                                </span>
          
          {isInLenta && <span style={{paddingRight: 10}}>Уже есть в ленте</span>}  
          {!isInLenta && <button className={s.actionsBtn}>Выбрать</button>}
        </div>
      </li>
  );
};

export default AuthorListItem;