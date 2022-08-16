import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

//BASE COMPONENTS
import Form from "../../../components/form/Form.component";
import Input from "../../../components/input/Input.component";
import Select from "../../../components/select";
import Button from "../../../components/button/Button.component";
import TagsInput from "../../../components/tags-input/TagsInput.component";
//EFFECTS
import useInput from "../../../effects/useInput.effect";
//ACTIONS
import {
   createTopicAsync,
   getSingleTopicAsync,
   editTopicAsync,
   getTopicsAsync,
} from "../../../redux/topics/topics.actions";
//UTILITIES
import { checkForEmptyProperties, compareObjects } from "../../../utilities/helper-functions";
import { t } from "i18next";
import { addCrumbs } from "../layout/breadcrumbs";
import { Grid } from "@mui/material";
import { findDefaultLanguageName } from "../../../utilities/supported-languages";

const Topic = (props) => {
   const {
      stateCommonLanguagesList,
      stateTopicsIsTopicCreatedLoading,
      stateTopicsIsTopicEditing,
      stateTopicsIsSingleTopicLoading,
      stateTopicsSingleTopicData,

      dispatchCreateTopicAsync,
      dispatchEditTopicAsync,
      dispatchGetSingleTopicAsync,
      dispatchGetTopicsAsync,
   } = props;

   const { topicId } = useParams();

   useEffect(() => {
      !stateTopicsIsSingleTopicLoading 
      && topicId 
      && parseInt(topicId) !== stateTopicsSingleTopicData?.id 
      && dispatchGetSingleTopicAsync(topicId) 
   }, [dispatchGetSingleTopicAsync, stateTopicsIsSingleTopicLoading, stateTopicsSingleTopicData?.id, topicId])

   const [isSameTopic, setSameTopic] = useState(topicId && parseInt(topicId) === stateTopicsSingleTopicData?.id)

   useEffect(() => {
      setSameTopic(topicId && parseInt(topicId) === stateTopicsSingleTopicData?.id)
   }, [stateTopicsSingleTopicData?.id, topicId])

   const [topicData, setTopicData] = useState(isSameTopic ? {...stateTopicsSingleTopicData} : {})

   useEffect(() => isSameTopic
         ? setTopicData({...stateTopicsSingleTopicData})
         : setTopicData({})
   , [isSameTopic, stateTopicsSingleTopicData])

   const languageOptions = stateCommonLanguagesList.map((item) => ({ ...item, label: item.value }));
   /** 
    * TODO: Gets default native language from 'navigator.language'
    * @example 
    * const languageName = new Intl.DisplayNames([navigator.language] | undefined, { type: 'language' });
    * const ruRuName = languageName.of('ru_RU') // expected 'русский (Россия)' 
    * const enUsName = languageName.of('en_US') // expected 'американский английский' 
    */
   const [nativeLanguage, setNativeLanguage] = useState(topicData?.nativeLanguage
      ? { ...topicData?.nativeLanguage, label: topicData?.nativeLanguage?.value, }
      : findDefaultLanguageName(languageOptions)
   );
   const [foreignLanguage, setForeignLanguage] = useState(topicData?.foreignLanguage
      ? { ...topicData?.foreignLanguage, label: topicData?.foreignLanguage?.value, }
      : languageOptions[0]
   );
   
   // console.log(nativeLanguage, foreignLanguage);

   useEffect(() => {
      const native = topicData?.nativeLanguage
         ? { ...topicData?.nativeLanguage, label: topicData?.nativeLanguage?.value, }
         : findDefaultLanguageName(languageOptions)
      !compareObjects(native, nativeLanguage) && setNativeLanguage(native)
   }, [languageOptions, nativeLanguage, topicData?.nativeLanguage])
   
   useEffect(() => {
      const foreign = topicData?.foreignLanguage 
         ? { ...topicData?.foreignLanguage, label: topicData?.foreignLanguage?.value, } 
         : languageOptions[0]
      !compareObjects(foreign, foreignLanguage) && setForeignLanguage(foreign)
   }, [foreignLanguage, languageOptions, topicData?.foreignLanguage])
      
   const [initTopic, setInitTopic] = useState(Object.keys(topicData).length > 0
      ? { ...topicData }
      : { text: "", tags: [], nativeLanguage, foreignLanguage, }
   );

   useEffect(() => {
      if (Object.keys(topicData).length > 0 ) {
         setInitTopic({ ...topicData })
      }
   }
   , [topicData])

   const {
      inputState: topicInput,
      handleInput,
      handleInvalidMessage,
      invalidMessages,
      setInputState,
   } = useInput({ ...initTopic });

   // eslint-disable-next-line react-hooks/exhaustive-deps
   useEffect(() => setInputState({ ...initTopic }), [initTopic])

   const handleInputChange = (event) => {
      handleInput(event);
   };

   const onSelectChange = ({target: { value }}, languageType) => {
      
      const language = stateCommonLanguagesList?.find(({value: itemValue}) => itemValue === value)
      //for input state for select component
      const selectState = {
         target: { name: languageType, value: language },
      };
      handleInput(selectState);
   };

   const [noChange, setNoChange] = useState(compareObjects(topicInput, initTopic) || !checkForEmptyProperties(topicInput))

   useEffect(() => {
      setNoChange(compareObjects(topicInput, initTopic) || !checkForEmptyProperties(topicInput))
   }, [initTopic, topicInput])

   const navigate = useNavigate()
   
   const onSubmit = (event) => {
      event.preventDefault();
      if (topicId) {
         dispatchEditTopicAsync(topicId, topicInput, () => { dispatchGetTopicsAsync();  dispatchGetSingleTopicAsync(topicId); });
      } else {         
         dispatchCreateTopicAsync(topicInput, (id) => { dispatchGetTopicsAsync(); navigate(`../${id}`); });
      }
   };

   const handleSelectedTags = (event) => {
      // console.log(event);
      handleInput({target: { name: "tags", value: event.map(item => ({name:item})) }});
   };

   // useEffect(() => {
   //    console.log(topicInput.tags);
   // }, [topicInput.tags])

   const onCancel = (e) => {
      e.preventDefault();
      dispatchGetSingleTopicAsync(topicId);
   };

   const [crumbs, setCrumbs, lastKey] = useOutletContext();

   const [prevCrumb, setPrevCrumb] = useState(crumbs[lastKey])

   useEffect(() => {
      !compareObjects(prevCrumb, crumbs[lastKey]) && setPrevCrumb(crumbs[lastKey])
   }, [crumbs, lastKey, prevCrumb])

   useEffect(() => {
      topicId ?
      setCrumbs(c => addCrumbs(c, { key: lastKey + 1, name:t("trainings.training.edit"), path:"edit" })) :
      setCrumbs(c => addCrumbs(c, { key: lastKey + 1, name:t("trainings.training.new"), path:"new" }))
   }, [lastKey, setCrumbs, topicId, prevCrumb])

   return (
      <Form>
         <Grid container spacing={2}  justifyContent="center">
            <Grid item xs={12}>
               <Input
                  name="text"
                  value={topicInput.text}
                  error={invalidMessages}
                  onChange={handleInputChange}
                  onInvalid={handleInvalidMessage}
                  label={t("trainings.training.title")}
                  type="text"
                  placeholder="Daily routine and household chores"
                  required
               />
            </Grid>
            <Grid item xs={12}>
               <TagsInput
                  selectedTags={handleSelectedTags}
                  tags={topicInput.tags.map(({name}) => name)}
                  fullWidth
                  variant="outlined"
                  id="tags"
                  name="tags"
                  placeholder="#hashtags"
                  label={t("trainings.training.tags")}
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
         <Grid container spacing={2} justifyContent="space-around">
            <Grid item xs={5} sm={5} md={4} lg={3}>
               <Button onClick={onSubmit} variant="contained" disabled={noChange}
                  isLoading={stateTopicsIsTopicCreatedLoading || stateTopicsIsTopicEditing}
               >
                  {t("actions.save")}
               </Button>
            </Grid>
            <Grid item xs={6} sm={5} md={4} lg={3}>
               <Button onClick={onCancel} variant="outlined" disabled={noChange}>
                  {t("actions.cancel")}
               </Button>
            </Grid>
         </Grid>
      </Form>
   );
};

const mapStateToProps = (state) => {
   const { topics, common } = state;
   return {
      stateTopicsIsSingleTopicLoading : topics.isSingleTopicLoading,
      stateTopicsIsTopicCreatedLoading: topics.isTopicCreatedLoading,
      stateTopicsIsTopicEditing       : topics.isTopicEditing,
      stateTopicsSingleTopicData      : topics.singleTopicData,
      stateCommonLanguagesList        : common.languagesList,
   };
};

const mapDispatchToProps = (dispatch) => ({
   dispatchCreateTopicAsync: (params, callback) => dispatch(createTopicAsync(params, callback)),

   dispatchGetSingleTopicAsync: (id) => dispatch(getSingleTopicAsync(id)),

   dispatchGetTopicsAsync: () => dispatch(getTopicsAsync()),
   
   dispatchEditTopicAsync: (id, params, callback, isTagsUpdated) => dispatch(editTopicAsync(id, params, callback, isTagsUpdated)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Topic);
