import axios from "axios";

const commonApi = {
   getLanguagesList: () => axios.get("languages"),
   getLevelsList: () => axios.get("levels"),
};

export default commonApi;
