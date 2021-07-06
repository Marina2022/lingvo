import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

//IMPORT MODULES 
//AZURE MICROSOFT SDK
import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";
//GENERATING UNIQUE IDS
import { v4 as uuidv4 } from 'uuid';
//CONFIG WITH AZURE CREDENTIALS
import keysConfig from 'config/keys.config';

//BASE COMPONENTS
import GridContainer from "components/grid-container/GridContainer.component";
import GridItem from "components/grid-item/GridItem.component";
import BackArrow from "components/back-arrow/BackArrow.component";
import Form from "components/form/Form.component";
import TextArea from "components/text-area/TextArea.component";
import TagsInput from "components/tags-input/TagsInput.component";
import Button from "components/button/Button.component";
import Select from "components/select/Select.component";
import DropZone from "components/drop-zone/DropZone.component";
import Modal from "components/modal/Modal.component";
import Player from 'components/units-list-card/Player.component';
//EFFECTS
import useInput from "effects/useInput.effect";
//ACTIONS
import { getLevelsListAsync } from "redux/common/common.actions";
import { getSingleTopicAsync } from "redux/topics/topics.actions";
import {
   getSingleUnitAsync,
   createUnitAsync,
   editUnitAsync,
} from "redux/units/units.actions";
//SERVICES
import AddEditUnitServices from "./add-edit-unit.services";
//UTILITIES
import { checkForEmptyProperties } from "utilities/helper-functions";

import RecordAudioModal from "./components/RecordAudioModal.component";

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
   const history = useHistory();

   const [isTagsUpdated, changeIsTagsUpdated] = useState(false);
   const [fileData, setFileData] = useState({});
   const [isAudioModal, toggleAudioModal] = useState(false);

   // states for Azure Text-to-Speech service
   const setOfVoices = {
      en_britain: {
         male: 'en-GB-RyanNeural',
         female: 'en-GB-LibbyNeural'
      },
      en_usa: {
         male: 'en-US-GuyNeural',
         female: 'en-US-AriaNeural'
      },
      ru: {
         male: 'ru-RU-DmitryNeural',
         female: 'ru-RU-DariyaNeural'
      },
      de: {
         male: 'de-DE-Stefan',
         female: 'de-DE-HeddaRUS'
      },
      fr: {
         male: 'fr-FR-HenriNeural',
         female: 'fr-FR-DeniseNeural'
      },
      es: {
         male: 'es-ES-AlvaroNeural',
         female: 'es-ES-ElviraNeural'
      },
      zh: {
         male: 'zh-CN-YunyangNeural',
         female: 'zh-CN-XiaoxiaoNeural'
      },
      ja: {
         male: 'ja-JP-KeitaNeural',
         female: 'ja-JP-NanamiNeural'
      },
      ko: {
         male: 'ko-KR-InJoonNeural',
         female: 'ko-KR-SunHiNeural'
      },
      tr: {
         male: 'tr-TR-AhmetNeural',
         female: 'tr-TR-EmelNeural'
      }
   };
   const genders = [
      { id: 0, label: 'Мужской', value: 'male' },
      { id: 1, label: 'Женский', value: 'female' }
   ];
   const voiceLanguages = [
      {id: 0, label: "Британский Английский", value: "en_britain" },
      {id: 1, label: "Американский Английский", value: "en_usa" },
      {id: 2, label: "Русский", value: "ru" },
      {id: 3, label: "Немецкий", value: "de" },
      {id: 4, label: "Французский", value: "fr" },
      {id: 5, label: "Испанский", value: "es" },
      {id: 6, label: "Китайский", value: "zh" },
      {id: 7, label: "Японский", value: "ja" },
      {id: 8, label: "Корейский", value: "ko" },
      {id: 9, label: "Турецкий", value: "tr" }
   ];

   // values are equal to voiceUploadMode's fields
   const voiceUploadOptions = [
      { id: 0, label: "Не выбрано", value: "" },
      { id: 2, label: "Загрузить файл", value: "uploadedAudio" },
      { id: 1, label: "Записать аудио", value: "recordedAudio" },
      { id: 3, label: "Озвучить текст", value: "generatedVoice" }
   ];

   // states
   const [selectedVoice, setSelectedVoice] = useState({
      language: voiceLanguages[0],
      gender: genders[0]
   });
   // true - if the generated voice is created, otherwise - false
   const [generatedVoiceAudio, setGeneratedVoiceAudio] = useState({
      isVoiceLoaded: false,
      url: null
   });

   // defines which type of voice uploading is being used: Azure generated voice, uploaded file, recorded audio
   const [voiceUploadMode, setVoiceUploadMode] = useState({
      mode: null
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
      //eslint-disable-next-line
   }, [])

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
            history,
            topicID,
            isTagsUpdated,
            fileData,
            singleUnitDataCopy?.voices[0]?.id
         );
      } else {
         createUnitAsync(topicID, inputState, history, fileData);
      }
   };

   const onCancell = (e) => {
      e.preventDefault();
      history.push(`/topics/${topicID}/units`);
   };


   // making api call to create a voice audio file
   const generateVoice = async () => {
      // setting url of generated voice audio state to null
      await setGeneratedVoiceAudio({
         isVoiceLoaded: false,
         url: null
      });

      // getting voices params from inputs
      const voiceLang   = selectedVoice.language.value;
      const gender      = selectedVoice.gender.value;
      
      const nameOfVoice = setOfVoices[voiceLang][gender];
      const text        = inputState.value;

      // if text is empty
      if(text.trim() === '') {
         alert('Чтобы сгенерировать запись, необходимо ввести текст');
         return;
      }

      // !!!перенести в config!!!!
      const subscriptionKey = keysConfig.Azure.AzureSubscriptionKey;
      const region          = keysConfig.Azure.AzureRegion;

      const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(subscriptionKey, region);
      // setting selected voice
      speechConfig.speechSynthesisVoiceName = nameOfVoice;

      // setting Azure's player and configs
      const player = new SpeechSDK.SpeakerAudioDestination();
      const audioConfig  = SpeechSDK.AudioConfig.fromSpeakerOutput(player);

      const synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig, audioConfig);
      
      // fires when the speech is synthesized 
      const complete_cb = function (result) {
         const filename = `Generated_voice-${uuidv4()}.mpeg`;
         const file = new File([result.audioData], filename, { type: 'audio/mpeg' });

         // creating audio tag to listen the audio
         const url = URL.createObjectURL(file);
         setGeneratedVoiceAudio({
            isVoiceLoaded: true,
            url: url
         });

         if (result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted) {
            player.pause();
         } else if (result.reason === SpeechSDK.ResultReason.Canceled) {
            alert('Что-то пошло не так... Попробуйте еще раз!');
            console.error("Error: synthesis failed. Error detail: " + result.errorDetails);
         }
         synthesizer.close();

         // uploading generated audio-file
         handleFiles([file]);
      };
         
      const err_cb = function (err) {
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
               <BackArrow text="Юниты" />
               <h1>Новый юнит</h1>
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
                        label="Изучаемый язык"
                        placeholder="If you are silent people don’t understand what you feel"
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
                        label="Перевод на родной или объяснения на изучаемом языке"
                        placeholder="Если вы молчите, люди не понимают, что вы чувствуете"
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
                        label="Дополнительные пояснения"
                        placeholder="Это предложение очень важно для меня"
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
                        label="Теги"
                     />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3} lg={3}>
                     <Select
                        name="level"
                        label="Сложность"
                        options={levelsOptions}
                        defaultValue={levelDefaultValue}
                        onChange={(e) => onSelectChange(e, "level")}
                        placeholder="Сложность"
                     />
                  </GridItem>


                  <GridItem xs={12} sm={12} md={3} lg={3}>
                     <Select
                        name="voiceUploadMode"
                        label="Выберите способ загрузки аудио:"
                        options={voiceUploadOptions}
                        defaultValue={voiceUploadOptions[0]}
                        onChange={(e) => setVoiceUploadMode({
                           mode: e
                        })}
                        placeholder="Выберите способ загрузки аудио"
                     />
                  </GridItem>
                  
                  {
                     (voiceUploadMode.mode && voiceUploadMode.mode.value === "uploadedAudio") &&
                     <GridItem xs={12} sm={12} md={6} lg={6}>
                        <span>Добавьте готовый файл:</span>
                        <DropZone
                           title="Нажмите на данное окно или перенесите аудиофайл сюда"
                           handleFiles={handleFiles}
                           files={uploadedFiles}
                           buttonAction={() => toggleAudioModal(true)}
                        />
                     </GridItem>
                  }


                  {
                     (voiceUploadMode.mode && voiceUploadMode.mode.value === "recordedAudio") && 
                     <GridItem xs={12} sm={12} md={2} lg={2}>
                        <span>Записать аудио: </span>
                        <Button
                        onClick={() => toggleAudioModal(true)}>
                           Сделать запись
                        </Button>
                     </GridItem>
                  }

                  {
                     (voiceUploadMode.mode && voiceUploadMode.mode.value === "generatedVoice") && 
                     <React.Fragment>
                        <GridItem xs={12} sm={12} md={3} lg={3}>
                           <Select
                              name="voiceLanguage"
                              label="Настройки голоса автоматического воспроизведения"
                              options={voiceLanguages}
                              defaultValue={voiceLanguages[0]}
                              onChange={(e) => setSelectedVoice(prevState => ({
                                 ...prevState,
                                 language: e
                              }))}
                              placeholder="Настройки голоса автоматического воспроизведения"
                           />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={3} lg={3}>
                           <Select
                              name="voiceGender"
                              label="Выбор пола"
                              options={genders}
                              defaultValue={genders[0]}
                              onChange={(e) => setSelectedVoice(prevState => ({
                                 ...prevState,
                                 gender: e
                              }))}
                              placeholder="Выбор пола"
                           />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={2} lg={2}>
                           <Button 
                              onClick={generateVoice} >
                              Сгенерировать голос
                           </Button>
                        </GridItem>

                        <GridItem xs={12} sm={12} md={3} lg={3}>
                           { 
                              generatedVoiceAudio.isVoiceLoaded ?
                                 <Player
                                 url={generatedVoiceAudio.url}
                                 onClick={() => {}}
                                 className="volume-icon__block"
                                 >
                                    <Button>
                                       Проиграть сгенерированную речь
                                    </Button>
                                 </Player>
                              : null
                           }
                        </GridItem>
                     </React.Fragment>
                  }


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
                           Сохранить
                        </Button>
                     </GridItem>
                     <GridItem xs={12} sm={12} md={2} lg={2}>
                        <Button onClick={onCancell} className="cancel-button">
                           Отмена
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
   createUnitAsync: (topicID, params, history, voiceParams, prevVoiceID) =>
      dispatch(
         createUnitAsync(topicID, params, history, voiceParams, prevVoiceID)
      ),
   editUnitAsync: (
      unitID,
      formParams,
      history,
      topicID,
      isTagsUpdated,
      voiceParams,
      prevVoiceID
   ) =>
      dispatch(
         editUnitAsync(
            unitID,
            formParams,
            history,
            topicID,
            isTagsUpdated,
            voiceParams,
            prevVoiceID
         )
      ),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEditUnitSubpage);