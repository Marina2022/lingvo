import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

//BASE COMPONENTS
import GridItem from "../../../components/grid-item/GridItem.component";
import Input from "../../../components/input/Input.component";
import Button from "../../../components/button/Button.component";
//IMAGES
import logoLingvoinsta from "../../../assets/images/auth/logo-lingvoinsta.png";
//EFFECTS
import useInput from "../../../effects/useInput.effect";
//ACTIONS
import { authRegisterAsync } from "../../../redux/auth/auth.actions";

const RegisterPage = (props) => {
   const { authRegisterAsync, isLoading } = props;
   const [errorMessage, setErrorMessage] = useState("");

   const navigate = useNavigate();
   const {
      inputState,
      handleInput,
      handleInvalidMessage,
      invalidMessages,
   } = useInput();

   useEffect(() => {}, [handleInvalidMessage]);

   const handleInputChange = (event) => {
      handleInput(event);
   };

   const register = (e) => {
      e.preventDefault();
      const params = { ...inputState, role: "AUTHOR" };
      if (inputState.password !== inputState.rePassword) {
         setErrorMessage("Пароли не совпали!");
      } else {
         delete params.rePassword;
         authRegisterAsync(params, navigate);
         setErrorMessage("");
      }
   };

   return (
      <div className="register-page">
         <div className="register-page__logo-block">
            <img src={logoLingvoinsta} alt="logo" />
         </div>
         <div className="register-page__auth-block">
            <GridItem xs={12} sm={12} md={6} lg={6}>
               <div className="register-page__auth-block-card">
                  <GridItem
                     xs={12}
                     sm={12}
                     md={12}
                     lg={12}
                     className="fields__block">
                     <div className="fields__block-text">Регистрация</div>
                     {errorMessage && (
                        <div className="error-message">{errorMessage}</div>
                     )}
                     <form onSubmit={register}>
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
                              name="name"
                              value={inputState.name}
                              error={invalidMessages}
                              onChange={handleInputChange}
                              onInvalid={handleInvalidMessage}
                              label="Имя"
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
                              placeholder="Не менее 8 символов"
                              type="password"
                              required
                              minLength={8}
                           />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={9} lg={9}>
                           <Input
                              name="rePassword"
                              value={inputState.rePassword}
                              error={invalidMessages}
                              onChange={handleInputChange}
                              onInvalid={handleInvalidMessage}
                              label="Поворите пароль"
                              type="password"
                              required
                              minLength={8}
                           />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={9} lg={9}>
                           <Button isLoading={isLoading} type="submit">
                              Войти
                           </Button>
                        </GridItem>
                     </form>
                  </GridItem>
                  {/*<span className="separator" />*/}
                  {/*<GridItem*/}
                  {/*   xs={12}*/}
                  {/*   sm={12}*/}
                  {/*   md={6}*/}
                  {/*   lg={6}*/}
                  {/*   className="social-network__block">*/}
                  {/*   <GridItem*/}
                  {/*      xs={12}*/}
                  {/*      sm={12}*/}
                  {/*      md={6}*/}
                  {/*      lg={6}*/}
                  {/*      className="social-network__block-text">*/}
                  {/*      или через социальные сети*/}
                  {/*   </GridItem>*/}
                  {/*   <GridItem xs={12} sm={12} md={9} lg={9}>*/}
                  {/*      <Button*/}
                  {/*         className="social-network__buttons"*/}
                  {/*         src={googleIcon}>*/}
                  {/*         Google +*/}
                  {/*      </Button>*/}
                  {/*   </GridItem>*/}
                  {/*   <GridItem xs={12} sm={12} md={9} lg={9}>*/}
                  {/*      <Button*/}
                  {/*         className="social-network__buttons"*/}
                  {/*         src={vkIcon}>*/}
                  {/*         Вконтакте*/}
                  {/*      </Button>*/}
                  {/*   </GridItem>*/}
                  {/*   <GridItem xs={12} sm={12} md={9} lg={9}>*/}
                  {/*      <Button*/}
                  {/*         className="social-network__buttons"*/}
                  {/*         src={fbIcon}>*/}
                  {/*         Facebook*/}
                  {/*      </Button>*/}
                  {/*   </GridItem>*/}
                  {/*</GridItem>*/}
               </div>
            </GridItem>
         </div>
         <div className="register-page__footer">
            <h3>У вас уже есть аккаунт?</h3>
            <Button
               onClick={() => navigate("/login")}
               className="login-link__button">
               Войти
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
   authRegisterAsync: (params, navigate) =>
      dispatch(authRegisterAsync(params, navigate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
