import axios from "axios";
import { noAuthList } from "./noAuthList";
import swalService from "../services/SwalService";
import authService from "../services/AuthService";
import storageService from "../services/StorageService";

const axiosClient = axios.create({
  baseURL: "https://localhost:7121", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  function (config) {
    const token = authService.getAccessToken();
    if (!noAuthList.includes(config.url) && token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    /// Logout if the token has expired
    if (error.response && error.response.status === 401) {
      if (authService.isLogin()) {
        storageService.clear();
        swalService.showMessageToHandle(
          "Session Expired",
          "Your session has expired. Please login again.",
          "error",
          () => authService.logout()
        );
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
