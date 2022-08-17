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
import { resetPasswordAsync } from "../../../redux/auth/auth.actions";
import { t } from "i18next";
import { Grid } from "@mui/material";

const ResetPasswordPage = (props) => {
   const { resetPasswordAsync, resetPasswordLoading } = props;
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

   const resetPassword = (e) => {
      e.preventDefault();
      resetPasswordAsync({ email: inputState.email }, () => navigate("/set-new-password"));
   };

   return (
      <div className="reset-password-page">
         <div className="login-page__logo-block">
            <img src={logoLingvoinsta} alt="logo" />
         </div>
         <div className="reset-password-page__auth-block">
            <Grid item xs={12} sm={12} md={6} lg={6}>
               <Grid item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  className="fields-block">
                  <Form onSubmit={resetPassword}>
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
                           type="email"
                           required
                        />
                     </Grid>
                     <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                           <Button
                              variant="contained" color="warning"
                              isLoading={resetPasswordLoading}
                              type="submit"
                           >
                              {t("auth.reset.reset")}
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
      resetPasswordLoading: auth.resetPasswordLoading,
   };
};

const mapDispatchToProps = (dispatch) => ({
   resetPasswordAsync: (params, callback) =>
      dispatch(resetPasswordAsync(params, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage);
