import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//IMPORT MODULES
//AZURE MICROSOFT SDK
import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";
//GENERATING UNIQUE IDS
import { v4 as uuidv4 } from "uuid";
//CONFIG WITH AZURE CREDENTIALS
import keysConfig from "../../../../../config/keys.config";

//BASE COMPONENTS
import GridContainer from "../../../../../components/grid-container/GridContainer.component";
import GridItem from "../../../../../components/grid-item/GridItem.component";
import BackArrow from "../../../../../components/back-arrow/BackArrow.component";
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
import {
   getSingleUnitAsync,
   createUnitAsync,
   editUnitAsync,
} from "../../../../../redux/units/units.actions";
//SERVICES
import AddEditUnitServices from "./add-edit-unit.services";
//UTILITIES
import { capitalizeFirstOnlyCase, checkForEmptyProperties } from "../../../../../utilities/helper-functions";

import RecordAudioModal from "./components/RecordAudioModal.component";
import { t } from "i18next";

const AddEditUnitSubpage = (props) => {
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

   /**
    *  states for Azure Text-to-Speech service
    */ 
   const setOfVoices = {
      // TODO: needs to change to enGB
      en_britain: {
         male: "en-GB-RyanNeural",
         female: "en-GB-LibbyNeural",
      },
      // TODO: needs to change to enUS
      en_usa: {
         male: "en-US-GuyNeural",
         female: "en-US-AriaNeural",
      },
      ru: {
         male: "ru-RU-DmitryNeural",
         female: "ru-RU-DariyaNeural",
      },
      de: {
         male: "de-DE-Stefan",
         female: "de-DE-HeddaRUS",
      },
      fr: {
         male: "fr-FR-HenriNeural",
         female: "fr-FR-DeniseNeural",
      },
      es: {
         male: "es-ES-AlvaroNeural",
         female: "es-ES-ElviraNeural",
      },
      zh: {
         male: "zh-CN-YunyangNeural",
         female: "zh-CN-XiaoxiaoNeural",
      },
      ja: {
         male: "ja-JP-KeitaNeural",
         female: "ja-JP-NanamiNeural",
      },
      ko: {
         male: "ko-KR-InJoonNeural",
         female: "ko-KR-SunHiNeural",
      },
      tr: {
         male: "tr-TR-AhmetNeural",
         female: "tr-TR-EmelNeural",
      },
   };
   const genders = [
      { id: 0, label: t("genders.male"), value: "male" },
      { id: 1, label: t("genders.female"), value: "female" },
   ];   
   /**
    * List of supported languages
    */
   const voiceLanguages = [
      // TODO: needs change value to 
      { id: 0, value: "en_britain", },
      // TODO: needs to change value "en_usa" to "enUS"
      { id: 1, value: "en_usa",     },
      { id: 2, value: "ru",         },
      { id: 3, value: "de",         },
      { id: 4, value: "fr",         },
      { id: 5, value: "es",         },
      { id: 6, value: "zh",         },
      { id: 7, value: "ja",         },
      { id: 8, value: "ko",         },
      { id: 9, value: "tr",         },
   ];

   const languageNames = new Intl.DisplayNames([navigator.language], { type: 'language' });

   // TODO: needs to change values to language-COUNTRY code and exclude code property
   voiceLanguages.forEach(lang => {
      lang.code = 
         lang.value === "en_britain" ? "en-GB" :
         lang.value === "en_usa"     ? "en-US" :
         lang.value === "ru"         ? "ru-RU" :
         lang.value === "de"         ? "de-DE" :
         lang.value === "fr"         ? "fr-FR" :
         lang.value === "es"         ? "es-ES" :
         lang.value === "zh"         ? "zh-CN" :
         lang.value === "ja"         ? "ja-JP" :
         lang.value === "ko"         ? "ko-KR" :
         lang.value === "tr"         ? "tr-TR" :
         lang.value
      lang.label = capitalizeFirstOnlyCase(languageNames.of(lang.code))
   })


   // values are equal to voiceUploadMode"s fields
   const voiceUploadOptions = [
      { id: 0, label: t("units.voice_sources.undefined.label"), value: "" },
      { id: 2, label: t("units.voice_sources.upload.label"), value: "uploadedAudio" },
      { id: 1, label: t("units.voice_sources.record.label"), value: "recordedAudio" },
      { id: 3, label: t("units.voice_sources.generate.label"), value: "generatedVoice" },
   ];

   // states
   const [selectedVoice, setSelectedVoice] = useState({
      language: voiceLanguages[0],
      gender: genders[0],
   });
   // true - if the generated voice is created, otherwise - false
   const [generatedVoiceAudio, setGeneratedVoiceAudio] = useState({
      isVoiceLoaded: false,
      url: null,
   });

   // defines which type of voice uploading is being used: Azure generated voice, uploaded file, recorded audio
   const [voiceUploadMode, setVoiceUploadMode] = useState({
      mode: null,
   });

   const levelsOptions = generateLevelsOptions(levelsList || []);
   let { topicID, unitID } = useParams();
   const files = unitID ? singleUnitDataCopy?.voices : [];
   const [uploadedFiles, setUploadedFiles] = useState(files);

   useEffect(() => {
      getLevelsListAsync();
      if (topicID) {
         getSingleTopicAsync(topicID);
      }
      if (unitID) {
         getSingleUnitAsync(unitID);
      }
   }, [getLevelsListAsync, getSingleTopicAsync, getSingleUnitAsync, topicID, unitID]);

   const formInitState = {
      description: "",
      level: levelsOptions[0],
      subject: singleTopicData?.id,
      tags: [],
      translation: "",
      value: "",
      voices: [],
   };

   const levelDefaultValue = unitID
      ? {
           ...selectedUnit?.level,
           label: selectedUnit?.level?.value,
        }
      : levelsOptions[0];

   const formState = unitID
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

   const handleSelecetedTags = (items) => {
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
      getBase64(files[0]);
      setUploadedFiles(files);
   };

   function getBase64(file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
         setFileData({
            data: reader.result,
            language: singleTopicData?.foreignLanguage,
            name: file?.name,
         });
      };
      reader.onerror = function(error) {
         console.log("Error: ", error);
      };
   }

   const onSubmit = (e) => {
      e.preventDefault();
      if (unitID) {
         editUnitAsync(
            unitID,
            inputState,
            navigate,
            topicID,
            isTagsUpdated,
            fileData,
            singleUnitDataCopy?.voices[0]?.id
         );
      } else {
         createUnitAsync(topicID, inputState, navigate, fileData);
      }
   };

   const onCancell = (e) => {
      e.preventDefault();
      navigate(`/topics/${topicID}/units`);
   };

   // making api call to create a voice audio file
   const generateVoice = async () => {
      // setting url of generated voice audio state to null
      await setGeneratedVoiceAudio({
         isVoiceLoaded: false,
         url: null,
      });

      // getting voices params from inputs
      const voiceLang = selectedVoice.language.value;
      const gender = selectedVoice.gender.value;

      const nameOfVoice = setOfVoices[voiceLang][gender];
      const text = inputState.value;

      // if text is empty
      if (text.trim() === "") {
         alert(t("alerts.needs_text_to_generate_audio"));
         return;
      }

      // TODO: !!!move to config???? Keys should be in the backend!!!
      const subscriptionKey = keysConfig.Azure.AzureSubscriptionKey;
      const region = keysConfig.Azure.AzureRegion;

      const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
         subscriptionKey,
         region
      );
      // setting selected voice
      speechConfig.speechSynthesisVoiceName = nameOfVoice;

      // setting Azure"s player and configs
      const player = new SpeechSDK.SpeakerAudioDestination();
      const audioConfig = SpeechSDK.AudioConfig.fromSpeakerOutput(player);

      const synthesizer = new SpeechSDK.SpeechSynthesizer(
         speechConfig,
         audioConfig
      );

      // fires when the speech is synthesized
      const complete_cb = function(result) {
         const filename = `Generated_voice-${uuidv4()}.mpeg`;
         const file = new File([result.audioData], filename, {
            type: "audio/mpeg",
         });

         // creating audio tag to listen the audio
         const url = URL.createObjectURL(file);
         setGeneratedVoiceAudio({
            isVoiceLoaded: true,
            url: url,
         });

         if (
            result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted
         ) {
            player.pause();
         } else if (result.reason === SpeechSDK.ResultReason.Canceled) {
            alert(t("alerts.somethings_wrong_try_again"));
            console.error(
               "Error: synthesis failed. Error detail: " + result.errorDetails
            );
         }
         synthesizer.close();

         // uploading generated audio-file
         handleFiles([file]);
      };

      const err_cb = function(err) {
         console.error("Error: ", err);
         synthesizer.close();
      };

      synthesizer.speakTextAsync(text, complete_cb, err_cb);
   };

   return (
      <div className="add-edit-unit">
         <Modal
            handleModalClose={() => toggleAudioModal(false)}
            isOpen={isAudioModal}>
            <RecordAudioModal
               onCancell={() => toggleAudioModal(false)}
               unitID={unitID}
               topicID={topicID}
               language={singleTopicData?.foreignLanguage}
               prevVoiceID={singleUnitDataCopy?.voices[0]?.id}
            />
         </Modal>
         <GridContainer>
            <GridItem xs={12} sm={12} md={12} lg={12}>
               <BackArrow text={t("units.title")} />
               <h1>{t("units.new_unit")}</h1>
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={12}>
               <Form>
                  <GridItem xs={12} sm={12} md={6} lg={6}>
                     <TextArea
                        name="value"
                        value={inputState.value}
                        error={invalidMessages}
                        onChange={handleInputChange}
                        onInvalid={handleInvalidMessage}
                        label={t("languages.foreign")}
                        placeholder={t("units.placeholders.foreign")}
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
                        label={t("units.translation")}
                        placeholder={t("units.placeholders.native")}
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
                        label={t("units.extra")}
                        placeholder={t("units.placeholders.extra")}
                        minRows={2}
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
                        label={t("units.tags")}
                     />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3} lg={3}>
                     <Select
                        name="level"
                        label={t("units.level")}
                        options={levelsOptions}
                        defaultValue={levelDefaultValue}
                        onChange={(e) => onSelectChange(e, "level")}
                        placeholder={t("units.level")}
                     />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={3} lg={3}>
                     <Select
                        name="voiceUploadMode"
                        label={t("units.voice_sources.select")}
                        options={voiceUploadOptions}
                        defaultValue={voiceUploadOptions[0]}
                        onChange={(e) =>
                           setVoiceUploadMode({
                              mode: e,
                           })
                        }
                        placeholder={t("units.voice_sources.select")}
                     />
                  </GridItem>

                  {voiceUploadMode.mode &&
                     voiceUploadMode.mode.value === "uploadedAudio" && (
                        <GridItem xs={12} sm={12} md={6} lg={6}>
                           <span>{t("units.voice_sources.upload.label")}</span>
                           <DropZone
                              title={t("units.voice_sources.upload.title")}
                              handleFiles={handleFiles}
                              files={uploadedFiles}
                              buttonAction={() => toggleAudioModal(true)}
                           />
                        </GridItem>
                     )}

                  {voiceUploadMode.mode &&
                     voiceUploadMode.mode.value === "recordedAudio" && (
                        <GridItem xs={12} sm={12} md={2} lg={2}>
                           <span>{t("units.voice_sources.record.label")}</span>
                           <Button onClick={() => toggleAudioModal(true)}>
                              {t("units.voice_sources.record.button")}
                           </Button>
                        </GridItem>
                     )}

                  {voiceUploadMode.mode &&
                     voiceUploadMode.mode.value === "generatedVoice" && (
                        <React.Fragment>
                           <GridItem xs={12} sm={12} md={3} lg={3}>
                              <Select
                                 name="voiceLanguage"
                                 label={t("units.voice_sources.generate.language")}
                                 options={voiceLanguages}
                                 defaultValue={voiceLanguages[0]}
                                 onChange={(e) =>
                                    setSelectedVoice((prevState) => ({
                                       ...prevState,
                                       language: e,
                                    }))
                                 }
                                 placeholder={t("units.voice_sources.generate.language")}
                              />
                           </GridItem>

                           <GridItem xs={12} sm={12} md={3} lg={3}>
                              <Select
                                 name="voiceGender"
                                 label={t("units.voice_sources.generate.gender")}
                                 options={genders}
                                 defaultValue={genders[0]}
                                 onChange={(e) =>
                                    setSelectedVoice((prevState) => ({
                                       ...prevState,
                                       gender: e,
                                    }))
                                 }
                                 placeholder={t("units.voice_sources.generate.gender")}
                              />
                           </GridItem>

                           <GridItem xs={12} sm={12} md={2} lg={2}>
                              <Button onClick={generateVoice}>
                                 {t("units.voice_sources.generate.label")}
                              </Button>
                           </GridItem>

                           <GridItem xs={12} sm={12} md={3} lg={3}>
                              {generatedVoiceAudio.isVoiceLoaded ? (
                                 <Player
                                    url={generatedVoiceAudio.url}
                                    onClick={() => {}}
                                    className="volume-icon__block">
                                    <Button>
                                       {t("units.voice_sources.generate.play")}
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

export default connect(mapStateToProps, mapDispatchToProps)(AddEditUnitSubpage);
