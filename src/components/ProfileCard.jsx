import UserPng from "../assets/user.png";
import Paw from "../assets/paw.png";
import Dog3 from "../assets/dog3.png";
import { TbEdit } from "react-icons/tb";
import { TbEditOff } from "react-icons/tb";
import React, { useState, useEffect } from "react";
import AddressAutofill from "./AddressAutofill.jsx";

export default function ProfileCard(props) {
  const { userData, setUserData } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [streetAddress, setStreetAddress] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showUpdate, setShowUpdate] = useState(false);

  const toggleIsEditing = () => {
    setShowUpdate(false);
    setMessage("");
    setIsEditing((prev) => !prev);
  };
  const handleInputChange = React.useCallback(() => {
    console.log("Input changed");
    setShowUpdate(false);
  }, []);

  const handleAddressSelected = React.useCallback((result) => {
    console.log(result);
    setShowUpdate(true);
    setStreetAddress(result.place_name);
  }, []);

  async function updateAddress() {
    setMessage("Updating Address", streetAddress);
    const uid = localStorage.getItem("uid");
    const client = localStorage.getItem("client");
    const accessToken = localStorage.getItem("access-token");

    try {
      const response = await fetch("http://localhost:3000/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          uid: uid,
          client: client,
          "access-token": accessToken,
        },
        body: JSON.stringify({
          user: {
            street_address: streetAddress,
          },
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        setError("Response was not ok. Please try again.");
        console.log(data);
      }

      const data = await response.json();
      if (data.street_address == streetAddress) {
        setMessage("Address has been updated");
        setUserData(data);
        setShowUpdate(false);
        console.log("Success");
        console.log(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
      <div className="flex justify-between space-x-[100px]">
        <div className="w-[330px] bg-white rounded-md p-6">
          <div className="flex items-start justify-between font-medium text-md text-slate-700 pb-4 border-b-[1px]">
            <div className="flex items-center">
              <img
                className="place-self-center w-14 h-14 rounded-full mr-4"
                src={UserPng}
                alt="Profile"
              />
              <div className="text-lg font-medium">{userData.name}</div>
              {userData.status == "approved" && (
                <>
                  <img className="ml-4 w-3 h-3 place-self-center" src={Paw} />
                </>
              )}
            </div>
            {isEditing ? (
              <TbEditOff className="cursor-pointer" onClick={toggleIsEditing} />
            ) : (
              <TbEdit onClick={toggleIsEditing} className="cursor-pointer" />
            )}
          </div>
          <div className="pt-4">
            <div className="text-base font-medium text-slate-600">Email</div>
            <div className="text-base font-medium">{userData.email}</div>
          </div>
          <div className="pt-4">
            <div className="text-base font-medium text-slate-600">Contact</div>
            <div className="text-base font-medium">0919 509 3049</div>
          </div>
          <div className="pt-4">
            <div className="text-lg font-medium text-slate-600">Address</div>
          </div>
          {isEditing ? (
            <>
              <div className="pt-2">
                <div className="pb-2 text-base font-medium text-slate-600">
                  Street Address
                </div>
                <div className="w-full">
                  <AddressAutofill
                    onSelected={handleAddressSelected}
                    onInputChange={handleInputChange}
                  />
                </div>
                {message && <p className="text-slate-500">{message}</p>}
                {error && <p className="text-red-500">{error}</p>}
                <div className="flex justify-between">
                  <button
                    onClick={toggleIsEditing}
                    className="font-medium hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 my-2 rounded-lg border-black border-[1px] px-4"
                  >
                    Go Back
                  </button>
                  {showUpdate && (
                    <>
                      <button
                        onClick={updateAddress}
                        className="font-medium hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 my-2 rounded-lg border-black border-[1px] px-4"
                      >
                        Update
                      </button>
                    </>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="pt-2">
                <div className="text-base font-medium text-slate-600">
                  Street Address
                </div>
                <div className="text-base font-medium">
                  {userData.street_address || "N/A"}
                </div>
              </div>
            </>
          )}
        </div>
        <div className="w-[1000px] max-h-[300px] bg-white rounded-md p-6 px-10">
          {userData.status == "pending" && (
            <>
              <div className="pb-10 text-6xl font-black">Oops!</div>
              <div className="flex items-center space-x-4">
                <img src={Dog3} className="h-40" />
                <div className="text-lg font-normal p-4 bg-slate-200 rounded-md">
                  Looks like your profile is not yet verified. To complete the
                  verification process and ensure a smooth experience, please
                  update your profile with the necessary information, including
                  your address. This will help us verify your account and
                  provide you with the best possible service. Thank you for your
                  cooperation!
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
