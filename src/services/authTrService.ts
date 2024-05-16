import { loginRequestBody, registerRequestBody } from "@/types/authTrTypes";

import { axiosConfig } from "@/utils/axiosConfig";

const resolver = axiosConfig();

export function login(bodyRequest: loginRequestBody) {
  return resolver
    .post("/login", bodyRequest)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

export function register(bodyRequest: registerRequestBody) {
  return resolver
    .post("/register", bodyRequest)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}
