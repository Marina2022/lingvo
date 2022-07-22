import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

//BASE COMPONENTS
import AudioRecorder from "../../../../../../components/audio-recorder/AudioRecorder.component";
import Input from "../../../../../../components/input/Input.component";
import Button from "../../../../../../components/button/Button.component";
//EFFECTS
import useInput from "../../../../../../effects/useInput.effect";
//ACTIONS
import { addVoiceAsync } from "../../../../../../redux/units/units.actions";
import { t } from "i18next";

const RecordAudioModal = (props) => {
   const {
      onCancell,
      unitID,
      topicID,
      prevVoiceID,
      singleTopicData,
      addVoiceAsync,
      voiceAddLoading,
   } = props;
   const navigate = useNavigate();

   const {
      inputState,
      handleInput,
      handleInvalidMessage,
      invalidMessages,
   } = useInput();

   const [fileData, setFileData] = useState({
      name: inputState?.recordName || "audio",
      data: "",
      language: singleTopicData?.foreignLanguage,
   });

   const handleInputChange = (event) => {
      handleInput(event);
   };

   const onVoiceAdd = (e) => {
      e.preventDefault();
      addVoiceAsync(unitID, topicID, fileData, navigate, prevVoiceID);
   };

   return (
      <div className="record-audio-modal">
         <h2>{t("exercises.exercise.voice_sources.record.label")}</h2>
         <div className="heading">
            If you are silent people don’t understand what you feel
         </div>
         <div className="audio-recorder-block">
            <AudioRecorder
               fileData={fileData}
               setFileData={setFileData}
               recordName={inputState.recordName}
               language={singleTopicData?.foreignLanguage}
            />
         </div>
         <Input
            name="recordName"
            value={inputState.recordName}
            error={invalidMessages}
            onChange={handleInputChange}
            onInvalid={handleInvalidMessage}
            label={t("exercises.exercise.voice_sources.record.file_name")}
            type="text"
         />
         <div className="buttons-block">
            <Button onClick={onVoiceAdd} isLoading={voiceAddLoading}>
               {t("actions.save")}
            </Button>
            <Button onClick={onCancell}>{t("actions.cancel")}</Button>
         </div>
      </div>
   );
};

const mapStateToProps = (state) => {
   const { topics, units } = state;
   return {
      singleTopicData: topics.singleTopicData,
      voiceAddLoading: units.voiceAddLoading,
   };
};

const mapDispatchToProps = (dispatch) => ({
   addVoiceAsync: (unitID, topicID, params, navigate, prevVoiceID) =>
      dispatch(addVoiceAsync(unitID, topicID, params, navigate, prevVoiceID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecordAudioModal);
