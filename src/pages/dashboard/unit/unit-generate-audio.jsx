import React, { useState } from "react";
import AzureVoiceService from "./unit-azure-voice-service";
import GraphicEqOutlinedIcon from '@mui/icons-material/GraphicEqOutlined';
import { Grid } from "@mui/material";
import Select from "../../../components/select/Select.component";
import Button from "../../../components/button/Button.component";
import { t } from "i18next";
import { PlayerEmbedControls } from "../units/player";



const GenerateAudio = ({ 
  text, 
  handleFiles, 
  language: { 
    code: langCode, 
    name: intlName, 
    value: nativeName 
  } 
}) => {

  const { genAzureVoice, getAzureLanguageParams } = AzureVoiceService;

  const { genders, languages: supportedLanguages, voices: supportedVoices} = getAzureLanguageParams({value:langCode, label:nativeName, intlName:intlName})
  
  const [azureAudioStatus, setAzureAudioStatus] = useState({ isLoaded: false, url: null });
  const [selectedVoice, setSelectedVoice] = useState({ language: supportedLanguages[0], gender: genders[0] });

  // making api call to create a voice audio file
  const generateVoice = () => {
     genAzureVoice({
        text, 
        setStatus: setAzureAudioStatus,
        voice: supportedVoices[selectedVoice.language.value][selectedVoice.gender.value],
        handleFiles
     })
  };

  const [defLang] = useState(supportedLanguages[0])
  const [defGender] = useState(genders[0])

  return (
     <>
        <Grid container spacing={2} item xs={12} justifyContent="space-around">
           
           <Grid item xs={6} sm={5} md={4} lg={3}>
              <Select
                 name="voiceLanguage"
                 select= {{
                    label: t("tasks.task.voice_sources.generate.language"),
                    options: supportedLanguages,
                    defaultValue: defLang,
                    onChange: ({target}) => setSelectedVoice(prevState => ({
                       ...prevState,
                       language: target,
                    })),
                    placeholder: t("tasks.task.voice_sources.generate.language")
                 }}
              />
           </Grid>

           <Grid item xs={6} sm={5} md={4} lg={3}>
              <Select
                 name="voiceGender"
                 select= {{
                    label: t("tasks.task.voice_sources.generate.gender"),
                    options: genders,
                    defaultValue: defGender,
                    onChange: ({target}) => setSelectedVoice(prevState => ({
                       ...prevState,
                       gender: target,
                    })),
                    placeholder: t("tasks.task.voice_sources.generate.gender")
                 }}
              />
           </Grid>


        </Grid>
        <Grid item xs={12} container spacing={2} direction="row" justifyContent="center">
           <Grid item xs={12} sm={10} md={6} lg={4}  container justifyContent="center">
              <Button variant="contained" color="secondary" onClick={generateVoice}
               src={<GraphicEqOutlinedIcon />}
              >
                 {t("tasks.task.voice_sources.generate.button")}
              </Button>
           </Grid>

           <Grid item xs={12} container justifyContent="center">
              <PlayerEmbedControls source={azureAudioStatus.isLoaded ? azureAudioStatus: {}} />
           </Grid>
        </Grid>
     </>
  )
}

export default GenerateAudio