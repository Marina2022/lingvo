import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useParams } from "react-router-dom";

//BASE COMPONENTS
import Form from "../../../components/form/Form.component";
import Input from "../../../components/input/Input.component";
import Select from "../../../components/select/Select.component";
import Button from "../../../components/button/Button.component";
import TagsInput from "../../../components/tags-input/TagsInput.component";
//EFFECTS
import useInput from "../../../effects/useInput.effect";
//SERVICES
import NewTopicServices from "./topic-services";
//ACTIONS
import {
   createTopicAsync,
   getSingleTopicAsync,
   editTopicAsync,
} from "../../../redux/topics/topics.actions";
//UTILITIES
import { checkForEmptyProperties } from "../../../utilities/helper-functions";
import { t } from "i18next";
import { addCrumbs } from "../layout/breadcrumbs";
import { Grid } from "@mui/material";

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
   } = props;

   const { generateLanguagesOptions } = NewTopicServices;

   const navigate = useNavigate();

   const { topicId } = useParams();

   useEffect(() => {
      if (
         !stateTopicsIsSingleTopicLoading && 
         topicId && parseInt(topicId) !== stateTopicsSingleTopicData?.id
      ) {         
         dispatchGetSingleTopicAsync(topicId) 
      } 
   }, [dispatchGetSingleTopicAsync, stateTopicsIsSingleTopicLoading, stateTopicsSingleTopicData?.id, topicId])

   const topicData = topicId ? {...stateTopicsSingleTopicData} : {}

   const languageOptions = generateLanguagesOptions(stateCommonLanguagesList);

   /** 
    * TODO: Gets default native language from 'navigator.language'
    * @example 
    * const languageName = new Intl.DisplayNames([navigator.language] | undefined, { type: 'language' });
    * const ruRuName = languageName.of('ru_RU') // expected 'русский (Россия)' 
    * const enUsName = languageName.of('en_US') // expected 'американский английский' 
    */
   const [nativeLanguageDefaultValue] = useState(topicId
      ? {
           ...topicData?.nativeLanguage,
           label: topicData?.nativeLanguage?.value,
        }
      : languageOptions[4]);
   const [foreignLanguageDefaultValue] = useState(topicId
      ? {
           ...topicData?.foreignLanguage,
           label: topicData?.foreignLanguage?.value,
        }
      : languageOptions[0]);

   const [formInitState] = useState({
      text: "",
      tags: [],
      nativeLanguage: {
         id: languageOptions ? languageOptions[4]?.id : undefined,
         value: languageOptions ? languageOptions[4]?.value : undefined,
      },
      foreignLanguage: {
         id: languageOptions ? languageOptions[0]?.id : undefined,
         value: languageOptions ? languageOptions[0]?.value : undefined,
      },
   });

   const [isTagsUpdated, changeIsTagsUpdated] = useState(false);

   const formState = topicId
      ? {
           ...topicData,
           tags: topicData?.tags,
        }
      : formInitState;

   const {
      inputState,
      handleInput,
      handleInvalidMessage,
      invalidMessages,
      // updateInputState,
   } = useInput({ ...formState });

   const handleInputChange = (event) => {
      handleInput(event);
   };

   const onSelectChange = (event, languageType) => {
      const e = { ...event };
      delete e.label;

      //for input state for select component
      const selectState = {
         target: { name: languageType, value: e },
      };
      handleInput(selectState);
   };

   const onSubmit = (event) => {
      event.preventDefault();
      if (topicId) {
         dispatchEditTopicAsync(topicId, inputState, navigate, isTagsUpdated);
      } else {
         dispatchCreateTopicAsync(inputState, navigate);
      }
   };

   const handleSelectedTags = (items) => {
      const tags = {
         target: { name: "tags", value: items },
      };

      changeIsTagsUpdated(true);
      handleInput(tags);
   };

   const onCancel = (e) => {
      e.preventDefault();
      navigate(-1);
   };

   // eslint-disable-next-line
   const [crumbs, setCrumbs, lastKey] = useOutletContext();
   const __addCrumbs = addCrumbs

   useEffect(() => {
      topicId ?
      setCrumbs(c => __addCrumbs(c, { key: lastKey + 1, name:t("trainings.training.edit"), path:"edit" })) :
      setCrumbs(c => __addCrumbs(c, { key: lastKey + 1, name:t("trainings.training.new"), path:"new" }))
   }, [__addCrumbs, lastKey, setCrumbs, topicId])

   return (
      <Form>
         <Grid container spacing={2}  justifyContent="center">
            <Grid item xs={12}>
               <Input
                  name="text"
                  value={inputState.text}
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
                     defaultValue: foreignLanguageDefaultValue,
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
                     defaultValue: nativeLanguageDefaultValue,
                     onChange: (e) => onSelectChange(e, "nativeLanguage"),
                     placeholder: t("languages.placeholder"),
                     required: true
                  }}
               />
            </Grid>
         </Grid>
         <Grid container spacing={2} justifyContent="space-around">
            <Grid item xs={5} sm={5} md={4} lg={3}>
               <Button
                  isLoading={stateTopicsIsTopicCreatedLoading || stateTopicsIsTopicEditing}
                  variant="contained"
                  disabled={!checkForEmptyProperties(inputState)}
                  onClick={onSubmit}>
                  {t("actions.save")}
               </Button>
            </Grid>
            <Grid item xs={6} sm={5} md={4} lg={3}>
               <Button onClick={onCancel} variant="outlined">
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
      stateTopicsIsSingleTopicLoading: topics.isSingleTopicLoading,
      stateTopicsIsTopicCreatedLoading: topics.isTopicCreatedLoading,
      stateTopicsIsTopicEditing: topics.isTopicEditing,
      stateTopicsSingleTopicData: topics.singleTopicData,
      stateCommonLanguagesList: common.languagesList,
   };
};

const mapDispatchToProps = (dispatch) => ({
   dispatchCreateTopicAsync: (params, navigate) =>
      dispatch(createTopicAsync(params, navigate)),
   dispatchGetSingleTopicAsync: (id) => 
      dispatch(getSingleTopicAsync(id)),
   dispatchEditTopicAsync: (id, params, navigate, isTagsUpdated) =>
      dispatch(editTopicAsync(id, params, navigate, isTagsUpdated)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Topic);
