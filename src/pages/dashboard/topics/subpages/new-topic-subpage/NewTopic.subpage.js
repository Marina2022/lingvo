import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

//BASE COMPONENTS
import GridContainer from "../../../../../components/grid-container/GridContainer.component";
import GridItem from "../../../../../components/grid-item/GridItem.component";
import BackArrow from "../../../../../components/back-arrow/BackArrow.component";
import Form from "../../../../../components/form/Form.component";
import Input from "../../../../../components/input/Input.component";
import Select from "../../../../../components/select/Select.component";
import Button from "../../../../../components/button/Button.component";
import TagsInput from "../../../../../components/tags-input/TagsInput.component";
//EFFECTS
import useInput from "../../../../../effects/useInput.effect";
//SERVICES
import NewTopicServices from "./new-topic.services";
//ACTIONS
import {
   createTopicAsync,
   getSingleTopicAsync,
   editTopicAsync,
} from "../../../../../redux/topics/topics.actions";
//UTILITIES
import { checkForEmptyProperties } from "../../../../../utilities/helper-functions";
import { t } from "i18next";

const NewTopicSubpage = (props) => {
   const {
      createTopicAsync,
      isTopicCreatedLoading,
      getSingleTopicAsync,
      selectedTopic,
      editTopicAsync,
      languagesList,
      isTopicEditing,
   } = props;
   const { generateLanguagesOptions } = NewTopicServices;
   const navigate = useNavigate();
   let { id } = useParams();

   const languageOptions = generateLanguagesOptions(languagesList);

   const singleTopicDataCopy = { ...selectedTopic };

   const nativeLanguageDefaultValue = id
      ? {
           ...singleTopicDataCopy.nativeLanguage,
           label: singleTopicDataCopy.nativeLanguage.value,
        }
      : languageOptions[4];
   const foreignLanguageDefaultValue = id
      ? {
           ...singleTopicDataCopy.foreignLanguage,
           label: singleTopicDataCopy.foreignLanguage.value,
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

   const formState = id
      ? {
           ...singleTopicDataCopy,
           tags: singleTopicDataCopy?.tags,
        }
      : formInitState;

   const {
      inputState,
      handleInput,
      handleInvalidMessage,
      invalidMessages,
      // updateInputState,
   } = useInput({ ...formState });

   useEffect(() => {
      if (id) {
         getSingleTopicAsync(id);
      }
      //eslint-disable-next-line
   }, []);

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
      if (id) {
         editTopicAsync(id, inputState, navigate, isTagsUpdated);
      } else {
         createTopicAsync(inputState, navigate);
      }
   };

   const handleSelecetedTags = (items) => {
      const tags = {
         target: { name: "tags", value: items },
      };

      changeIsTagsUpdated(true);
      handleInput(tags);
   };

   const onCancell = (e) => {
      e.preventDefault();
      navigate("/topics");
   };

   return (
      <div className="new-topic-subpage">
         <GridContainer>
            <GridItem xs={12} sm={12} md={12} lg={12}>
               <BackArrow text={t("themes.title")} />
               <h1>{t("themes.theme.new_theme")}</h1>
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={12}>
               <Form>
                  <GridItem xs={12} sm={12} md={6} lg={6}>
                     <Input
                        name="text"
                        value={inputState.text}
                        error={invalidMessages}
                        onChange={handleInputChange}
                        onInvalid={handleInvalidMessage}
                        label={t("themes.theme.title")}
                        type="text"
                        placeholder="Daily routine and household chores"
                        required
                     />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6} lg={6}>
                     <TagsInput
                        selectedTags={handleSelecetedTags}
                        fullWidth
                        variant="outlined"
                        id="tags"
                        name="tags"
                        placeholder="#hashtags"
                        label={t("themes.theme.tags")}
                     />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3} lg={3}>
                     <Select
                        name="foreignLanguage"
                        label={t("languages.foreign")}
                        options={languageOptions}
                        defaultValue={foreignLanguageDefaultValue}
                        onChange={(e) => onSelectChange(e, "foreignLanguage")}
                        placeholder={t("languages.placeholder")}
                     />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3} lg={3}>
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
                  <GridItem
                     xs={12}
                     sm={12}
                     md={6}
                     lg={6}
                     className="new-topic-subpage__buttons-block">
                     <GridItem xs={12} sm={12} md={2} lg={2}>
                        <Button
                           isLoading={isTopicCreatedLoading || isTopicEditing}
                           className="save-button"
                           disabled={!checkForEmptyProperties(inputState)}
                           onClick={onSubmit}>
                           {t("actions.save")}
                        </Button>
                     </GridItem>
                     <GridItem xs={12} sm={12} md={2} lg={2}>
                        <Button onClick={onCancell} className="cancel-button">
                           {t("actions.cancel")}
                        </Button>
                     </GridItem>
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
      selectedTopic: topics.selectedTopic,
      isTopicEditing: topics.isTopicEditing,
      languagesList: common.languagesList,
   };
};

const mapDispatchToProps = (dispatch) => ({
   createTopicAsync: (params, navigate) =>
      dispatch(createTopicAsync(params, navigate)),
   getSingleTopicAsync: (id) => dispatch(getSingleTopicAsync(id)),
   editTopicAsync: (id, params, navigate, isTagsUpdated) =>
      dispatch(editTopicAsync(id, params, navigate, isTagsUpdated)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTopicSubpage);
