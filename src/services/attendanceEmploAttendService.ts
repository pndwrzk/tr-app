import { axiosConfig } from "@/utils/axiosConfig";

const resolver = axiosConfig();

export function getAttendanceToday() {
  return resolver
    .get("/api/attendance/today")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

export function getMonthAttendance(
  valueStartDate: string,
  valueEndDate: string
) {
  let api = "/api/attendance";
  if (valueStartDate != "" && valueEndDate != "") {
    api = api + `?start_date=${valueStartDate}&end_date=${valueEndDate}`;
  }

  return resolver
    .get(api)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

export function submitAttendanceToday(type: string) {
  return resolver
    .post(`/api/attendance/${type}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}
