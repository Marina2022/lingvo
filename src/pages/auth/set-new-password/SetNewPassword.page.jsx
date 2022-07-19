import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

//BASE COMPONENTS
import GridItem from "../../../components/grid-item/GridItem.component";
import Input from "../../../components/input/Input.component";
import Button from "../../../components/button/Button.component";
import Form from "../../../components/form/Form.component";
//IMAGES
import logoLingvoinsta from "../../../assets/images/auth/logo-lingvoinsta.png";
//EFFECTS
import useInput from "../../../effects/useInput.effect";
//ACTIONS
import { setPasswordAsync } from "../../../redux/auth/auth.actions";
import GridContainer from "../../../components/grid-container/GridContainer.component";
import { t } from "i18next";

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
         navigate
      );
   };

   return (
      <div className="set-new-password-page">
         <div className="set-new-password-page__logo-block">
            <img src={logoLingvoinsta} alt="logo" />
         </div>
         <div className="set-new-password-page__auth-block">
            <GridItem xs={12} sm={12} md={6} lg={6}>
               <GridItem
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  className="fields-block">
                  <Form onSubmit={setNewPassword}>
                     <div className="fields-block__text">{t("auth.reset.resetting")}</div>
                     <GridItem xs={12} sm={12} md={12} lg={12}>
                        <Input
                           name="email"
                           value={inputState.email}
                           error={invalidMessages}
                           onChange={handleInputChange}
                           onInvalid={handleInvalidMessage}
                           autoComplete="on"
                           label="E-mail"
                           placeholder="E-mail"
                           type="text"
                           required
                        />
                     </GridItem>
                     <GridItem xs={12} sm={12} md={12} lg={12}>
                        <Input
                           name="code"
                           value={inputState.code}
                           error={invalidMessages}
                           onChange={handleInputChange}
                           onInvalid={handleInvalidMessage}
                           autoComplete="on"
                           label={t("auth.reset.code")}
                           placeholder={t("auth.reset.code")}
                           type="text"
                           required
                        />
                     </GridItem>
                     <GridItem xs={12} sm={12} md={12} lg={12}>
                        <Input
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
                     </GridItem>
                     <GridContainer>
                        <GridItem xs={12} sm={12} md={6} lg={6}>
                           <Button isLoading={setPasswordLoading} type="submit">
                              {t("actions.send")}
                           </Button>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6} lg={6}>
                           <Button onClick={() => navigate("/login")}>
                              {t("actions.cancel")}
                           </Button>
                        </GridItem>
                     </GridContainer>
                  </Form>
               </GridItem>
            </GridItem>
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
   setPasswordAsync: (params, navigate) =>
      dispatch(setPasswordAsync(params, navigate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SetNewPasswordPage);
