import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.36.12:3000", // Change to the real endpoint after deployed
});

api.interceptors.request.use(
  (config) => {
    console.log("Request sent to:", config.url);
    return config;
  },
  (error) => {
    console.log("Request error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (res) => {
    // console.log("Response accepted:", res.data);
    return res;
  },
  (error) => {
    console.error("Response error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
