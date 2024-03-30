"use client";
import {
  getProfile,
  updateProfile,
} from "@/services/employeeEmploAttendService";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { employeeData } from "@/types/employeeEmploAttendTypes";
import { AlertInfo } from "@/types/globalTypes";
import Alert from "@/components/alert";

export default function Profile() {
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState("");
  const [fileUpload, setFileUpload] = useState<any>(null);
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
  } = useForm<employeeData>({
    mode: "all",
    defaultValues: {
      email: "",
      name: "",
      phone_number: "",
      position: "",
    },
  });

  const getDataProfile = async () => {
    const result = await getProfile();
    const resultStatus = result.status;
    const resultData = result.data;
    if (resultStatus !== 200) {
      setModelAlert({
        message: resultData.message,
        isSuccess: false,
      });
    } else {
      const response = await fetch(resultData.data.url_photo);
      const blob = await response.blob();
      const data = resultData.data;
      reset(data);
      setFileUpload(blob);
      setImageUrl(resultData.data.url_photo);
      // router.push("/");
    }
  };

  const previewImage = (event: any) => {
    const input = event.target;
    const file = input.files[0];
    setFileUpload(file);

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
    }
  };

  const onSubmit = async (formValues: employeeData) => {
    const formData = new FormData();
    formData.append("url_photo", fileUpload);
    formData.append("name", formValues.name);
    formData.append("email", formValues.email);
    formData.append("phone_number", formValues.phone_number);
    formData.append("position", formValues.position);

    setLoading(true);
    const result = await updateProfile(formData);
    const resultStatus = result.status;
    const resultData = result.data;

    if (resultStatus !== 200) {
      setModelAlert({
        message: resultData.message,
        isSuccess: false,
      });
    } else {
      await getDataProfile();
      await setLoading(false);
      setModelAlert({
        message: resultData.message,
        isSuccess: true,
      });
    }
    setShowAlert(true);
  };

  useEffect(() => {
    getDataProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center my-[800px]">
        <div className="border-gray-300 h-10 w-10 animate-spin rounded-full border-8 border-t-blue-600" />
      </div>
    );
  }
  return (
    <section className="py-10 my-auto ">
      <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
        <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center bg-white">
          <div className="">
            <h1 className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 text-black">
              Profile
            </h1>

            {showAlert && (
              <Alert
                isSuccess={modelAlert.isSuccess}
                message={modelAlert.message}
              />
            )}

            <form>
              <div className="flex items-center space-x-6 mt-5">
                <div className="shrink-0">
                  <img
                    id="preview_img"
                    className="h-20 w-20  rounded-full"
                    src={imageUrl}
                    alt="Current profile photo"
                  />
                </div>
                <label className="block">
                  <span className="sr-only">Choose profile photo</span>
                  <input
                    type="file"
                    onChange={previewImage}
                    className="block w-full text-sm text-black
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0
                          file:text-sm file:font-semibold
                          file:bg-red-50 file:text-red-700
                          hover:file:bg-red-100
                        "
                  />
                </label>
              </div>
            </form>
            <form>
              {/* <div className="w-full rounded-sm bg-[url('https://images.unsplash.com/photo-1449844908441-8829872d2607?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHxob21lfGVufDB8MHx8fDE3MTA0MDE1NDZ8MA&ixlib=rb-4.0.3&q=80&w=1080')] bg-cover bg-center bg-no-repeat items-center">
                <div className="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-[url('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxwcm9maWxlfGVufDB8MHx8fDE3MTEwMDM0MjN8MA&ixlib=rb-4.0.3&q=80&w=1080')] bg-cover bg-center bg-no-repeat"></div>
                <div className="flex justify-end">
                  <input
                    type="file"
                    name="profile"
                    id="upload_cover"
                    hidden
                    required
                  ></input>
                </div>
              </div>
              <h2 className="text-center mt-1 font-semibold dark:text-gray-300">
                Upload Profile and Cover Image
              </h2> */}
              <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                <div className="w-full  mb-4 mt-6">
                  <label className="mb-2 text-black">Full Name</label>
                  <input
                    {...register("name", {
                      required: {
                        value: true,
                        message: "This field cannot be empty",
                      },
                    })}
                    type="text"
                    className="mt-2 p-4 w-full border-2 rounded-lg text-black"
                  ></input>
                  <span className="text-red-500 text-sm">
                    {errors.name?.message}
                  </span>
                </div>
                <div className="w-full  mb-4 lg:mt-6">
                  <label className="text-black">Email</label>
                  <input
                    type="text"
                    className="mt-2 p-4 w-full border-2 rounded-lg text-black"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "This field cannot be empty",
                      },
                    })}
                  ></input>
                  <span className="text-red-500 text-sm">
                    {errors.email?.message}
                  </span>
                </div>
              </div>
              <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                <div className="w-full  mb-4 mt-6">
                  <label className="mb-2 text-black">Position</label>
                  <input
                    {...register("position", {
                      required: {
                        value: true,
                        message: "This field cannot be empty",
                      },
                    })}
                    type="text"
                    className="mt-2 p-4 w-full border-2 rounded-lg text-black"
                  ></input>
                  <span className="text-red-500 text-sm">
                    {errors.position?.message}
                  </span>
                </div>
                <div className="w-full  mb-4 lg:mt-6">
                  <label className="text-black">Phone Number</label>
                  <input
                    {...register("phone_number", {
                      required: {
                        value: true,
                        message: "This field cannot be empty",
                      },
                    })}
                    type="text"
                    className="mt-2 p-4 w-full border-2 rounded-lg text-black"
                  ></input>
                  <span className="text-red-500 text-sm">
                    {errors.phone_number?.message}
                  </span>
                </div>
              </div>

              <div className="w-full rounded-lg bg-[#0060AC] mt-4 text-white text-lg font-semibold">
                <button onClick={handleSubmit(onSubmit)} className="w-full p-3">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
