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
import { resetPasswordAsync } from "../../../redux/auth/auth.actions";
import GridContainer from "../../../components/grid-container/GridContainer.component";

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
      resetPasswordAsync({ email: inputState.email }, navigate);
   };

   return (
      <div className="reset-password-page">
         <div className="login-page__logo-block">
            <img src={logoLingvoinsta} alt="logo" />
         </div>
         <div className="reset-password-page__auth-block">
            <GridItem xs={12} sm={12} md={6} lg={6}>
               <GridItem
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  className="fields-block">
                  <Form onSubmit={resetPassword}>
                     <div className="fields-block__text">Сброс пароля</div>
                     <GridItem xs={12} sm={12} md={12} lg={12}>
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
                     <GridContainer>
                        <GridItem xs={12} sm={12} md={6} lg={6}>
                           <Button
                              isLoading={resetPasswordLoading}
                              type="submit">
                              Сбросить пароль
                           </Button>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6} lg={6}>
                           <Button onClick={() => navigate("/login")}>
                              Отмена
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
      resetPasswordLoading: auth.resetPasswordLoading,
   };
};

const mapDispatchToProps = (dispatch) => ({
   resetPasswordAsync: (params, navigate) =>
      dispatch(resetPasswordAsync(params, navigate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage);
