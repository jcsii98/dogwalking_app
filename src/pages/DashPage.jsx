import React, { useState, useEffect } from "react";
import DogProfileForm from "../components/DogProfileForm";
import DogProfileThumbnail from "../components/DogProfileThumbnail";
import LoadingComponent from "../components/LoadingComponent";
import DogProfile from "../components/DogProfile";
import DogHandlerSearchForm from "../components/DogHandlerSearchForm";
import HandlerProfile from "../components/HandlerProfile";
import ActiveBookings from "../components/ActiveBookings";
import BookingDash from "../components/BookingDash";
import ActiveDogProfiles from "../components/ActiveDogProfiles";

export default function DashPage(props) {
  const { userData } = props;
  const [dogProfilesData, setDogProfilesData] = useState();
  const [bookingsData, setBookingsData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [dashTab, setDashTab] = useState("Home");
  const [dogProfile, setDogProfile] = useState();
  const [bookingDash, setBookingDash] = useState();
  const [handlerProfile, setHandlerProfile] = useState();

  const checkBookings = async (event) => {
    const uid = localStorage.getItem("uid");
    const client = localStorage.getItem("client");
    const accessToken = localStorage.getItem("access-token");

    try {
      const response = await fetch("http://localhost:3000/bookings", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          uid: uid,
          client: client,
          "access-token": accessToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setBookingsData(data);
      } else {
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
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
      checkBookings();
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
            <div className="max-w-screen-xl w-full">
              {/* dashboard for dog walkers */}
              {userData.kind == 1 && <></>}

              {/* dashboard for dog owners */}
              {userData.kind == 2 && (
                <>
                  {dashTab == "Home" && (
                    <>
                      <div className="flex justify-between space-x-20">
                        <div
                          id="container-1"
                          className="basis-1/3 flex flex-col"
                        >
                          <ActiveDogProfiles
                            setDogProfile={setDogProfile}
                            setDashTab={setDashTab}
                            dogProfilesData={dogProfilesData}
                          />
                          <div className="text-md text-slate-700 font-medium pb-2">
                            <>Setting up Dog Profiles</>
                          </div>
                          <div className="bg-white rounded-md p-6 border-slate-300 border-[1px]">
                            <DogProfileForm
                              checkDogProfiles={checkDogProfiles}
                              setDogProfile={setDogProfile}
                              setDashTab={setDashTab}
                            />
                          </div>
                        </div>
                        <div
                          id="container-2"
                          className="basis-2/3 flex flex-col"
                        >
                          <ActiveBookings
                            setDashTab={setDashTab}
                            bookingsData={bookingsData}
                            setBookingDash={setBookingDash}
                          />
                          <div className="text-md text-slate-700 font-medium pb-2">
                            <>Finding nearby dog walkers</>
                          </div>
                          <DogHandlerSearchForm
                            dogProfilesData={dogProfilesData}
                            setHandlerProfile={setHandlerProfile}
                            setDashTab={setDashTab}
                            userData={userData}
                          />
                        </div>
                      </div>
                    </>
                  )}
                  {dashTab == "Dog Profile" && (
                    <>
                      <DogProfile
                        checkDogProfiles={checkDogProfiles}
                        setDashTab={setDashTab}
                        setDogProfile={setDogProfile}
                        dogProfile={dogProfile}
                      />
                    </>
                  )}
                  {dashTab == 3 && (
                    <>
                      <HandlerProfile
                        setDashTab={setDashTab}
                        dogProfilesData={dogProfilesData}
                        handlerProfile={handlerProfile}
                      />
                    </>
                  )}
                  {dashTab == 4 && (
                    <>
                      <BookingDash
                        userData={userData}
                        setDashTab={setDashTab}
                        bookingDash={bookingDash}
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
