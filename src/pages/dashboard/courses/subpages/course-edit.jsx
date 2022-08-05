import React, { useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, Switch } from "@mui/material";
import { withStyles } from "@mui/styles";
import axios from "axios";
import "./course-new";
import { createCoursesAsync } from "../../../../redux/courses/courses.actions";
import BackArrow from "../../../../components/back-arrow/BackArrow.component";
import Button from "../../../../components/button/Button.component";
import Form from "../../../../components/form/Form.component";
import Input from "../../../../components/input/Input.component";
import NewCourseServices from "./course-new-services";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Select from "../../../../components/select";
import TagsInput from "../../../../components/tags-input/TagsInput.component";
import { t } from "i18next";

const EditCoursePage = (props) => {
   const languagesList = useSelector((state) => state.common.languagesList);
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [topics, setTopics] = useState(
      useSelector((state) => state.drafts.topics)
   );
   useState(false);
   const [inputState, setInputState] = useState(
      useSelector((state) => state.drafts)
   );
   const { generateLanguagesOptions } = NewCourseServices;
   const languageOptions = generateLanguagesOptions(languagesList);
   const id = window.location.href.split("/")[4];
   const changeCourseStatus = () => {
      setInputState({ ...inputState, shared: !inputState.shared });
   };
   const current = useSelector((state) => state.drafts.current);
   useState({
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
      //   console.log(currentUserInfo);
      //   console.log(inputState.name);
      //   console.log(inputState.cost);
      //   console.log(inputState.nativeLanguageId);
      //   console.log(inputState.foreignLanguageId);
      //   console.log(inputState.shared);
      topics.forEach((element) => {
         ids.push(element.id);
      });
      //   console.log(ids);
      //   console.log(id);
      axios.put(`/courses/${id}`, {
         ...current,
         id: id,
         cost: inputState.cost,
         author: inputState.author,
         name: inputState.name,
         nativeLanguage: languageOptions[inputState.nativeLanguageId],
         foreignLanguage: languageOptions[inputState.foreignLanguageId],
         posts: topics,
      });
      // console.log(topics);
      navigate("/courses");
      window.location.reload(false);
      // if (id) {
      //    //  editTopicAsync(id, inputState, navigate, isTagsUpdated);
      // } else {
      //    createCoursesAsync(formInitState, navigate);
      // }
   };
   useEffect(
      function () {
         console.log(topics);
      },
      [topics]
   );
   return (
      <div className="new-topic-subpage">
         <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
               <BackArrow text={t("courses.title")} />
               <h1>{inputState.name}</h1>
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
                              navigate("/course-themes");
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
                                       {topic.published}
                                    </div>
                                    <div className="course-theme-item__title">
                                       {topic.text}
                                    </div>
                                    <div className="course-theme-item__langs">
                                       {`${topic.nativeLanguage.value} — ${topic.foreignLanguage.value}`}
                                    </div>
                                    <svg
                                       width="30"
                                       height="33"
                                       className="custom-checkbox"
                                       style={{
                                          backgroundColor: "transparent",
                                       }}
                                       viewBox="0 0 20 22"
                                       fill="none"
                                       xmlns="http://www.w3.org/2000/svg"
                                       onClick={() => {
                                          let c = topics.filter(
                                             (t) => t.id !== topic.id
                                          );
                                          setTopics(c);
                                       }}>
                                       <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M0 5C0 4.44772 0.447715 4 1 4H19C19.5523 4 20 4.44772 20 5C20 5.55228 19.5523 6 19 6H1C0.447715 6 0 5.55228 0 5Z"
                                          fill="black"
                                       />
                                       <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M8 2C7.73478 2 7.48043 2.10536 7.29289 2.29289C7.10536 2.48043 7 2.73478 7 3V4H13V3C13 2.73478 12.8946 2.48043 12.7071 2.29289C12.5196 2.10536 12.2652 2 12 2H8ZM15 4V3C15 2.20435 14.6839 1.44129 14.1213 0.87868C13.5587 0.31607 12.7956 0 12 0H8C7.20435 0 6.44129 0.31607 5.87868 0.87868C5.31607 1.44129 5 2.20435 5 3V4H3C2.44772 4 2 4.44772 2 5V19C2 19.7957 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H15C15.7957 22 16.5587 21.6839 17.1213 21.1213C17.6839 20.5587 18 19.7957 18 19V5C18 4.44772 17.5523 4 17 4H15ZM4 6V19C4 19.2652 4.10536 19.5196 4.29289 19.7071C4.48043 19.8946 4.73478 20 5 20H15C15.2652 20 15.5196 19.8946 15.7071 19.7071C15.8946 19.5196 16 19.2652 16 19V6H4Z"
                                          fill="black"
                                       />
                                       <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M8 9C8.55228 9 9 9.44771 9 10V16C9 16.5523 8.55228 17 8 17C7.44772 17 7 16.5523 7 16V10C7 9.44771 7.44772 9 8 9Z"
                                          fill="black"
                                       />
                                       <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M12 9C12.5523 9 13 9.44771 13 10V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V10C11 9.44771 11.4477 9 12 9Z"
                                          fill="black"
                                       />
                                    </svg>
                                    {/* <Checkbox
                                       className="custom-checkbox"
                                       icon={}
                                       backgroundColor="red"
                                       borderColor="transparent"
                                       borderRadius={6}
                                       size={24}
                                    /> */}
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
                        <Button
                           className="save-button"
                           onClick={onSubmit}
                           style={{ width: "auto" }}>
                           {t("actions.save")}
                        </Button>
                     </Grid>
                     <Grid item xs={12} sm={12} md={2} lg={2}>
                        <Button className="cancel-button">{t("actions.cancel")}</Button>
                     </Grid>
                  </Grid>

                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                     <Button
                        style={{
                           width: "20%",
                           backgroundColor: "transparent",
                           color: "#11141b",
                        }}
                        className="cancel-button delete-button"
                        onClick={() => {
                           axios.delete(`/courses/${id}`);
                           navigate("/courses");
                           window.location.reload();
                        }}>
                        {t("courses.course.delete")}
                     </Button>
                  </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditCoursePage);
