import React, { useState } from "react";
import { useHistory } from "react-router-dom";

//BASE COMPONENTS
import Input from "components/input/Input.component";
import Button from "components/button/Button.component";
import GridContainer from "components/grid-container/GridContainer.component";
import GridItem from "components/grid-item/GridItem.component";
import BackArrow from "components/back-arrow/BackArrow.component";
import Form from "components/form/Form.component";
import TagsInput from "components/tags-input/TagsInput.component";
import Select from "components/select/Select.component";
import { Switch } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import NewCourseServices from "./NewCourse.services";

import plusIcon from "assets/images/topics/plus.png";

import "./_newcourse.scss";
import { createCoursesAsync } from "redux/courses/courses.actions";

import { connect, useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const NewCoursePage = (props) => {
   const { createCoursesAsync } = props;
   const languagesList = useSelector((state) => state.common.languagesList);
   const history = useHistory();
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
         history
      );
      // if (id) {
      //    //  editTopicAsync(id, inputState, history, isTagsUpdated);
      // } else {
      //    createCoursesAsync(formInitState, history);
      // }
   };

   return (
      <div className="new-topic-subpage">
         <GridContainer>
            <GridItem xs={12} sm={12} md={12} lg={12}>
               <BackArrow text="Курсы" />
               <h1>Создание курса</h1>
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={12}>
               <Form>
                  <GridItem xs={12} sm={12} md={6} lg={6}>
                     <Input
                        name="text"
                        value={inputState.name}
                        onChange={(e) => {
                           setInputState({
                              ...inputState,
                              name: e.target.value,
                           });
                        }}
                        label="Название курса"
                        type="text"
                        placeholder="Курс 10"
                        required
                     />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6} lg={6}>
                     <TagsInput
                        fullWidth
                        variant="outlined"
                        id="tags"
                        name="tags"
                        placeholder="#hashtags"
                        label="Теги"
                     />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3} lg={3}>
                     <Select
                        name="foreignLanguage"
                        label="Изучаемый язык"
                        placeholder="Выберите язык"
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
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3} lg={3}>
                     <Select
                        name="nativeLanguage"
                        label="Родной язык"
                        placeholder="Выберите язык"
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
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2} lg={2}>
                     <Input
                        name="text"
                        value={inputState.cost}
                        onChange={(e) => {
                           setInputState({
                              ...inputState,
                              cost: e.target.value,
                           });
                        }}
                        label="Цена"
                        type="text"
                        placeholder="1000 Р"
                        required
                     />
                  </GridItem>
                  <div className="new-course-themes">
                     <div className="new-course-themes__title">
                        <div className="h2">Темы курса</div>
                        <Button
                           onClick={() => {
                              dispatch({
                                 type: "SAVE_DRAFT_COURSE",
                                 payload: inputState,
                              });
                              history.push("/course-themes");
                           }}
                           className="settings-panel__plus-icon"
                           src={plusIcon}>
                           Добавить темы
                        </Button>
                     </div>
                     <div className="new-course-themes__wrapper">
                        {topics.length === 0 ? (
                           <p>Темы еще не добавлены</p>
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
                        Сделать курс публичным
                     </Grid>
                  </Grid>
                  <GridItem
                     xs={12}
                     sm={12}
                     md={6}
                     lg={6}
                     className="new-topic-subpage__buttons-block">
                     <GridItem xs={12} sm={12} md={2} lg={2}>
                        <Button className="save-button" onClick={onSubmit}>
                           Добавить в курс
                        </Button>
                     </GridItem>
                     <GridItem xs={12} sm={12} md={2} lg={2}>
                        <Button className="cancel-button">Отмена</Button>
                     </GridItem>
                  </GridItem>
               </Form>
            </GridItem>
         </GridContainer>
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
   createCoursesAsync: (params, history) =>
      dispatch(createCoursesAsync(params, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewCoursePage);
