import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";

//BASE COMPONENTS
import GridContainer from "components/grid-container/GridContainer.component";
import GridItem from "components/grid-item/GridItem.component";
import Form from "components/form/Form.component";
import DropZone from "components/drop-zone/DropZone.component";
import Input from "components/input/Input.component";
import TextArea from "components/text-area/TextArea.component";
import LoaderWrapper from "components/loader-wrapper/LoaderWrapper.component";
import Button from "components/button/Button.component";
import IsVisible from "components/is-visible/IsVisible.component";
//IMAGES
import avatarIcon from "assets/images/profile/avatar.png";
//EFFECTS
import useInput from "effects/useInput.effect";
//ACTIONS
import {
  editAvatarAsync,
  updateUserAsync,
  updateLinkAsync,
  subscribeLinkAsync,
} from "redux/profile/profile.actions";

const ProfilePage = (props) => {
  const {
    currentUserInfo,
    editAvatarAsync,
    editAvatarLoading,
    updateUserAsync,
    updateUserLoading,
    updateLinkAsync,
    updateLinkLoading,
    subscribeLinkAsync,
    appLink,
  } = props;

  const [avatarData, setAvatarData] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const formInitState = {
    ...currentUserInfo,
  };

  useEffect(() => {
    if (currentUserInfo?.id) {
      subscribeLinkAsync({ id: currentUserInfo.id });
    }

    //eslint-disable-next-line
  }, []);

  // const userLinksArray = currentUserInfo?.links;
  //
  // const linksList = [
  //    {
  //       id: 1,
  //       // ownerId: currentUserInfo?.id,
  //       url: userLinksArray.length > 0 && userLinksArray[2]?.url,
  //       socialNet: { id: 2, value: "Vkontakte" },
  //    },
  //    {
  //       id: 2,
  //       // ownerId: currentUserInfo?.id,
  //       url: userLinksArray.length > 0 && userLinksArray[3]?.url,
  //       socialNet: { id: 4, value: "Instagram" },
  //    },
  //    {
  //       id: 3,
  //       // ownerId: currentUserInfo?.id,
  //       url: userLinksArray.length > 0 && userLinksArray[1]?.url,
  //       socialNet: { id: 3, value: "Facebook" },
  //    },
  //    {
  //       id: 4,
  //       // ownerId: currentUserInfo?.id,
  //       url: userLinksArray.length > 0 && userLinksArray[0]?.url,
  //       socialNet: { id: 1, value: "Telegram" },
  //    },
  // ];

  const {
    inputState,
    handleInput,
    handleInvalidMessage,
    invalidMessages,
  } = useInput({ ...formInitState });
  const [links, setLinks] = useState(inputState.links);

  const avatarImg = currentUserInfo?.avatar
    ? currentUserInfo.avatar
    : avatarIcon;

  const handleInputChange = (event) => {
    handleInput(event);
  };

  const handleFiles = (files) => {
    getBase64(files[0]);
    setUploadedFiles(files);
  };

  function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      editAvatarAsync({ data: reader.result, name: file?.name });
      setAvatarData({
        data: reader.result,
        name: file?.name,
      });
    };
    reader.onerror = function(error) {
      console.log("Error: ", error);
    };
  }

  const onLinkUpdate = (e, linkType) => {
    e.preventDefault();
    updateLinkAsync({
      userId: currentUserInfo?.id,
      socialNetName: linkType[0].toUpperCase() + linkType.slice(1),
      url: inputState[linkType],
    });
  };

  const copyAppLink = (e) => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const onSaveClick = (e) => {
    e.preventDefault();
    console.log(e.target.name);
    console.log(inputState[e.target.name]);
    let out = { [e.target.name]: inputState[e.target.name] };
    console.log(out);
    updateUserAsync(out);
  };
  useEffect(() => {
    try {
      inputState.vkontakte = inputState.links.find(
        (state) => state.socialNet.value === "Vkontakte"
      ).url;
    } catch (e) {}
    try {
      inputState.instagram = inputState.links.find(
        (state) => state.socialNet.value === "Instagram"
      ).url;
    } catch (e) {}
    // try {
    //   inputState.facebook = inputState.links.find(
    //     (state) => state.socialNet.value === "Facebook"
    //   ).url;
    // } catch (e) {}
    try {
      inputState.telegram = inputState.links.find(
        (state) => state.socialNet.value === "Telegram"
      ).url;
    } catch (e) {}
  }, []);
  return (
    <div className="profile-page">
      <GridContainer>
        <h2>Личный кабинет</h2>
        <GridItem xs={12} sm={12} md={12} lg={12}>
          <Form>
            <GridContainer>
              <GridItem sm={12} xs={12} md={8} lg={8}>
                <GridItem
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  className="flex-vertical-center"
                >
                  <LoaderWrapper isLoading={editAvatarLoading}>
                    <div className="profile-page__avatar-block flex-center">
                      <img src={avatarData.data || avatarImg} alt="avatar" />
                    </div>
                  </LoaderWrapper>
                  <DropZone
                    title="Добавьте фото профиля, чтобы повысить узнаваемость"
                    buttonText="Изменить"
                    buttonActions={handleFiles}
                    handleFiles={handleFiles}
                    files={uploadedFiles}
                    showName={false}
                  />
                </GridItem>
                <div className="separator" />
                <GridContainer className="flex-vertical-center">
                  <GridItem xs={12} sm={12} md={8} lg={8}>
                    <Input
                      name="copyUrl"
                      id="copyUrl"
                      value={appLink || ""}
                      error={invalidMessages}
                      onChange={handleInputChange}
                      onInvalid={handleInvalidMessage}
                      type="text"
                      label="Ссылка приложения"
                      placeholder="Ссылка приложения"
                      className="p-b__1"
                      disabled={true}
                      required
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3} lg={3}>
                    <CopyToClipboard text={appLink} onCopy={copyAppLink}>
                      <div className="copy-area">
                        <Button className="subscribe-link__button">
                          Копировать адрес
                        </Button>
                        <IsVisible isVisible={isCopied}>
                          <span>Copied!</span>
                        </IsVisible>
                      </div>
                    </CopyToClipboard>
                  </GridItem>
                </GridContainer>
                <h4>О себе</h4>
                <GridContainer className="flex-vertical-center">
                  <GridItem xs={12} sm={12} md={8} lg={8}>
                    <Input
                      name="name"
                      value={inputState.name || ""}
                      error={invalidMessages}
                      onChange={handleInputChange}
                      onInvalid={handleInvalidMessage}
                      type="text"
                      label="Имя"
                      placeholder="Имя"
                      className="p-b__1"
                      required
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4} lg={4}>
                    <Button
                      onClick={onSaveClick}
                      isLoading={updateUserLoading}
                      name="name"
                    >
                      Сохранить
                    </Button>
                  </GridItem>
                </GridContainer>
                <GridContainer className="flex-vertical-center">
                  <GridItem xs={12} sm={12} md={8} lg={8}>
                    <Input
                      name="nickname"
                      value={inputState.nickname || ""}
                      error={invalidMessages}
                      onChange={handleInputChange}
                      onInvalid={handleInvalidMessage}
                      type="text"
                      label="Ник"
                      placeholder="Ник"
                      className="p-b__1"
                      required
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4} lg={4}>
                    <Button
                      onClick={onSaveClick}
                      isLoading={updateUserLoading}
                      name="nickname"
                    >
                      Сохранить
                    </Button>
                  </GridItem>
                </GridContainer>

                <GridContainer className="flex-vertical-center">
                  <GridItem xs={12} sm={12} md={8} lg={8}>
                    <TextArea
                      name="bio"
                      value={inputState.bio}
                      error={invalidMessages}
                      onChange={handleInputChange}
                      onInvalid={handleInvalidMessage}
                      label="Bio"
                      placeholder="Bio"
                      minRows={2}
                      className="p-b__1"
                      required
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4} lg={4}>
                    <Button
                      onClick={onSaveClick}
                      isLoading={updateUserLoading}
                      name="bio"
                    >
                      Сохранить
                    </Button>
                  </GridItem>
                </GridContainer>
                <div className="separator" />
                <h4>Социальные сети</h4>
                {/*{linksList.map((link, idx) => {*/}
                {/*   return (*/}
                {/*      <GridContainer*/}
                {/*         className="flex-vertical-center"*/}
                {/*         key={idx}>*/}
                {/*         <GridItem xs={12} sm={12} md={8} lg={8}>*/}
                {/*            <Input*/}
                {/*               name={link?.socialNet?.value}*/}
                {/* value={
                                 inputState[link?.socialNet?.value] ||
                                 link?.url
                              } */}
                {/*               error={invalidMessages}*/}
                {/*               onChange={handleInputChange}*/}
                {/*               onInvalid={handleInvalidMessage}*/}
                {/*               type="text"*/}
                {/*               label={link?.socialNet?.value}*/}
                {/*               placeholder={link?.socialNet?.value}*/}
                {/*               className="p-b__1"*/}
                {/*            />*/}
                {/*         </GridItem>*/}
                {/*         <GridItem xs={12} sm={12} md={4} lg={4}>*/}
                {/*            <Button*/}
                {/*               disabled={*/}
                {/*                  !inputState[link?.socialNet?.value]*/}
                {/*               }*/}
                {/*               isLoading={updateLinkLoading}*/}
                {/*               onClick={(e) =>*/}
                {/*                  onLinkUpdate(*/}
                {/*                     e,*/}
                {/*                     link?.socialNet?.value*/}
                {/*                  )*/}
                {/*               }*/}
                {/*               className={`${link?.socialNet?.value}-button`}>*/}
                {/*               Сохранить*/}
                {/*            </Button>*/}
                {/*         </GridItem>*/}
                {/*      </GridContainer>*/}
                {/*   );*/}
                {/*})}*/}
                <GridContainer className="flex-vertical-center">
                  <GridItem xs={12} sm={12} md={8} lg={8}>
                    <Input
                      name="vkontakte"
                      value={inputState.vkontakte}
                      error={invalidMessages}
                      onChange={handleInputChange}
                      onInvalid={handleInvalidMessage}
                      type="text"
                      label="TikTok"
                      placeholder="Tiktok"
                      className="p-b__1"
                      required
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4} lg={4}>
                    <Button
                      onClick={(e) => onLinkUpdate(e, "vkontakte")}
                      className="vk-button"
                    >
                      Сохранить
                    </Button>
                  </GridItem>
                </GridContainer>
                <GridContainer className="flex-vertical-center">
                  <GridItem xs={12} sm={12} md={8} lg={8}>
                    <Input
                      name="instagram"
                      value={inputState.instagram}
                      error={invalidMessages}
                      onChange={handleInputChange}
                      onInvalid={handleInvalidMessage}
                      type="text"
                      label="Instagram"
                      placeholder="Instagram"
                      className="p-b__1"
                      required
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4} lg={4}>
                    <Button
                      onClick={(e) => onLinkUpdate(e, "instagram")}
                      className="in-button"
                    >
                      Сохранить
                    </Button>
                  </GridItem>
                </GridContainer>
                {/* <GridContainer className="flex-vertical-center">
                  <GridItem xs={12} sm={12} md={8} lg={8}>
                    <Input
                      name="facebook"
                      value={inputState.facebook}
                      error={invalidMessages}
                      onChange={handleInputChange}
                      onInvalid={handleInvalidMessage}
                      type="text"
                      label="Facebook"
                      placeholder="Facebook"
                      className="p-b__1"
                      required
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4} lg={4}>
                    <Button
                      onClick={(e) => onLinkUpdate(e, "facebook")}
                      className="fb-button"
                    >
                      Сохранить
                    </Button>
                  </GridItem>
                </GridContainer> */}
                <GridContainer className="flex-vertical-center">
                  <GridItem xs={12} sm={12} md={8} lg={8}>
                    <Input
                      name="telegram"
                      value={inputState.telegram}
                      error={invalidMessages}
                      onChange={handleInputChange}
                      onInvalid={handleInvalidMessage}
                      type="text"
                      label="Telegram"
                      placeholder="Telegram"
                      className="p-b__1"
                      required
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4} lg={4}>
                    <Button
                      onClick={(e) => onLinkUpdate(e, "telegram")}
                      className="tg-button"
                    >
                      Сохранить
                    </Button>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  {/*<GridItem xs={2} sm={2} md={2} lg={2}>*/}
                  {/*   <Button*/}
                  {/*      onClick={onSaveClick}*/}
                  {/*      isLoading={updateUserLoading}>*/}
                  {/*      Сохранить*/}
                  {/*   </Button>*/}
                  {/*</GridItem>*/}
                  <GridItem xs={2} sm={2} md={2} lg={2}>
                    <Button className="cancell-button">Отмена</Button>
                  </GridItem>
                </GridContainer>
              </GridItem>
              <GridItem xs={12} sm={12} md={4} lg={4} />
            </GridContainer>
          </Form>
        </GridItem>
      </GridContainer>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { profile } = state;
  return {
    currentUserInfo: profile.currentUserInfo,
    editAvatarLoading: profile.editAvatarLoading,
    updateUserLoading: profile.updateUserLoading,
    updateLinkLoading: profile.updateLinkLoading,
    appLink: profile.appLink,
  };
};
const mapDispatchToProps = (dispatch) => ({
  editAvatarAsync: (params) => dispatch(editAvatarAsync(params)),
  updateUserAsync: (params) => dispatch(updateUserAsync(params)),
  updateLinkAsync: (params) => dispatch(updateLinkAsync(params)),
  subscribeLinkAsync: (params) => dispatch(subscribeLinkAsync(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
