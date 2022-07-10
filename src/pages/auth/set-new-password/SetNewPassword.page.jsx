import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

//BASE COMPONENTS
import GridItem from "components/grid-item/GridItem.component";
import Input from "components/input/Input.component";
import Button from "components/button/Button.component";
import Form from "components/form/Form.component";
//IMAGES
import logoLingvoinsta from "assets/images/auth/logo-lingvoinsta.png";
//EFFECTS
import useInput from "effects/useInput.effect";
//ACTIONS
import { setPasswordAsync } from "redux/auth/auth.actions";
import GridContainer from "components/grid-container/GridContainer.component";

const SetNewPasswordPage = (props) => {
   const { setPasswordAsync, setPasswordLoading } = props;
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

   const setNewPassword = (e) => {
      e.preventDefault();
      setPasswordAsync(
         {
            email: inputState.email,
            code: inputState.code,
            password: inputState.password,
         },
         history
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
                           label="Код из письма"
                           placeholder="Код из письма"
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
                           label="Новый пароль"
                           placeholder="Новый пароль"
                           type="password"
                           minLength={8}
                           required
                        />
                     </GridItem>
                     <GridContainer>
                        <GridItem xs={12} sm={12} md={6} lg={6}>
                           <Button isLoading={setPasswordLoading} type="submit">
                              Отправить
                           </Button>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6} lg={6}>
                           <Button onClick={() => history.push("/login")}>
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
      setPasswordLoading: auth.setPasswordLoading,
   };
};

const mapDispatchToProps = (dispatch) => ({
   setPasswordAsync: (params, history) =>
      dispatch(setPasswordAsync(params, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SetNewPasswordPage);
