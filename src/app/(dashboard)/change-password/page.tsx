"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { updatePassword } from "@/services/employeeEmploAttendService";
import { AlertInfo } from "@/types/globalTypes";
import Alert from "@/components/alert";

type formValues = {
  current_password: string;
  new_password: string;
};
export default function ChangePassword() {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [modelAlert, setModelAlert] = useState<AlertInfo>({
    message: "",
    isSuccess: false,
  });
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm<formValues>({
    mode: "all",
  });

  const onSubmit = async (formValues: formValues) => {
    const body = {
      current_password: formValues.current_password,
      new_password: formValues.new_password,
    };
    const result = await updatePassword(body);
    const resultStatus = result.status;
    const resultData = result.data;
    if (resultStatus !== 200) {
      setModelAlert({
        message: resultData.message,
        isSuccess: false,
      });
    } else {
      setModelAlert({
        message: resultData.message,
        isSuccess: true,
      });
    }
    setShowAlert(true);
    reset();
  };

  return (
    <div className="mt-[100px] flex items-center justify-center">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
        <h1 className="text-center text-2xl font-bold mb-6 text-black">
          Change Password
        </h1>
        {showAlert && (
          <Alert
            isSuccess={modelAlert.isSuccess}
            message={modelAlert.message}
          />
        )}
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Current Passowrd
            </label>
            <input
              {...register("current_password", {
                required: {
                  value: true,
                  message: "This field cannot be empty",
                },
              })}
              type="password"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <span className="text-red-500 text-sm">
              {errors.current_password?.message}
            </span>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              New Password
            </label>
            <input
              {...register("new_password", {
                required: {
                  value: true,
                  message: "This field cannot be empty",
                },
              })}
              type="password"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <span className="text-red-500 text-sm">
              {errors.new_password?.message}
            </span>
          </div>

          <button
            className="bg-[#0060AC] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            onClick={handleSubmit(onSubmit)}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
