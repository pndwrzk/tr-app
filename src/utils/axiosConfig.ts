import axios from "axios";

import { StoreCookie, removeCookie, getDataCookie } from "@/utils/configCookie";

export function axiosConfig() {
  const { accessToken, refreshAccessToken } = getDataCookie();

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_HOST_TR_SERVICE,
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
            `${process.env.NEXT_PUBLIC_HOST_TR_SERVICE}refersh-token`,
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
