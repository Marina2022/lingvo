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

const Unit = (props) => {
   const {
      stateCommonLevelsList,

      stateTopicsSingleTopicData,
      stateTopicsIsSingleTopicLoading,

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
   useEffect(() => {
      !stateTopicsIsSingleTopicLoading && topicId 
         && parseInt(topicId) !== stateTopicsSingleTopicData?.id 
         && dispatchGetSingleTopicAsync(topicId)
   }, [dispatchGetSingleTopicAsync, stateTopicsIsSingleTopicLoading, stateTopicsSingleTopicData?.id, topicId])
   
   const [topicSaved, setTopicSaved] = useState(topicId && parseInt(topicId) === stateTopicsSingleTopicData?.id ? stateTopicsSingleTopicData : {})

   useEffect(() => {
      // console.log('useEffect - setTopicSaved')
      parseInt(topicId) === stateTopicsSingleTopicData?.id && setTopicSaved(stateTopicsSingleTopicData)
   }, [stateTopicsSingleTopicData, topicId])

   /**
    * Gets saved unit data from backend
    */
   useEffect(() => {
      !stateUnitsUnitEditLoading && unitId 
         && parseInt(unitId) !== stateUnitsSingleUnit?.id 
         && dispatchGetSingleUnitAsync(unitId)
   }, [dispatchGetSingleUnitAsync, stateUnitsSingleUnit?.id, stateUnitsUnitEditLoading, unitId])

   const voices = unitId && parseInt(unitId) === stateUnitsSingleUnit?.id && stateUnitsSingleUnit?.voices 
      ? stateUnitsSingleUnit.voices.sort((a, b) => a.id < b.id ? 1 : -1) 
      : []
   
   const [unitData    , setUnitSaved     ] = useState(unitId && parseInt(unitId) === stateUnitsSingleUnit?.id ? {...stateUnitsSingleUnit, voices: [...voices]} : {})

   useEffect(() => {
      if (unitId && parseInt(unitId) === stateUnitsSingleUnit?.id) {
         // console.log('1) useEffect - setUnitSaved - setUploadedFiles', { unitId } , { stateUnitsSingleUnit } )
         const voices = stateUnitsSingleUnit.voices?.sort((a, b) => a.id < b.id ? 1 : -1) ?? []
         setUnitSaved({...stateUnitsSingleUnit, voices: voices.length === 0 ? [] : [voices[0]]})
      // } else {
      //    console.log('2) useEffect - setUnitSaved - setUploadedFiles', { unitId } , { stateUnitsSingleUnit } )
      }
   }, [stateUnitsSingleUnit, unitId])

   /**
    * Sets empty fileData
    */
   const [fileData, setFileData] = useState(undefined);

   /** 
    * Gets language level options from backend
    */ 
   useEffect(() => {
      !stateCommonLevelsList && dispatchGetLevelsListAsync()
   }, [dispatchGetLevelsListAsync, stateCommonLevelsList])

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
      : levelList?.length > 0 ? levelList[0] : '')

   useEffect(() => {
      if (unitData?.level) {
         // console.log('useEffect - setDefLevel')
         setDefLevel({
            ...unitData?.level,
            label: unitData?.level?.value,
         })
      }
   }, [unitData?.level])

   /**
    * Sets voice-over upload mode
    */
   const [uploadMode, setUploadMode] = useState(voiceOverProviderOptions[0].value);

   /**
    * Sets initial ```unitState = unitSaved & voices[]```
    */
   const [initUnit, setInitUnit] = useState(parseInt(unitId) === unitData?.id
      ? { ...unitData }
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
      if (parseInt(unitId) === unitData?.id) {
         // console.log('useEffect - setUnitState', unitId, unitSaved)
         setInitUnit({...unitData})
      }
   }, [levelList, topicId, unitData, unitId])


   const {
      inputState,
      handleInput,
      handleInvalidMessage,
      invalidMessages,
      setInputState
   } = useInput({ ...initUnit });

   useEffect(() => {
      // console.log('useEffect - setInputState', changedInitUnit, initUnit);
      setInputState({...initUnit})
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[initUnit])

   const handleInputTags = (items) => handleInput({target: { name: "tags", value: items.map(item => ({ name: item })) }})

   const handleInputLevel = (value, levelType) => {
      const level = {...levelList.find(level => level.value === value), label: undefined}
      handleInput({target: { name: levelType, value: level }});
   };

   const handleInputVoices = (files) => {
      const file = files[0]
      getBase64(file, reader => {
         setFileData({
            data: reader.currentTarget.result,
            language: topicSaved?.foreignLanguage,
            name: file?.name
         })
         file.url = URL.createObjectURL(file)
         // console.log('handleFiles - file:', file);
         handleInput({target: { name: 'voices', value: files }})
      });
   };

   // useEffect(() => {
   //    console.log('useEffect - fileData:', fileData);
   // }, [fileData])
   
   const [unitChanged, setUnitChanged] = useState(!compareObjects(unitData, inputState ))

   useEffect(() => { setUnitChanged(!compareObjects(unitData, inputState )) }, [inputState, unitData])

   const [noChange, setNoChange] = useState( !unitChanged || !checkForEmptyProperties(inputState, ["description",]) ||  inputState?.voices?.length <= 0)

   useEffect(() => { 
      setNoChange( !unitChanged || !checkForEmptyProperties(inputState, ["description",]) || inputState?.voices?.length <= 0)
   }, [unitChanged, inputState])

   const navigate = useNavigate();

   const onSubmit = (e) => {
      e.preventDefault();
      if (unitId) {
         if(unitChanged && compareObjects(unitData, inputState, 'voices')) {
            dispatchAddVoiceAsync(
               unitId, 
               topicId, 
               fileData, 
               () => dispatchGetSingleUnitAsync(unitId), 
               unitData?.voices ?? []
            );
         } else {
            dispatchEditUnitAsync(
               unitId,
               inputState,
               () => dispatchGetSingleUnitAsync(unitId),
               topicId,
               fileData,
               unitData?.voices ?? []
            );            
         }
      } else {
         dispatchCreateUnitAsync(topicId, inputState, id => navigate(`../units/${id}`), fileData);
      }
   };

   const onCancel = (e) => {
      e.preventDefault();
      dispatchGetSingleUnitAsync(unitId);
   };

   const [crumbs, setCrumbs, lastKey] = useOutletContext();

   const [prevCrumb, setPrevCrumb] = useState(crumbs[lastKey])

   useEffect(() => {
      !compareObjects(prevCrumb, crumbs[lastKey]) && setPrevCrumb(crumbs[lastKey])
   }, [crumbs, lastKey, prevCrumb])

   useEffect(() => {
      // console.log('useEffect - setCrumbs');
      setCrumbs(c => addCrumbs(c, [ unitId 
         ? { key: lastKey + 1, name:`${inputState?.value?.slice(0, 15)}${inputState?.value?.length>15?'...':''}`, path:`units/${unitId}` }
         : { key: lastKey + 1, name:t("tasks.task.new"), path:"units/new" }
      ])) 
   }, [inputState?.value, lastKey, setCrumbs, unitId, prevCrumb])

   return (
      <Form>
         <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
               <TextArea
                  name="value"
                  value={inputState.value}
                  error={invalidMessages}
                  onChange={handleInput}
                  onInvalid={handleInvalidMessage}
                  label={t("tasks.task.original")}
                  placeholder={t("tasks.task.placeholders.foreign")}
                  minRows={2}
                  maxLength={1023}
                  required
               />
            </Grid>
            <Grid item xs={12}>
               <TextArea
                  name="translation"
                  value={inputState.translation}
                  error={invalidMessages}
                  onChange={handleInput}
                  onInvalid={handleInvalidMessage}
                  label={t("tasks.task.translation")}
                  placeholder={t("tasks.task.placeholders.native")}
                  minRows={2}
                  maxLength={1023}
                  required
               />
            </Grid>
            <Grid item xs={12}>
               <TextArea
                  name="description"
                  value={inputState.description || ""}
                  error={invalidMessages}
                  onChange={handleInput}
                  onInvalid={handleInvalidMessage}
                  label={t("tasks.task.extra")}
                  placeholder={t("tasks.task.placeholders.extra")}
                  minRows={2}
                  maxLength={1023}
                  required
               />
            </Grid>
            <Grid item xs={12}>
               <TagsInput
                  selectedTags={handleInputTags}
                  tags={inputState.tags.map(({name}) => name)}
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
                        onChange: function onSelectChanged({target: { value }}) { handleInputLevel(value, "level") },
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
                           disabled={item.disabled}
                           variant={uploadMode === item.value ? "contained" : "outlined"} 
                           onClick={() => {
                              if (compareObjects(unitData.voices, initUnit.voices)) {
                                 setUploadMode(item.value)
                                 if (idx === 0 && uploadMode === 'uploadedAudio') {
                                    alert(t('messages.alerts.click_field_below_to_upload'))
                                 }
                              } else if (window.confirm(t("messages.confirm.unsaved_data"))) {
                                 handleInput({target: {name:'voices', value: [...(unitData.voices ?? [])]}})
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
                  text: inputState.value,
                  uploadedFiles: inputState.voices,
                  handleFiles: handleInputVoices,
                  languageName: stateTopicsSingleTopicData?.foreignLanguage?.value
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
                     onClick={onSubmit}
                     variant="contained"
                     disabled={noChange}
                  >
                     {t("actions.save")}
                  </Button>
               </Grid>
               <Grid item xs={5} sm={5} md={4} lg={3}>
                  <Button onClick={onCancel} variant="outlined" disabled={noChange}>
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
      stateTopicsIsSingleTopicLoading: topics.isSingleTopicLoading,

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
      voiceParams,
      prevVoices
   ) =>
      dispatch(
         editUnitAsync(
            unitID,
            formParams,
            callback,
            topicID,
            voiceParams,
            prevVoices
         )
      ),
   dispatchAddVoiceAsync: (unitId, topicId, params, callback, prevVoices) =>
      dispatch(addVoiceAsync(unitId, topicId, params, callback, prevVoices)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Unit);
