import React, { useState, useEffect } from "react";
import DogPng from "../assets/dog.png";
import BookingChatroom from "./BookingChatroom";

export default function BookingDash(props) {
  const { setDashTab, bookingDash, userData } = props;
  const [bookingDetails, setBookingDetails] = useState();
  const [bookingDogs, setBookingDogs] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [messages, setMessages] = useState();

  const fetchBooking = async (event) => {
    const uid = localStorage.getItem("uid");
    const client = localStorage.getItem("client");
    const accessToken = localStorage.getItem("access-token");
    const bookingId = bookingDash.id;
    try {
      const response = await fetch(
        `http://localhost:3000/bookings/${bookingId}`,
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
        `http://localhost:3000/bookings/${bookingId}/chatroom`,
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

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBooking();
      fetchChat();
    }, 1000);
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
                Dog Handler: {bookingDetails.user_walker_name}
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
                        <div className="bg-white rounded-full">
                          <img
                            className="place-self-center w-14 h-14 rounded-full"
                            src={DogPng}
                            alt="Profile"
                          />
                        </div>
                        <div className="">{dog.name}</div>
                      </div>
                    );
                  })}
              </div>
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
