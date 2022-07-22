import { capitalizeFirstOnlyCase } from "../../../../../utilities/helper-functions";
import { t } from "i18next";
import { v4 as uuidv4 } from "uuid";
import keysConfig from "../../../../../config/keys.config";
import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";

/**
 * Gets Azure supported language parameters
 * @returns 
 */
export const getAzureLanguageParams = () => {
  const genders = [
    { id: 0, label: t("genders.male"), value: "male" },
    { id: 1, label: t("genders.female"), value: "female" },
  ];   
  /** states for Azure Text-to-Speech service */ 
  const voices = {
    'de-DE': { male: "de-DE-Stefan",          female: "de-DE-HeddaRUS"      },
    'en-GB': { male: "en-GB-RyanNeural",      female: "en-GB-LibbyNeural"   },
    'en-US': { male: "en-US-GuyNeural",       female: "en-US-AriaNeural"    },
    'es-ES': { male: "es-ES-AlvaroNeural",    female: "es-ES-ElviraNeural"  },
    'fr-FR': { male: "fr-FR-HenriNeural",     female: "fr-FR-DeniseNeural"  },
    'ja-JP': { male: "ja-JP-KeitaNeural",     female: "ja-JP-NanamiNeural"  },
    'ko-KR': { male: "ko-KR-InJoonNeural",    female: "ko-KR-SunHiNeural"   },
    'ru-RU': { male: "ru-RU-DmitryNeural",    female: "ru-RU-DariyaNeural"  },
    'tr-TR': { male: "tr-TR-AhmetNeural",     female: "tr-TR-EmelNeural"    },
    'zh-CN': { male: "zh-CN-YunyangNeural",   female: "zh-CN-XiaoxiaoNeural"},
  };
  const languageName = new Intl.DisplayNames([navigator.language], { type: 'language' });
  
  /** Array of supported languages */
  const languages = Object.keys(voices).sort().map((value, id) => ({ id, value, label: capitalizeFirstOnlyCase(languageName.of(value)) }))

  return {genders, languages, voices}
}
 
/**
 * 
 * @param {String} voice 
 * @returns 
 */
const getAzureService = (voice) => {
  // setting Azure"s player and configs
  const player = new SpeechSDK.SpeakerAudioDestination();
  const audioConfig = SpeechSDK.AudioConfig.fromSpeakerOutput(player);

  // TODO: !!!move to config???? Keys should be in the backend!!!
  const { AzureSubscriptionKey: subscriptionKey, AzureRegion: region } = keysConfig.Azure;
  const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(subscriptionKey, region);
  // setting selected voice
  speechConfig.speechSynthesisVoiceName = voice

  const synthesizer = new SpeechSDK.SpeechSynthesizer(
      speechConfig,
      audioConfig
  )
  return { player, synthesizer }
}

/**
 * 
 * @param {{text:String,
 *    setAzureAudioStatus:React.Dispatch<React.SetStateAction<{isLoaded: boolean;url: null;}>>,  
 *    voice:String, 
 *    handleFiles:(files:Array<any>)=>void}} param0 
 * @returns 
 */
export const genAzureVoice = ({text, setAzureAudioStatus, voice, handleFiles}) => {
    // setting url of generated voice audio state to null
    setAzureAudioStatus({ isLoaded: false, url: null });

    // if text is empty
    if (text.trim() === "") {
       alert(t("alerts.needs_text_to_generate_audio"));
       return;
    }

    const { player, synthesizer } = getAzureService(voice)

    // fires when the speech is synthesized
    const complete_cb = function(result) {
       const filename = `Generated_voice-${uuidv4()}.mpeg`;
       const file = new File([result.audioData], filename, {
          type: "audio/mpeg",
       });

       // creating audio tag to listen the audio
       const url = URL.createObjectURL(file);
       setAzureAudioStatus({ isLoaded: true, url: url });

       if (result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted) {
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
