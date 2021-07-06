import axios from "axios";

const authApi = {
   login: (email, password) =>
      axios.post("auth/login", {
         email,
         password,
      }),
   logout: () => axios.delete("auth/logout"),
   register: (params) => axios.post("auth/register", params),
   resetPassword: (params) =>
      axios.post("auth/reset/password", null, { params: { ...params } }),
   setPassword: (params) =>
      axios.put("auth/set/password", null, { params: { ...params } }),
};

export default authApi;
