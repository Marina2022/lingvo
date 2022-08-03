import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

//BASE COMPONENTS
import Input from "../../../components/input/Input.component";
import Button from "../../../components/button/Button.component";
//IMAGES
import logoLingvoinsta from "../../../assets/images/auth/logo-lingvoinsta.png";
import googleIcon from "../../../assets/images/auth/google-icon.png";
import fbIcon from "../../../assets/images/auth/fb-icon.png";
import vkIcon from "../../../assets/images/auth/vk-icon.png";
//EFFECTS
import useInput from "../../../effects/useInput.effect";
//ACTIONS
import { loginAsync } from "../../../redux/auth/auth.actions";
import { t } from "i18next";
import { Grid } from "@mui/material";

const LoginPage = (props) => {
   const { loginAsync, isLoading } = props;

   const navigate = useNavigate();
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
         navigate
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
            <Grid item xs={12} sm={12} md={6} lg={6}>
               <div className="login-page__auth-block-card">
                  <Grid item
                     xs={12}
                     sm={12}
                     md={6}
                     lg={6}
                     className="fields__block">
                     <div className="fields__block-text">{t("actions.sign_in")}</div>
                     <form onSubmit={login}>
                        <Grid item xs={12} sm={12} md={9} lg={9}>
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
                        </Grid>
                        <Grid item xs={12} sm={12} md={9} lg={9}>
                           <Input
                              name="password"
                              value={inputState.password}
                              error={invalidMessages}
                              onChange={handleInputChange}
                              onInvalid={handleInvalidMessage}
                              label={t("auth.login.password")}
                              type="password"
                              required
                           />
                        </Grid>
                        <Grid item xs={12} sm={12} md={9} lg={9}>
                           <Button isLoading={isLoading} type="submit">
                              {t("actions.sign_in")}
                           </Button>
                        </Grid>
                     </form>
                     <div
                        onClick={() => navigate("/reset-password")}
                        className="forgot-creds__block">
                           {t("auth.login.forgotten_login_password")}
                     </div>
                  </Grid>
                  <span className="separator" />
                  <Grid item
                     xs={12}
                     sm={12}
                     md={6}
                     lg={6}
                     className="social-network__block">
                     <Grid item
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}
                        className="social-network__block-text">
                        {t("auth.login.with_social_media")}
                     </Grid>
                     <Grid item xs={12} sm={12} md={9} lg={9}>
                        <Button
                           className="social-network__buttons"
                           src={googleIcon}>
                           Google+
                        </Button>
                     </Grid>
                     <Grid item xs={12} sm={12} md={9} lg={9}>
                        <Button
                           className="social-network__buttons"
                           src={vkIcon}>
                           {t("social_media.VK.title")}
                        </Button>
                     </Grid>
                     <Grid item xs={12} sm={12} md={9} lg={9}>
                        <Button
                           className="social-network__buttons"
                           src={fbIcon}>
                           Facebook
                        </Button>
                     </Grid>
                  </Grid>
               </div>
            </Grid>
         </div>
         <div className="login-page__footer">
            {/* eslint-disable-next-line no-irregular-whitespace */}
            <h3>{t("auth.login.no_account")}</h3>
            <Button
               onClick={() => navigate("/register")}
               className="register-link__button">
               {t("actions.signing_up")}
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
