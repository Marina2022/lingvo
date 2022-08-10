import React, { useEffect, useState } from "react";
import { connect } from "react-redux"; 
import { useOutletContext, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//BASE COMPONENTS
import Form from "../../../components/form/Form.component";
import TextArea from "../../../components/text-area/TextArea.component";
import TagsInput from "../../../components/tags-input/TagsInput.component";
import Button from "../../../components/button/Button.component";
import Select from "../../../components/select";
//EFFECTS
import useInput from "../../../effects/useInput.effect";
//ACTIONS
import { getLevelsListAsync } from "../../../redux/common/common.actions";
import { getSingleTopicAsync } from "../../../redux/topics/topics.actions";
import { getSingleUnitAsync, createUnitAsync, editUnitAsync, addVoiceAsync } from "../../../redux/units/units.actions";
//UTILITIES
import { checkForEmptyProperties, compareObjects } from "../../../utilities/helper-functions";
import { t } from "i18next";
import { getBase64 } from "../../../utilities/handleFile";
import { addCrumbs } from "../layout/breadcrumbs";
import { ButtonGroup, Grid } from "@mui/material";

import voiceOverProviderOptions from "../../../components/audio"

/**
 * 
 * @param {Array<{url:String}>} files1 
 * @param {Array<{url:String}>} files2 
 * @returns {Boolean} true if files have different urls, otherwise - false
 */
const changedVoiceOver = (files1, files2) => (
   Array.isArray(files1) && files1.length !== 0 && 
   Array.isArray(files2) && files2.length !== 0 && (
      files1.length !== files2.length || 
      files1[0].url !== files2[0].url
   )
)

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

      dispatchAddVoiceAsync,
      dispatchCreateUnitAsync,
      dispatchEditUnitAsync,
      dispatchGetSingleUnitAsync,
   } = props;
   
   /** 
    * Gets URL path segment params 
    */
   const { topicId, unitId } = useParams();
   
   /** 
    * Gets saved topic data from backend 
    */
   topicId && parseInt(topicId) !== stateTopicsSingleTopicData?.id && dispatchGetSingleTopicAsync(topicId)      
   
   const [topicSaved, setTopicSaved] = useState(topicId && parseInt(topicId) === stateTopicsSingleTopicData?.id ? stateTopicsSingleTopicData : {})

   useEffect(() => {
      // console.log('useEffect - setTopicSaved')
      setTopicSaved(stateTopicsSingleTopicData)
   }, [stateTopicsSingleTopicData])

   /**
    * Gets saved unit data from backend
    */
   unitId && parseInt(unitId) !== stateUnitsSingleUnit?.id && dispatchGetSingleUnitAsync(unitId)

   const voices = unitId && parseInt(unitId) === stateUnitsSingleUnit?.id && stateUnitsSingleUnit?.voices 
      ? stateUnitsSingleUnit.voices.sort((a, b) => a.id < b.id ? 1 : -1) 
      : []
   
   const [unitSaved    , setUnitSaved     ] = useState(unitId && parseInt(unitId) === stateUnitsSingleUnit?.id ? {...stateUnitsSingleUnit, voices: [...voices]} : {})
   const [uploadedFiles, setUploadedFiles] = useState([...voices]);

   useEffect(() => {
      // console.log('useEffect - setUnitSaved', 'setUploadedFiles')
      const voices = unitId && parseInt(unitId) === stateUnitsSingleUnit?.id && stateUnitsSingleUnit?.voices 
         ? stateUnitsSingleUnit.voices.sort((a, b) => a.id < b.id ? 1 : -1) 
         : []
      setUnitSaved({...stateUnitsSingleUnit, voices: [...voices]})
      setUploadedFiles([...voices])
   }, [stateUnitsSingleUnit, unitId])

   // useEffect(() => {
   //    console.log('useEffect - uploadedFiles:', uploadedFiles);
   // }, [uploadedFiles])   
   
   /**
    * Sets isTagsUpdated flag
    */ 
   const [updatedTags, setUpdatedTags] = useState(false);

   /**
    * Sets empty fileData
    */
   const [fileData, setFileData] = useState({});

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
   const [defLevel, setDefLevel] = useState(unitId && unitSaved?.level 
      ? {
           ...unitSaved?.level,
           label: unitSaved?.level?.value,
        }
      : levelList && levelList.length > 0 ? levelList[0] : '')

   useEffect(() => {
      // console.log('useEffect - setDefLevel')
      setDefLevel(unitSaved?.level 
         ? {
              ...unitSaved?.level,
              label: unitSaved?.level?.value,
           }
         : levelList && levelList.length > 0 ? levelList[0] : '')
   }, [levelList, unitSaved?.level])

   /**
    * Sets voice-over upload mode
    */
   const [uploadMode, setUploadMode] = useState(voiceOverProviderOptions[0].value);

   /**
    * Sets initial ```unitState = unitSaved & voices[]```
    */
   const [changedInitUnit, setChangedInitUnit] = useState(true)
   const [initUnit, setInitUnit] = useState(unitId
      ? {
           ...unitSaved,
         //   tags: unitSaved?.tags, //???
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
              ...unitSaved,
            //   tags: unitSaved?.tags,
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
   }, [levelList, topicId, unitSaved, unitId])


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

   const setLevel = (value, levelType) => {

      const level = {...levelList.find(level => level.value === value)}
      delete level.label;

      //for input state for select component
      const selectState = {
         target: { name: levelType, value: level },
      };
      handleUnitInput(selectState);
   };

   const handleFiles = (files) => {
      const file = files[0]
      getBase64(file, reader => {
         setFileData({
            data: reader.currentTarget.result,
            language: topicSaved?.foreignLanguage,
            name: file?.name
         })
         file.url = URL.createObjectURL(file)
         // console.log('handleFiles - file:', file);
         setUploadedFiles(files);
      });
   };

   // useEffect(() => {
   //    console.log('useEffect - fileData:', fileData);
   // }, [fileData])
   
   const [unitChanged, setUnitChanged] = useState(!compareObjects(unitSaved, unitInput, 'voices'))

   useEffect(() => { setUnitChanged(!compareObjects(unitSaved, unitInput, 'voices')) }, [unitInput, unitSaved])

   const [voiceChanged, setVoiceChanged] = useState(!compareObjects(unitSaved.voices, uploadedFiles))

   useEffect(() => { setVoiceChanged(!compareObjects(unitSaved.voices, uploadedFiles)) }, [unitSaved.voices, uploadedFiles])

   const [saveDisabled, setSaveDisabled] = useState( (!unitChanged && !voiceChanged) || !checkForEmptyProperties(unitInput, ["description",]) ||  uploadedFiles.length <= 0 )

   useEffect(() => { setSaveDisabled( (!unitChanged && !voiceChanged) || !checkForEmptyProperties(unitInput, ["description",]) || uploadedFiles.length <= 0)
   }, [unitChanged, unitInput, uploadedFiles.length, voiceChanged])

   const navigate = useNavigate();

   const onSubmit = (e) => {
      e.preventDefault();
      if (unitId) {
         if(voiceChanged && !unitChanged) {
            dispatchAddVoiceAsync(
               unitId, 
               topicId, 
               fileData, 
               () => dispatchGetSingleUnitAsync(unitId), 
               unitSaved?.voices ?? []
            );
         } else {
            dispatchEditUnitAsync(
               unitId,
               unitInput,
               () => dispatchGetSingleUnitAsync(unitId),
               topicId,
               updatedTags,
               fileData,
               unitSaved?.voices ?? []
            );            
         }
      } else {
         dispatchCreateUnitAsync(topicId, unitInput, id => navigate(`../${id}`), fileData);
      }
   };

   const onCancel = (e) => {
      e.preventDefault();
      dispatchGetSingleUnitAsync(unitId);
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
               {(() => {
                  // console.log(levelList, defLevel);
                  return <Select
                     name="level"
                     select={{
                        label: t("tasks.task.level"),
                        options: levelList,
                        defaultValue: defLevel,
                        onChange: function onSelectChanged({target: { value }}) { setLevel(value, "level") },
                        placeholder: t("tasks.task.level"),
                        emptyValue: 'None'
                     }}
                  />
               })()}
               </Grid>
               <Grid item xs={12} md={8} lg={6}>
                  <ButtonGroup aria-label="outlined primary button group">
                  {
                     voiceOverProviderOptions.map((item, idx) => (
                        <Button key={idx}
                           variant={uploadMode === item.value ? "contained" : "outlined"} 
                           onClick={() => {
                              if (
                                 !changedVoiceOver(unitSaved.voices, uploadedFiles) || 
                                 window.confirm(t("messages.confirm.unsaved_data"))
                              ) {
                                 setUploadedFiles([...(unitSaved.voices ?? [])])
                                 setUploadMode(item.value)
                              }
                           }}
                        >
                           {item.getLabel()}
                        </Button>
                     ))
                  }
                  </ButtonGroup>
               </Grid>
            </Grid>
            
            <Grid item xs={12} container spacing={2} sx={{ mt:'2rem', ml: '1rem', pr: '2rem', backgroundColor: 'LightSteelBlue'}}> 
            {
               voiceOverProviderOptions.find(item => item.value === uploadMode).html({
                  text: unitInput.value,
                  uploadedFiles,
                  handleFiles,
                  languageName: stateTopicsSingleTopicData.foreignLanguage.value
               })
            }
            </Grid>

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
                     disabled={saveDisabled}
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
   dispatchCreateUnitAsync: (topicID, params, callback, voiceParams, prevVoiceID) =>
      dispatch(
         createUnitAsync(topicID, params, callback, voiceParams, prevVoiceID)
      ),
   dispatchEditUnitAsync: (
      unitID,
      formParams,
      callback,
      topicID,
      isTagsUpdated,
      voiceParams,
      prevVoices
   ) =>
      dispatch(
         editUnitAsync(
            unitID,
            formParams,
            callback,
            topicID,
            isTagsUpdated,
            voiceParams,
            prevVoices
         )
      ),
   dispatchAddVoiceAsync: (unitId, topicId, params, callback, prevVoices) =>
      dispatch(addVoiceAsync(unitId, topicId, params, callback, prevVoices)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Unit);
