import React, { useState, useEffect } from "react";
import DogProfileCard from "./DogProfileThumbnail";
import DogPng from "../assets/dog.png";
import BookingSummary from "./BookingSummary";

export default function BookingForm(props) {
  const { setDashTab, setIsCreating, dogProfilesData, handlerJobData } = props;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [bookingData, setBookingData] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [selectedDogIds, setSelectedDogIds] = useState([]);
  const [activeTab, setActiveTab] = useState(1);

  const questions = [
    "Who is/are going on the walk?",
    "When is the walk? (yyyy-mm-dd)",
    "How long is the walk? (hrs)",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.elements[0];
    let updatedBookingData = { ...bookingData }; // Make a copy of the current bookingData

    switch (currentQuestionIndex) {
      case 0:
        updatedBookingData = {
          ...updatedBookingData,
          booking_dog_profiles_attributes: selectedDogIds.map((dogId) => ({
            dog_profile_id: dogId,
          })),
        };
        break;
      case 1:
        updatedBookingData = { ...updatedBookingData, date: input.value };
        break;
      case 2:
        updatedBookingData = { ...updatedBookingData, duration: input.value };
        break;
      default:
        break;
    }

    // Update the state
    setBookingData(updatedBookingData);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        switch (nextIndex) {
          case 0:
            setInputValue(
              updatedBookingData.booking_dog_profiles_attributes || ""
            );
            break;
          case 1:
            setInputValue(updatedBookingData.date || "");
            break;
          case 2:
            setInputValue(updatedBookingData.duration || "");
            break;
          default:
            setInputValue("");
            break;
        }
        return nextIndex;
      });
    } else {
      console.log("Form submission complete!", updatedBookingData);
      setActiveTab(2);
    }
  };

  const handleClick = (dogId) => {
    if (selectedDogIds.includes(dogId)) {
      setSelectedDogIds((prevIds) => prevIds.filter((id) => id !== dogId));
    } else {
      setSelectedDogIds((prevIds) => [...prevIds, dogId]);
    }
  };

  const handleBack = () => {
    console.log("handleback called");
    if (currentQuestionIndex == 0) {
      setIsCreating(false);
      setBookingData({});
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
      switch (currentQuestionIndex - 1) {
        case 0:
          setInputValue(bookingData.booking_dog_profiles_attributes || "");
          break;
        case 1:
          setInputValue(bookingData.date || "");
          break;
        case 2:
          setInputValue(bookingData.duration || "");
          break;
        default:
          setInputValue("");
          break;
      }
    }
  };
  return (
    <>
      <div className="p-6 border-[1px] rounded-md">
        {activeTab == 1 && (
          <>
            <form
              onSubmit={handleSubmit}
              className="flex justify-between flex-col items-center"
            >
              <div className="font-bold text-3xl pb-6 text-center">
                {questions[currentQuestionIndex]}
              </div>
              {currentQuestionIndex == 0 ? (
                <>
                  <div className="w-full h-[150px] bg-slate-100 rounded-md p-6 flex items-center">
                    <div className="flex overflow-x-auto items-center space-x-10">
                      {dogProfilesData &&
                        dogProfilesData.map((dog) => (
                          <>
                            <div
                              onClick={() => handleClick(dog.id)}
                              className={`p-4 rounded-md ${
                                selectedDogIds.includes(dog.id)
                                  ? "bg-slate-300"
                                  : "bg-slate-200"
                              }`}
                              key={dog.id}
                            >
                              <div
                                className="cursor-pointer font-medium text-sm flex-shrink-0 flex flex-col justify-center items-center space-y-4"
                                key={dog.id}
                              >
                                {" "}
                                <div className="bg-white rounded-full">
                                  <img
                                    className="place-self-center w-14 h-14 rounded-full"
                                    src={DogPng}
                                    alt="Profile"
                                  />
                                </div>
                                <div className="">{dog.name}</div>
                              </div>
                            </div>
                          </>
                        ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <input
                    className="w-full focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md py-2 px-2"
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </>
              )}

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
                  // disabled={!inputValue.trim()}
                >
                  Submit
                </button>
              </div>
            </form>
          </>
        )}
        {activeTab == 2 && (
          <>
            <BookingSummary
              setDashTab={setDashTab}
              setActiveTab={setActiveTab}
              bookingData={bookingData}
              handlerJobData={handlerJobData}
            />
            <button
              onClick={() => {
                setActiveTab(1);
              }}
              className="w-full hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 my-2 rounded-lg border-black border-[1px] px-4"
              type="button"
              // disabled={!inputValue.trim()}
            >
              Back
            </button>
          </>
        )}
        {activeTab == 3 && <></>}
      </div>
    </>
  );
}
