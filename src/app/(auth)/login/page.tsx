"use client";
// react/no-unescaped-entities

import { login } from "@/services/authTrService";
import { StoreCookie } from "@/utils/configCookie";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { loginRequestBody } from "@/types/authTrTypes";
import { useState } from "react";
import Loading from "@/components/loading";
import Link from "next/link";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<loginRequestBody>({ mode: "all" });

  const onSubmit = async (formValues: loginRequestBody) => {
    setIsLoading(true);
    const result = await login(formValues);
    const resultStatus = result.status;
    const resultData = result.data;
    if (resultStatus !== 200) {
      setErrorMessage(resultData.message);
    } else {
      StoreCookie(resultData.data);
      router.push("/");
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-gray-100 flex h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded-md p-8">
          <h1 className="mt-6 text-center text-md font-bold tracking-tight text-gray-900">
            TR-APP
          </h1>

          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          {errorMessage && (
            <div
              className="flex  justify-between bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-3 rounded  "
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

          <div className="space-y-6 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  className="text-black px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm  sm:text-sm"
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
                />

                <span className="text-red-500 text-sm">
                  {errors.email?.message}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  className="text-black px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm  sm:text-sm"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "This field cannot be empty",
                    },
                  })}
                />

                <span className="text-red-500 text-sm">
                  {errors.password?.message}
                </span>
              </div>
            </div>

            <div>
              <button
                onClick={handleSubmit(onSubmit)}
                className="flex w-full justify-center rounded-md border border-transparent bg-[#0060AC] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
              >
                {isLoading && <Loading />}
                Login
              </button>
            </div>
            <div className="flex justify-center items-center mt-4">
              <p className="inline-flex items-center text-gray-700 font-medium text-xs text-center">
                <span className="ml-2">
                  You dont have an account?
                  <Link
                    href="/register"
                    className="text-xs ml-2 text-blue-500 font-semibold"
                  >
                    Register now
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
