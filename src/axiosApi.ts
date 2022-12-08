import axios from "axios";

const axiosApi = axios.create({
  baseURL: 'https://dima-388e2-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default axiosApi;