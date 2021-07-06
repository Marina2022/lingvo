import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import LoginPage from "./login/Login.page";
import RegisterPage from "./register/Register.page";
import ResetPasswordPage from "./reset-password/ResetPassword.page";
import SetNewPasswordPage from "./set-new-password/SetNewPassword.page";

const AuthPages = () => {
   return (
      <Switch>
         <Route exact path="/login" component={LoginPage} />
         <Route exact path="/register" component={RegisterPage} />
         <Route exact path="/reset-password" component={ResetPasswordPage} />
         <Route exact path="/set-new-password" component={SetNewPasswordPage} />
         <Redirect to="/login" />
      </Switch>
   );
};

export default AuthPages;
