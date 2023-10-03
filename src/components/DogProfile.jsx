import DogPng from "../assets/dog.png";
import DogProfileForm from "./DogProfileForm";
import React, { useState, useEffect } from "react";

export default function DogProfile(props) {
  const { dogProfile, setDashTab, setDogProfile, checkDogProfiles } = props;

  const [showConfirm, setShowConfirm] = useState(false);
  const [showSideBtns, setShowSideBtns] = useState(true);
  const dogId = dogProfile.id;
  const dogName = dogProfile.name;
  const dogBreed = dogProfile.breed;
  const dogAge = dogProfile.age;
  const dogSex = dogProfile.sex;
  const dogWeight = dogProfile.weight;

  const handleBack = () => {
    setDashTab(1);
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
      const response = await fetch(
        `http://localhost:3000/dog_profiles/${dogId}`,
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

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      checkDogProfiles();
      setShowConfirm(false);
      setDashTab(1);
    } catch (error) {
      console.error("There was an error deleting the profile:", error);
    }
  };
  return (
    <>
      <div className="w-[1400px] h-full">
        <div className="flex justify-between space-x-[100px]">
          <div className="w-[330px]">
            <div className="bg-white rounded-md p-6">
              {" "}
              <div className="flex items-center">
                <div className="bg-slate-400 rounded-full w-20 h-20 flex items-center justify-center">
                  <img
                    className="w-14 h-14 rounded-full"
                    src={DogPng}
                    alt="Profile"
                  />
                </div>
                <div className="ml-6 text-slate-700 font-bold text-2xl">
                  {dogName}
                </div>
              </div>
              <div className="pt-8">
                <div className="text-xl font-medium text-slate-600">Age</div>
                <div className="text-xl font-medium">{dogAge}</div>
              </div>
              <div className="pt-8">
                <div className="text-xl font-medium text-slate-600">
                  Weight (lbs)
                </div>
                <div className="text-xl font-medium">{dogWeight}</div>
              </div>
              <div className="pt-8">
                <div className="text-xl font-medium text-slate-600">Breed</div>
                <div className="text-xl font-medium">{dogBreed}</div>
              </div>
              <div className="pt-8">
                <div className="text-xl font-medium text-slate-600">Sex</div>
                <div className="text-xl font-medium">{dogSex}</div>
              </div>
            </div>
          </div>
          <div className="w-[1000px] bg-white rounded-md p-6 flex justify-center items-center space-x-10">
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
      </div>
    </>
  );
}
