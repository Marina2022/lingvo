import axios from "axios";

const unitsApi = {
   deleteUnit: (id) => axios.delete(`samples/${id}`),
   getSingleUnit: (unitID) => axios.get(`samples/${unitID}`),
   createUnit: (topicID, params) =>
      axios.post(`samples/post/${topicID}`, { ...params }),
   editUnit: (unitID, params) => axios.put(`samples/${unitID}`, { ...params }),
   addVoice: (unitID, params) =>
      axios.post(`voices/sample/${unitID}`, { ...params }),
   deleteVoice: (voiceID) => axios.delete(`voices/${voiceID}`),
};

export default unitsApi;
