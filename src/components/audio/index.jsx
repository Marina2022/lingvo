import { t } from "i18next";
import React from "react";
import GenerateAudio from "./generator";
import RecordAudio from "./recorder"
import UploadAudio from "./uploader";


/**
 * ### Voice-over provider options
 * 
 * `value` voice-over provider type
 * * `uploadedAudio` - to upload audio file
 * * `recordedAudio` - to record alive voice-over
 * * `generatedVoice` - to generate voice-over using voice generator provider
 * 
 * `label` used for UI rendering
 * `html` function providing JSX.Element
 *
 */
 const voiceOverProviderOptions = [
  { value: "uploadedAudio" , getLabel: () => t("tasks.task.voice_sources.upload.label")  , html: ({handleFiles, uploadedFiles}) => {
     return <UploadAudio handleFiles={handleFiles} files={uploadedFiles} />
  }},
  { value: "recordedAudio" , getLabel: () => t("tasks.task.voice_sources.record.label")  , html: ({text, languageName, handleFiles}) => {
     return <RecordAudio text={text} handleFiles={handleFiles} language={{name: languageName}} />
  }},
  { value: "generatedVoice", disabled: true, getLabel: () => t("tasks.task.voice_sources.generate.label"), html: ({text, languageName, handleFiles}) => {
     return <GenerateAudio text={text} handleFiles={handleFiles} language={{name: languageName}} />
  }},
]

export default voiceOverProviderOptions