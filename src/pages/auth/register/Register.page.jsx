import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

//BASE COMPONENTS
import Input from "../../../components/input/Input.component";
import Button from "../../../components/button/Button.component";
//IMAGES
import logoLingvoinsta from "../../../assets/images/auth/logo-lingvoinsta.png";
//EFFECTS
import useInput from "../../../effects/useInput.effect";
//ACTIONS
import { authRegisterAsync } from "../../../redux/auth/auth.actions";
import { t } from 'i18next'
import { Checkbox, Grid, Link } from "@mui/material";

// TODO: Email verification sending a code while user register
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
         setErrorMessage(t("auth.register.not_match"));
      } else {
         delete params.rePassword;
         authRegisterAsync(params, () => navigate("/topics"));
         setErrorMessage("");
      }
   };

   const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

   const [offer, setOffer] = useState(false);
   const [personalData, setPersonalData] = useState(false);

   return (
      <div className="register-page">
         <div className="register-page__logo-block">
            <img src={logoLingvoinsta} alt="logo" />
         </div>
         <div className="register-page__auth-block">
            <Grid item xs={12} sm={12} md={6} lg={6}>
               <div className="register-page__auth-block-card">
                  <Grid item
                     xs={12}
                     sm={12}
                     md={12}
                     lg={12}
                     className="fields__block">
                     <div className="fields__block-text">{t("actions.signing_up")}</div>
                     {errorMessage && (
                        <div className="error-message">{errorMessage}</div>
                     )}
                     <form onSubmit={register}>
                        <Grid item xs={12} sm={12} md={9} lg={9}>
                           <Input
                              id="email"
                              autoComplete="username"
                              name="email"
                              value={inputState.email}
                              error={invalidMessages}
                              onChange={handleInputChange}
                              onInvalid={handleInvalidMessage}
                              label="E-mail"
                              type="email"
                              required
                           />
                        </Grid>
                        <Grid item xs={12} sm={12} md={9} lg={9}>
                           <Input
                              id="name"
                              autoComplete="name"
                              name="name"
                              value={inputState.name}
                              error={invalidMessages}
                              onChange={handleInputChange}
                              onInvalid={handleInvalidMessage}
                              label={t("auth.register.name")}
                              type="text"
                              required
                           />
                        </Grid>
                        <Grid item xs={12} sm={12} md={9} lg={9}>
                           <Input
                              id="new-password"
                              autoComplete="new-password"
                              name="password"
                              value={inputState.password}
                              error={invalidMessages}
                              onChange={handleInputChange}
                              onInvalid={handleInvalidMessage}
                              label={t("auth.register.password")}
                              placeholder={t("auth.register.password_placeholder")}
                              type="password"
                              required
                              minLength={8}
                           />
                        </Grid>
                        <Grid item xs={12} sm={12} md={9} lg={9}>
                           <Input
                              name="rePassword"
                              value={inputState.rePassword}
                              error={invalidMessages}
                              onChange={handleInputChange}
                              onInvalid={handleInvalidMessage}
                              label={t("auth.register.repeat")}
                              type="password"
                              required
                              minLength={8}
                           />
                        </Grid>
                        <Grid item container xs={12} sm={12} md={9} lg={9} alignItems="center">
                           <Grid item xs={1}>
                              <Checkbox {...label} label="offer" onChange={(e, v) => setOffer(v)} />
                           </Grid>
                           <Grid item xs={10} paddingLeft={'1rem'}>
                              <Link /* href="/offer" */ >
                                 {t('profile.offer_agreed')}
                              </Link>
                           </Grid>
                        </Grid>
                        <Grid item container xs={12} sm={12} md={9} lg={9} alignItems="center">
                           <Grid item xs={1}>
                              <Checkbox {...label} label="personal_data" onChange={(e, v) => setPersonalData(v)} />
                           </Grid>
                           <Grid item xs={10} paddingLeft={'1rem'}>
                              <Link /* href="/personal_data" */>
                                 {t('profile.personal_data_agreed')}
                              </Link>
                           </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={9} lg={9}>
                           <Button isLoading={isLoading} type="submit"
                              variant="contained"
                              sx={{backgroundColor:"Chocolate"}}
                              disabled={!offer || !personalData}
                           >
                              {t("actions.sign_up")}
                           </Button>
                        </Grid>
                     </form>
                  </Grid>
                  {/*<span className="separator" />*/}
                  {/*<Grid item*/}
                  {/*   xs={12}*/}
                  {/*   sm={12}*/}
                  {/*   md={6}*/}
                  {/*   lg={6}*/}
                  {/*   className="social-network__block">*/}
                  {/*   <Grid item*/}
                  {/*      xs={12}*/}
                  {/*      sm={12}*/}
                  {/*      md={6}*/}
                  {/*      lg={6}*/}
                  {/*      className="social-network__block-text">*/}
                  {/*      t("auth.login.with_social_media")*/}
                  {/*   </Grid>*/}
                  {/*   <Grid item xs={12} sm={12} md={9} lg={9}>*/}
                  {/*      <Button*/}
                  {/*         className="social-network__buttons"*/}
                  {/*         src={googleIcon}>*/}
                  {/*         Google +*/}
                  {/*      </Button>*/}
                  {/*   </Grid>*/}
                  {/*   <Grid item xs={12} sm={12} md={9} lg={9}>*/}
                  {/*      <Button*/}
                  {/*         className="social-network__buttons"*/}
                  {/*         src={vkIcon}>*/}
                  {/*         t("pages.social_media.VK.title")*/}
                  {/*      </Button>*/}
                  {/*   </Grid>*/}
                  {/*   <Grid item xs={12} sm={12} md={9} lg={9}>*/}
                  {/*      <Button*/}
                  {/*         className="social-network__buttons"*/}
                  {/*         src={fbIcon}>*/}
                  {/*         Facebook*/}
                  {/*      </Button>*/}
                  {/*   </Grid>*/}
                  {/*</Grid>*/}
               </div>
            </Grid>
         </div>
         <div className="register-page__footer">
            <h3>{t("auth.register.have_account")}</h3>
            <Button
               variant="contained"
               sx={{backgroundColor:"sandybrown"}}
               onClick={() => navigate("/login")}
               className="login-link__button">
               {t("actions.sign_in")}
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
   authRegisterAsync: (params, callback) =>
      dispatch(authRegisterAsync(params, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
