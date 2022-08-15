import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";

//BASE COMPONENTS
import Form from "../../../components/form/Form.component";
import DropZone from "../../../components/drop-zone/DropZone.component";
import Input from "../../../components/input/Input.component";
import TextArea from "../../../components/text-area/TextArea.component";
import LoaderWrapper from "../../../components/loader-wrapper/LoaderWrapper.component";
import Button from "../../../components/button/Button.component";
import IsVisible from "../../../components/is-visible/IsVisible.component";
//IMAGES
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
import { checkForEmptyProperties, compareObjects, titleCase } from "../../../utilities/helper-functions";
import { getBase64 } from "../../../utilities/handleFile";
import { userLogout } from "../../../redux/auth/auth.actions";
import { Avatar, Divider, Grid, Link } from "@mui/material";
import { Home } from "@mui/icons-material";
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';

const socialNets = [
   { name: titleCase("VKontakte"),   tKey:"social_media.VK.title"       }, 
   { name: titleCase("Instagram"),   tKey:"social_media.Instagram.title" }, 
   { name: titleCase("Facebook"),    tKey:"social_media.Facebook.title" }, 
   { name: titleCase("Telegram"),    tKey:"social_media.Telegram.title" }
]

const ProfilePage = (props) => {
   const {
      crumbsProps:[crumbs, setCrumbs],

      stateProfileAppLink,
      stateProfileCurrentUserInfo,
      stateProfileEditAvatarLoading,
      stateProfileUpdateUserLoading,

      dispatchEditAvatarAsync,
      dispatchSubscribeLinkAsync,
      dispatchUpdateLinkAsync,
      dispatchUpdateUserAsync,
      dispatchUserLogout,
   } = props;

   const [avatarData, setAvatarData] = useState({});
   const [uploadedFiles, setUploadedFiles] = useState([]);
   const [isCopied, setIsCopied] = useState(false);

   const [initInput] = useState((() => {
      // console.log(stateProfileCurrentUserInfo);

      const {links: _, ...profile} = stateProfileCurrentUserInfo

      stateProfileCurrentUserInfo.links.forEach(({socialNet, url}) => { 
         socialNets.find(({name}) => name === socialNet.value) 
            && (profile[socialNet.value] = url) 
      })
      return profile
   })());

   useEffect(() => {
      if (stateProfileCurrentUserInfo?.id) {
         dispatchSubscribeLinkAsync({ id: stateProfileCurrentUserInfo.id });
      }
   }, [stateProfileCurrentUserInfo.id, dispatchSubscribeLinkAsync]);

   const {
      inputState,
      handleInput,
      handleInvalidMessage,
      invalidMessages,
      setInputState
   } = useInput({ ...initInput });
   // useState(inputState.links);

   const avatarImg = stateProfileCurrentUserInfo?.avatar;

   const handleInputChange = (event) => {
      handleInput(event);
   };

   const handleFiles = (files) => {
      const file = files[0]
      getBase64(file, reader => {
         dispatchEditAvatarAsync({ data: reader.result, name: file?.name })
         setAvatarData({
            data: reader.result,
            name: file?.name,
         })
      });
      setUploadedFiles(files);
   };

   const copyAppLink = () => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1000);
   };

   const onSaveClick = (e) => {
      e.preventDefault();

      // console.log('inputState', inputState);

      const {avatar: _, ...profile} = inputState

      socialNets.forEach(({name}) => delete profile[name])

      // console.log('profile', profile);

      dispatchUpdateUserAsync(profile)

      // const out = {}
      // Object
      //    .entries(inputState)
      //    .forEach(([key,value]) => { 
      //       !socialNets.find(({name}) => name === key) && value !== stateProfileCurrentUserInfo[key] && (out[key] = value) 
      //    })

      // if (Object.keys(out).length > 0) {
      //    out.id = inputState.id
      //    console.log("prepare person => ", out);
      // }

      // dispatchUpdateUserAsync(out);

      socialNets.forEach(({name}) => {
         const prevUrl = stateProfileCurrentUserInfo.links.find(({socialNet}) => socialNet.value === name)?.url
         const newUrl = inputState[name]
         if (!(!prevUrl && !newUrl) && newUrl !== prevUrl) {
            const out = {
               userId: inputState.id,
               socialNetName: name,
               url: newUrl
            }
            // console.log("prepare links => ", out);
            dispatchUpdateLinkAsync(out)
         }

      })
   };

   const [noChange, setNoChange] = useState(compareObjects(inputState, initInput) || !checkForEmptyProperties(inputState))

   useEffect(() => {
      setNoChange(compareObjects(inputState, initInput) || !checkForEmptyProperties(inputState))
   }, [initInput, inputState])

   useEffect(() => {
      const initCrumb = {key: 0, name: t("profile.title"), icon: <Home fontSize="small" />}

      if (crumbs.length === 0 || !compareObjects(crumbs[0], initCrumb)) {      
         setCrumbs([initCrumb])
      }
   }, [crumbs, setCrumbs]);

   return (
      <Form>
         <Grid container spacing={2} justifyContent="center">
            <Grid item  sm={11} md={8} justifyContent="center">
               <Grid item xs={12}>
                  <DropZone
                     title={(avatarData.data || avatarImg) ? t("profile.photo_change_prompt") : t("profile.photo_put_prompt")}
                     buttonText={t("actions.change")}
                     handleFiles={handleFiles}
                     files={uploadedFiles}
                     showName={false}
                  >
                     <LoaderWrapper isLoading={stateProfileEditAvatarLoading}>
                        <div>
                           {/* <Image roundedCircle src={avatarData.data || avatarImg} alt="avatar" /> */}
                           <Avatar sx={{ width: 96, height: 96 }} alt="avatar" src={avatarData.data || avatarImg} />
                        </div>
                     </LoaderWrapper>
                  </DropZone>
               </Grid>
               
               <Divider sx={{ my:'1rem'}}/>
               
               <Grid item xs={12}>
                  <CopyToClipboard
                     text={stateProfileAppLink}
                     onCopy={copyAppLink}>
                     <div className="copy-area">
                        <Input name="copyUrl" id="copyUrl"
                           value={stateProfileAppLink || ""}
                           error={invalidMessages}
                           onChange={handleInputChange}
                           onInvalid={handleInvalidMessage}
                           type="url"
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
               </Grid>
               
               <h4>{t("profile.person")}</h4>

               <Grid item xs={12}>
                  <Input
                     name="email"
                     value={inputState.email || ""}
                     error={invalidMessages}
                     onChange={handleInputChange}
                     onInvalid={handleInvalidMessage}
                     type="email"
                     label="Email"
                     placeholder="Email"
                     className="p-b__1__disabled"
                     required
                     disabled={true}
                  />
               </Grid>

               <Grid item xs={12}>
                  <Input
                     name="phone"
                     value={inputState.phone || ""}
                     error={invalidMessages}
                     onChange={handleInputChange}
                     onInvalid={handleInvalidMessage}
                     type="tel"
                     label={t("profile.phone")}
                     placeholder={t("profile.phone")}
                     className="p-b__1"
                     required
                  />
               </Grid>

               <Grid item xs={12}>
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
               </Grid>

               <Grid item xs={12}>
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
               </Grid>

               <Grid item xs={12}>
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
               </Grid>

               <Divider sx={{ my:'1rem'}}/>


               <h4>{t("social_media.title")}</h4>

               {
                  socialNets.map(({name, tKey}, idx) =>
                     <Grid container item xs={12} key={idx} alignItems={"center"}>
                        <Grid item xs={10} key={idx}>
                           <Input
                              name={name}
                              value={inputState[name]}
                              error={invalidMessages}
                              onChange={handleInputChange}
                              onInvalid={handleInvalidMessage}
                              type="url"
                              label={t(tKey)}
                              placeholder={t(tKey)}
                              className="p-b__1"
                              required
                           />
                        </Grid>
                        <Grid item xs={2} container justifyContent="center">
                        {/* <Button fullWidth href={inputState[name]}>{'>>'}</Button> */}
                        <Link target="_blank" href={inputState[name]}>
                           <LaunchOutlinedIcon />
                        </Link>
                        </Grid>
                     </Grid>
                  )
               }

               <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={5} lg={3}>
                     <Button disabled={noChange}
                        onClick={onSaveClick}
                        isLoading={stateProfileUpdateUserLoading}
                        variant="contained"
                        color="primary"
                     >
                        {t("actions.save")}
                     </Button>
                  </Grid>
                  <Grid item xs={5} lg={3}>
                     <Button disabled={noChange} onClick={() => setInputState(initInput)} variant="outlined" color="primary">{t("actions.cancel")}</Button>
                  </Grid>

                  <Divider sx={{ my:'3rem'}}/>

                  <Grid item xs={10}>
                     <Button variant="contained" color="secondary" name="logout" onClick={dispatchUserLogout}>{t("actions.sign_out")}</Button>
                  </Grid>

               </Grid>



            </Grid>
         </Grid>
      </Form>
   );
};

const mapStateToProps = (state) => {
   const { profile } = state;
   return {
      stateProfileCurrentUserInfo: profile.currentUserInfo,
      stateProfileEditAvatarLoading: profile.editAvatarLoading,
      stateProfileUpdateUserLoading: profile.updateUserLoading,
      updateLinkLoading: profile.updateLinkLoading,
      stateProfileAppLink: profile.appLink,
   };
};
const mapDispatchToProps = (dispatch) => ({
   dispatchUserLogout: () => dispatch(userLogout()),
   dispatchEditAvatarAsync: (params) => dispatch(editAvatarAsync(params)),
   dispatchUpdateUserAsync: (params) => dispatch(updateUserAsync(params)),
   dispatchUpdateLinkAsync: (params) => dispatch(updateLinkAsync(params)),
   dispatchSubscribeLinkAsync: (params) => dispatch(subscribeLinkAsync(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
