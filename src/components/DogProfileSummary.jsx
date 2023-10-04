import React, { useState, useEffect } from "react";

export default function DogProfileSummary(props) {
  const {
    setShowSideBtns,
    checkDogProfiles,
    dogData,
    setActiveTab,
    setDogData,
    setCurrentQuestionIndex,
    setDashTab,
    setDogProfile,
    dogUpdate,
    dogId,
  } = props;
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState();
  const [submitErrors, setSubmitErrors] = useState();

  const isValidAge = (age) => {
    const parsedAge = parseInt(age, 10);
    return Number.isInteger(parsedAge) && parsedAge > 1 && parsedAge < 30;
  };
  const isValidWeight = (weight) => {
    const parsedWeight = parseInt(weight, 10);
    return (
      Number.isInteger(parsedWeight) && parsedWeight > 1 && parsedWeight < 400
    );
  };
  const isValidSex = (sex) => {
    return sex.toLowerCase() === "male" || sex.toLowerCase() === "female";
  };

  const validateAge = () => {
    if (!isValidAge(dogData.age)) {
      setErrors((prevErrors) => [
        ...prevErrors,
        "Invalid age! Age should be between 1 and 30.",
      ]);
    }
  };

  const validateWeight = () => {
    if (!isValidWeight(dogData.weight)) {
      setErrors((prevErrors) => [
        ...prevErrors,
        "Invalid weight! Weight should be between 1 and 400 lbs.",
      ]);
    }
  };

  const validateSex = () => {
    if (!isValidSex(dogData.sex)) {
      setErrors((prevErrors) => [
        ...prevErrors,
        "Invalid sex! Only Male or Female are accepted.",
      ]);
    }
  };

  async function submitDogProfile() {
    const uid = localStorage.getItem("uid");
    const client = localStorage.getItem("client");
    const accessToken = localStorage.getItem("access-token");
    // for creating profiles
    if (!dogUpdate) {
      setMessage(`Creating Profile for ${dogData.name}`);
      setErrors();
      try {
        const response = await fetch("http://localhost:3000/dog_profiles", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            uid: uid,
            client: client,
            "access-token": accessToken,
          },
          body: JSON.stringify({ dog_profile: dogData }),
        });

        const data = await response.json();
        if (!response.ok) {
          setMessage("");
          if (data.errors) {
            throw new Error(data.errors[0]);
          } else {
            throw new Error(
              `Server responded with a ${response.status} status.`
            );
          }
        }
        if (data.name === dogData.name) {
          console.log("Success:", data);
          checkDogProfiles();
          setCurrentQuestionIndex(0);
          setDogProfile(data);
          setActiveTab(1);
          setDashTab(2);
        }
      } catch (error) {
        checkDogProfiles();
        setMessage("");
        setSubmitErrors(error.message);
        console.error("Error:", error);
      }

      // for updating profiles
    } else {
      setMessage(`Updating Profile for ${dogId}`);
      try {
        const response = await fetch(
          `http://localhost:3000/dog_profiles/${dogId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              uid: uid,
              client: client,
              "access-token": accessToken,
            },
            body: JSON.stringify({ dog_profile: dogData }),
          }
        );
        if (!response.ok) {
          const data = await response.json();
          setMessage();
          if (data.errors) {
            throw new Error(data.errors[0]);
          } else {
            throw new Error(
              `Server responded with a ${response.status} status.`
            );
          }
        }
        const data = await response.json();
        if (data.data.name == dogData.name) {
          console.log("Success:", data.data);
          setShowSideBtns(true);
          checkDogProfiles();
          setCurrentQuestionIndex(0);
          setDogProfile(data.data);
          setActiveTab(1);
          setMessage();
        }
      } catch (error) {
        console.error("Error:", error);
        setSubmitErrors(error.message);
        setMessage();
      }
    }
  }

  useEffect(() => {
    setErrors([]);
    validateAge();
    validateWeight();
    validateSex();
  }, []);
  return (
    <>
      <div className="w-full h-full">
        <div className="text-3xl font-bold pb-4">Dog Profile Summary</div>
        <div className="flex">
          <div className="w-[50%] pr-6">
            <div className="pb-4">
              <div className="font-medium pb-2 text-slate-700">Name</div>
              <div className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-2 px-2">
                {dogData.name}
              </div>
            </div>
            <div className="pb-4">
              <div className="font-medium pb-2 text-slate-700">Age</div>
              <div
                className={`focus:outline-none ${
                  isValidAge(dogData.age)
                    ? "focus:border-slate-600 border-[1px] border-slate-400"
                    : "border-red-500 border-[1px]"
                } rounded-md w-full py-2 px-2`}
              >
                {dogData.age}
              </div>
            </div>
            <div className="pb-4">
              <div className="font-medium pb-2 text-slate-700">Weight</div>
              <div
                className={`focus:outline-none ${
                  isValidWeight(dogData.weight)
                    ? "focus:border-slate-600 border-[1px] border-slate-400"
                    : "border-red-500 border-[1px]"
                } rounded-md w-full py-2 px-2`}
              >
                {dogData.weight}
              </div>
            </div>
          </div>
          <div className="w-[50%]">
            <div className="pb-4">
              <div className="font-medium pb-2 text-slate-700">Breed</div>
              <div className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-2 px-2">
                {dogData.breed}
              </div>
            </div>
            <div className="pb-4">
              <div className="font-medium pb-2 text-slate-700">Sex</div>
              <div
                className={`focus:outline-none ${
                  isValidSex(dogData.sex)
                    ? "focus:border-slate-600 border-[1px] border-slate-400"
                    : "border-red-500 border-[1px]"
                } rounded-md w-full py-2 px-2`}
              >
                {dogData.sex}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          {message && <p className="text-slate-500">{message}</p>}
          {errors &&
            errors.map((error, index) => (
              <p key={index} className="text-red-500">
                {error}
              </p>
            ))}
          {submitErrors && <p className="text-red-500">{submitErrors}</p>}
        </div>
        <div className="flex justify-center space-x-12">
          <button
            className="w-full hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 my-2 rounded-lg border-black border-[1px] px-4"
            onClick={() => {
              setActiveTab(2);
            }}
            type="button"
          >
            Back
          </button>
          <button
            className="w-full hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 my-2 rounded-lg border-black border-[1px] px-4"
            type="button"
            // disabled={errors.length !== 0}
            onClick={submitDogProfile}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
