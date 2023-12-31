import React, { useState, useEffect } from "react";
import { BsChevronDown } from "react-icons/bs";
import BookingForm from "../Booking/BookingForm";

export default function HandlerJobs(props) {
  const {
    handlerProfile,
    dogProfilesData,
    setDashTab,
    setBookingDash,
    setBookingDetails,
    fetchBooking,
    fetchChat,
    apiUrl,
  } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [handlerJobData, setHandlerJobData] = useState();
  const [schedules, setSchedules] = useState([]);
  const [message, setMessage] = useState();
  const [isCreating, setIsCreating] = useState(false);

  const fetchJob = async (event) => {
    const uid = localStorage.getItem("uid");
    const client = localStorage.getItem("client");
    const accessToken = localStorage.getItem("access-token");

    const handlerId = handlerProfile.id;
    try {
      const response = await fetch(
        `${apiUrl}/dog_walking_jobs?user_id=${handlerId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            uid: uid,
            client: client,
            "access-token": accessToken,
          },
        }
      );
      const data = await response.json();
      setHandlerJobData(data.data);
      // fetchSchedules(data.data[0].id);
      setIsLoading(false);
      console.log(data);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const fetchSchedules = async (jobId) => {
    // jobId is now a parameter
    const uid = localStorage.getItem("uid");
    const client = localStorage.getItem("client");
    const accessToken = localStorage.getItem("access-token");

    // You no longer need the following line, remove it
    // const jobId = handlerJobsData.id;

    try {
      const response = await fetch(
        `${apiUrl}/dog_walking_jobs/${jobId}/schedules`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            uid: uid,
            client: client,
            "access-token": accessToken,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.length == 0) {
        setMessage("No schedules found.");
      } else {
        setSchedules(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchJob();
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const numberToDay = (number) => {
    switch (number) {
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      case 7:
        return "Sunday";
      default:
        return "Invalid day"; // or any other default/fallback value
    }
  };

  const toggleCreate = () => {
    setIsCreating((prev) => !prev);
  };

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <>
          <div
            className="mb-4 bg-white rounded-md p-6 border-slate-300 border-[1px]"
            tabIndex="0"
          >
            {!isCreating && (
              <>
                <div className="font-bold text-xl">{handlerJobData.name}</div>
                <div className="font-medium text-md">Basic Rates</div>
                <div className="flex flex-col justify-start items-start mt-2 p-6 rounded-md bg-slate-200">
                  <div className="pb-4">
                    <div className="font-medium pb-2 text-slate-700">
                      {"< 20 lbs"}
                    </div>
                    <div className="bg-white focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md py-2 px-2 flex space-x-2">
                      <p className="">{handlerJobData.wgr1}</p>{" "}
                      <p className="text-slate-500">/ hr</p>
                    </div>
                  </div>
                  <div className="pb-4">
                    <div className="font-medium pb-2 text-slate-700">
                      {"< 60 lbs"}
                    </div>
                    <div className="bg-white focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md py-2 px-2 flex space-x-2">
                      <p className="">{handlerJobData.wgr2}</p>{" "}
                      <p className="text-slate-500">/ hr</p>
                    </div>
                  </div>
                  <div className="pb-4">
                    <div className="font-medium pb-2 text-slate-700">
                      {"> 60 lbs"}
                    </div>
                    <div className="bg-white focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md py-2 px-2 flex space-x-2">
                      <p className="">{handlerJobData.wgr3}</p>{" "}
                      <p className="text-slate-500">/ hr</p>
                    </div>
                  </div>
                </div>

                {/* <div className="font-medium text-md">Preferred Schedules</div>
                  <div className="flex space-x-4 overflow-x-auto max-w-[620px]">
                    {" "}
                    {schedules.map((schedule) => (
                      <div
                        key={schedule.id}
                        className="mt-4 p-6 border-[1px] rounded-md"
                      >
                        <div>{numberToDay(schedule.day)}</div>
                        <div>
                          Start:{" "}
                          {new Date(schedule.start_time).toLocaleTimeString()}
                        </div>

                        <div>
                          End:{" "}
                          {new Date(schedule.end_time).toLocaleTimeString()}
                        </div>
                      </div>
                    ))}
                  </div> */}
                <div className="pt-4">
                  <button
                    onClick={toggleCreate}
                    className="font-medium hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 my-2 rounded-lg border-black border-[1px] px-4"
                  >
                    Create booking
                  </button>
                </div>
              </>
            )}
            {isCreating && (
              <>
                <BookingForm
                  apiUrl={apiUrl}
                  fetchBooking={fetchBooking}
                  fetchChat={fetchChat}
                  setBookingDetails={setBookingDetails}
                  setBookingDash={setBookingDash}
                  setDashTab={setDashTab}
                  handlerJobData={handlerJobData}
                  setIsCreating={setIsCreating}
                  dogProfilesData={dogProfilesData}
                />
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
