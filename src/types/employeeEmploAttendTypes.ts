export type employeeData = {
  email: string;
  name: string;
  phone_number: string;
  position: string;
};

export type bodyRequestChangePassword = {
  current_password: string;
  new_password: string;
};

export type updateEmployeeData = {
  email: string;
  name: string;
  phone_number: string;
  position: string;
  url_photo: any;
};

export type dataAttendanceType = {
  id: string;
  employee_id: string;
  date: string;
  time_in: string;
  time_out: string;
  status: number;
};
