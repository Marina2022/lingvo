import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//BASE COMPONENTS
import GridContainer from "../../../../../components/grid-container/GridContainer.component";
import GridItem from "../../../../../components/grid-item/GridItem.component";
import Form from "../../../../../components/form/Form.component";
import TextArea from "../../../../../components/text-area/TextArea.component";
import TagsInput from "../../../../../components/tags-input/TagsInput.component";
import Button from "../../../../../components/button/Button.component";
import Select from "../../../../../components/select/Select.component";
import DropZone from "../../../../../components/drop-zone/DropZone.component";
import Modal from "../../../../../components/modal/Modal.component";
import Player from "../../../../../components/units-list-card/Player.component";
//EFFECTS
import useInput from "../../../../../effects/useInput.effect";
//ACTIONS
import { getLevelsListAsync } from "../../../../../redux/common/common.actions";
import { getSingleTopicAsync } from "../../../../../redux/topics/topics.actions";
import { getSingleUnitAsync, createUnitAsync, editUnitAsync } from "../../../../../redux/units/units.actions";
//SERVICES
import AddEditUnitServices from "./unit-services"
//UTILITIES
import { checkForEmptyProperties } from "../../../../../utilities/helper-functions";

import RecordAudioModal from "./components/record-audio-modal"
import { t } from "i18next";
import { genAzureVoice, getAzureLanguageParams } from "./azure-voice-service";
import { getBase64 } from "../../../../../utilities/handleFile";


const Unit = (props) => {
   const {
      getLevelsListAsync,
      levelsList,
      getSingleTopicAsync,
      singleTopicData,
      getSingleUnitAsync,
      createUnitAsync,
      editUnitAsync,
      unitCreateLoading,
      unitEditLoading,
      selectedUnit,
      voiceAddLoading,
      deleteVoiceLoading,
   } = props;
   const { generateLevelsOptions } = AddEditUnitServices;
   const singleUnitDataCopy = { ...selectedUnit };
   const navigate = useNavigate();

   const [isTagsUpdated, changeIsTagsUpdated] = useState(false);
   const [fileData, setFileData] = useState({});
   const [isAudioModal, toggleAudioModal] = useState(false);

   const { genders, languages: supportedLanguages, voices: supportedVoices} = getAzureLanguageParams()
   
   const [azureAudioStatus, setAzureAudioStatus] = useState({ isLoaded: false, url: null });

   // states
   const [selectedVoice, setSelectedVoice] = useState({
      language: supportedLanguages[0],
      gender: genders[0],
   });
   // true - if the generated voice is created, otherwise - false
   // const [generatedVoiceAudio, setGeneratedVoiceAudio] = useState({ isVoiceLoaded: false, url: null });

   // defines which type of voice uploading is being used: Azure generated voice, uploaded file, recorded audio
   const [voiceUploadMode, setVoiceUploadMode] = useState({ mode: null });

   const levelsOptions = generateLevelsOptions(levelsList || []);
   let { topicId, unitId } = useParams();
   const files = unitId ? singleUnitDataCopy?.voices : [];
   const [uploadedFiles, setUploadedFiles] = useState(files);

   useEffect(() => {
      getLevelsListAsync();
      if (topicId) {
         getSingleTopicAsync(topicId);
      }
      if (unitId) {
         getSingleUnitAsync(unitId);
      }
   }, [getLevelsListAsync, getSingleTopicAsync, getSingleUnitAsync, topicId, unitId]);

   // values are equal to voiceUploadMode"s fields
   const voiceUploadOptions = [
      { id: 0, label: t("exercises.exercise.voice_sources.undefined.label"), value: "" },
      { id: 2, label: t("exercises.exercise.voice_sources.upload.label"), value: "uploadedAudio" },
      { id: 1, label: t("exercises.exercise.voice_sources.record.label"), value: "recordedAudio" },
      { id: 3, label: t("exercises.exercise.voice_sources.generate.label"), value: "generatedVoice" },
   ];
   
   const formInitState = {
      description: "",
      level: levelsOptions[0],
      subject: singleTopicData?.id,
      tags: [],
      translation: "",
      value: "",
      voices: [],
   };

   const levelDefaultValue = unitId
      ? {
           ...selectedUnit?.level,
           label: selectedUnit?.level?.value,
        }
      : levelsOptions[0];

   const formState = unitId
      ? {
           ...singleUnitDataCopy,
           tags: singleUnitDataCopy?.tags,
           voices: [],
        }
      : formInitState;

   const {
      inputState,
      handleInput,
      handleInvalidMessage,
      invalidMessages,
   } = useInput({ ...formState });

   const handleInputChange = (event) => {
      handleInput(event);
   };

   const handleSelectedTags = (items) => {
      const tags = {
         target: { name: "tags", value: items },
      };

      changeIsTagsUpdated(true);
      handleInput(tags);
   };

   const onSelectChange = (event, levelType) => {
      const e = { ...event };
      delete e.label;

      //for input state for select component
      const selectState = {
         target: { name: levelType, value: e },
      };
      handleInput(selectState);
   };

   const handleFiles = (files) => {
      const file = files[0]
      getBase64(file, reader => setFileData({
         data: reader.result,
         language: singleTopicData?.foreignLanguage,
         name: file?.name,
      }));
      setUploadedFiles(files);
   };

   const onSubmit = (e) => {
      e.preventDefault();
      if (unitId) {
         editUnitAsync(
            unitId,
            inputState,
            navigate,
            topicId,
            isTagsUpdated,
            fileData,
            singleUnitDataCopy?.voices[0]?.id
         );
      } else {
         createUnitAsync(topicId, inputState, navigate, fileData);
      }
   };

   const onCancel = (e) => {
      e.preventDefault();
      navigate(`/topics/${topicId}/units`);
   };

   // making api call to create a voice audio file
   const generateVoice = () => genAzureVoice({
         text: inputState.value, 
         setAzureAudioStatus,
         voice: supportedVoices[selectedVoice.language.value][selectedVoice.gender.value],
         handleFiles
   });
   // eslint-disable-next-line
   const [crumbs, setCrumbs, lastKey] = useOutletContext();

   useEffect(() => {
      unitId ?
      setCrumbs(c => [
         ...c, 
         { key: lastKey + 1, name:t("exercises.title"), path:"" },
         { key: lastKey + 2, name:`${inputState?.value.slice(0, 10)}...`, path:`units/${unitId}` }
      ]) :
      setCrumbs(c => [
         ...c, 
         { key: lastKey + 1, name:t("exercises.title"), path: "" },
         { key: lastKey + 2, name:t("exercises.exercise.new"), path:"units/new" }
      ]) 
   }, [inputState?.value, lastKey, setCrumbs, unitId])

   return (
      <div className="add-edit-unit">
         <Modal
            handleModalClose={() => toggleAudioModal(false)}
            isOpen={isAudioModal}>
            <RecordAudioModal
               onCancel={() => toggleAudioModal(false)}
               unitID={unitId}
               topicID={topicId}
               language={singleTopicData?.foreignLanguage}
               prevVoiceID={singleUnitDataCopy?.voices[0]?.id}
            />
         </Modal>
         <GridContainer>
            <GridItem xs={12} sm={12} md={12} lg={12}>
               <Form>
                  <GridItem xs={12} sm={12} md={6} lg={6}>
                     <TextArea
                        name="value"
                        value={inputState.value}
                        error={invalidMessages}
                        onChange={handleInputChange}
                        onInvalid={handleInvalidMessage}
                        label={t("exercises.exercise.original")}
                        placeholder={t("exercises.exercise.placeholders.foreign")}
                        minRows={2}
                        required
                     />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6} lg={6}>
                     <TextArea
                        name="translation"
                        value={inputState.translation}
                        error={invalidMessages}
                        onChange={handleInputChange}
                        onInvalid={handleInvalidMessage}
                        label={t("exercises.exercise.translation")}
                        placeholder={t("exercises.exercise.placeholders.native")}
                        minRows={2}
                        required
                     />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6} lg={6}>
                     <TextArea
                        name="description"
                        value={inputState.description || ""}
                        error={invalidMessages}
                        onChange={handleInputChange}
                        onInvalid={handleInvalidMessage}
                        label={t("exercises.exercise.extra")}
                        placeholder={t("exercises.exercise.placeholders.extra")}
                        minRows={2}
                        required
                     />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6} lg={6}>
                     <TagsInput
                        selectedTags={handleSelectedTags}
                        fullWidth
                        variant="outlined"
                        id="tags"
                        name="tags"
                        placeholder="#hashtags"
                        label={t("exercises.exercise.tags")}
                     />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3} lg={3}>
                     <Select
                        name="level"
                        label={t("exercises.exercise.level")}
                        options={levelsOptions}
                        defaultValue={levelDefaultValue}
                        onChange={(e) => onSelectChange(e, "level")}
                        placeholder={t("exercises.exercise.level")}
                     />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={3} lg={3}>
                     <Select
                        name="voiceUploadMode"
                        label={t("exercises.exercise.voice_sources.select")}
                        options={voiceUploadOptions}
                        defaultValue={voiceUploadOptions[0]}
                        onChange={(e) =>
                           setVoiceUploadMode({
                              mode: e,
                           })
                        }
                        placeholder={t("exercises.exercise.voice_sources.select")}
                     />
                  </GridItem>

                  {voiceUploadMode.mode &&
                     voiceUploadMode.mode.value === "uploadedAudio" && (
                        <GridItem xs={12} sm={12} md={6} lg={6}>
                           <span>{t("exercises.exercise.voice_sources.upload.label")}</span>
                           <DropZone
                              title={t("exercises.exercise.voice_sources.upload.title")}
                              handleFiles={handleFiles}
                              files={uploadedFiles}
                              buttonAction={() => toggleAudioModal(true)}
                           />
                        </GridItem>
                     )}

                  {voiceUploadMode.mode &&
                     voiceUploadMode.mode.value === "recordedAudio" && (
                        <GridItem xs={12} sm={12} md={2} lg={2}>
                           <span>{t("exercises.exercise.voice_sources.record.label")}</span>
                           <Button onClick={() => toggleAudioModal(true)}>
                              {t("exercises.exercise.voice_sources.record.button")}
                           </Button>
                        </GridItem>
                     )}

                  {voiceUploadMode.mode &&
                     voiceUploadMode.mode.value === "generatedVoice" && (
                        <React.Fragment>
                           <GridItem xs={12} sm={12} md={3} lg={3}>
                              <Select
                                 name="voiceLanguage"
                                 label={t("exercises.exercise.voice_sources.generate.language")}
                                 options={supportedLanguages}
                                 defaultValue={supportedLanguages[0]}
                                 onChange={(e) =>
                                    setSelectedVoice((prevState) => ({
                                       ...prevState,
                                       language: e,
                                    }))
                                 }
                                 placeholder={t("exercises.exercise.voice_sources.generate.language")}
                              />
                           </GridItem>

                           <GridItem xs={12} sm={12} md={3} lg={3}>
                              <Select
                                 name="voiceGender"
                                 label={t("exercises.exercise.voice_sources.generate.gender")}
                                 options={genders}
                                 defaultValue={genders[0]}
                                 onChange={(e) =>
                                    setSelectedVoice((prevState) => ({
                                       ...prevState,
                                       gender: e,
                                    }))
                                 }
                                 placeholder={t("exercises.exercise.voice_sources.generate.gender")}
                              />
                           </GridItem>

                           <GridItem xs={12} sm={12} md={2} lg={2}>
                              <Button onClick={generateVoice}>
                                 {t("exercises.exercise.voice_sources.generate.label")}
                              </Button>
                           </GridItem>

                           <GridItem xs={12} sm={12} md={3} lg={3}>
                              {azureAudioStatus.isLoaded ? (
                                 <Player
                                    url={azureAudioStatus.url}
                                    onClick={() => {}}
                                    className="volume-icon__block">
                                    <Button>
                                       {t("exercises.exercise.voice_sources.generate.play")}
                                    </Button>
                                 </Player>
                              ) : null}
                           </GridItem>
                        </React.Fragment>
                     )}

                  <GridItem
                     xs={12}
                     sm={12}
                     md={6}
                     lg={6}
                     className="new-topic-subpage__buttons-block">
                     <GridItem xs={12} sm={12} md={2} lg={2}>
                        <Button
                           isLoading={
                              unitCreateLoading ||
                              unitEditLoading ||
                              voiceAddLoading ||
                              deleteVoiceLoading
                           }
                           className="save-button"
                           disabled={
                              !checkForEmptyProperties(inputState, [
                                 "description",
                              ]) || uploadedFiles.length <= 0
                           }
                           onClick={onSubmit}>
                           {t("actions.save")}
                        </Button>
                     </GridItem>
                     <GridItem xs={12} sm={12} md={2} lg={2}>
                        <Button onClick={onCancel} className="cancel-button">
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
   const { common, topics, units } = state;
   return {
      levelsList: common.levelsList,
      singleTopicData: topics.singleTopicData,
      singleUnit: units.singleUnit,
      unitCreateLoading: units.unitCreateLoading,
      unitEditLoading: units.unitEditLoading,
      selectedUnit: units.selectedUnit,
      voiceAddLoading: units.voiceAddLoading,
      deleteVoiceLoading: units.deleteVoiceLoading,
   };
};

const mapDispatchToProps = (dispatch) => ({
   getLevelsListAsync: () => dispatch(getLevelsListAsync()),
   getSingleTopicAsync: (topicID) => dispatch(getSingleTopicAsync(topicID)),
   getSingleUnitAsync: (unitID) => dispatch(getSingleUnitAsync(unitID)),
   createUnitAsync: (topicID, params, navigate, voiceParams, prevVoiceID) =>
      dispatch(
         createUnitAsync(topicID, params, navigate, voiceParams, prevVoiceID)
      ),
   editUnitAsync: (
      unitID,
      formParams,
      navigate,
      topicID,
      isTagsUpdated,
      voiceParams,
      prevVoiceID
   ) =>
      dispatch(
         editUnitAsync(
            unitID,
            formParams,
            navigate,
            topicID,
            isTagsUpdated,
            voiceParams,
            prevVoiceID
         )
      ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Unit);
