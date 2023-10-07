import React, { useState, useEffect } from "react";
import DogProfileSummary from "./DogProfileSummary";

export default function DogProfileForm(props) {
  const {
    setShowSideBtns,
    setDashTab,
    setDogProfile,
    dogUpdate,
    dogId,
    checkDogProfiles,
  } = props;
  const [dogData, setDogData] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [activeTab, setActiveTab] = useState(1);

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

  const handleBack = () => {
    // Decrement the question index
    if (currentQuestionIndex == 0) {
      if (setShowSideBtns) {
        setShowSideBtns(true);
      }
      setActiveTab(1);
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

  const handleBegin = () => {
    if (setShowSideBtns) {
      // Check if setShowSideBtns is defined
      setShowSideBtns(false);
    }
    setDogData({});
    setInputValue("");
    setActiveTab(2);
  };
  return (
    <>
      <div className="flex items-center justify-center">
        {activeTab == 1 && (
          <>
            <button
              onClick={handleBegin}
              className="font-medium hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 my-2 rounded-lg border-black border-[1px] px-4"
            >
              {dogUpdate ? <>Edit Dog Profile</> : <>Add Dog Profile</>}
            </button>
          </>
        )}
        {activeTab == 2 && (
          <>
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
          </>
        )}
        {activeTab == 3 && (
          <>
            <DogProfileSummary
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
      </div>
    </>
  );
}
