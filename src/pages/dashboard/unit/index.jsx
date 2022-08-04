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
 * @returns {Boolean} true if files have different urls, otherwise - false
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
            accept={{'audio/mpeg':['.mp3']}}
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
   
   /** 
    * Gets URL path segment params 
    */
   const { topicId, unitId } = useParams();
   
   /** 
    * Gets a topic data from backend 
    */
   topicId && parseInt(topicId) !== stateTopicsSingleTopicData?.id && dispatchGetSingleTopicAsync(topicId)      
   
   const [topicData, setTopicData] = useState(topicId && parseInt(topicId) === stateTopicsSingleTopicData?.id ? stateTopicsSingleTopicData : {})

   useEffect(() => {
      // console.log('useEffect - setTopicData')
      setTopicData(stateTopicsSingleTopicData)
   }, [stateTopicsSingleTopicData])

   /**
    * Gets a unit data from backend
    */
   unitId && parseInt(unitId) !== stateUnitsSingleUnit?.id && dispatchGetSingleUnitAsync(unitId)      
   
   const [unitData, setUnitData] = useState(unitId && parseInt(unitId) === stateUnitsSingleUnit?.id ? stateUnitsSingleUnit : {})
   const [unitDataFiles, setUnitDataFiles] = useState(unitId && parseInt(unitId) === stateUnitsSingleUnit?.id && stateUnitsSingleUnit?.voices ? stateUnitsSingleUnit.voices : []);
   const [uploadedFiles, setUploadedFiles] = useState(unitDataFiles);

   useEffect(() => {
      // console.log('useEffect - setUnitData', 'setUnitDataFiles', 'setUploadedFiles')
      setUnitData(stateUnitsSingleUnit)
      setUnitDataFiles(stateUnitsSingleUnit?.voices ?? [])
      setUploadedFiles(stateUnitsSingleUnit?.voices ?? [])
   }, [stateUnitsSingleUnit])

   /**
    * Sets isTagsUpdated flag
    */ 
   const [updatedTags, setUpdatedTags] = useState(false);

   /**
    * Sets empty fileData
    */
   const [fileData, setFileData] = useState({});

   // true - if the generated voice is created, otherwise - false
   // const [generatedVoiceAudio, setGeneratedVoiceAudio] = useState({ isVoiceLoaded: false, url: null });

   /** 
    * Gets language level options from backend
    */ 
   !stateCommonLevelsList && dispatchGetLevelsListAsync()

   const [levelList, setLevelList] = useState((stateCommonLevelsList || []).map((item) => ({ ...item, label: item.value })));
   
   useEffect(() => {
      // console.log('useEffect - setLevelList')
      stateCommonLevelsList && setLevelList(stateCommonLevelsList.map((item) => ({ ...item, label: item.value })))
   }, [stateCommonLevelsList])
   
   /**
    * Set default language level
    */
   const [defLevel, setDefLevel] = useState(unitId && unitData?.level 
      ? {
           ...unitData?.level,
           label: unitData?.level?.value,
        }
      : levelList && levelList.length > 0 ? levelList[0] : '')

   useEffect(() => {
      // console.log('useEffect - setDefLevel')
      setDefLevel(unitData?.level 
         ? {
              ...unitData?.level,
              label: unitData?.level?.value,
           }
         : levelList && levelList.length > 0 ? levelList[0] : '')
   }, [levelList, unitData?.level])

   /**
    * ### Voice-over upload options
    * 
    * `value` voice-over upload type
    * * `uploadedAudio` - to upload audio file
    * * `recordedAudio` - to record alive voice-over
    * * `generatedVoice` - to generate voice-over using voice generator provider
    * 
    * `label` used for UI rendering
    */
   const uploadOptions = [
      { value: "uploadedAudio" , label: t("tasks.task.voice_sources.upload.label")   },
      { value: "recordedAudio" , label: t("tasks.task.voice_sources.record.label")   },
      { value: "generatedVoice", label: t("tasks.task.voice_sources.generate.label") },
   ]
   
   /**
    * Sets voice-over upload mode
    */
   const [uploadMode, setUploadMode] = useState(uploadOptions[0].value);

   /**
    * Sets initial ```unitState = unitData & voices[]```
    */
   const [changedInitUnit, setChangedInitUnit] = useState(true)
   const [initUnit, setInitUnit] = useState(unitId
      ? {
           ...unitData,
         //   tags: unitData?.tags, //???
           voices: [],
        }
      : {
         subject: topicId,
         value: "",
         translation: "",
         description: "",
         tags: [],
         level: levelList && levelList.length > 0 ? levelList[0] : '',
         voices: [],
      })
   
   useEffect(() => {
      // console.log('useEffect - setUnitState')
      setInitUnit(unitId
         ? {
              ...unitData,
            //   tags: unitData?.tags,
              voices: [],
           }
         : {
            subject: topicId,
            value: "",
            translation: "",
            description: "",
            tags: [],
            level: levelList && levelList.length > 0 ? levelList[0] : '',
            voices: [],
         })
      setChangedInitUnit(true)
   }, [levelList, topicId, unitData, unitId])


   const {
      inputState: unitInput,
      handleInput: handleUnitInput,
      handleInvalidMessage,
      invalidMessages,
      setInputState: setUnitInput
   } = useInput({ ...initUnit });

   useEffect(() => {
      // console.log('useEffect - setInputState');
      if (changedInitUnit) {
         setUnitInput({...initUnit})
         setChangedInitUnit(false)
      }
   },[changedInitUnit, setUnitInput, initUnit])

   const handleInputChange = (event) => {
      handleUnitInput(event);
   };

   const handleSelectedTags = (items) => {
      const tags = {
         target: { name: "tags", value: items },
      };

      setUpdatedTags(true);
      handleUnitInput(tags);
   };

   const setLevel = (event, levelType) => {
      const e = { ...event };
      delete e.label;

      //for input state for select component
      const selectState = {
         target: { name: levelType, value: e },
      };
      handleUnitInput(selectState);
   };

   const handleFiles = (files) => {
      const file = files[0]
      getBase64(file, reader => {
         setFileData({
            data: reader.currentTarget.result,
            language: topicData?.foreignLanguage,
            name: file?.name
         })
         file.url = URL.createObjectURL(file)
         console.log('handleFiles - file:', file);
         setUploadedFiles(files);
      });
   };

   // useEffect(() => {
   //    // if (changedVoiceOver(unitDataFiles, uploadedFiles)) {
   //       // console.log(unitDataFiles, uploadedFiles);
   //       const file = uploadedFiles[0]
   //       getBase64(file, reader => setFileData({
   //          data: reader.result,
   //          language: topicData?.foreignLanguage,
   //          name: file?.name
   //       }))
   //    // }
   // }, [topicData?.foreignLanguage, uploadedFiles])

   const handleRecordFiles = (files, data) => {
      const file = files[0]
      getBase64(file, reader => {
         setFileData({
            data: reader.currentTarget.result,
            language: topicData?.foreignLanguage,
            name: file?.name
         })
         console.log('handleRecordFiles - file:', file);
         setUploadedFiles(files)
      })
   }

   useEffect(() => {
      console.log('useEffect - fileData:', fileData);
   }, [fileData])
   
   const navigate = useNavigate();

   const onSubmit = (e) => {
      e.preventDefault();
      if (unitId) {
         dispatchEditUnitAsync(
            unitId,
            unitInput,
            navigate,
            topicId,
            updatedTags,
            fileData,
            unitData?.voices ? unitData?.voices[0]?.id : undefined
         );
      } else {
         dispatchCreateUnitAsync(topicId, unitInput, navigate, fileData);
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
      // console.log('useEffect - setCrumbs');
      unitId ?
      setCrumbs(c => __addCrumbs(c, [
         { key: lastKey + 1, name:`${unitInput?.value?.slice(0, 15)}${unitInput?.value?.length>15?'...':''}`, path:`units/${unitId}` }
      ])) :
      setCrumbs(c => __addCrumbs(c, [
         { key: lastKey + 1, name:t("tasks.task.new"), path:"units/new" }
      ])) 
   }, [__addCrumbs, unitInput?.value, lastKey, setCrumbs, unitId])

   return (
      <Form>
         <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
               <TextArea
                  name="value"
                  value={unitInput.value}
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
                  value={unitInput.translation}
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
                  value={unitInput.description || ""}
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
                  {
                     (() => {
                        // console.log(levelList, defLevel);
                        return <Select
                              name="level"
                              select={{
                                 label: t("tasks.task.level"),
                                 options: levelList,
                                 defaultValue: defLevel,
                                 onChange: ({target: { value }}) => setLevel(value, "level"),
                                 placeholder: t("tasks.task.level")
                              }}
                           />
                     })()
                  }
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
                        <RecordAudio text={unitInput.value} handleFiles={handleFiles} language={{name: stateTopicsSingleTopicData.foreignLanguage.value}} />) ||
                     (  uploadMode === "generatedVoice" && 
                        <GenerateAudio text={unitInput.value} handleFiles={handleFiles} language={{name: stateTopicsSingleTopicData.foreignLanguage.value}} />)
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
                        !checkForEmptyProperties(unitInput, [
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
