import axios from "axios";

const profileApi = {
   getCurrentUser: () => axios.get("users/current"),
   editAvatar: (params) => axios.post("avatars", { ...params }),
   // FIXME: In case user name, email, phone update backend returns error 500 "Could not commit JPA transaction; nested exception is javax.persistence.RollbackException: Error while committing the transaction"
   updateUserData: (params) => axios.put("users", { ...params }),
   updateLink: (params) => {
      // console.log(params);
      // FIXME: Backend error 500 while param.url == undefined|''
      return axios.put("users/link", null, { params: { ...params } });
   },
   getSubscribeLink: (params) => axios.get("subscribes/link", { ...params }),
   // FIXME: Backend does not create an application subscribe link while new user creating
   putSubscribeLink: () => axios.put("subscribes/link"),

   // removePrevAvatar: (params) => axios.delete("avatars", { ...params }),
};

export default profileApi;
