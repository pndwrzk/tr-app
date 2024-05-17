"use client";

import Link from "next/link";
import {
  getAllCustomer,
  deleteCustomer,
  deleteCustomerBulk,
} from "@/services/customerTrService";
import { useEffect, useState, ChangeEvent } from "react";
import { customerData } from "@/types/customerTrTypes";
import Loading from "@/components/loading";

export default function Dashboard() {
  const [customers, setCustomers] = useState<customerData[]>([]);
  const [idBulk, setIdBulk] = useState<number[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loadingBulk, setLoadingBulk] = useState<boolean>(false);

  const fetchAllCustomer = async () => {
    const respone = await getAllCustomer();
    setCustomers(respone?.data.data);
  };

  const handleCheckUnCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const arrayId: number[] = [];
    const checked = e.target.checked;
    if (checked) {
      customers?.forEach((customer, idx) => {
        arrayId[idx] = customer.id;
      });
    }
    setIdBulk(arrayId);
  };

  const checkCustomer = (e: ChangeEvent<HTMLInputElement>) => {
    let newArray: number[] = [];
    const checked = e.target.checked;
    const value = parseInt(e.target.value);
    if (!checked) {
      newArray = idBulk?.filter((item) => item !== value);
    } else {
      newArray = [...idBulk, value];
    }
    setIdBulk(newArray);
  };

  const handleDelete = async (id: number) => {
    const result = await deleteCustomer(id);
    const resultStatus = result.status;
    const resultData = result.data;
    if (resultStatus !== 200) {
      setErrorMessage(resultData.message);
    } else {
      fetchAllCustomer();
    }
  };

  const handleBulkDelete = async () => {
    setLoadingBulk(true);
    const result = await deleteCustomerBulk(idBulk);
    const resultStatus = result.status;
    const resultData = result.data;
    if (resultStatus !== 200) {
      setErrorMessage(resultData.message);
    } else {
      fetchAllCustomer();
      setIdBulk([]);
    }
    setLoadingBulk(false);
  };

  useEffect(() => {
    fetchAllCustomer();
  }, []);
  return (
    <>
      <div className="text-gray-700 body-font">
        <div className="px-5 pt-[30px] ">
          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <div>{/*  */}</div>
              <div className="flex flex-row justify-between gap-2">
                {idBulk?.length > 0 && (
                  <button
                    onClick={handleBulkDelete}
                    className="text-black text-sm bg-white  border border-gray-500  rounded font-medium px-4 py-2 inline-flex space-x-1 items-center"
                  >
                    {loadingBulk ? (
                      <Loading />
                    ) : (
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </span>
                    )}

                    <span className="hidden md:inline-block">Delete</span>
                  </button>
                )}
                <Link href="/form/new">
                  <button className="px-6 py-2  w-[200px] text-center text-black border border-gray-500 rounded   focus:outline-none focus:ring">
                    Add Customer
                  </button>
                </Link>
              </div>
            </div>

            {errorMessage && (
              <div
                className="flex  justify-between bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-3 rounded mb-3  "
                role="alert"
              >
                <span className="block sm:inline ">{errorMessage}</span>
                <span className="inline" onClick={() => setErrorMessage("")}>
                  <svg
                    className="fill-current h-6 w-6"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                  </svg>
                </span>
              </div>
            )}

            <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5 border  mt-4">
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full">
                    <thead className="bg-white border-b">
                      <tr>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          {customers?.length > 0 && (
                            <input
                              onChange={handleCheckUnCheck}
                              type="checkbox"
                              className="h-[20px] w-[20px] rounded border-gray-300 text-teal-600 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400"
                            />
                          )}
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          No KTP
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Nama Lengkap
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Jenis Kelamin
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          No Hp
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers?.map((customer, idx) => (
                        <tr
                          key={idx}
                          className={`${
                            idx % 2 === 0 ? "bg-white" : "bg-gray-100"
                          }`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 ">
                            <input
                              checked={idBulk?.includes(customer.id)}
                              type="checkbox"
                              value={customer.id}
                              onChange={checkCustomer}
                              className="h-[20px] w-[20px] rounded border-gray-300 text-teal-600 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400"
                            />
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {customer.identity_card}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {customer.full_name}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {customer.gender}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {customer.phone_number}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {customer.email}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <div className="inline-flex items-center rounded-md shadow-sm">
                              <Link
                                href={`/form/${customer.id}`}
                                className="text-black text-sm bg-white  border-gray-500 border rounded-l font-medium px-4 py-2 inline-flex space-x-1 items-center"
                              >
                                <span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                    />
                                  </svg>
                                </span>
                                <span className="hidden md:inline-block">
                                  Edit
                                </span>
                              </Link>

                              <button
                                onClick={() => handleDelete(customer.id)}
                                className="text-black text-sm bg-white  border-gray-500 border rounded-r font-medium px-4 py-2 inline-flex space-x-1 items-center"
                              >
                                <span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                  </svg>
                                </span>
                                <span className="hidden md:inline-block">
                                  Delete
                                </span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
