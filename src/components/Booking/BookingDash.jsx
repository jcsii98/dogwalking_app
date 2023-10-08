import React, { useState, useEffect } from "react";
import DogPng from "../../assets/dog.png";
import BookingChatroom from "./BookingChatroom";
import BookingDetails from "./BookingDetails";

export default function BookingDash(props) {
  const {
    apiUrl,
    dogProfilesData,
    bookingChat,
    fetchChat,
    fetchBooking,
    setDashTab,
    bookingDash,
    userData,
    checkBookings,
    bookingDetails,
    setBookingDetails,
  } = props;

  // page UI states
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // variable states
  const [bookingDogs, setBookingDogs] = useState();
  const [message, setMessage] = useState();
  const [error, setError] = useState();
  const [messages, setMessages] = useState();

  const toggleSetShowConfirm = () => {
    setShowConfirm((prev) => !prev);
  };
  const toggleIsEditing = () => {
    setIsEditing((prev) => !prev);
  };
  const handleApproveBooking = async () => {
    setMessage("Approving");
    try {
      const uid = localStorage.getItem("uid");
      const client = localStorage.getItem("client");
      const accessToken = localStorage.getItem("access-token");
      const bookingId = bookingDash.id;

      const response = await fetch(`${apiUrl}/bookings/${bookingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          uid: uid,
          client: client,
          "access-token": accessToken,
        },
      });
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

  return (
    <>
      <div className="flex justify-between space-x-20">
        {" "}
        <div className="basis-1/3 p-6 border-[1px] rounded-md bg-white">
          <BookingDetails
            apiUrl={apiUrl}
            setDashTab={setDashTab}
            checkBookings={checkBookings}
            dogProfilesData={dogProfilesData}
            fetchBooking={fetchBooking}
            toggleIsEditing={toggleIsEditing}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            userData={userData}
            bookingDash={bookingDash}
            toggleSetShowConfirm={toggleSetShowConfirm}
            handleApproveBooking={handleApproveBooking}
          />
        </div>
        <div className="basis-2/3">
          <BookingChatroom
            apiUrl={apiUrl}
            bookingChat={bookingChat}
            bookingDash={bookingDash}
            setBookingDetails={setBookingDetails}
            fetchChat={fetchChat}
            userData={userData}
            messages={messages}
          />
        </div>
      </div>
    </>
  );
}
