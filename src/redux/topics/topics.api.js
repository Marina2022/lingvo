import axios from "axios";

const topicsApi = {
   getTopics: () => axios.get("posts"),
   createTopic: (params) => axios.post("posts", { ...params }),
   deleteTopic: (id) => axios.delete(`posts/${id}`),
   getSingleTopics: (id) => axios.get(`posts/${id}`),
   editTopic: (id, params) => axios.put(`posts/${id}`, { ...params }),
   publishTopic: (topicID) => axios.put(`posts/${topicID}/publish`),
};

export default topicsApi;
