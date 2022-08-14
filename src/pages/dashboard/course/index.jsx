import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Outlet, useOutlet, useOutletContext, useParams } from "react-router-dom";

import { createCourseAsync, editCourseAsync, getCourseAsync, getCoursesAsync } from "../../../redux/courses/courses.actions";

import { Divider, FormControlLabel, Grid, Modal, Switch, Typography } from "@mui/material";
import Button from "../../../components/button/Button.component";
import Form from "../../../components/form/Form.component";
import Input from "../../../components/input/Input.component";
import Select from "../../../components/select";
import TagsInput from "../../../components/tags-input/TagsInput.component";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { addCrumbs } from "../layout/breadcrumbs";

import { t } from "i18next";
import { findDefaultLanguageName } from "../../../utilities/supported-languages";
import useInput from "../../../effects/useInput.effect";
import { checkForEmptyProperties, compareObjects } from "../../../utilities/helper-functions";
import TopicList from "../topics/topic-list";
import AddTopics from "./add-topics";

const CoursePage = ({
   stateCommonLanguagesList,
   stateCoursesIsCourseLoading,
   stateCoursesCourseData,
   stateTopicsPublishedTopics,

   dispatchCreateCourseAsync,
   dispatchEditCourseAsync,
   dispatchGetCourseAsync,
   dispatchGetCoursesAsync,
}) => {

   const { courseId } = useParams()

   useEffect(() => {
      // console.log('useEffect: dispatchGetCourseAsync');
      if(
         !stateCoursesIsCourseLoading &&
         courseId && parseInt(courseId) !== stateCoursesCourseData?.id
      ) {
         dispatchGetCourseAsync(courseId)
      }
   }, [courseId, dispatchGetCourseAsync, stateCoursesCourseData?.id, stateCoursesIsCourseLoading])

   // useEffect(() => {
   //    console.log(stateCoursesCourseData);
   // }, [stateCoursesCourseData])

   const [courseData, setCourseData] = useState(courseId && parseInt(courseId) === stateCoursesCourseData?.id ? {...stateCoursesCourseData} : {})

   useEffect(() => {
      // console.log('useEffect: setCourseData');
      setCourseData(courseId && parseInt(courseId) === stateCoursesCourseData?.id ? {...stateCoursesCourseData} : {})
   }, [courseId, stateCoursesCourseData])
   
   const [isSameCourse, setIsSameCourse] = useState(courseId && parseInt(courseId) === courseData?.id)

   useEffect(() => setIsSameCourse(courseId && parseInt(courseId) === courseData?.id), [courseData?.id, courseId])

   // const [courseTopics, setCourseTopics] = useState(courseData?.posts ?? [])
   // useEffect(() => { setCourseTopics(courseData?.posts ?? []) }, [courseData?.posts])

   const [languageOptions, setLangOptions] = useState(stateCommonLanguagesList ? stateCommonLanguagesList.map((item) => ({ ...item, label: item.value })) : []);

   useEffect(() => {
      // console.log('useEffect: setLangOptions');
      setLangOptions(stateCommonLanguagesList ? stateCommonLanguagesList.map((item) => ({ ...item, label: item.value })) : [])
   }, [stateCommonLanguagesList])
   
   const [nativeLanguage, setNativeLanguage] = useState(isSameCourse && languageOptions?.length
      ? { ...courseData?.nativeLanguage, label: courseData?.nativeLanguage?.value,
        }
      : languageOptions?.length ? findDefaultLanguageName(languageOptions) : {value: ''}
   )

   const [foreignLanguage, setForeignLanguage] = useState(isSameCourse && languageOptions?.length
      ? { ...courseData?.foreignLanguage, label: courseData?.foreignLanguage?.value,
        }
      : languageOptions?.length ? languageOptions[0] : {value: ''}
   );

   useEffect(() => {
      // console.log('useEffect: setNativeLanguage');
      const native = isSameCourse && languageOptions?.length
         ? { ...courseData?.nativeLanguage, label: courseData?.nativeLanguage?.value, }
         : languageOptions?.length ? findDefaultLanguageName(languageOptions) : {value: ''}

      native?.value !== nativeLanguage?.value && setNativeLanguage(native)
      // console.log(nativeLanguageDefaultValue, native);
   }, [courseData?.nativeLanguage, languageOptions, nativeLanguage?.value, isSameCourse])

   useEffect(() => {
      // console.log('useEffect: setForeignLanguage');
      const foreign = isSameCourse && languageOptions?.length
         ? { ...courseData?.foreignLanguage, label: courseData?.foreignLanguage?.value, }
         : languageOptions?.length ? languageOptions[0] : {value: ''}
      
      foreign?.value !== foreignLanguage?.value && setForeignLanguage(foreign)
      // console.log(foreignLanguageDefaultValue, foreign);
   }, [courseData?.foreignLanguage, courseId, foreignLanguage, languageOptions, courseData.id, isSameCourse])
   
   // useEffect(() => {
   //    console.log(nativeLanguageDefaultValue, foreignLanguageDefaultValue);
   // }, [foreignLanguageDefaultValue, nativeLanguageDefaultValue])
   
   const [isTagsUpdated, setIsTagsUpdated] = useState(false);
      
   const [changedInput, setChangedInput] = useState(false)

   const [initInput, setInitInput] = useState(isSameCourse
      ? { ...courseData, posts: [...courseData.posts] /* tags: courseData?.tags,*/ }
      : { name: "", tags: [], shared: false, nativeLanguage, foreignLanguage, posts: []}
   );

   useEffect(() => {
      if (isSameCourse) {
         // console.log('useEffect: setInitInput');
         setInitInput({ ...courseData, posts: [...courseData.posts], /*   tags: courseData?.tags,*/ })
         setChangedInput(true)
      }
   }, [courseData, isSameCourse])

   const {
      inputState,
      handleInput,
      handleInvalidMessage,
      invalidMessages,
      setInputState,
   } = useInput({ ...initInput, posts: [...initInput.posts] });

   useEffect(() => {
      const initObj = { ...initInput, posts: [...initInput.posts] }
      // console.log('useEffect - setInputState', initObj);
      setInputState(initObj)
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [initInput])

   useEffect(() => {
      if (changedInput) {
         // console.log('useEffect: setInputState');
         setInputState({...initInput, posts: [...initInput.posts]})
         setChangedInput(false)
      }
   }, [changedInput, initInput, setInputState])

   // useEffect(() => {
   //    console.log('useEffect - inputState.tags:', inputState.tags);
   // }, [inputState.tags])

   const onSelectChange = ({target: {value}}, languageType) => {
      
      const language = stateCommonLanguagesList?.find(({value: itemValue}) => itemValue === value)      //for input state for select component
      const selectState = {
         target: { name: languageType, value: language },
      };
      handleInput(selectState);
   };
   
   const onSubmit = (event) => {
      event.preventDefault();
      if (courseId) {
         dispatchEditCourseAsync(courseId, inputState, () => { dispatchGetCoursesAsync(); dispatchGetCourseAsync(courseId); }, isTagsUpdated);
      } else {
         dispatchCreateCourseAsync(inputState, () => { dispatchGetCourseAsync(courseId); });
      }
   };

   const handleSelectedTags = (event) => {
      // console.log(event);
      setIsTagsUpdated(true);
      handleInput({target: { name: "tags", value: event }});
   };

   const onCancel = (e) => {
      e.preventDefault();
      dispatchGetCourseAsync(courseId);
   };

   // eslint-disable-next-line
   const [crumbs, setCrumbs, lastKey] = useOutletContext();
   const outlet = useOutlet()

   useEffect(() => {
      // console.log('useEffect: setCrumbs', crumbs, courseId, outlet, inputState);      
      courseId 
         ? setCrumbs(c => addCrumbs(c, { key: lastKey + 1, name:inputState.name, path: courseId })) 
         : setCrumbs(c => addCrumbs(c, { key: lastKey + 1, name:t("courses.course.new"), path:"new" }))
      if (courseId && outlet) {
         setCrumbs(c => addCrumbs(c, { key: lastKey + 2, name:t("trainings.title"), path: 'topics', disabled: true }))
      }
   }, [courseId, crumbs, inputState, lastKey, outlet, setCrumbs])

   const [noChange, setNoChange] = useState(compareObjects(initInput, inputState) || !checkForEmptyProperties(inputState))

   useEffect(() => {
      compareObjects(initInput, inputState) || !checkForEmptyProperties(inputState)
         ? setNoChange(true)
         : setNoChange(false)
   }, [initInput, inputState])

   const deletePost = ({id: topicId}) => {
      const newPosts = inputState.posts.filter(({id:postId}) => postId !== topicId)
      handleInput({ target: { name:'posts', value: newPosts }})
   }

   const [addPost, setAddPost] = useState(false)

   return (
      outlet 
      ? <Outlet context={[crumbs, setCrumbs, lastKey + 2]} /> 
      : <>
         {/* <AddTopic course={inputState} open={addPost} onClose={() => setAddPost(false)}/> */}
         <Modal open={addPost}
            onClose={() => setAddPost(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Grid container alignItems="center" justifyContent="center">
               <Grid item xs={12} sm={10} md={8} lg={6} container alignItems="center" >
                  <AddTopics course={inputState} topicList={stateTopicsPublishedTopics} onAdd={() => {window.alert('add button')}} onCancel={() => setAddPost(false)}/>
               </Grid>
            </Grid>
         </Modal>

         <Form>
            <Grid container spacing={2}  justifyContent="center">
               <Grid item xs={12}>
                  <Input
                     name="name"
                     value={inputState.name}
                     error={invalidMessages}
                     onChange={handleInput}
                     onInvalid={handleInvalidMessage}
                     label={t("courses.course.name")}
                     type="text"
                     placeholder={t("courses.course.name")}
                     required
                  />
               </Grid>
               <Grid item xs={12}>
                  <TagsInput
                     selectedTags={handleSelectedTags}
                     tags={inputState.tags}
                     fullWidth
                     variant="outlined"
                     id="tags"
                     name="tags"
                     placeholder="#hashtags"
                     label={t("courses.course.tags")}
                  />
               </Grid>
            </Grid>
            <Grid container spacing={2} justifyContent="space-between">
               <Grid item xs={5}>
                  <Select
                     name="foreignLanguage"
                     select={{
                        label: t("languages.foreign"),
                        options: languageOptions,
                        defaultValue: foreignLanguage,
                        onChange: e => onSelectChange(e, "foreignLanguage"),
                        placeholder: t("languages.placeholder")
                     }}
                  />
               </Grid>
               <Grid item xs={5}>
                  <Select
                     name="nativeLanguage"
                     select={{
                        label: t("languages.native"),
                        options: languageOptions,
                        defaultValue: nativeLanguage,
                        onChange: (e) => onSelectChange(e, "nativeLanguage"),
                        placeholder: t("languages.placeholder"),
                        required: true
                     }}
                  />
               </Grid>
            </Grid>
            <Divider sx={{ margin: '0.5rem 0 2rem' }}/>
            <Grid container spacing={2} justifyContent="space-between" alignItems="center">
               <Grid item xs={8}>
                  <Typography color="Grey" variant="h6">{t("courses.course.trainings.title")}</Typography>
               </Grid>
               <Grid item xs={4}>
                  <Button variant="outlined" color="secondary"
                     disabled={!courseId}
                     onClick={() => setAddPost(true)}
                     src={<AddOutlinedIcon/>}
                  >
                     {t("actions.add")}
                  </Button>
               </Grid>
               <Grid item xs={12}>
                  <TopicList 
                     itemsList={inputState.posts} 
                     isLoading={stateCoursesIsCourseLoading} 
                     navPrefix='topics/'
                     onDelete= {deletePost}
                  />
               </Grid>
            </Grid>
            <Divider sx={{ margin: '0.5rem 0 2rem'}} />
            <Grid container spacing={2} justifyContent="space-around" item xs={12}>
               <FormControlLabel label={ t("courses.course.is_published") } control={
                  <Switch name="shared" checked={inputState.shared} onChange={(e) => { handleInput(e) }}/>
               }/>
            </Grid>
            <Grid container spacing={2} justifyContent="space-around">
               <Grid item xs={6} md={5} lg={4}>
                  <Button variant="contained" disabled={noChange} onClick={onSubmit} >
                     {t("actions.save")}
                  </Button>
               </Grid>
               <Grid item xs={6} md={5} lg={4}>
                  <Button variant="outlined" disabled={noChange} onClick={onCancel}>
                     {t("actions.cancel")}
                  </Button>
               </Grid>
            </Grid>
         </Form>
      </>
   );
};
const mapStateToProps = (state) => {
   const { courses, common, topics } = state;
   return {
      stateCommonLanguagesList: common.languagesList,
      stateCoursesIsCoursesCreatedLoading: courses.isCoursesCreatedLoading,
      stateCoursesIsCourseLoading: courses.isCourseLoading,
      stateCoursesCourseData: courses.courseData,
      stateTopicsPublishedTopics: topics.publishedTopics,
      };
};
const mapDispatchToProps = (dispatch) => ({
   dispatchGetCourseAsync: (courseId) => dispatch(getCourseAsync(courseId)),
   dispatchEditCourseAsync: (courseId, params) => dispatch(editCourseAsync(courseId, params)),
   dispatchCreateCourseAsync: (params, callback) => dispatch(createCourseAsync(params, callback)),
   dispatchGetCoursesAsync: () => dispatch(getCoursesAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
