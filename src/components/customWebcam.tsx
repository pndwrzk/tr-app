"use client";
import Webcam from "react-webcam";
import { useRef, useState, useCallback } from "react";
import Clock from "react-live-clock";

const CustomWebcam = () => {
  const webcamRef = useRef<Webcam>(null);
  const [imageSrc, setImageSrc] = useState<string | null | undefined>(null);

  const capture = useCallback(() => {
    const newImageSrc = webcamRef.current?.getScreenshot();
    const a = newImageSrc?.toString();
    var d = new Date(); // for now

    console.log(a, newImageSrc, d);
    setImageSrc(a);
  }, [webcamRef]);

  const retake = () => {
    setImageSrc(null);
  };

  return (
    <div className="flex flex-col items-center m-5 ">
      {imageSrc ? (
        <img src={imageSrc} alt="webcam" />
      ) : (
        <Webcam
          className="lg:w-[45%] md:w-[100%] sm:w-[100%] rounded border-2 border-gray  border-black-200 p-3"
          ref={webcamRef}
        />
      )}

      {imageSrc ? (
        <>
          <div className="max-w-lg mx-auto flex flex-col justify-center items-center gap-4 sm:flex-row md:mt-8 lg:mt-10">
            <a
              className="group relative inline-flex border border-red-500 focus:outline-none w-full sm:w-auto"
              onClick={retake}
            >
              <span className="w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-sm text-white text-center font-bold uppercase bg-red-500 ring-1 ring-red-500 ring-offset-1 ring-offset-red-500 transform transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1 group-focus:-translate-y-1 group-focus:-translate-x-1">
                Retake
              </span>
            </a>
            <a
              className="group relative inline-flex border border-red-600 focus:outline-none w-full sm:w-auto"
              href=""
              target="_blank"
            >
              <span className="w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-sm text-red-600 text-center font-bold uppercase bg-white ring-1 ring-red-600 ring-offset-1 transform transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1 group-focus:-translate-y-1 group-focus:-translate-x-1">
                Save picture
              </span>
            </a>
          </div>
        </>
      ) : (
        <a
          className="group relative inline-flex border border-blue-500 focus:outline-none w-full sm:w-auto mt-5"
          onClick={capture}
        >
          <span className="w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-sm text-white text-center font-bold uppercase bg-blue-500 ring-1 ring-blue-500 ring-offset-1 ring-offset-blue-500 transform transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1 group-focus:-translate-y-1 group-focus:-translate-x-1">
            Picture
          </span>
        </a>
      )}
    </div>
  );
};

export default CustomWebcam;
