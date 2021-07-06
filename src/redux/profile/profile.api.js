import axios from "axios";

const profileApi = {
   getCurrentUser: () => axios.get("users/current"),
   editAvatar: (params) => axios.post("avatars", { ...params }),
   updateUserData: (params) => axios.put("users", { ...params }),
   updateLink: (params) => {
      console.log(params);
      return axios.put("users/link", null, { params: { ...params } });
   },
   subscribeLink: (params) => axios.put("subscribes/link", { ...params }),

   // removePrevAvatar: (params) => axios.delete("avatars", { ...params }),
};

export default profileApi;
