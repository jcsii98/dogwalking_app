import React, { useState, useEffect } from "react";
import DogPng from "../../assets/dog.png";

export default function BookingSummary(props) {
  const {
    apiUrl,
    setDashTab,
    fetchBooking,
    fetchChat,
    handlerJobData,
    bookingData,
    setActiveTab,
    setBookingDash,
  } = props;

  const [message, setMessage] = useState();
  const [errors, setErrors] = useState(null);

  async function handleSubmit() {
    const uid = localStorage.getItem("uid");
    const client = localStorage.getItem("client");
    const accessToken = localStorage.getItem("access-token");

    const requestBody = {
      booking: {
        ...bookingData,
        user_walker_id: handlerJobData.user_id,
      },
    };

    setMessage(`Creating booking for ${handlerJobData.name}`);
    try {
      const response = await fetch(`${apiUrl}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          uid: uid,
          client: client,
          "access-token": accessToken,
        },
        body: JSON.stringify(requestBody),
      });
      if (response.ok) {
        setMessage("");
        const responseData = await response.json();
        console.log(responseData);

        await Promise.all([
          fetchBooking(responseData.id),
          fetchChat(responseData.id),
        ]);
        console.log("Setting Dash Tab to Booking Dash");
        setDashTab("Booking Dash");
      } else {
        const errorsJson = await response.json();
        console.log(errorsJson);
        setMessage();
        setErrors(errorsJson);
      }
    } catch (error) {
      console.error("Error 2:", error);
    }
  }
  return (
    <>
      <div className="text-3xl font-bold pb-4">Booking Summary</div>
      <div className="flex space-x-4">
        <div className="flex">
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
          </div>
        </div>
      </div>
      <div className="pb-4">
        <div className="font-medium pb-2 text-slate-700">Doggos</div>
        <div className="h-[150px] bg-slate-100 rounded-md p-6 flex items-center">
          <div className="flex overflow-x-auto items-center space-x-10">
            {bookingData.booking_dog_profiles_attributes &&
              bookingData.booking_dog_profiles_attributes.map((dog) => (
                <div
                  className="font-medium text-sm flex-shrink-0 flex flex-col justify-center items-center space-y-4"
                  key={dog.id}
                >
                  <div className="bg-blue-300 rounded-full h-16 w-16 flex items-center justify-center">
                    <img
                      className="place-self-center w-14 h-14 rounded-full"
                      src={DogPng}
                    />
                  </div>
                  <div className="">{dog.name}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="">
        {message && <p className="text-slate-500">{message}</p>}
        {/* {errors &&
          Object.keys(errors).map((key) =>
            errors[key].map((err) => (
              <p key={err} className="text-red-500">
                {key}: {err}
              </p>
            ))
          )} */}
        <div className="flex space-x-10">
          <button
            onClick={() => {
              setActiveTab(1);
            }}
            className="w-full hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 my-2 rounded-lg border-black border-[1px] px-4"
            type="button"
            // disabled={!inputValue.trim()}
          >
            Back
          </button>
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
