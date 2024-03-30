"use client";
import CustomWebcam from "@/components/customWebcam";
import Clock from "react-live-clock";
import { useEffect, useState } from "react";
import {
  getAttendanceToday,
  submitAttendanceToday,
} from "@/services/attendanceEmploAttendService";
import { statusText } from "@/utils/setupStatusText";
import { AlertInfo } from "@/types/globalTypes";
import Alert from "@/components/alert";

export default function Attendance() {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [modelAlert, setModelAlert] = useState<AlertInfo>({
    message: "",
    isSuccess: false,
  });
  const [timeIn, setTimeIn] = useState<string | null>(null);
  const [timeOut, setTimeOut] = useState<string | null>(null);
  const [status, setStatus] = useState<number>(0);
  const getAttendance = async () => {
    const result = await getAttendanceToday();
    const resultStatus = result.status;
    const resultData = result.data;

    if (resultStatus !== 200) {
    } else {
      setTimeOut(resultData.data.time_out);
      setTimeIn(resultData.data.time_in);
      setStatus(resultData.data.status);
    }
  };

  useEffect(() => {
    getAttendance();
  }, []);

  const onSubmitAttendance = async (type: string) => {
    const result = await submitAttendanceToday(type);
    const resultStatus = result.status;
    const resultData = result.data;

    if (resultStatus !== 200) {
      setModelAlert({
        message: resultData.message,
        isSuccess: false,
      });
    } else {
      await getAttendance();
      setModelAlert({
        message: resultData.message,
        isSuccess: true,
      });
    }
    setShowAlert(true);
  };

  return (
    <div>
      {showAlert && (
        <Alert isSuccess={modelAlert.isSuccess} message={modelAlert.message} />
      )}
      <div className="flex flex-col items-center m-5 ">
        <Clock
          format={"h:mm:ssa"}
          style={{ fontSize: "1.5em", color: "black", marginBottom: "20px" }}
          ticking={true}
        />
      </div>
      <div className="shadow-lg rounded-lg overflow-hidden m-5 mx-[10%]">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-gray-100">
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                Time In
              </th>
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                Time Out
              </th>
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white text-black">
            <tr>
              <td className="py-4 px-6 border-b border-gray-200">
                {timeIn ? timeIn : "-"}
              </td>
              <td className="py-4 px-6 border-b border-gray-200 ">
                {timeOut ? timeOut : "-"}
              </td>

              <td className="py-4 px-6 border-b border-gray-200">
                <span className=" text-black py-1 px-2 rounded-full ">
                  {statusText[status]}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex flex-col items-center mt-[100px] ">
        {!timeIn && !timeOut && (
          <button
            onClick={() => onSubmitAttendance("timein")}
            className="bg-[#0060AC] hover:bg-blue-700 rounded-full w-48 h-30  text-white font-semibold"
          >
            <div className="flex gap-3 justify-center items-center">
              <span></span>

              <span className="text-l py-[25px] px-[10px]">
                GET TIME FOR IN
              </span>
            </div>
          </button>
        )}
        {timeIn && !timeOut && (
          <button
            onClick={() => onSubmitAttendance("timeout")}
            className="bg-[#E5001C] hover:bg-red-700 rounded-full w-48 h-30 mt-20  text-white font-semibold"
          >
            <div className="flex gap-3 justify-center items-center">
              <span></span>

              <span className="text-l py-[25px] px-[10px]">
                GET TIME FOR OUT
              </span>
            </div>
          </button>
        )}
      </div>

      {/* <CustomWebcam /> */}
    </div>
  );
}
