import DogPng from "../../assets/dog.png";
import DogProfileForm from "./DogProfileForm";
import React, { useState, useEffect } from "react";

export default function DogProfile(props) {
  const { apiUrl, dogProfile, setDashTab, setDogProfile, checkDogProfiles } =
    props;

  const [showConfirm, setShowConfirm] = useState(false);
  const [showSideBtns, setShowSideBtns] = useState(true);
  const dogId = dogProfile.id;
  const dogName = dogProfile.name;
  const dogBreed = dogProfile.breed;
  const dogAge = dogProfile.age;
  const dogSex = dogProfile.sex;
  const dogWeight = dogProfile.weight;

  const handleBack = () => {
    setDashTab("Home");
    setDogProfile();
  };

  const confirmDelete = () => {
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    const uid = localStorage.getItem("uid");
    const client = localStorage.getItem("client");
    const accessToken = localStorage.getItem("access-token");

    try {
      const response = await fetch(`${apiUrl}/dog_profiles/${dogId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          uid: uid,
          client: client,
          "access-token": accessToken,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      checkDogProfiles();
      setShowConfirm(false);
      setDashTab("Home");
    } catch (error) {
      console.error("There was an error deleting the profile:", error);
    }
  };
  return (
    <>
      <div className="flex flex-col space-y-10 items-center justify-between bg-white rounded-md p-6 border-slate-300 border-[1px]">
        <div className="flex flex-col items-center">
          <div className="text-slate-700 font-bold text-6xl pb-8">
            {dogName}
          </div>
          <div className="bg-slate-400 rounded-full w-24 h-24 flex justify-center items-center">
            <img
              className="place-self-center w-20 h-20 rounded-full"
              src={DogPng}
              alt="Profile"
            />
          </div>
        </div>
        <table className="border-separate border-spacing-4">
          <thead>
            <tr>
              <th className="px-4">Age</th>
              <th className="px-4">Weight (lbs)</th>
              <th className="px-4">Breed</th>
              <th className="px-4">Sex</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-600 py-2 px-4 rounded-md text-center">
                {dogAge}
              </td>
              <td className="border border-slate-600 py-2 px-4 rounded-md text-center">
                {dogWeight}
              </td>
              <td className="border border-slate-600 py-2 px-4 rounded-md text-center">
                {dogBreed}
              </td>
              <td className="border border-slate-600 py-2 px-4 rounded-md text-center">
                {dogSex}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="bg-white rounded-md p-6 border-slate-300 border-[1px] flex justify-center space-x-4">
          {showConfirm ? (
            <>
              <div className="flex flex-col justify-center items-center">
                <div className="pb-6 font-medium text-2xl">
                  You are about to delete {dogName}'s profile. Are you sure?
                </div>
                <div className="flex justify-center space-x-10">
                  <button
                    onClick={() => {
                      setShowConfirm(false);
                    }}
                    className="font-medium hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 my-2 rounded-lg border-black border-[1px] px-4"
                  >
                    Go Back
                  </button>
                  <button
                    onClick={handleDelete}
                    className="font-medium hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 my-2 rounded-lg border-black border-[1px] px-4"
                  >
                    Yes
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              {showSideBtns && (
                <>
                  <button
                    onClick={handleBack}
                    className="font-medium hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 my-2 rounded-lg border-black border-[1px] px-4"
                  >
                    Go Back
                  </button>
                </>
              )}

              <DogProfileForm
                apiUrl={apiUrl}
                checkDogProfiles={checkDogProfiles}
                setDogProfile={setDogProfile}
                setShowSideBtns={setShowSideBtns}
                dogUpdate={true}
                dogId={dogId}
              />
              {showSideBtns && (
                <>
                  <button
                    onClick={confirmDelete}
                    className="font-medium hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 my-2 rounded-lg border-black border-[1px] px-4"
                  >
                    Delete
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
