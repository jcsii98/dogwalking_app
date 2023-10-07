import React, { useState, useEffect } from "react";

export default function BookingSummary(props) {
  const { setDashTab, handlerJobData, bookingData, setActiveTab } = props;

  const [message, setMessage] = useState();

  async function handleSubmit() {
    const uid = localStorage.getItem("uid");
    const client = localStorage.getItem("client");
    const accessToken = localStorage.getItem("access-token");

    const requestBody = {
      booking: {
        ...bookingData,
        dog_walking_job_id: handlerJobData.id,
      },
    };

    setMessage(`Creating booking for ${handlerJobData.name}`);
    try {
      const response = await fetch(
        "https://dogwalking-api.onrender.com/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            uid: uid,
            client: client,
            "access-token": accessToken,
          },
          body: JSON.stringify(requestBody),
        }
      );
      if (response.ok) {
        setMessage("");
        const responseData = await response.json();
        console.log(responseData);
        console.log("Setting Dash Tab to 3");
        setDashTab(4);
      } else {
        console.log("error 1");
      }
    } catch (error) {
      console.error("Error 2:", error);
    }
  }
  return (
    <>
      <div className="text-3xl font-bold pb-4">Booking Summary</div>
      <div className="flex space-x-4">
        <div className="w-[50%]">
          <div className="pb-4">
            <div className="font-medium pb-2 text-slate-700">Date</div>
            <div className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-2 px-2">
              {bookingData.date || "TBD"}
            </div>
          </div>
          <div className="pb-4">
            <div className="font-medium pb-2 text-slate-700">
              Duration (hrs)
            </div>
            <div className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-2 px-2">
              {bookingData.duration || "TBD"}
            </div>
            <div className="pb-4">
              <div className="font-medium pb-2 text-slate-700">Doggos</div>
              <div className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-2 px-2">
                {bookingData.booking_dog_profiles_attributes && (
                  <>
                    {bookingData.booking_dog_profiles_attributes.length ||
                      "TBD"}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        {message && <p className="text-slate-500">{message}</p>}
        <div className="">
          <button
            onClick={handleSubmit}
            className="w-full hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 my-2 rounded-lg border-black border-[1px] px-4"
            type="button"
          >
            Create Booking
          </button>
        </div>
      </div>
    </>
  );
}
