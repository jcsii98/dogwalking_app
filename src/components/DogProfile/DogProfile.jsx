import DogPng from "../../assets/dog.png";
import DogProfileForm from "./DogProfileForm";
import React, { useState, useEffect } from "react";

export default function DogProfile(props) {
  const { apiUrl, dogProfile, setDashTab, setDogProfile, checkDogProfiles } =
    props;

  const [showConfirm, setShowConfirm] = useState(false);
  const [showSideBtns, setShowSideBtns] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const dogId = dogProfile.id;
  const dogName = dogProfile.name;
  const dogBreed = dogProfile.breed;
  const dogAge = dogProfile.age;
  const dogSex = dogProfile.sex;
  const dogWeight = dogProfile.weight;

  const handleBegin = () => {
    if (setShowSideBtns) {
      // Check if setShowSideBtns is defined
      setShowSideBtns(false);
    }
    setShowForm(true);
  };
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
      <div className="flex flex-col space-y-4 items-center justify-between max-w-screen-xl bg-white rounded-md p-6 border-slate-300 border-[1px]">
        <div>
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
          <div className="flex space-x-4 w-full">
            <div className="w-[50%]">
              <div className="pb-4">
                <div className="font-medium pb-2 text-slate-700">Age</div>
                <div className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-2 px-2">
                  {dogAge}
                </div>
              </div>
              <div className="pb-4">
                <div className="font-medium pb-2 text-slate-700">Weight</div>
                <div className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-2 px-2">
                  {dogWeight}
                </div>
              </div>
            </div>
            <div className="w-[50%]">
              <div className="pb-4">
                <div className="font-medium pb-2 text-slate-700">Breed</div>
                <div className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-2 px-2">
                  {dogBreed}
                </div>
              </div>
              <div className="pb-4">
                <div className="font-medium pb-2 text-slate-700">Sex</div>
                <div className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-2 px-2">
                  {dogSex}
                </div>
              </div>
            </div>
          </div>
        </div>
        <DogProfileForm
          dogName={dogName}
          setDashTab={setDashTab}
          editing={true}
          setShowForm={setShowForm}
          apiUrl={apiUrl}
          checkDogProfiles={checkDogProfiles}
          setDogProfile={setDogProfile}
          setShowSideBtns={setShowSideBtns}
          dogId={dogId}
        />
      </div>
    </>
  );
}
