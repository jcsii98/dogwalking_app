import React, { useState, useEffect } from "react";
import DogProfileSummary from "./DogProfileSummary";

export default function DogProfileForm(props) {
  const {
    editing,
    apiUrl,
    setDashTab,
    setDogProfile,
    dogUpdate,
    dogId,
    dogName,
    checkDogProfiles,
  } = props;
  const [dogData, setDogData] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [activeTab, setActiveTab] = useState("buttons");
  const [showConfirm, setShowConfirm] = useState(false);

  const questions = [
    "What is your dog's name?",
    `How old is ${dogData.name}?`,
    `What is ${dogData.name}'s weight in pounds?`,
    `What is ${dogData.name}'s breed?`,
    `What is ${dogData.name}'s sex?`,
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.elements[0];

    switch (currentQuestionIndex) {
      case 0:
        setDogData((prev) => ({ ...prev, name: input.value }));
        break;
      case 1:
        setDogData((prev) => ({ ...prev, age: input.value }));
        break;
      case 2:
        setDogData((prev) => ({ ...prev, weight: input.value }));
        break;
      case 3:
        setDogData((prev) => ({ ...prev, breed: input.value }));
        break;
      case 4:
        setDogData((prev) => ({ ...prev, sex: input.value }));
        break;
      default:
        break;
    }

    // Move to next question or finish
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => {
        // Get next question's data from dogData to display it
        const nextIndex = prevIndex + 1;
        switch (nextIndex) {
          case 0:
            setInputValue(dogData.name || "");
            break;
          case 1:
            setInputValue(dogData.age || "");
            break;
          case 2:
            setInputValue(dogData.weight || "");
            break;
          case 3:
            setInputValue(dogData.breed || "");
            break;
          case 4:
            setInputValue(dogData.sex || "");
            break;
          default:
            setInputValue("");
            break;
        }
        return nextIndex;
      });
    } else {
      console.log("Form submission complete!", dogData);
      setActiveTab(3);
    }
  };

  const handleBegin = () => {
    setDogData({});
    setInputValue("");
    setActiveTab("form");
  };

  const handleCancel = () => {
    setDashTab("Home");
  };
  const handleBack = () => {
    // Decrement the question index
    if (currentQuestionIndex == 0) {
      setActiveTab("buttons");
      setDogData({});
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
      // Set the inputValue to the previously entered data
      switch (currentQuestionIndex - 1) {
        case 0:
          setInputValue(dogData.name || "");
          break;
        case 1:
          setInputValue(dogData.age || "");
          break;
        case 2:
          setInputValue(dogData.weight || "");
          break;
        case 3:
          setInputValue(dogData.breed || "");
          break;
        case 4:
          setInputValue(dogData.sex || "");
          break;
        default:
          setInputValue("");
          break;
      }
    }
  };

  const toggleDelete = () => {
    setShowConfirm((prev) => !prev);
  };

  return (
    <>
      {activeTab == "buttons" && (
        <>
          {showConfirm ? (
            <>
              <div className="flex flex-col justify-center items-center">
                <div className="">
                  Are you sure you want to delete {dogName}'s profile?
                </div>
                <div className="flex justify-around w-full">
                  <button
                    onClick={toggleDelete}
                    type="button"
                    className="font-medium hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 my-2 rounded-lg border-black border-[1px] px-4"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="font-medium hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 my-2 rounded-lg border-black border-[1px] px-4"
                  >
                    Yes
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-center items-center space-x-4">
                {editing && (
                  <>
                    <button
                      onClick={handleCancel}
                      className="font-medium hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 my-2 rounded-lg border-black border-[1px] px-4"
                    >
                      Back
                    </button>
                  </>
                )}
                <button
                  onClick={handleBegin}
                  className="font-medium hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 my-2 rounded-lg border-black border-[1px] px-4"
                >
                  {editing ? "Edit" : "Begin"}
                </button>

                {editing && (
                  <>
                    <button
                      onClick={toggleDelete}
                      className="font-medium hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 my-2 rounded-lg border-black border-[1px] px-4"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </>
      )}
      {activeTab == "form" && (
        <>
          <div className="flex justify-center items-center">
            <form
              onSubmit={handleSubmit}
              className="flex justify-between flex-col items-center"
            >
              <div className="font-bold text-3xl pb-6 text-center">
                {questions[currentQuestionIndex]}
              </div>
              <input
                className="w-full focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md py-2 px-2"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  currentQuestionIndex === 4
                    ? "Male or Female"
                    : currentQuestionIndex === 2
                    ? "lbs"
                    : ""
                }
              />
              <div className="flex justify-center space-x-12 pt-6 w-full">
                <button
                  className="w-full hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 my-2 rounded-lg border-black border-[1px] px-4"
                  onClick={handleBack}
                  type="button"
                >
                  {currentQuestionIndex == 0 ? <>Cancel</> : <>Back</>}
                </button>
                <button
                  className="w-full hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 my-2 rounded-lg border-black border-[1px] px-4"
                  type="submit"
                  disabled={!inputValue.trim()}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </>
      )}
      {activeTab == 2 && (
        <>
          <DogProfileSummary
            apiUrl={apiUrl}
            setShowSideBtns={setShowSideBtns}
            checkDogProfiles={checkDogProfiles}
            dogUpdate={dogUpdate}
            dogId={dogId}
            setActiveTab={setActiveTab}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            setDogData={setDogData}
            currentQuestionIndex={currentQuestionIndex}
            dogData={dogData}
            setDashTab={setDashTab}
            setDogProfile={setDogProfile}
          />
        </>
      )}
    </>
  );
}
