import DogPng from "../../assets/dog.png";
import Add from "../../assets/add.png";
import { TbEdit } from "react-icons/tb";
import { TbEditOff } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import React, { useState, useEffect } from "react";
import DogProfileThumbnail from "../DogProfile/DogProfileThumbnail";
import BookingForm from "./BookingForm";

export default function BookingDetails(props) {
  const {
    apiUrl,
    setDashTab,
    checkBookings,
    fetchBooking,
    userData,
    toggleSetShowConfirm,
    dogProfilesData,
    handleApproveBooking,
    bookingDash,
  } = props;

  // page UI states
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingDog, setIsAddingDog] = useState(false);
  const [message, setMessage] = useState();
  const [error, setError] = useState();

  // variable states
  const [bookingDogs, setBookingDogs] = useState({
    booking_dog_profiles_attributes: [],
  });
  const [additionalDogs, setAdditionalDogs] = useState({
    booking_dog_profiles_attributes: [],
  });
  const [duration, setDuration] = useState(bookingDash.booking.duration);
  const [date, setDate] = useState(bookingDash.booking.date);

  const toggleIsEditing = () => {
    setIsEditing((prev) => !prev);
    setIsAddingDog(false);
  };

  const toggleIsAddingDog = () => {
    setIsAddingDog((prev) => !prev);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const addDog = (dogProfileId) => {
    let updatedDogsAttributes = [
      ...additionalDogs.booking_dog_profiles_attributes,
    ];

    // Check if the dog_profile_id is already marked for addition
    const existingIndex = updatedDogsAttributes.findIndex(
      (dog) => dog.dog_profile_id === dogProfileId
    );

    if (existingIndex > -1) {
      // If it's already marked for addition, unmark it by removing from array
      updatedDogsAttributes.splice(existingIndex, 1);
    } else {
      // Else, mark the dog for addition
      updatedDogsAttributes.push({ dog_profile_id: dogProfileId });
    }

    setAdditionalDogs({
      booking_dog_profiles_attributes: updatedDogsAttributes,
    });
  };

  const removeDog = (bookingDogProfileId) => {
    let updatedDogsAttributes = [
      ...bookingDogs.booking_dog_profiles_attributes,
    ];

    // Check if it's already marked for removal
    const existingIndex = updatedDogsAttributes.findIndex(
      (dog) => dog.id === bookingDogProfileId && dog._destroy === "1"
    );

    if (existingIndex > -1) {
      // If it's already marked for removal, unmark it by removing from array
      updatedDogsAttributes.splice(existingIndex, 1);
    } else {
      // Else, mark the dog for removal
      updatedDogsAttributes.push({ id: bookingDogProfileId, _destroy: "1" });
    }

    setBookingDogs({
      booking_dog_profiles_attributes: updatedDogsAttributes,
    });
  };

  const handleSubmit = async () => {
    const bookingId = bookingDash.booking.id;
    const uid = localStorage.getItem("uid");
    const client = localStorage.getItem("client");
    const accessToken = localStorage.getItem("access-token");

    const combinedDogProfilesAttributes = [
      ...bookingDogs.booking_dog_profiles_attributes,
      ...additionalDogs.booking_dog_profiles_attributes,
    ];

    const payload = {
      duration: duration,
      booking_dog_profiles_attributes: combinedDogProfilesAttributes,
      date: date,
    };
    setMessage("Updating booking");
    try {
      const response = await fetch(`${apiUrl}/bookings/${bookingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          uid: uid,
          client: client,
          "access-token": accessToken,
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data.status == "success") {
          await Promise.all([fetchBooking(data.data.id)]);

          setBookingDogs({
            booking_dog_profiles_attributes: [],
          });
          setAdditionalDogs({
            booking_dog_profiles_attributes: [],
          });

          setIsEditing(false);
          setMessage("Booking updated");
        }
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleDeleteBooking = async () => {
    const bookingId = bookingDash.booking.id;
    const uid = localStorage.getItem("uid");
    const client = localStorage.getItem("client");
    const accessToken = localStorage.getItem("access-token");

    try {
      const response = await fetch(`${apiUrl}/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          uid: uid,
          client: client,
          "access-token": accessToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.status == "success") {
          await Promise.all([checkBookings()]);
          setDashTab("Home");
        }
        console.log(data);
      } else {
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const isBookingDogProfileMarkedForRemoval = (bookingDogProfileId) => {
    return bookingDogs.booking_dog_profiles_attributes.some(
      (profile) =>
        profile.id === bookingDogProfileId && profile._destroy === "1"
    );
  };

  const isDogMarkedForInclusion = (dogId) => {
    return additionalDogs.booking_dog_profiles_attributes.some(
      (dog) => dog.dog_profile_id === dogId
    );
  };
  const bookedDogIds = bookingDash.booking_dog_profiles.map(
    (profile) => profile.dog_profile.id
  );

  useEffect(() => {
    console.log("bookingDogs to remove: ", bookingDogs);
  }, [bookingDogs]);

  useEffect(() => {
    console.log("bookingDogs to add: ", additionalDogs);
  }, [additionalDogs]);
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="font-bold text-xl">Booking Details</div>
        <RiDeleteBin6Line
          className="cursor-pointer"
          onClick={handleDeleteBooking}
        />
      </div>

      <div className="flex space-x-4">
        <div className="basis-1/2">
          <div className="pt-2">
            {userData.kind == "2" ? (
              <>
                <div className="text-base font-medium text-slate-600">
                  Walker
                </div>
                <div className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-2 px-2">
                  {bookingDash.booking.user_walker_name}
                </div>
              </>
            ) : (
              <>
                <div className="text-base font-medium text-slate-600">
                  Owner
                </div>
                <div className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-2 px-2">
                  {bookingDash.booking.user_owner_name}
                </div>
              </>
            )}
          </div>
          <div className="pt-2">
            <div className="text-base font-medium text-slate-600">Duration</div>
            {isEditing ? (
              <>
                <input
                  type="number"
                  className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-2 px-2"
                  placeholder={bookingDash.booking.duration}
                  value={duration}
                  onChange={handleDurationChange}
                ></input>
              </>
            ) : (
              <>
                <div className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-2 px-2">
                  {bookingDash.booking.duration}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="basis-1/2">
          <div className="pt-2">
            <div className="text-base font-medium text-slate-600">Amount</div>
            <div className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-2 px-2">
              {bookingDash.booking.amount}
            </div>
          </div>
          <div className="pt-2">
            <div className="text-base font-medium text-slate-600">Date</div>
            {isEditing ? (
              <>
                <input
                  type="date"
                  className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-2 px-2"
                  placeholder={bookingDash.booking.date}
                  value={date}
                  onChange={handleDateChange}
                ></input>
              </>
            ) : (
              <>
                <div className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-2 px-2">
                  {bookingDash.booking.date}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="pt-4 font-bold text-xl">Booking Dogs</div>
      <div className="bg-slate-100 rounded-md p-6 mt-4 flex items-center space-x-10">
        {!isEditing && (
          <>
            {bookingDash.booking_dog_profiles &&
              bookingDash.booking_dog_profiles.map((item) => (
                <React.Fragment key={item.id}>
                  <div
                    onClick={isEditing ? () => removeDog(item.id) : null}
                    className="font-medium text-sm flex-shrink-0 flex flex-col justify-center items-center space-y-4"
                  >
                    <div className="bg-slate-500  rounded-full w-20 h-20 flex justify-center items-center">
                      <img
                        src={DogPng}
                        className="place-self-center w-16 h-16 rounded-full"
                      />
                    </div>
                    <div className="">{item.dog_profile.name}</div>
                  </div>
                </React.Fragment>
              ))}
          </>
        )}
        {isEditing && !isAddingDog && (
          <>
            {bookingDash.booking_dog_profiles &&
              bookingDash.booking_dog_profiles.map((item) => {
                const dog = item.dog_profile;
                const markedForRemoval = isBookingDogProfileMarkedForRemoval(
                  item.id
                );

                console.log(
                  "Dog ID:",
                  item.id,
                  "Marked for removal:",
                  markedForRemoval
                );

                return (
                  <div
                    onClick={isEditing ? () => removeDog(item.id) : null}
                    key={item.id}
                    className="font-medium text-sm flex-shrink-0 flex flex-col justify-center items-center space-y-4"
                  >
                    <div
                      className={
                        isEditing
                          ? markedForRemoval
                            ? "cursor-pointer bg-red-300 hover:bg-slate-500 rounded-full w-20 h-20 flex justify-center items-center"
                            : "cursor-pointer bg-slate-500 hover:bg-red-300 rounded-full w-20 h-20 flex justify-center items-center"
                          : "bg-slate-500  rounded-full w-20 h-20 flex justify-center items-center"
                      }
                    >
                      <img
                        src={DogPng}
                        className="place-self-center w-16 h-16 rounded-full"
                      />
                    </div>
                    <div className="">{dog.name}</div>
                  </div>
                );
              })}
            <div className="font-medium text-sm flex-shrink-0 flex flex-col justify-center items-center space-y-4">
              <div
                onClick={toggleIsAddingDog}
                className="cursor-pointer hover:bg-slate-400 bg-slate-300  rounded-full w-20 h-20 flex justify-center items-center"
              >
                <img
                  src={Add}
                  className="invert place-self-center w-10 h-10 rounded-full"
                />
              </div>
              <div className="">Add Dog</div>
            </div>
          </>
        )}
        {isEditing && isAddingDog && (
          <>
            {dogProfilesData &&
              (function () {
                const filteredDogs = dogProfilesData.filter(
                  (dog) => !bookedDogIds.includes(dog.id)
                );

                if (filteredDogs.length === 0) {
                  // Return whatever you want to display when the list is empty
                  return <div>No dogs available</div>;
                }

                return filteredDogs.map((dog) => (
                  <div
                    onClick={() => addDog(dog.id)}
                    key={dog.id}
                    className="font-medium text-sm flex-shrink-0 flex flex-col justify-center items-center space-y-4"
                  >
                    <div
                      className={
                        isDogMarkedForInclusion(dog.id)
                          ? "bg-blue-300 rounded-full w-20 h-20 flex justify-center items-center"
                          : "bg-slate-500 hover:bg-blue-300 rounded-full w-20 h-20 flex justify-center items-center"
                      }
                    >
                      <img
                        src={DogPng}
                        className="place-self-center w-16 h-16 rounded-full"
                      />
                    </div>
                    <div className="">{dog.name}</div>
                  </div>
                ));
              })()}
          </>
        )}
      </div>
      {userData.kind == "1" && (
        <>
          <div className="mt-4 border-t-[1px] pt-4">
            <button
              // onClick={toggleIsEditing}
              className="w-full hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 rounded-lg border-black border-[1px] px-4"
              type="button"
            >
              Approve
            </button>
          </div>
        </>
      )}
      {userData.kind == "2" && (
        <>
          <div className="flex mt-4 border-t-[1px] pt-4">
            <button
              onClick={toggleIsEditing}
              className="w-full hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 rounded-lg border-black border-[1px] px-4"
              type="button"
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
            {isEditing && (
              <>
                <button
                  onClick={handleSubmit}
                  className="w-full hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 rounded-lg border-black border-[1px] px-4"
                  type="button"
                >
                  Save Changes
                </button>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
