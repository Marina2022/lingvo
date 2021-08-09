import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

//BASE COMPONENTS
import Input from "components/input/Input.component";
import Button from "components/button/Button.component";
import GridContainer from "../../../../../components/grid-container/GridContainer.component";
import GridItem from "../../../../../components/grid-item/GridItem.component";
import BackArrow from "../../../../../components/back-arrow/BackArrow.component";
import Form from "../../../../../components/form/Form.component";
import TagsInput from "../../../../../components/tags-input/TagsInput.component";
import Select from "../../../../../components/select/Select.component";
import { Switch } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import plusIcon from "../../../../../assets/images/topics/plus.png";

import "./_newcourse.scss";
import { createCoursesAsync } from "../../../../../redux/courses/courses.actions";

import { connect } from "react-redux";

const NewCoursePage = (props) => {
   const { createCoursesAsync, currentUserInfo } = props;
   const history = useHistory();
   // let { id } = useParams();
   const [isCoursePublic, setCoursePublic] = useState(false);

   const changeCourseStatus = () => {
      setCoursePublic(!isCoursePublic);
   };

   const [formInitState] = useState({
      author: currentUserInfo,
      cost: 1000,
      foreignLanguage: {
         id: 1,
         value: "English",
      },
      id: 1,
      name: "Test",
      nativeLanguage: {
         id: 5,
         value: "Russian",
      },
      posts: [
         {
            author: {
               accountType: "LINGVOINSTA",
               avatar:
                  "https://s3.eu-north-1.amazonaws.com/lingvo/avatars/avatar_user_109.jpg",
               email: "rastyw1130@rambler.ru",
               id: 109,
               links: [
                  {
                     id: 3,
                     ownerId: 214,
                     url: "fb.com",
                     socialNet: {
                        id: 3,
                        value: "Facebook",
                     },
                  },
                  {
                     id: 4,
                     ownerId: 214,
                     url: "https://www.telegram.com/",
                     socialNet: {
                        id: 1,
                        value: "Telegram",
                     },
                  },
                  {
                     id: 1,
                     ownerId: 214,
                     url: "kikikiki",
                     socialNet: {
                        id: 2,
                        value: "Vkontakte",
                     },
                  },
                  {
                     id: 2,
                     ownerId: 214,
                     url: "555555555555555",
                     socialNet: {
                        id: 4,
                        value: "Instagram",
                     },
                  },
               ],
               name: "Author_Test",
               nickname: "Author_Test",
               phone: null,
               roles: [
                  {
                     id: 3,
                     value: "AUTHOR",
                     privileges: [
                        {
                           id: 38,
                           value: "UPDATE_VOICE",
                        },
                        {
                           id: 29,
                           value: "DELETE_TAG",
                        },
                        {
                           id: 31,
                           value: "READ_USER",
                        },
                        {
                           id: 42,
                           value: "CREATE_COURSE",
                        },
                        {
                           id: 23,
                           value: "READ_SAMPLE",
                        },
                        {
                           id: 6,
                           value: "CREATE_POST",
                        },
                        {
                           id: 25,
                           value: "DELETE_SAMPLE",
                        },
                        {
                           id: 36,
                           value: "CREATE_VOICE",
                        },
                        {
                           id: 37,
                           value: "DELETE_VOICE",
                        },
                        {
                           id: 40,
                           value: "UPDATE_LINK_SUBSCRIBE",
                        },
                        {
                           id: 41,
                           value: "READ_COURSE",
                        },
                        {
                           id: 24,
                           value: "CREATE_SAMPLE",
                        },
                        {
                           id: 39,
                           value: "READ_LINK_SUBSCRIBE",
                        },
                        {
                           id: 27,
                           value: "READ_TAG",
                        },
                        {
                           id: 44,
                           value: "UPDATE_COURSE",
                        },
                        {
                           id: 8,
                           value: "UPDATE_POST",
                        },
                        {
                           id: 45,
                           value: "USE_LINK_SUBSCRIBE",
                        },
                        {
                           id: 35,
                           value: "READ_VOICE",
                        },
                        {
                           id: 5,
                           value: "READ_POST",
                        },
                        {
                           id: 30,
                           value: "UPDATE_TAG",
                        },
                        {
                           id: 28,
                           value: "CREATE_TAG",
                        },
                        {
                           id: 34,
                           value: "UPDATE_USER",
                        },
                        {
                           id: 7,
                           value: "DELETE_POST",
                        },
                        {
                           id: 26,
                           value: "UPDATE_SAMPLE",
                        },
                        {
                           id: 43,
                           value: "DELETE_COURSE",
                        },
                     ],
                  },
               ],

               subscribeHash: "i7cGmoA59cOrtJm2D8NF",
               surname: null,
            },
            id: 34,
            text: "Условные предложения в английском 1",
            foreignLanguage: {
               id: 1,
               value: "English",
            },
            nativeLanguage: {
               id: 5,
               value: "Russian",
            },
            createdDate: "2021-02-18T05:10:14.065Z",
            published: "2021-02-26T11:33:38.333Z",
            tags: [],
            samples: [
               {
                  id: 70,
                  postId: 34,
                  value:
                     "If you keep silent all the time, he will think that your opinion is not important.",
                  translation:
                     "Если вы будете все время молчать, он подумает, что ваше мнение не важно.",
                  description: null,
                  level: null,
                  tags: [],
                  voices: [
                     {
                        id: 533,
                        language: {
                           id: 1,
                           value: "English",
                        },
                        name: "1.mp3",
                        url:
                           "https://s3.eu-north-1.amazonaws.com/lingvo/voices/2021-07-10T17%3A50%3A26.961_1.mp3",
                     },
                  ],
               },
               {
                  id: 86,
                  postId: 34,
                  value: "Oh, feels like you have a full diaper",
                  translation: "О, такое ощущение, что у тебя полный подгузник",
                  description: "22222",
                  level: null,
                  tags: [],
                  voices: [
                     {
                        id: 79,
                        language: {
                           id: 1,
                           value: "English",
                        },
                        name:
                           "d0c79b9d-801f-4006-8e3a-66dee2410879 (audio-extractor.net).mp3",
                        url:
                           "https://s3.eu-north-1.amazonaws.com/lingvo/voices/2021-02-26T12%3A33%3A27.556_d0c79b9d-801f-4006-8e3a-66dee2410879%20%28audio-extractor.net%29.mp3",
                     },
                  ],
               },
               {
                  id: 71,
                  postId: 34,
                  value: "If you kept silent he wouldn’t be so angry.",
                  translation: "Если бы ты молчал, он бы не был так зол.",
                  description: null,
                  level: null,
                  tags: [],
                  voices: [
                     {
                        id: 536,
                        language: {
                           id: 1,
                           value: "English",
                        },
                        name:
                           "Generated_voice-0c1f3fc1-7027-4e26-98c4-66751eb2bfc6.mpeg",
                        url:
                           "https://s3.eu-north-1.amazonaws.com/lingvo/voices/2021-07-10T18%3A16%3A51.835_Generated_voice-0c1f3fc1-7027-4e26-98c4-66751eb2bfc6.mpeg",
                     },
                  ],
               },
               {
                  id: 69,
                  postId: 34,
                  value:
                     "If you are silent people don’t understand what you feel.",
                  translation:
                     "Если вы молчите, люди не понимают, что вы чувствуете.",
                  description: null,
                  level: null,
                  tags: [],
                  voices: [
                     {
                        id: 534,
                        language: {
                           id: 1,
                           value: "English",
                        },
                        name:
                           "Generated_voice-1a0eeec0-2850-4b1b-96e3-17bb5e87b32d.mpeg",
                        url:
                           "https://s3.eu-north-1.amazonaws.com/lingvo/voices/2021-07-10T17%3A51%3A05.006_Generated_voice-1a0eeec0-2850-4b1b-96e3-17bb5e87b32d.mpeg",
                     },
                  ],
               },
               {
                  id: 72,
                  postId: 34,
                  value:
                     "She’s been silent all this time keeping their secret.",
                  translation: "Она молчала все это время, храня их тайну.",
                  description: null,
                  level: null,
                  tags: [],
                  voices: [
                     {
                        id: 535,
                        language: {
                           id: 1,
                           value: "English",
                        },
                        name:
                           "Generated_voice-2c375607-cf6b-47cd-8926-b18269cfc990.mpeg",
                        url:
                           "https://s3.eu-north-1.amazonaws.com/lingvo/voices/2021-07-10T17%3A54%3A07.877_Generated_voice-2c375607-cf6b-47cd-8926-b18269cfc990.mpeg",
                     },
                  ],
               },
            ],
         },
      ],
      shared: true,
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
      console.log(currentUserInfo);
      createCoursesAsync(formInitState, history);
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
                        value=""
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
                     />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3} lg={3}>
                     <Select
                        name="nativeLanguage"
                        label="Родной язык"
                        placeholder="Выберите язык"
                        required
                     />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2} lg={2}>
                     <Input
                        name="text"
                        value=""
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
                           onClick={() => history.push("/course-themes")}
                           className="settings-panel__plus-icon"
                           src={plusIcon}>
                           Добавить темы
                        </Button>
                     </div>
                     <div className="new-course-themes__wrapper">
                        <p>Темы еще не добавлены</p>
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
                           checked={isCoursePublic}
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
