import axios from "axios";
import { getSupportedLanguages } from "../../utilities/supported-languages";

// TODO: Divide the language list to foreign and native lists. The foreign list includes translation provider supported languages.

const commonApi = {
   getLanguagesList: () => axios.get("languages"),
   getNativeLanguageList: () => getSupportedLanguages(),
   getLevelsList: () => axios.get("levels"),
};

export default commonApi;
