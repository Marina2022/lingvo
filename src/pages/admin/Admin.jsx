import React, {useState} from 'react';
import AdminHeader from "./AdminHeader/AdminHeader";
import Sidebar from "./Sidebar/Sidebar";
import s from './Admin.module.scss'
import AuthorsBlock from "./AuthorsBlock/AuthorsBlock";
import Modal from "./modals/Modal/Modal";

const Admin = () => {
    
  return (
      <div className={`${s.adminLayout} adminPage`}>
        <Sidebar/>
        <AdminHeader/>
        <AuthorsBlock/>     
      </div>
  );
};

export default Admin;