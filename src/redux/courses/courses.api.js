import axios from "axios";

const coursesApi = {
    getCourses: () => axios.get("courses"),
    createCourse: (params) => axios.post("courses", {...params})
}
export default coursesApi;