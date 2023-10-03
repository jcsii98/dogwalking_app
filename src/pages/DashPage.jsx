import React, { useState, useEffect } from "react";
import DogProfileForm from "../components/DogProfileForm";
import { BsChevronDown } from "react-icons/bs";
import DogProfileCard from "../components/DogProfileCard";
import LoadingComponent from "../components/LoadingComponent";
import DogProfile from "../components/DogProfile";

export default function DashPage(props) {
  const { userData } = props;
  const [dogProfilesData, setDogProfilesData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  // accordion open
  const [isOpen, setIsOpen] = useState(false);

  const [dashTab, setDashTab] = useState(1);
  const [dogProfile, setDogProfile] = useState();

  const checkDogProfiles = async (event) => {
    const uid = localStorage.getItem("uid");
    const client = localStorage.getItem("client");
    const accessToken = localStorage.getItem("access-token");
    try {
      const response = await fetch(
        "https://dogwalking-api.onrender.com/dog_profiles",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            uid: uid,
            client: client,
            "access-token": accessToken,
          },
        }
      );
      const data = await response.json();

      console.log(data);
      if (data.message) {
        setDogProfilesData();
        setIsLoading(false);
      } else {
        setDogProfilesData(data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      checkDogProfiles();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div className="w-[1400px] h-full">
        {isLoading ? (
          <>
            {/* <LoadingComponent /> */}
            <LoadingComponent />
          </>
        ) : (
          <>
            <div className="flex justify-between">
              {/* dashboard for dog walkers */}
              {userData.kind == 1 && <></>}

              {/* dashboard for dog owners */}
              {userData.kind == 2 && (
                <>
                  {dashTab == 1 && (
                    <>
                      <div className="w-[330px]">
                        <div className="bg-white rounded-md p-6">
                          {/* other dashboard stuff here */}
                        </div>
                      </div>
                      <div className="w-[1000px] flex flex-col">
                        {/* accordion */}
                        <div className="">
                          <div
                            className="group flex flex-col bg-white rounded-md p-6 mb-[40px]"
                            tabIndex="0"
                            onClick={() => setIsOpen(!isOpen)} // Toggle the isOpen state
                          >
                            <div className="flex cursor-pointer items-center justify-between">
                              <div className="font-bold text-xl flex">
                                <div>Active Dog Profiles</div>
                                <div className="text-slate-500 pl-2">
                                  - {!dogProfilesData && <>0</>}
                                  {dogProfilesData && (
                                    <>{dogProfilesData.data.length}</>
                                  )}
                                </div>
                              </div>
                              <BsChevronDown
                                className={`h-6 w-6 transition-all duration-500 text-black ${
                                  isOpen ? "rotate-180" : ""
                                }`}
                              />
                            </div>
                            <div
                              className={`transition-all ${
                                isOpen
                                  ? "visible max-h-screen opacity-100"
                                  : "invisible max-h-0 opacity-0"
                              } duration-500`}
                            >
                              <div className="h-[150px] bg-slate-100 mt-4 p-6 flex items-center">
                                <div className="flex overflow-x-auto items-center space-x-10">
                                  {dogProfilesData &&
                                    dogProfilesData.data.map((dog) => (
                                      <>
                                        <DogProfileCard
                                          key={dog.id}
                                          setDashTab={setDashTab}
                                          setDogProfile={setDogProfile}
                                          dog={dog}
                                        />
                                      </>
                                    ))}
                                </div>
                              </div>
                              {/* dog profiles here */}
                            </div>
                          </div>
                        </div>

                        <div className="text-md text-slate-700 font-medium pb-2">
                          Setting up a Dog Profile
                        </div>
                        <div className="bg-white rounded-md p-6">
                          <DogProfileForm
                            checkDogProfiles={checkDogProfiles}
                            setDogProfile={setDogProfile}
                            setDashTab={setDashTab}
                          />
                        </div>
                      </div>
                    </>
                  )}
                  {dashTab == 2 && (
                    <>
                      <DogProfile
                        checkDogProfiles={checkDogProfiles}
                        setDashTab={setDashTab}
                        setDogProfile={setDogProfile}
                        dogProfile={dogProfile}
                      />
                    </>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
