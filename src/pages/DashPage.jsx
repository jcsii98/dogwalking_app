import React, { useState, useEffect } from "react";
import DogProfileForm from "../components/DogProfileForm";
import { BsChevronDown } from "react-icons/bs";
import DogProfileCard from "../components/DogProfileCard";
import LoadingComponent from "../components/LoadingComponent";
import DogProfile from "../components/DogProfile";
import DogHandlerForm from "../components/DogHandlerForm";

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
      const response = await fetch("http://localhost:3000/dog_profiles", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          uid: uid,
          client: client,
          "access-token": accessToken,
        },
      });
      const data = await response.json();

      console.log(data);
      if (data.message) {
        setDogProfilesData();
        setIsLoading(false);
      } else {
        setDogProfilesData(data.data);
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
      {isLoading ? (
        <>
          {/* <LoadingComponent /> */}
          <LoadingComponent />
        </>
      ) : (
        <>
          <div className="py-6 px-8 flex justify-center">
            <div className="max-w-screen-xl w-full flex justify-between space-x-20">
              {/* dashboard for dog walkers */}
              {userData.kind == 1 && <></>}

              {/* dashboard for dog owners */}
              {userData.kind == 2 && (
                <>
                  {dashTab == 1 && (
                    <>
                      <div id="container-1" className="basis-1/3">
                        <div className="bg-white rounded-md p-6 border-slate-300 border-[1px]">
                          <DogProfileForm
                            checkDogProfiles={checkDogProfiles}
                            setDogProfile={setDogProfile}
                            setDashTab={setDashTab}
                          />
                        </div>
                      </div>
                      <div id="container-2" className="basis-2/3 flex flex-col">
                        {/* accordion */}
                        <div className="">
                          <div
                            className={`bg-white rounded-md p-6 mb-[40px] border-slate-300 border-[1px] 
                            ${dogProfilesData?.length && "cursor-pointer"}
                            `}
                            tabIndex="0"
                            onClick={() => {
                              if (dogProfilesData?.length > 0) {
                                setIsOpen(!isOpen);
                              }
                            }}
                          >
                            <div className="flex items-center justify-between w-full">
                              <div className="font-bold text-xl flex">
                                <div>Active Dog Profiles</div>
                                <div className="text-slate-500 pl-2">
                                  - {dogProfilesData?.length || 0}
                                </div>
                              </div>
                              {dogProfilesData &&
                                dogProfilesData.length == 1 && (
                                  <>
                                    <BsChevronDown
                                      className={`h-6 w-6 transition-all duration-500 text-black ${
                                        isOpen ? "rotate-180" : ""
                                      }`}
                                    />
                                  </>
                                )}
                            </div>
                            <div
                              className={`transition-all ${
                                isOpen
                                  ? "visible max-h-screen opacity-100 pt-4"
                                  : "invisible max-h-0 opacity-0"
                              } duration-500`}
                            >
                              <div className="h-[150px] bg-slate-100 p-6 flex items-center">
                                <div className="flex overflow-x-auto items-center space-x-10">
                                  {dogProfilesData &&
                                    dogProfilesData.map((dog) => (
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
                        <DogHandlerForm />
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
          </div>
        </>
      )}
    </>
  );
}
