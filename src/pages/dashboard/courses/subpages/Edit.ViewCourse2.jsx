/**
 * This file (editViewCourse.jsx) gotten from https://lingvoinstatest.netlify.app/ 
 * doesn't have a relevant copy on Bitbucket project https://bitbucket.org/gbabiral/lingvoinsta-front/src/master/
 */
import React, { useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, Switch } from "@mui/material";
import { withStyles } from "@mui/material/styles";
import axios from "axios";

import "./_newcourse.scss";
import { createCoursesAsync } from "../../../../../redux/courses/courses.actions";
import BackArrow from "../../../../../components/back-arrow/BackArrow.component";
import Button from "../../../../../components/button/Button.component";
import coursesApi from "../../../../../redux/courses/courses.api";
import Form from "../../../../../components/form/Form.component";
import GridContainer from "../../../../../components/grid-container/GridContainer.component";
import GridItem from "../../../../../components/grid-item/GridItem.component";
import Input from "../../../../../components/input/Input.component";
import NewCourseServices from "./course-new-services.js";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';;
import Select from "../../../../../components/select/Select.component";
import TagsInput from "../../../../../components/tags-input/TagsInput.component";
// import useInput from "../../../../../effects/useInput.effect";

const EditCoursePage = (props) => {
//   const { createCoursesAsync, currentUserInfo } = props;
  const { languagesList } = useSelector((state) => state.common);
  const navigate = useNavigate();
  //  const { generateLanguagesOptions } = NewTopicServices;
  const { generateLanguagesOptions } = NewCourseServices;
  const languageOptions = generateLanguagesOptions(languagesList);
  const [newCourse, setNewCourse] = useState(
    useSelector((state) => state.drafts.currentCourse.posts)
  );
  const dispatch = useDispatch();
  const [isCoursePublic, setCoursePublic] = useState(
    useSelector((state) => state.drafts.currentCourse.shared)
  );
  const [cost, setCost] = useState(
    useSelector((state) => state.drafts.currentCourse.cost)
  );
  const [name, setName] = useState(
    useSelector((state) => state.drafts.currentCourse.name)
  );
  const [native, setNative] = useState(
    useSelector((state) => state.drafts.currentCourse.nativeLanguage.id) - 1
  );
  const [foreign, setForeign] = useState(
    useSelector((state) => state.drafts.currentCourse.foreignLanguage.id) - 1
  );
//   const [topics, setTopics] = useState([]);
  const courseID = useSelector((state) => state.drafts.currentCourse.id);
  // const languageOptions = generateLanguagesOptions(languagesList);
  const location = window.location.pathname;
  let id = location.split("/")[2];
  let currentCourse = useSelector((state) => state.drafts.currentCourse);
//   const checkIfSelected = (id) => {
//     // console.log(t.id)
//     // console.log(id)
//     let k = topics.filter((t) => t.id == id);
//     console.log(k);
//     if (k.length > 0) {
//       // console.log("true")
//       return true;
//     }
//     return false;
//   };
  const changeCourseStatus = () => {
    setCoursePublic(!isCoursePublic);
  };
//   const getCourseAsync = (id) => async (dispatch) => {
//     const currentCourse = await coursesApi.getCourse(id);
//     dispatch({
//       type: "LOAD_COURSE",
//       payload: currentCourse,
//     });
//   };

  const [formInitState/*, setData*/] = useState({
    cost: 1000,
    foreignLanguageId: foreign,
    name: "",
    nativeLanguageId: native,
    postIds: [],
    shared: isCoursePublic,
    tagIds: [],
  });
//   const {
//     inputState,
//     handleInput,
//     handleInvalidMessage,
//     invalidMessages,
//     // updateInputState,
//   } = useInput({ ...formInitState });
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

//   const onSubmit = (event) => {
//     event.preventDefault();
//     console.log(currentUserInfo);
//     let ids = [];
//     newCourse.forEach((c) => {
//       ids.push(c.id);
//     });
//     console.log(ids);
//     const n = setData();

//     createCoursesAsync(
//       {
//         ...formInitState,
//         name: document.getElementById("name").value,
//         cost: document.getElementById("cost").value,
//         shared: isCoursePublic,
//         postIds: ids,
//         nativeLanguageId: native + 1,
//         foreignLanguageId: foreign + 1,
//       },
//       navigate
//     );
//     // if (id) {
//     //    //  editTopicAsync(id, inputState, history, isTagsUpdated);
//     // } else {
//     //    createCoursesAsync(formInitState, history);
//     // }
//   };
  const handleSelectedTags = (items) => {
    // const tags = {
    //   target: { name: "tags", value: items },
    // };
    // setData({ ...formInitState, tags: tags });
  };
//   const onSelectChange = (event, languageType) => {
//     const e = { ...event };
//     delete e.label;

//     //for input state for select component
//     console.log();
//     // e.target
//     setData({ ...formInitState, languageType: e.id });

//     // handleInput(selectState);
//   };
  useEffect(() => {
    console.log("Test");
    dispatch({
      type: "ADD_TOPIC_TO_COURSE",
      payload: newCourse,
    });
    // dispatch(getCourseAsync(id));
  });
  return (
    <div className="new-topic-subpage">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <BackArrow text="Курсы" />
          <h1>{name}</h1>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Form>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Input
                id="name"
                value={name}
                name="name"
                label="Название курса"
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Курс 10"
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TagsInput
                fullWidth
                selectedTags={handleSelectedTags}
                variant="outlined"
                id="tags"
                name="tags"
                placeholder="#hashtags"
                label="Теги"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <Select
                name="foreignLanguage"
                label="Изучаемый язык"
                options={languageOptions}
                onChange={(e) => {
                  setForeign(e.id - 1);
                }}
                defaultValue={languageOptions[foreign]}
                placeholder="Выберите язык"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <Select
                id="native"
                name="nativeLanguage"
                label="Родной язык"
                options={languageOptions}
                onChange={(e) => {
                  setNative(e.id - 1);
                }}
                defaultValue={languageOptions[native]}
                placeholder="Выберите язык"
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={2} lg={2}>
              <Input
                id="cost"
                name="text"
                value={cost}
                label="Цена"
                type="text"
                placeholder="1000 Р"
                onChange={(e) => {
                  let cs = e.target.value;
                  setCost(cs);
                  console.log(cost);
                }}
                required
              />
            </Grid>
            <div className="new-course-themes">
              <div className="new-course-themes__title">
                <div className="h2">Темы курса</div>
                <Button
                  onClick={() => {
                    console.log(formInitState);
                    dispatch({
                      type: "ADD_TOPICS_TO_COURSE",
                      payload: {
                        ...formInitState,
                        name: document.getElementById("name").value,
                        cost: document.getElementById("cost").value,
                        nativeLanguageId: native,
                        foreignLanguageId: foreign,
                        shared: isCoursePublic,
                      },
                    });
                    dispatch({
                      type: "ADD_TOPICS_TO_CURRENT",
                      payload: {
                        ...formInitState,
                        name: document.getElementById("name").value,
                        cost: document.getElementById("cost").value,
                        nativeLanguageId: native,
                        foreignLanguageId: foreign,
                        shared: isCoursePublic,
                      },
                    });
                    navigate("/course-themes");
                  }}
                  className="settings-panel__plus-icon"
                  src={plusIcon}
                >
                  Добавить темы
                </Button>
              </div>
              <div className="new-course-themes__wrapper">
                {newCourse.length === 0 ? (
                  <p>Темы еще не добавлены</p>
                ) : (
                  newCourse.map((topic) => (
                    <div
                      className="course-theme-wrapper"
                      style={{ width: "100%" }}
                      key={topic.id}
                    >
                      <div className="course-theme-item">
                        <div className="course-theme-item__date">
                          {topic.published}
                        </div>
                        <div className="course-theme-item__title">
                          {topic.text}
                        </div>
                        <div className="course-theme-item__langs">
                          {`${topic.nativeLanguage.value} - ${topic.foreignLanguage.value}`}
                        </div>
                        <svg
                          className="custom-checkbox"
                          width="20"
                          height="22"
                          viewBox="0 0 20 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{
                            backgroundColor: "transparent",
                            height: "70%",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            dispatch({
                              type: "DELETE_POST_FROM_COURSE",
                              payload: topic.id,
                            });
                            setNewCourse(
                              newCourse.filter(
                                (course) => course.id !== topic.id
                              )
                            );
                          }}
                        >
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
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            <Grid
              className="new-course-public "
              component="label"
              container
              alignItems="center"
              spacing={1}
            >
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
            <Grid item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              className="new-topic-subpage__buttons-block"
            >
              <Grid item xs={12} sm={12} md={2} lg={2}>
                <Button
                  className="save-button"
                  onClick={() => {
                    try {
                      coursesApi.updateCourse(id, {
                        ...currentCourse,
                        name: document.getElementById("name").value,
                        cost: document.getElementById("cost").value,
                        shared: isCoursePublic,
                        // postIds: ids,
                        nativeLanguage: languageOptions[native],
                        foreignLanguage: languageOptions[foreign],
                        posts: newCourse,
                      });
                    } catch (e) {}

                    navigate("/courses");
                    window.location.reload();
                  }}
                >
                  Сохранить изменения
                </Button>
              </Grid>
              <Grid item xs={12} sm={12} md={2} lg={2}>
                <Button
                  className="cancel-button"
                  onClick={(e) => {
                    navigate("/courses");
                  }}
                >
                  Отмена
                </Button>
              </Grid>
            </Grid>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                style={{
                  width: "20%",
                  justifySelf: "end",
                  backgroundColor: "transparent",
                  color: "grey",
                }}
                onClick={() => {
                  axios.delete(`courses/${courseID}`);
                  navigate("/courses");
                }}
              >
                {" "}
                Удалить курс
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
  createCoursesAsync: (params, history) =>
    dispatch(createCoursesAsync(params, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCoursePage);
