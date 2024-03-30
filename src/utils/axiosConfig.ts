import axios from "axios";

import { StoreCookie, removeCookie, getDataCookie } from "@/utils/configCookie";

export function axiosConfig() {
  const { accessToken, refreshAccessToken } = getDataCookie();

  const instance = axios.create({
    // baseURL: process.env.HOST_EMPLOATTEND_SERVICE,
    baseURL: "http://localhost:5000/",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshToken = refreshAccessToken;
          if (!refreshToken) {
            throw new Error("No refresh token available");
          }
          const response = await axios.post(
            "http://localhost:5000/refersh-token",
            {
              refresh_token: refreshToken,
            }
          );
          const resultData = response.data;
          StoreCookie(resultData.data);
          originalRequest.headers.Authorization = `Bearer ${resultData.access_token}`;
          return instance(originalRequest);
        } catch (refreshError) {
          removeCookie();
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
}
