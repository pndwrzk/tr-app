import axios from "axios";
import { loginRequestBody } from "@/types/authEmploAttendTypes";

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
