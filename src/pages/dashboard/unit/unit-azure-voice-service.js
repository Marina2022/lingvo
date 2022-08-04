import { capitalizeFirstOnlyCase } from "../../../utilities/helper-functions";
import { t } from "i18next";
import { v4 as uuidv4 } from "uuid";
import keysConfig from "../../../config/keys.config";
import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";
import { SpeechSynthesisOutputFormat } from "microsoft-cognitiveservices-speech-sdk";

/**
 * Gets Azure supported language parameters
 * @param {{value:String, label:String, intlName:String}} filter
 * @param filter.value BCLP 47 (https://www.unicode.org/reports/tr35/tr35.html#BCP_47_Conformance)
 * @param filter.label native language name 
 * @param filter.intlName international language name
 * @returns 
 */
const getAzureLanguageParams = (filter) => {
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
  /** Native language name provider */
  const nativeLangName = new Intl.DisplayNames(undefined, { type: 'language' });
  /** International (English) language name provider */
  const intlLangName = new Intl.DisplayNames(['en'], { type: 'language' });
  
  /** Array of supported languages */
  const languages = 
    Object.keys(voices)
      .map((value, id) => ({ id, value, label: capitalizeFirstOnlyCase(nativeLangName.of(value)), intlName: intlLangName.of(value) }))
      .filter(item => !filter ||
        (filter.value && (item.value.toLowerCase().includes(filter.value.toLowerCase()) || filter.value.toLowerCase().includes(item.value.toLowerCase()))) ||
        (filter.label && (item.label.toLowerCase().includes(filter.label.toLowerCase()) || filter.label.toLowerCase().includes(item.label.toLowerCase()))) ||
        (filter.intlName && (item.intlName.toLowerCase().includes(filter.intlName.toLowerCase()) || filter.intlName.toLowerCase().includes(item.intlName.toLowerCase())))
      )
      .sort((a,b) => a.label < b.label ? -1 : a.label > b.label ? 1 : 0)   
  
  if (languages.length === 0) {
    const lang = []
    filter.value && lang.push(filter.value)
    filter.label && lang.push(filter.label)
    filter.intlName && lang.push(filter.intlName)
    languages.push({id:0, value:'', label:`${t("languages.no_language")}: {${lang.join(',')}}`})
  }
  
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
  speechConfig.speechSynthesisOutputFormat = SpeechSynthesisOutputFormat.Audio16Khz128KBitRateMonoMp3

  const synthesizer = new SpeechSDK.SpeechSynthesizer(
      speechConfig,
      audioConfig
  )
  return { player, synthesizer }
}

/**
 * 
 * @param {{text:String,
 *    setStatus:React.Dispatch<React.SetStateAction<{isLoaded: boolean;url: null;}>>,  
 *    voice:String, 
 *    handleFiles:(files:Array<any>)=>void}} param0 
 * @returns 
 */
const genAzureVoice = ({text, voice, setStatus, handleFiles}) => {
  // setting url of generated voice audio state to null
  setStatus({ isLoaded: false, url: null });

  // if text is empty
  if (text.trim() === "") {
      alert(t("messages.alerts.needs_text_to_generate_audio"));
      return;
  }

  const { player, synthesizer } = getAzureService(voice)

  // fires when the speech is synthesized
  const complete_cb = function(result) {
      const filename = `Generated_voiceover-${uuidv4()}.mp3`;
      const file = new File([result.audioData], filename, {
        type: "audio/mpeg",
      });

      // creating audio tag to listen the audio
      const url = URL.createObjectURL(file);
      setStatus({ isLoaded: true, url: url });

      if (result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted) {
        player.pause();
      } else if (result.reason === SpeechSDK.ResultReason.Canceled) {
        alert(t("messages.alerts.somethings_wrong_try_again"));
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

const AzureVoiceService = {
  getAzureLanguageParams: getAzureLanguageParams,
  genAzureVoice: genAzureVoice
}

export default AzureVoiceService