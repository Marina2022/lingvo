import React from 'react';
import s from  './AccessDenied.module.scss'
import {useNavigate} from "react-router-dom";
const AccessDenied = () => {
  
  const navigate = useNavigate()
  return (
      <div className={s.wrapper} onClick={()=>navigate('/')}>
        <div className={s.underlay}></div>
        <div className={s.modal}>
          <h2 className={s.title}>У вас нет прав доступа <br/> к админке <br/> 😕 </h2>
          <button className={s.bnt}>Ok</button>         
        </div>        
      </div>
  );
};

export default AccessDenied;