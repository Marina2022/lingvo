import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

//BASE COMPONENTS
import Input from "../../../components/input/Input.component";
import Button from "../../../components/button/Button.component";
import Form from "../../../components/form/Form.component";
//IMAGES
import logoLingvoinsta from "../../../assets/images/auth/logo-lingvoinsta.png";
//EFFECTS
import useInput from "../../../effects/useInput.effect";
//ACTIONS
import { setPasswordAsync } from "../../../redux/auth/auth.actions";
import { t } from "i18next";
import { Grid } from "@mui/material";

const SetNewPasswordPage = (props) => {
   const { setPasswordAsync, setPasswordLoading } = props;
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

   const setNewPassword = (e) => {
      e.preventDefault();
      setPasswordAsync(
         {
            email: inputState.email,
            code: inputState.code,
            password: inputState.password,
         },
         () => navigate("/login")
      );
   };

   return (
      <div className="set-new-password-page">
         <div className="set-new-password-page__logo-block">
            <img src={logoLingvoinsta} alt="logo" />
         </div>
         <div className="set-new-password-page__auth-block">
            <Grid item xs={12} sm={12} md={6} lg={6}>
               <Grid item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  className="fields-block">
                  <Form onSubmit={setNewPassword}>
                     <div className="fields-block__text">{t("auth.reset.resetting")}</div>
                     <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Input
                           id="email"
                           autoComplete="username"
                           name="email"
                           value={inputState.email}
                           error={invalidMessages}
                           onChange={handleInputChange}
                           onInvalid={handleInvalidMessage}
                           label="E-mail"
                           placeholder="E-mail"
                           type="email"
                           required
                        />
                     </Grid>
                     <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Input
                           name="code"
                           value={inputState.code}
                           error={invalidMessages}
                           onChange={handleInputChange}
                           onInvalid={handleInvalidMessage}
                           autoComplete="off"
                           label={t("auth.reset.code")}
                           placeholder={t("auth.reset.code")}
                           type="number"
                           required
                        />
                     </Grid>
                     <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Input
                           id="new-password"
                           autoComplete="new-password"
                           name="password"
                           value={inputState.password}
                           error={invalidMessages}
                           onChange={handleInputChange}
                           onInvalid={handleInvalidMessage}
                           label={t("auth.reset.new_password")}
                           placeholder={t("auth.reset.new_password")}
                           type="password"
                           minLength={8}
                           required
                        />
                     </Grid>
                     <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                           <Button variant="contained" color="warning" isLoading={setPasswordLoading} type="submit">
                              {t("actions.send")}
                           </Button>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                           <Button variant="outlined" color="warning" onClick={() => navigate("/login")}>
                              {t("actions.cancel")}
                           </Button>
                        </Grid>
                     </Grid>
                  </Form>
               </Grid>
            </Grid>
         </div>
      </div>
   );
};

const mapStateToProps = (state) => {
   const { auth } = state;

   return {
      setPasswordLoading: auth.setPasswordLoading,
   };
};

const mapDispatchToProps = (dispatch) => ({
   setPasswordAsync: (params, callback) =>
      dispatch(setPasswordAsync(params, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SetNewPasswordPage);
