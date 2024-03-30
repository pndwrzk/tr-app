import Link from "next/link";
import {
  FaRegAddressBook,
  FaRegCalendarDays,
  FaFileLines,
} from "react-icons/fa6";
export default function Dashboard() {
  return (
    <>
      <div className="text-gray-700 body-font">
        <div className="container px-5 pt-[30px] mx-auto">
          <div className="flex flex-wrap  text-center">
            <Link className="p-4 md:w-1/3 sm:w-1/2 w-full" href="/profile">
              <div className="flex flex-col items-center justify-center text-center border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110">
                <FaRegAddressBook className="mb-2 text-4xl text-[#0060AC]" />
                <h2 className="title-font font-medium text-3xl text-gray-900">
                  Profile
                </h2>
              </div>
            </Link>

            <Link className="p-4 md:w-1/3 sm:w-1/2 w-full" href="/attendance">
              <div className="flex flex-col items-center justify-center text-center border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110">
                <FaRegCalendarDays className="mb-2 text-4xl text-[#0060AC]" />
                <h2 className="title-font font-medium text-3xl text-gray-900">
                  Attendance
                </h2>
              </div>
            </Link>
            <Link className="p-4 md:w-1/3 sm:w-1/2 w-full" href="/summary">
              <div className="flex flex-col items-center justify-center text-center border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110">
                <FaFileLines className="mb-2 text-4xl text-[#0060AC]" />
                <h2 className="title-font font-medium text-3xl text-gray-900">
                  Summary
                </h2>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
