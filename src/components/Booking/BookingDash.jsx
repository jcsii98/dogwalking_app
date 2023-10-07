import React, { useState, useEffect } from "react";
import DogPng from "../../assets/dog.png";
import BookingChatroom from "./BookingChatroom";

export default function BookingDash(props) {
  const { setDashTab, bookingDash, userData, checkBookings } = props;
  const [bookingDetails, setBookingDetails] = useState();
  const [bookingDogs, setBookingDogs] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [message, setMessage] = useState();
  const [error, setError] = useState();
  const [messages, setMessages] = useState();

  const fetchBooking = async (event) => {
    const uid = localStorage.getItem("uid");
    const client = localStorage.getItem("client");
    const accessToken = localStorage.getItem("access-token");
    const bookingId = bookingDash.id;
    try {
      const response = await fetch(
        `https://dogwalking-api.onrender.com/bookings/${bookingId}`,
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
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        setBookingDetails(responseData.booking);
        setBookingDogs(responseData.booking_dog_profiles);
        setIsLoading(false);
      } else {
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const fetchChat = async (event) => {
    const uid = localStorage.getItem("uid");
    const client = localStorage.getItem("client");
    const accessToken = localStorage.getItem("access-token");
    const bookingId = bookingDash.id;

    try {
      const response = await fetch(
        `https://dogwalking-api.onrender.com/bookings/${bookingId}/chatroom`,
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
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        setMessages(responseData.messages);
      } else {
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const confirmApprove = () => {
    setShowConfirm(true);
  };

  const cancelApprove = () => {
    setShowConfirm(false);
  };

  const toggleConfirmDelete = () => {
    setConfirmDelete((prev) => !prev);
  };

  const handleApprove = async () => {
    setMessage("Approving");
    try {
      const uid = localStorage.getItem("uid");
      const client = localStorage.getItem("client");
      const accessToken = localStorage.getItem("access-token");
      const bookingId = bookingDash.id;

      const response = await fetch(
        `https://dogwalking-api.onrender.com/bookings/${bookingId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            uid: uid,
            client: client,
            "access-token": accessToken,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setMessage("Booking Approved");
      } else {
        setError("An error has occured 1");
      }
    } catch (error) {
      console.log("Error:", error);
      setError("An error has occured 2");
    }
  };

  const handleDeleteBooking = async () => {
    const uid = localStorage.getItem("uid");
    const client = localStorage.getItem("client");
    const accessToken = localStorage.getItem("access-token");
    const bookingId = bookingDash.id;
    try {
      const response = await fetch(
        `https://dogwalking-api.onrender.com/bookings/${bookingId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            uid: uid,
            client: client,
            "access-token": accessToken,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.status == "success") {
          checkBookings();
          setDashTab("Home");
        }
        console.log(data);
      } else {
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBooking();
      fetchChat();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <>
          <div className="flex justify-between space-x-20">
            <div className="basis-1/3 p-6 border-[1px] rounded-md bg-white">
              <div className="font-bold text-xl">Booking Details</div>
              <div className="">
                Dog Handler:{" "}
                {userData.kind == "2" ? (
                  <>{bookingDetails.user_walker_name}</>
                ) : (
                  <>{bookingDetails.user_owner_name}</>
                )}
              </div>
              <div className="">Booking ID: {bookingDetails.id}</div>
              <div className="">Date: {bookingDetails.date}</div>
              <div className="">Duration: {bookingDetails.duration}</div>
              <div className="">Amount: {bookingDetails.amount}</div>
              <div className="">Status: {bookingDetails.status}</div>
              <div className="font-bold text-xl">Booking Dogs</div>
              <div className="h-[150px] bg-slate-100 rounded-md p-6 flex items-center">
                {bookingDogs &&
                  bookingDogs.map((item) => {
                    const dog = item.dog_profile;
                    return (
                      <div
                        key={item.id}
                        className="cursor-pointer font-medium text-sm flex-shrink-0 flex flex-col justify-center items-center space-y-4"
                      >
                        <div className="bg-slate-300 rounded-full w-16 h-16 flex justify-center items-center">
                          <img
                            src={DogPng}
                            className="place-self-center w-14 h-14 rounded-full"
                          />
                        </div>
                        <div className="">{dog.name}</div>
                      </div>
                    );
                  })}
              </div>
              {bookingDash.status !== "approved" && (
                <>
                  {confirmDelete ? (
                    <>
                      <div>Are you sure you want to cancel this booking?</div>

                      <button
                        onClick={toggleConfirmDelete}
                        type="button"
                        className="hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-slate-600 py-2 my-2 rounded-lg border-slate-600 border-[1px] px-4"
                      >
                        No
                      </button>
                      <button
                        onClick={handleDeleteBooking}
                        type="button"
                        className="hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-slate-600 py-2 my-2 rounded-lg border-slate-600 border-[1px] px-4"
                      >
                        Yes
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={toggleConfirmDelete}
                      type="button"
                      className="hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-slate-600 py-2 my-2 rounded-lg border-slate-600 border-[1px] px-4"
                    >
                      Cancel Booking
                    </button>
                  )}
                </>
              )}
              {userData.kind == "1" && bookingDash.status !== "approved" && (
                <>
                  {showConfirm && (
                    <div className="pb-6 font-medium text-2xl">
                      Confirm Booking?
                    </div>
                  )}
                  <div className="flex w-full justify-around">
                    {showConfirm ? (
                      <>
                        <button
                          onClick={cancelApprove}
                          type="button"
                          className="hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-slate-600 py-2 my-2 rounded-lg border-slate-600 border-[1px] px-4"
                        >
                          No
                        </button>
                        <button
                          onClick={handleApprove}
                          type="button"
                          className="hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-slate-600 py-2 my-2 rounded-lg border-slate-600 border-[1px] px-4"
                        >
                          Yes
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={confirmApprove}
                        type="button"
                        className="hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-slate-600 py-2 my-2 rounded-lg border-slate-600 border-[1px] px-4"
                      >
                        Approve
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
            <div className="basis-2/3 p-6 border-[1px] rounded-md bg-white">
              <BookingChatroom
                fetchChat={fetchChat}
                userData={userData}
                messages={messages}
                bookingDetails={bookingDetails}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
