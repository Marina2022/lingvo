import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

//BASE COMPONENTS
import GridItem from "components/grid-item/GridItem.component";
import Input from "components/input/Input.component";
import Button from "components/button/Button.component";
//IMAGES
import logoLingvoinsta from "assets/images/auth/logo-lingvoinsta.png";
import googleIcon from "assets/images/auth/google-icon.png";
import fbIcon from "assets/images/auth/fb-icon.png";
import vkIcon from "assets/images/auth/vk-icon.png";
//EFFECTS
import useInput from "effects/useInput.effect";
//ACTIONS
import { loginAsync } from "redux/auth/auth.actions";

const LoginPage = (props) => {
   const { loginAsync, isLoading } = props;

   const history = useHistory();
   const {
      inputState,
      handleInput,
      handleInvalidMessage,
      invalidMessages,
   } = useInput();

   const handleInputChange = (event) => {
      handleInput(event);
   };

   const login = (e) => {
      e.preventDefault();
      loginAsync(
         { email: inputState.email, password: inputState.password },
         history
      );
   };
   // const logout = () => {
   //    userLogout();
   //    logOutAsync();
   // };

   return (
      <div className="login-page">
         <div className="login-page__logo-block">
            <img src={logoLingvoinsta} alt="logo" />
         </div>
         <div className="login-page__auth-block">
            <GridItem xs={12} sm={12} md={6} lg={6}>
               <div className="login-page__auth-block-card">
                  <GridItem
                     xs={12}
                     sm={12}
                     md={6}
                     lg={6}
                     className="fields__block">
                     <div className="fields__block-text">Войти</div>
                     <form onSubmit={login}>
                        <GridItem xs={12} sm={12} md={9} lg={9}>
                           <Input
                              name="email"
                              value={inputState.email}
                              error={invalidMessages}
                              onChange={handleInputChange}
                              onInvalid={handleInvalidMessage}
                              autoComplete="on"
                              label="E-mail"
                              type="text"
                              required
                           />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={9} lg={9}>
                           <Input
                              name="password"
                              value={inputState.password}
                              error={invalidMessages}
                              onChange={handleInputChange}
                              onInvalid={handleInvalidMessage}
                              label="Пароль"
                              type="password"
                              required
                           />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={9} lg={9}>
                           <Button isLoading={isLoading} type="submit">
                              Войти
                           </Button>
                        </GridItem>
                     </form>
                     <div
                        onClick={() => history.push("/reset-password")}
                        className="forgot-creds__block">
                        Забыли логин или пароль?
                     </div>
                  </GridItem>
                  <span className="separator" />
                  <GridItem
                     xs={12}
                     sm={12}
                     md={6}
                     lg={6}
                     className="social-network__block">
                     <GridItem
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}
                        className="social-network__block-text">
                        или через социальные сети
                     </GridItem>
                     <GridItem xs={12} sm={12} md={9} lg={9}>
                        <Button
                           className="social-network__buttons"
                           src={googleIcon}>
                           Google +
                        </Button>
                     </GridItem>
                     <GridItem xs={12} sm={12} md={9} lg={9}>
                        <Button
                           className="social-network__buttons"
                           src={vkIcon}>
                           Вконтакте
                        </Button>
                     </GridItem>
                     <GridItem xs={12} sm={12} md={9} lg={9}>
                        <Button
                           className="social-network__buttons"
                           src={fbIcon}>
                           Facebook
                        </Button>
                     </GridItem>
                  </GridItem>
               </div>
            </GridItem>
         </div>
         <div className="login-page__footer">
            <h3>У вас ещё нет аккаунта? </h3>
            <Button
               onClick={() => history.push("/register")}
               className="register-link__button">
               Регистрация
            </Button>
         </div>
      </div>
   );
};

const mapStateToProps = (state) => {
   const { auth } = state;

   return {
      isLoading: auth.isLoading,
   };
};

const mapDispatchToProps = (dispatch) => ({
   loginAsync: (email, password) => dispatch(loginAsync(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);