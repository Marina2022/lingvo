import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";

//BASE COMPONENTS
import GridContainer from "../../../components/grid-container/GridContainer.component";
import GridItem from "../../../components/grid-item/GridItem.component";
import Form from "../../../components/form/Form.component";
import DropZone from "../../../components/drop-zone/DropZone.component";
import Input from "../../../components/input/Input.component";
import TextArea from "../../../components/text-area/TextArea.component";
import LoaderWrapper from "../../../components/loader-wrapper/LoaderWrapper.component";
import Button from "../../../components/button/Button.component";
import IsVisible from "../../../components/is-visible/IsVisible.component";
//IMAGES
import avatarIcon from "../../../assets/images/profile/avatar.png";
//EFFECTS
import useInput from "../../../effects/useInput.effect";
//ACTIONS
import {
   editAvatarAsync,
   updateUserAsync,
   updateLinkAsync,
   subscribeLinkAsync,
} from "../../../redux/profile/profile.actions";
import { t } from "i18next";
import { titleCase } from "../../../utilities/helper-functions";
import { getBase64 } from "../../../utilities/handleFile";
import { Image } from "react-bootstrap";
import { userLogout } from "../../../redux/auth/auth.actions";

const socialNets = [
   { name: titleCase("VKontakte"),   tKey:"social_media.VK.title"       }, 
   { name: titleCase("Instagram"),   tKey:"social_media.Instagram.title" }, 
   { name: titleCase("Facebook"),    tKey:"social_media.Facebook.title" }, 
   { name: titleCase("Telegram"),    tKey:"social_media.Telegram.title" }
]

const ProfilePage = (props) => {
   const {
      userLogout,
      currentUserInfo,
      editAvatarAsync,
      editAvatarLoading,
      updateUserAsync,
      updateUserLoading,
      updateLinkAsync,
      subscribeLinkAsync,
      appLink,
   } = props;

   const [avatarData, setAvatarData] = useState({});
   const [uploadedFiles, setUploadedFiles] = useState([]);
   const [isCopied, setIsCopied] = useState(false);

   const formInitState = {...currentUserInfo,};

   delete formInitState.links

   currentUserInfo.links.forEach(({socialNet, url}) => { 
      socialNets.find(({name}) => name === socialNet.value) 
         && (formInitState[socialNet.value] = url) 
   })

   useEffect(() => {
      if (currentUserInfo?.id) {
         subscribeLinkAsync({ id: currentUserInfo.id });
      }
   }, [currentUserInfo.id, subscribeLinkAsync]);

   const {
      inputState,
      handleInput,
      handleInvalidMessage,
      invalidMessages,
   } = useInput({ ...formInitState });
   // useState(inputState.links);

   const avatarImg = currentUserInfo?.avatar
      ? currentUserInfo.avatar
      : avatarIcon;

   const handleInputChange = (event) => {
      handleInput(event);
   };

   const handleFiles = (files) => {
      const file = files[0]
      getBase64(file, reader => {
         editAvatarAsync({ data: reader.result, name: file?.name })
         setAvatarData({
            data: reader.result,
            name: file?.name,
         })
      });
      setUploadedFiles(files);
   };

   const copyAppLink = () => {
      setIsCopied(true);
      setTimeout(() => {
         setIsCopied(false);
      }, 1000);
   };

   const onSaveClick = (e) => {
      e.preventDefault();

      const out = {}
      Object
         .entries(inputState)
         .forEach(([key,value]) => { 
            !socialNets.find(({name}) => name === key) && value !== currentUserInfo[key] && (out[key] = value) 
         })

      if (Object.keys(out).length > 0) {
         out.id = inputState.id
         console.log("prepare person => ", out);
      }

      updateUserAsync(out);

      socialNets.forEach(({name}) => {
         const prevUrl = currentUserInfo.links.find(({socialNet}) => socialNet.value === name)?.url
         const newUrl = inputState[name]
         if (!(!prevUrl && !newUrl) && newUrl !== prevUrl) {
            const out = {
               userId: inputState.id,
               socialNetName: name,
               url: newUrl
            }
            // console.log("prepare links => ", out);
            updateLinkAsync(out)
         }

      })
   };
   // useEffect(() => {
   //    socialNets.forEach(({name}) => {
   //       try {
   //          inputState.links.find(({socialNet}) => socialNet.value === name).url = 
   //             currentUserInfo.links.find(({socialNet}) => socialNet.value === name).url
   //       } catch (e) {}
   //    })
   // }, [currentUserInfo.links, inputState.links]);

   return (
      <div className="profile-page">
         <GridContainer justifyContent="center">
            <GridItem xs={11} md={8}>
               <h2>{t("profile.title")}</h2>
            </GridItem>
            <GridItem xs={12}>

               <Form>
                  <GridContainer justifyContent="center">
                     <GridItem  sm={11} md={8} justifyContent="center">
                        <GridItem xs={12}
                           className="flex-vertical-center">
                           <DropZone
                              title={(avatarData.data || avatarImg) ? t("profile.photo_change_prompt") : t("profile.photo_put_prompt")}
                              buttonText={t("actions.change")}
                              handleFiles={handleFiles}
                              files={uploadedFiles}
                              showName={false}
                           >
                              <LoaderWrapper isLoading={editAvatarLoading}>
                                 <div className="profile-page__avatar-block flex-center">
                                    <Image roundedCircle src={avatarData.data || avatarImg} alt="avatar" />
                                 </div>
                              </LoaderWrapper>
                           </DropZone>
                        </GridItem>
                        
                        <div className="separator" />
                        
                        <GridItem xs={12}>
                           <CopyToClipboard
                              text={appLink}
                              onCopy={copyAppLink}>
                              <div className="copy-area">
                                 <Input name="copyUrl" id="copyUrl"
                                    value={appLink || ""}
                                    error={invalidMessages}
                                    onChange={handleInputChange}
                                    onInvalid={handleInvalidMessage}
                                    type="text"
                                    title={t("profile.click_to_copy")}
                                    label={t("profile.app_link")}
                                    placeholder={t("profile.app_link")}
                                    className={!isCopied ? "p-b__2" : "p-b__3"}
                                    disabled={true}
                                    required
                                 />
                                 <IsVisible isVisible={isCopied}>
                                    <span className="copy-done">{t("profile.copy_done")}</span>
                                 </IsVisible>
                                 <IsVisible isVisible={!isCopied}>
                                    <span className="copy-done">&nbsp;</span>
                                 </IsVisible>
                              </div>
                           </CopyToClipboard>
                        </GridItem>
                        
                        <h4>{t("profile.person")}</h4>

                        <GridItem xs={12}>
                           <Input
                              name="email"
                              value={inputState.email || ""}
                              error={invalidMessages}
                              onChange={handleInputChange}
                              onInvalid={handleInvalidMessage}
                              type="text"
                              label="Email"
                              placeholder="Email"
                              className="p-b__1__disabled"
                              required
                              disabled={true}
                           />
                        </GridItem>

                        <GridItem xs={12}>
                           <Input
                              name="phone"
                              value={inputState.phone || ""}
                              error={invalidMessages}
                              onChange={handleInputChange}
                              onInvalid={handleInvalidMessage}
                              type="text"
                              label={t("profile.phone")}
                              placeholder={t("profile.phone")}
                              className="p-b__1"
                              required
                           />
                        </GridItem>

                        <GridItem xs={12}>
                           <Input
                              name="name"
                              value={inputState.name || ""}
                              error={invalidMessages}
                              onChange={handleInputChange}
                              onInvalid={handleInvalidMessage}
                              type="text"
                              label={t("profile.name")}
                              placeholder={t("profile.name")}
                              className="p-b__1"
                              required
                           />
                        </GridItem>

                        <GridItem xs={12}>
                           <Input
                              name="nickname"
                              value={inputState.nickname || ""}
                              error={invalidMessages}
                              onChange={handleInputChange}
                              onInvalid={handleInvalidMessage}
                              type="text"
                              label={t("profile.nickname")}
                              placeholder={t("profile.nickname")}
                              className="p-b__1"
                              required
                           />
                        </GridItem>

                        <GridItem xs={12}>
                           <TextArea
                              name="about_oneself"
                              value={inputState.bio}
                              error={invalidMessages}
                              onChange={handleInputChange}
                              onInvalid={handleInvalidMessage}
                              label={t("profile.about_oneself")}
                              placeholder={t("profile.bio")}
                              minRows={2}
                              className="p-b__1"
                              required
                           />
                        </GridItem>

                        <div className="separator" />

                        <h4>{t("social_media.title")}</h4>

                        {
                           socialNets.map(({name, tKey}, idx) =>
                              <GridItem xs={12} key={idx}>
                                 <Input
                                    name={name}
                                    value={inputState[name]}
                                    error={invalidMessages}
                                    onChange={handleInputChange}
                                    onInvalid={handleInvalidMessage}
                                    type="text"
                                    label={t(tKey)}
                                    placeholder={t(tKey)}
                                    className="p-b__1"
                                    required
                                 />
                              </GridItem>
                           )
                        }

                        <GridContainer justifyContent="center">
                           <GridItem xs={5} lg={3}>
                              <Button
                                 onClick={onSaveClick}
                                 isLoading={updateUserLoading}>
                                 {t("actions.save")}
                              </Button>
                           </GridItem>
                           <GridItem xs={5} lg={3}>
                              <Button className="cancel-button">{t("actions.cancel")}</Button>
                           </GridItem>

                           <div className="separator" />
                           <GridItem xs={10}>
                              <Button variant="secondary" name="logout" onClick={userLogout}>{t("actions.sign_out")}</Button>
                           </GridItem>

                        </GridContainer>



                     </GridItem>
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
   userLogout: () => dispatch(userLogout()),
   editAvatarAsync: (params) => dispatch(editAvatarAsync(params)),
   updateUserAsync: (params) => dispatch(updateUserAsync(params)),
   updateLinkAsync: (params) => dispatch(updateLinkAsync(params)),
   subscribeLinkAsync: (params) => dispatch(subscribeLinkAsync(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
