import Boy from "../../assets/boy.png";
import Woman from "../../assets/woman.png";

import { TbEdit } from "react-icons/tb";
import { TbEditOff } from "react-icons/tb";
import React, { useState, useEffect } from "react";
import AddressAutofill from "./AddressAutofill.jsx";
import Restricted from "./Restricted";

export default function ProfileCard(props) {
  const { userData, setUserData, apiUrl } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [streetAddress, setStreetAddress] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showUpdate, setShowUpdate] = useState(false);

  const isGirl = userData.id % 2 === 0;

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
      const response = await fetch(`${apiUrl}/user`, {
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
        setIsEditing(false);

        console.log("Success");
        console.log(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
      <div className="max-w-screen-xl w-full flex">
        <div className="">
          <div className="min-w-[305px] bg-white rounded-md p-6 border-slate-300 border-[1px]">
            <div className="font-medium text-md text-slate-700 pb-6 border-b-[1px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex justify-center items-center w-16 h-16 bg-slate-400 rounded-full mr-4">
                    <img
                      className="place-self-center w-14 h-14 rounded-full"
                      src={isGirl ? Woman : Boy}
                      alt="Profile"
                    />
                  </div>

                  <div className="text-lg font-medium">{userData.name}</div>
                </div>

                <div className="">
                  {isEditing ? (
                    <TbEditOff
                      className="cursor-pointer"
                      onClick={toggleIsEditing}
                    />
                  ) : (
                    <TbEdit
                      onClick={toggleIsEditing}
                      className="cursor-pointer"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="pt-4">
              <div className="text-base font-medium text-slate-600">Email</div>
              <div className="text-base font-medium">{userData.email}</div>
            </div>
            <div className="pt-4">
              <div className="text-base font-medium text-slate-600">
                Contact (placeholder)
              </div>
              <div className="text-base font-medium">0919 509 3049</div>
            </div>
            {isEditing ? (
              <>
                <div className="pt-2">
                  <div className="text-base font-medium text-slate-600">
                    Street Address
                  </div>
                  <div className="w-full">
                    <AddressAutofill
                      apiUrl={apiUrl}
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
        </div>
        {/* <div className="flex flex-col">
          {userData.status == "pending" && userData.kind == "1" && (
            <>
              <Restricted resource={false} />
            </>
          )}
        </div> */}
      </div>
    </>
  );
}
