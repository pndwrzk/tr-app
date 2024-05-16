"use client";

import React, { useState, useEffect, useRef } from "react";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { bodyFormcustomer } from "@/types/customerTrTypes";
import {
  addCustomer,
  getCustomerById,
  updateCustomerById,
} from "@/services/customerTrService";
import { useRouter } from "next/navigation";

import Loading from "@/components/loading";

export default function Form({ params }: any) {
  const router = useRouter();
  const { id } = params;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCreate, setIsCreate] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
  } = useForm<bodyFormcustomer>({ mode: "onSubmit" });

  const Submit = async (value: bodyFormcustomer) => {
    setIsLoading(true);
    let result;

    if (isCreate) {
      result = await addCustomer(value);
    } else {
      result = await updateCustomerById(Number(id), value);
    }

    const resultStatus = result.status;
    const resultData = result.data;
    if (resultStatus !== 200) {
      setErrorMessage(resultData.message);
    } else {
      router.push("/");
    }
    setIsLoading(false);
  };

  const fetchCustomer = async () => {
    const result = await getCustomerById(Number(id));
    const data = result.data.data;
    setValue("email", data.email);
    setValue("identity_card", data.identity_card);
    setValue("gender", data.gender);
    setValue("full_name", data.full_name);
    setValue("phone_number", data.phone_number);
  };

  useEffect(() => {
    if (!isNaN(id)) {
      fetchCustomer();
      setIsCreate(false);
    } else if (isNaN(id) && id !== "new") {
      router.push("/");
    }
  }, [id]);

  return (
    <div className="p-10 text-black">
      <h1 className="mb-8 font-extrabold text-4xl">
        {isCreate ? "Add" : "Update"} Customer
      </h1>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <form>
          <div>
            <label className="block">No KTP</label>
            <input
              {...register("identity_card", {
                required: {
                  value: true,
                  message: "This field cannot be empty",
                },
                minLength: {
                  value: 16,
                  message: "Must be exactly 16 digits",
                },
                maxLength: {
                  value: 16,
                  message: "Must be exactly 16 digits",
                },
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Only numbers are allowed",
                },
              })}
              className="w-full rounded bg-white p-2 border border-gray-300 block mt-1 "
            />
            <span className="text-red-500 text-sm">
              {errors.identity_card?.message}
            </span>
          </div>

          <div className="mt-4">
            <label className="block ">Nama Lengkap</label>
            <input
              {...register("full_name", {
                required: {
                  value: true,
                  message: "This field cannot be empty",
                },
              })}
              className="w-full rounded bg-white p-2 border border-gray-300 block mt-1 "
            />

            <span className="text-red-500 text-sm">
              {errors.full_name?.message}
            </span>
          </div>

          <div className="mt-4">
            <label className="block font-semibold">Jenis Kelamin</label>
            <div className="mt-1">
              <label className="mr-4">
                <input
                  {...register("gender", {
                    required: {
                      value: true,
                      message: "This field cannot be empty",
                    },
                  })}
                  type="radio"
                  name="gender"
                  value="pria"
                  className="mr-1"
                />
                Pria
              </label>
              <label>
                <input
                  {...register("gender", {
                    required: {
                      value: true,
                      message: "This field cannot be empty",
                    },
                  })}
                  type="radio"
                  name="gender"
                  value="wanita"
                  className="mr-1"
                />
                Wanita
              </label>
            </div>
            <span className="text-red-500 text-sm">
              {errors.gender?.message}
            </span>
          </div>
          <div className="mt-4">
            <label className="block ">No HP</label>
            <input
              {...register("phone_number", {
                required: {
                  value: true,
                  message: "This field cannot be empty",
                },
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Only numbers are allowed",
                },
              })}
              className="w-full rounded bg-white p-2 border border-gray-300 block mt-1 "
            />
            <span className="text-red-500 text-sm">
              {errors.phone_number?.message}
            </span>
          </div>
          <div className="mt-4">
            <label className="block">Email</label>
            <input
              {...register("email", {
                required: {
                  value: true,
                  message: "This field cannot be empty",
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full rounded bg-white p-2 border border-gray-300 block mt-1 "
            />
            <span className="text-red-500 text-sm">
              {errors.email?.message}
            </span>
          </div>

          <div className="flex items-center justify-between mt-8">
            <button
              onClick={handleSubmit(Submit)}
              className="flex items-center justify-center px-8  border border-black text-base font-medium rounded-md text-black bg-white  md:py-2  md:px-10 "
            >
              {isLoading && <Loading />} {isCreate ? "Submit" : "Update"}
            </button>
            <Link
              href="/"
              className="inline-flex items-center text-black  hover:text-gray-00"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  strokeWidth="2"
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                ></path>
              </svg>
              <span className="ml-1 font-bold text-lg">Back</span>
            </Link>
          </div>
        </form>

        <aside className="">
          <div className="bg-gray-100 p-8 rounded">
            <h2 className="font-bold text-2xl">Instructions</h2>
            <ul className="list-disc mt-4 list-inside">
              <li>Validasi panjang KTP harus 16 digit</li>
              <li>Validasi email harus sesuai format email address</li>
              <li>
                User nontification jika ada input yang belum sesuai validasi
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
