import axios from "axios";

const axiosObject = axios.create({
  baseURL: "https://react-burger-app-1b7ef.firebaseio.com/"
});

export default axiosObject;
