import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//BASE COMPONENTS
import Input from "../../../../components/input/Input.component";
import Button from "../../../../components/button/Button.component";
import BackArrow from "../../../../components/back-arrow/BackArrow.component";
import Form from "../../../../components/form/Form.component";
import TagsInput from "../../../../components/tags-input/TagsInput.component";
import Select from "../../../../components/select";
import { Switch } from "@mui/material";
import { Grid } from "@mui/material";
import { withStyles } from "@mui/styles";
// import NewCourseServices from "./course-new-services";
import NewCourseServices from "./course-new-services";

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import "./course-new.scss";
import { createCoursesAsync } from "../../../../redux/courses/courses.actions";

import { connect, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { t } from "i18next";

const NewCoursePage = (props) => {
   const { createCoursesAsync } = props;
   const languagesList = useSelector((state) => state.common.languagesList);
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const topics = useSelector((state) => state.drafts.topics);
   useState(false);
   const [inputState, setInputState] = useState(
      useSelector((state) => state.drafts)
   );
   const { generateLanguagesOptions } = NewCourseServices;

   const languageOptions = generateLanguagesOptions(languagesList);

   const changeCourseStatus = () => {
      setInputState({ ...inputState, shared: !inputState.shared });
   };

   const [formInitState] = useState({
      cost: 1000,
      foreignLanguageId: 1,
      name: "",
      nativeLanguageId: 5,
      postIds: [],
      shared: false,
      tagIds: [],
   });

   const AntSwitch = withStyles((theme) => ({
      root: {
         width: 28,
         height: 16,
         padding: 0,
         display: "flex",
      },
      switchBase: {
         padding: 2,
         color: "#FFFFFF",
         "&$checked": {
            transform: "translateX(12px)",
            color: theme.palette.common.white,
            "& + $track": {
               opacity: 1,
               backgroundColor: theme.palette.primary.main,
               borderColor: theme.palette.primary.main,
            },
         },
      },
      thumb: {
         width: 12,
         height: 12,
         boxShadow: "none",
      },
      track: {
         border: `1px solid #CFD8DF`,
         borderRadius: 16 / 2,
         opacity: 1,
         backgroundColor: "#CFD8DF",
      },
      checked: {},
   }))(Switch);

   const onSubmit = (event) => {
      event.preventDefault();
      let ids = [];
      // console.log(currentUserInfo);
      // console.log(inputState.name);
      // console.log(inputState.cost);
      // console.log(inputState.nativeLanguageId);
      // console.log(inputState.foreignLanguageId);
      // console.log(inputState.shared);
      topics.forEach((element) => {
         ids.push(element.id);
      });
      // console.log(ids);
      createCoursesAsync(
         {
            ...formInitState,
            ...inputState,
            nativeLanguageId: inputState.nativeLanguageId + 1,
            foreignLanguageId: inputState.foreignLanguageId + 1,
            postIds: ids,
         },
         navigate
      );
      // if (id) {
      //    //  editTopicAsync(id, inputState, navigate, isTagsUpdated);
      // } else {
      //    createCoursesAsync(formInitState, navigate);
      // }
   };

   return (
      <div className="new-topic-subpage">
         <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
               <BackArrow text={t("courses.title")} />
               <h1>{t("courses.course.creation")}</h1>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
               <Form>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                     <Input
                        name="text"
                        value={inputState.name}
                        onChange={(e) => {
                           setInputState({
                              ...inputState,
                              name: e.target.value,
                           });
                        }}
                        label={t("courses.course.name")}
                        type="text"
                        placeholder={t("courses.course.name")}
                        required
                     />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                     <TagsInput
                        fullWidth
                        variant="outlined"
                        id="tags"
                        name="tags"
                        placeholder="#hashtags"
                        label={t("courses.course.tags")}
                     />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                     <Select
                        name="foreignLanguage"
                        label={t("languages.foreign")}
                        placeholder={t("languages.placeholder")}
                        options={languageOptions}
                        onChange={(e) => {
                           setInputState({
                              ...inputState,
                              foreignLanguageId: e.id - 1,
                           });
                        }}
                        defaultValue={
                           languageOptions[inputState.foreignLanguageId]
                        }
                     />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                     <Select
                        name="nativeLanguage"
                        label={t("languages.native")}
                        placeholder={t("languages.placeholder")}
                        options={languageOptions}
                        onChange={(e) => {
                           setInputState({
                              ...inputState,
                              nativeLanguageId: e.id - 1,
                           });
                        }}
                        defaultValue={
                           languageOptions[inputState.nativeLanguageId]
                        }
                        required
                     />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2} lg={2}>
                     <Input
                        name="text"
                        value={inputState.cost}
                        onChange={(e) => {
                           setInputState({
                              ...inputState,
                              cost: e.target.value,
                           });
                        }}
                        label={t("courses.course.price")}
                        type="text"
                        placeholder={t("courses.course.price_placeholder")}
                        required
                     />
                  </Grid>
                  <div className="new-course-themes">
                     <div className="new-course-themes__title">
                        <div className="h2">{t("trainings.list")}</div>
                        <Button
                           onClick={() => {
                              dispatch({
                                 type: "SAVE_DRAFT_COURSE",
                                 payload: inputState,
                              });
                              navigate("/courses");
                           }}
                           className="settings-panel__plus-icon"
                           src={<AddOutlinedIcon/>}>
                           {t("actions.add")}
                        </Button>
                     </div>
                     <div className="new-course-themes__wrapper">
                        {topics.length === 0 ? (
                           <p>{t("trainings.nothing")}</p>
                        ) : (
                           <div className="course-theme-wrapper">
                              {topics.map((topic) => (
                                 <div
                                    className="course-theme-item"
                                    key={topic.id}>
                                    <div className="course-theme-item__date">
                                       {topic.date}
                                    </div>
                                    <div className="course-theme-item__title">
                                       {topic.text}
                                    </div>
                                    <div className="course-theme-item__langs">
                                       {`${topic.nativeLanguage.value} — ${topic.foreignLanguage.value}`}
                                    </div>
                                 </div>
                              ))}
                           </div>
                        )}
                     </div>
                  </div>
                  <Grid
                     className="new-course-public "
                     component="label"
                     container
                     alignItems="center"
                     spacing={1}>
                     <Grid item>
                        <AntSwitch
                           checked={inputState.shared}
                           onChange={changeCourseStatus}
                           name="checkedC"
                        />
                     </Grid>
                     <Grid className="new-course-public__label" item>
                        {t("courses.course.is_public")}
                     </Grid>
                  </Grid>
                  <Grid item
                     xs={12}
                     sm={12}
                     md={6}
                     lg={6}
                     className="new-topic-subpage__buttons-block">
                     <Grid item xs={12} sm={12} md={2} lg={2}>
                        <Button className="save-button" onClick={onSubmit}>
                           {t("actions.add")}
                        </Button>
                     </Grid>
                     <Grid item xs={12} sm={12} md={2} lg={2}>
                        <Button className="cancel-button">
                           {t("actions.cancel")}
                        </Button>
                     </Grid>
                  </Grid>
               </Form>
            </Grid>
         </Grid>
      </div>
   );
};
const mapStateToProps = (state) => {
   const { courses, profile } = state;
   return {
      currentUserInfo: profile.currentUserInfo,
      isCoursesCreatedLoading: courses.isCoursesCreatedLoading,
   };
};
const mapDispatchToProps = (dispatch) => ({
   createCoursesAsync: (params, navigate) =>
      dispatch(createCoursesAsync(params, navigate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewCoursePage);
