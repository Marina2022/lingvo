import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./login/Login.page";
import RegisterPage from "./register/Register.page";
import ResetPasswordPage from "./reset-password/ResetPassword.page";
import SetNewPasswordPage from "./set-new-password/SetNewPassword.page";
import MainPage from "../main/MainPage";

const AuthPages = () => {
   return (
      <Routes>
         <Route exact path="/" element={<MainPage />}></Route>
         <Route exact path="/login" element={<LoginPage />}></Route>
         <Route exact path="/register" element={<RegisterPage />}></Route>
         <Route exact path="/reset-password" element={<ResetPasswordPage />}></Route>
         <Route exact path="/set-new-password" element={<SetNewPasswordPage />}></Route>
         <Route exact path="*" element={<Navigate to="/" />}></Route>
      </Routes>
   );
};

export default AuthPages;
