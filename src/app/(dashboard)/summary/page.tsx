"use client";

import { useEffect, useState } from "react";
import { getMonthAttendance } from "@/services/attendanceEmploAttendService";
import { formatDate } from "@/utils/formatDate";
import { statusText } from "@/utils/setupStatusText";
import { dataAttendanceType } from "@/types/employeeEmploAttendTypes";

export default function Summary() {
  const [dataAttendance, setDataAttendance] = useState<dataAttendanceType[]>(
    []
  );

  const [filterStartDate, setFilterStartDate] = useState<string>("");
  const [filterEndDate, setFilterEndDate] = useState<string>("");
  const [valueStartDate, setValueStartDate] = useState<string>("");
  const [valueEndDate, setValueEndDate] = useState<string>("");
  const getAttendance = async () => {
    const result = await getMonthAttendance(valueStartDate, valueEndDate);
    const resultStatus = result.status;
    const resultData = result.data;

    if (resultStatus !== 200) {
    } else {
      setDataAttendance(resultData.data);
    }
  };

  useEffect(() => {
    getAttendance();
  }, [valueStartDate, valueEndDate]);

  const submitFilter = () => {
    setValueStartDate(filterStartDate);
    setValueEndDate(filterEndDate);
  };

  return (
    <>
      <div className="text-center mb-[70px] mt-[50px]">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Your Attendance Summary
        </h2>
        {/* <p className="mt-4 text-lg leading-8 text-gray-600">
          Our platform is trusted by organizations worldwide to boost
          productivity, streamline operations, and enhance customer experiences.
        </p> */}
      </div>

      <div className="flex flex-col lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-5 px-[30px] ml-[18px]">
        <div className="w-full lg:w-[30%] ">
          <label className="mb-2 text-black font-bold">Start Date</label>
          <input
            type="date"
            className="mt-2 p-2 w-full border-2 rounded-lg text-black"
            onChange={(e) => setFilterStartDate(e.target.value)}
          ></input>
        </div>
        <div className="w-full lg:w-[30%] ">
          <label className="mb-2 text-black font-bold">End Date</label>
          <input
            type="date"
            className="mt-2 p-2 w-full border-2 rounded-lg text-black"
            onChange={(e) => setFilterEndDate(e.target.value)}
          ></input>
        </div>
        <div className="w-full lg:w-[30%] flex items-end ">
          <button
            onClick={submitFilter}
            className="bg-blue-500 hover:bg-blue-700  text-white font-bold py-3 px-[70px] rounded"
          >
            Filter
          </button>
        </div>
      </div>
      <div className="shadow-lg rounded-lg overflow-hidden m-5 md:mx-10 ">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-gray-100">
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                Date
              </th>
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
            {dataAttendance?.map((row, index) => {
              return (
                <tr key={index}>
                  <td className="py-4 px-6 border-b border-gray-200">
                    {formatDate(row.date)}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200 ">
                    {row.time_in}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    {row.time_out}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    {statusText[row?.status]}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
