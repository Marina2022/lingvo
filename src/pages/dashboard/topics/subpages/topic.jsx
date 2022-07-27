import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { useParams } from "react-router-dom";

//BASE COMPONENTS
import GridContainer from "../../../../components/grid-container/GridContainer.component";
import GridItem from "../../../../components/grid-item/GridItem.component";
import Form from "../../../../components/form/Form.component";
import Input from "../../../../components/input/Input.component";
import Select from "../../../../components/select/Select.component";
import Button from "../../../../components/button/Button.component";
import TagsInput from "../../../../components/tags-input/TagsInput.component";
//EFFECTS
import useInput from "../../../../effects/useInput.effect";
//SERVICES
import NewTopicServices from "./topic-services";
//ACTIONS
import {
   createTopicAsync,
   getSingleTopicAsync,
   editTopicAsync,
} from "../../../../redux/topics/topics.actions";
//UTILITIES
import { checkForEmptyProperties } from "../../../../utilities/helper-functions";
import { t } from "i18next";
import { addCrumbs } from "../../layout/breadcrumbs";

const NewTopic = (props) => {
   const {
      createTopicAsync,
      isTopicCreatedLoading,
      getSingleTopicAsync,
      singleTopicData,
      editTopicAsync,
      languagesList,
      isTopicEditing,
   } = props;

   const { generateLanguagesOptions } = NewTopicServices;

   const navigate = useNavigate();

   const { topicId } = useParams();

   const { state } = useLocation();
   
   let topicData

   if (parseInt(topicId) === state?.topic?.id) {
      topicData = {...state?.topic}
   } else {
      parseInt(topicId) !== singleTopicData?.id && getSingleTopicAsync(topicId)      
      topicData = {...singleTopicData}
   }

   const languageOptions = generateLanguagesOptions(languagesList);

   const nativeLanguageDefaultValue = topicId
      ? {
           ...topicData?.nativeLanguage,
           label: topicData?.nativeLanguage?.value,
        }
      : languageOptions[4];
   const foreignLanguageDefaultValue = topicId
      ? {
           ...topicData?.foreignLanguage,
           label: topicData?.foreignLanguage?.value,
        }
      : languageOptions[0];

   const [formInitState] = useState({
      text: "",
      tags: [],
      nativeLanguage: {
         id: languageOptions[4]?.id,
         value: languageOptions[4]?.value,
      },
      foreignLanguage: {
         id: languageOptions[0]?.id,
         value: languageOptions[0]?.value,
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
         editTopicAsync(topicId, inputState, navigate, isTagsUpdated);
      } else {
         createTopicAsync(inputState, navigate);
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
      <div className="new-topic-subpage">
         <GridContainer justifyContent="center">
            <GridItem xs={12} sm={12} md={12} lg={10}>
               <Form>
                  <GridItem xs={12}>
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
                  </GridItem>
                  <GridItem xs={12}>
                     <TagsInput
                        selectedTags={handleSelectedTags}
                        fullWidth
                        variant="outlined"
                        id="tags"
                        name="tags"
                        placeholder="#hashtags"
                        label={t("trainings.training.tags")}
                     />
                  </GridItem>
                  <GridItem container xs={12} justifyContent="space-between" direction="row">
                     <Select
                        name="foreignLanguage"
                        label={t("languages.foreign")}
                        options={languageOptions}
                        defaultValue={foreignLanguageDefaultValue}
                        onChange={(e) => onSelectChange(e, "foreignLanguage")}
                        placeholder={t("languages.placeholder")}
                     />
                     <Select
                        name="nativeLanguage"
                        label={t("languages.native")}
                        options={languageOptions}
                        defaultValue={nativeLanguageDefaultValue}
                        onChange={(e) => onSelectChange(e, "nativeLanguage")}
                        placeholder={t("languages.placeholder")}
                        required
                     />
                  </GridItem>
                  <GridItem container xs={12} justifyContent="space-around" direction="row" className="new-topic-subpage__buttons-block">
                     <Button
                        isLoading={isTopicCreatedLoading || isTopicEditing}
                        className="save-button"
                        disabled={!checkForEmptyProperties(inputState)}
                        onClick={onSubmit}>
                        {t("actions.save")}
                     </Button>
                     <Button onClick={onCancel} className="cancel-button">
                        {t("actions.cancel")}
                     </Button>
                  </GridItem>
               </Form>
            </GridItem>
         </GridContainer>
      </div>
   );
};

const mapStateToProps = (state) => {
   const { topics, common } = state;
   return {
      isTopicCreatedLoading: topics.isTopicCreatedLoading,
      singleTopicData: topics.singleTopicData,
      isTopicEditing: topics.isTopicEditing,
      languagesList: common.languagesList,
   };
};

const mapDispatchToProps = (dispatch) => ({
   createTopicAsync: (params, navigate) =>
      dispatch(createTopicAsync(params, navigate)),
   getSingleTopicAsync: (id) => 
      dispatch(getSingleTopicAsync(id)),
   editTopicAsync: (id, params, navigate, isTagsUpdated) =>
      dispatch(editTopicAsync(id, params, navigate, isTagsUpdated)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTopic);
