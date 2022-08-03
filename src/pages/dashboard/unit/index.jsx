import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//BASE COMPONENTS
import Form from "../../../components/form/Form.component";
import TextArea from "../../../components/text-area/TextArea.component";
import TagsInput from "../../../components/tags-input/TagsInput.component";
import Button from "../../../components/button/Button.component";
import Select from "../../../components/select/Select.component";
import DropZone from "../../../components/drop-zone/DropZone.component";
import { PlayerEmbedControls } from "../units/player";
//EFFECTS
import useInput from "../../../effects/useInput.effect";
//ACTIONS
import { getLevelsListAsync } from "../../../redux/common/common.actions";
import { getSingleTopicAsync } from "../../../redux/topics/topics.actions";
import { getSingleUnitAsync, createUnitAsync, editUnitAsync } from "../../../redux/units/units.actions";
//SERVICES
import AddEditUnitServices from "./unit-services";
//UTILITIES
import { checkForEmptyProperties } from "../../../utilities/helper-functions";
import { t } from "i18next";
import { getBase64 } from "../../../utilities/handleFile";
import { addCrumbs } from "../layout/breadcrumbs";
import { ButtonGroup, Grid } from "@mui/material";

import GenerateAudio from "./unit-generate-audio";
import RecordAudio from "./unit-record-audio"

/**
 * 
 * @param {Array<{url:String}>} files1 
 * @param {Array<{url:String}>} files2 
 */
const changedVoiceOver = (files1, files2) => (
   files1.length !== 0 && 
   files2.length !== 0 && (
      files1.length !== files2.length || 
      files1[0].url !== files2[0].url
   )
)

const UploadAudio = ({ handleFiles, files }) => 
   <Grid item xs={12} container spacing={2}>
      <Grid item xs={12}>
         <DropZone
            title={t("tasks.task.voice_sources.upload.title")}
            handleFiles={handleFiles}
            files={files}
         />
      </Grid>
      <Grid item xs={12} container justifyContent="center">
      <PlayerEmbedControls source={files && files[0] ? files[0] : {}} />
      </Grid>
   </Grid>


const Unit = (props) => {
   const {
      stateCommonLevelsList,

      stateTopicsSingleTopicData,

      stateUnitsDeleteVoiceLoading,
      stateUnitsSingleUnit,
      stateUnitsUnitCreateLoading,
      stateUnitsUnitEditLoading,
      stateUnitsVoiceAddLoading,

      dispatchGetLevelsListAsync,

      dispatchGetSingleTopicAsync,

      dispatchCreateUnitAsync,
      dispatchEditUnitAsync,
      dispatchGetSingleUnitAsync,
   } = props;
   
   const { generateLevelsOptions } = AddEditUnitServices;
   
   const navigate = useNavigate();
   
   const { topicId, unitId } = useParams();
   
   topicId && parseInt(topicId) !== stateTopicsSingleTopicData?.id && dispatchGetSingleTopicAsync(topicId)      
   
   const topicData = topicId ? {...stateTopicsSingleTopicData} : {}


   unitId && parseInt(unitId) !== stateUnitsSingleUnit?.id 
      && dispatchGetSingleUnitAsync(unitId)      
   
   const unitData = unitId ? {...stateUnitsSingleUnit} : {}

   const [isTagsUpdated, changeIsTagsUpdated] = useState(false);
   const [fileData, setFileData] = useState({});

   // true - if the generated voice is created, otherwise - false
   // const [generatedVoiceAudio, setGeneratedVoiceAudio] = useState({ isVoiceLoaded: false, url: null });

   const levelsOptions = generateLevelsOptions(stateCommonLevelsList || []);
   const unitDataFiles = unitId && unitData?.voices ? unitData.voices : [];
   const [uploadedFiles, setUploadedFiles] = useState(unitDataFiles);

   useEffect(() => {
      dispatchGetLevelsListAsync();
      topicId && dispatchGetSingleTopicAsync(topicId);
      unitId && dispatchGetSingleUnitAsync(unitId)
   }, [dispatchGetLevelsListAsync, dispatchGetSingleTopicAsync, dispatchGetSingleUnitAsync, topicId, unitId]);

   // values are equal to voiceUploadMode"s fields
   const uploadOptions = [
      { value: "uploadedAudio" , label: t("tasks.task.voice_sources.upload.label")   },
      { value: "recordedAudio" , label: t("tasks.task.voice_sources.record.label")   },
      { value: "generatedVoice", label: t("tasks.task.voice_sources.generate.label") },
   ];
   // defines which type of voice uploading is being used: Azure generated voice, uploaded file, recorded audio
   const [uploadMode, setUploadMode] = useState(uploadOptions[0].value);

   
   const formInitState = {
      description: "",
      level: levelsOptions[0],
      subject: topicId,
      tags: [],
      translation: "",
      value: "",
      voices: [],
   };

   const levelDefaultValue = unitId
      ? {
           ...unitData?.level,
           label: unitData?.level?.value,
        }
      : levelsOptions[0];

   const formState = unitId
      ? {
           ...unitData,
           tags: unitData?.tags,
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

   const setLevel = (event, levelType) => {
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
         language: topicData?.foreignLanguage,
         name: file?.name
      }));
      setUploadedFiles(files);
   };

   const handleRecordFiles = (data, files) => {
      const file = files[0]      
      setFileData({
         data,
         language: topicData?.foreignLanguage,
         name: file?.name
      })
      setUploadedFiles(files)
   }

   const onSubmit = (e) => {
      e.preventDefault();
      if (unitId) {
         dispatchEditUnitAsync(
            unitId,
            inputState,
            navigate,
            topicId,
            isTagsUpdated,
            fileData,
            unitData?.voices ? unitData?.voices[0]?.id : undefined
         );
      } else {
         dispatchCreateUnitAsync(topicId, inputState, navigate, fileData);
      }
   };

   const onCancel = (e) => {
      e.preventDefault();
      navigate(-1);
   };

   // eslint-disable-next-line
   const [crumbs, setCrumbs, lastKey] = useOutletContext();
   const __addCrumbs = addCrumbs

   useEffect(() => {
      unitId ?
      setCrumbs(c => __addCrumbs(c, [
         { key: lastKey + 1, name:`${inputState?.value.slice(0, 15)}${inputState?.value.length>15?'...':''}`, path:`units/${unitId}` }
      ])) :
      setCrumbs(c => __addCrumbs(c, [
         { key: lastKey + 1, name:t("tasks.task.new"), path:"units/new" }
      ])) 
   }, [__addCrumbs, inputState?.value, lastKey, setCrumbs, unitId])

   return (
      <Form>
         <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
               <TextArea
                  name="value"
                  value={inputState.value}
                  error={invalidMessages}
                  onChange={handleInputChange}
                  onInvalid={handleInvalidMessage}
                  label={t("tasks.task.original")}
                  placeholder={t("tasks.task.placeholders.foreign")}
                  minRows={2}
                  required
               />
            </Grid>
            <Grid item xs={12}>
               <TextArea
                  name="translation"
                  value={inputState.translation}
                  error={invalidMessages}
                  onChange={handleInputChange}
                  onInvalid={handleInvalidMessage}
                  label={t("tasks.task.translation")}
                  placeholder={t("tasks.task.placeholders.native")}
                  minRows={2}
                  required
               />
            </Grid>
            <Grid item xs={12}>
               <TextArea
                  name="description"
                  value={inputState.description || ""}
                  error={invalidMessages}
                  onChange={handleInputChange}
                  onInvalid={handleInvalidMessage}
                  label={t("tasks.task.extra")}
                  placeholder={t("tasks.task.placeholders.extra")}
                  minRows={2}
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
                  label={t("tasks.task.tags")}
               />
            </Grid>                  
            <Grid item xs={12} container spacing={2} justifyContent="space-between" alignItems="center">
               <Grid item xs={12} md={4} lg={3}>
                  <Select
                     name="level"
                     select={{
                        label: t("tasks.task.level"),
                        options: levelsOptions,
                        defaultValue: levelDefaultValue,
                        onChange: ({target: { value }}) => setLevel(value, "level"),
                        placeholder: t("tasks.task.level")
                     }}
                  />
               </Grid>
               <Grid item xs={12} md={8} lg={6}>
                  <ButtonGroup aria-label="outlined primary button group">
                  {
                     uploadOptions.map((item, idx) => (
                        <Button key={idx}
                           variant={uploadMode === item.value ? "contained" : "outlined"} 
                           onClick={() => {
                              if (
                                 !changedVoiceOver(unitDataFiles, uploadedFiles) || 
                                 window.confirm(t("messages.confirm.unsaved_data"))
                              ) {
                                 setUploadedFiles(unitDataFiles)
                                 setUploadMode(item.value)
                              }
                           }}
                        >
                           {item.label}
                        </Button>
                     ))
                  }
                  </ButtonGroup>
               </Grid>
            </Grid>
            { 
               uploadMode && (
                  <Grid item xs={12} container spacing={2} sx={{ 
                     mt:'2rem', 
                     ml: '1rem',
                     pr: '2rem', 
                     backgroundColor: 'LightSteelBlue'
                  }}> 
                  {
                     (  uploadMode === "uploadedAudio" && 
                        <UploadAudio handleFiles={handleFiles} files={uploadedFiles} /> ) || 
                     (  uploadMode === "recordedAudio" && 
                        <RecordAudio text={inputState.value} handleFiles={handleRecordFiles} language={{name: stateTopicsSingleTopicData.foreignLanguage.value}} />) ||
                     (  uploadMode === "generatedVoice" && 
                        <GenerateAudio text={inputState.value} handleFiles={handleFiles} language={{name: stateTopicsSingleTopicData.foreignLanguage.value}} />)
                  }
                  </Grid>
               )
            }
            <Grid item xs={12} container spacing={2} justifyContent="space-around" sx={{mt:"2rem"}}>
               <Grid item xs={5} sm={5} md={4} lg={3}>
                  <Button
                     isLoading={
                        stateUnitsUnitCreateLoading ||
                        stateUnitsUnitEditLoading ||
                        stateUnitsVoiceAddLoading ||
                        stateUnitsDeleteVoiceLoading
                     }
                     variant="contained"                           
                     disabled={
                        !checkForEmptyProperties(inputState, [
                           "description",
                        ]) || uploadedFiles.length <= 0
                     }
                     onClick={onSubmit}>
                     {t("actions.save")}
                  </Button>
               </Grid>
               <Grid item xs={5} sm={5} md={4} lg={3}>
                  <Button onClick={onCancel} variant="outlined">
                     {t("actions.cancel")}
                  </Button>
               </Grid>
            </Grid>
         </Grid>
      </Form>
   );
};

const mapStateToProps = (state) => {
   const { common, topics, units } = state;
   return {
      stateCommonLevelsList: common.levelsList,

      stateTopicsSingleTopicData: topics.singleTopicData,
      
      stateUnitsSingleUnit: units.singleUnit,
      stateUnitsUnitCreateLoading: units.unitCreateLoading,
      stateUnitsUnitEditLoading: units.unitEditLoading,
      stateUnitsVoiceAddLoading: units.voiceAddLoading,
      stateUnitsDeleteVoiceLoading: units.deleteVoiceLoading,
   };
};

const mapDispatchToProps = (dispatch) => ({
   dispatchGetLevelsListAsync: () => dispatch(getLevelsListAsync()),
   dispatchGetSingleTopicAsync: (topicID) => dispatch(getSingleTopicAsync(topicID)),
   dispatchGetSingleUnitAsync: (unitID) => dispatch(getSingleUnitAsync(unitID)),
   dispatchCreateUnitAsync: (topicID, params, navigate, voiceParams, prevVoiceID) =>
      dispatch(
         createUnitAsync(topicID, params, navigate, voiceParams, prevVoiceID)
      ),
   dispatchEditUnitAsync: (
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
