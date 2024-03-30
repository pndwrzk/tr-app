import { axiosConfig } from "@/utils/axiosConfig";
import {
  employeeData,
  bodyRequestChangePassword,
  updateEmployeeData,
} from "@/types/employeeEmploAttendTypes";

const resolver = axiosConfig();

export function getProfile() {
  return resolver
    .get("/api/employee")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

export function updateProfile(bodyRequest: FormData) {
  return resolver
    .put("/api/employee/update", bodyRequest)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

export function updatePassword(bodyRequest: bodyRequestChangePassword) {
  return resolver
    .put("/api/employee/password/update", bodyRequest)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}
