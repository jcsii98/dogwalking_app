import React, { useState, useEffect, useRef } from "react";
import DogPng from "../../assets/dog.png";
import BookingChatroom from "./BookingChatroom";
import BookingDetails from "./BookingDetails";
import cable from "../../services/cable";
import JobDetails from "../Handler/JobDetails";
import BookingDogProfile from "./BookingDogProfile";

export default function BookingDash(props) {
  console.log("Rendering BookingDash...");
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
    setBookingDetails,
  } = props;

  // page UI states
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const subscriptionRef = useRef(null); // Add this line
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [focusedDog, setFocusedDog] = useState();

  // variable states
  const [message, setMessage] = useState();
  const [error, setError] = useState();

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

      const bookingId = bookingDash.booking.id;

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
  useEffect(() => {
    console.log("Setting up subscription in BookingDash...");

    if (!subscriptionRef.current) {
      subscriptionRef.current = cable.subscriptions.create(
        { channel: "ChatroomChannel", id: bookingDash.booking.id },
        {
          connected() {
            console.log("Connected to ChatroomChannel from BookingDash!");
          },
          received(data) {
            switch (data.type) {
              case "users_online":
                console.log("Online Users:", data.users);
                setOnlineUsers(data.users);
                break;
              case "booking_updated":
                console.log("Booking was updated:", data.booking);
                fetchBooking(data.booking.id);
                break;
              case "message":
                console.log(
                  "Received new message in BookingDash:",
                  data.message
                );
                fetchChat(bookingDash.booking.id);
                break;
              case "booking_approved":
                console.log("Booking has been approved", data.booking);
                fetchBooking(data.booking.id);
                break;
              case "booking_deleted":
                console.log("Booking has been deleted", data.booking);
                Promise.all([checkBookings()]).then(() => setDashTab("Home"));
                break;
              case "job_updated":
                console.log("Job was updated:", data.job);
                fetchBooking(data.booking_id);
                break;
              default:
                console.log("Received unknown data type:", data);
            }
          },
        }
      );
    }

    return () => {
      console.log("Cleaning up subscription in BookingDash...");
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }
    };
  }, [bookingDash.booking.id]);
  return (
    <>
      <div className="flex flex-col">
        <BookingChatroom
          onlineUsers={onlineUsers}
          apiUrl={apiUrl}
          bookingChat={bookingChat}
          bookingDash={bookingDash}
          fetchChat={fetchChat}
          userData={userData}
        />

        {focusedDog && (
          <>
            <BookingDogProfile
              apiUrl={apiUrl}
              focusedDog={focusedDog}
              setFocusedDog={setFocusedDog}
            />
          </>
        )}
        {!focusedDog && (
          <>
            <BookingDetails
              setFocusedDog={setFocusedDog}
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
          </>
        )}
      </div>
    </>
  );
}
