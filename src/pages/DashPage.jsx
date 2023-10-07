import React, { useState, useEffect } from "react";
import DogProfileForm from "../components/DogProfile/DogProfileForm";
import LoadingComponent from "../components/General/LoadingComponent";
import DogProfile from "../components/DogProfile/DogProfile";
import DogHandlerSearchForm from "../components/Handler/DogHandlerSearchForm";
import HandlerProfile from "../components/Handler/HandlerProfile";
import ActiveBookings from "../components/General/ActiveBookings";
import BookingDash from "../components/Booking/BookingDash";
import ActiveDogProfiles from "../components/DogProfile/ActiveDogProfiles";
import Job from "../components/General/Job";

export default function DashPage(props) {
  const { userData, job } = props;
  const [dogProfilesData, setDogProfilesData] = useState();
  const [bookingsData, setBookingsData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [dashTab, setDashTab] = useState("Home");
  const [dogProfile, setDogProfile] = useState();

  const [bookingDash, setBookingDash] = useState();
  const [handlerProfile, setHandlerProfile] = useState();

  const checkBookings = async () => {
    const uid = localStorage.getItem("uid");
    const client = localStorage.getItem("client");
    const accessToken = localStorage.getItem("access-token");
    const headers = {
      "Content-Type": "application/json",
      uid,
      client,
      "access-token": accessToken,
    };

    let url;
    if (userData.kind == "2") {
      url = "https://dogwalking-api.onrender.com/bookings";
    } else {
      const jobId = job.id;
      url = `https://dogwalking-api.onrender.com/bookings?dog_walking_job_id=${jobId}`;
    }

    try {
      const response = await fetch(url, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setBookingsData(data);
    } catch (error) {
      console.error("Error in checkBookings:", error);
      throw error;
    }
  };

  const checkDogProfiles = async () => {
    const uid = localStorage.getItem("uid");
    const client = localStorage.getItem("client");
    const accessToken = localStorage.getItem("access-token");

    if (userData.kind != "2") {
      return; // If user kind isn't 2, don't proceed with the request
    }

    const url = "https://dogwalking-api.onrender.com/dog_profiles";
    const headers = {
      "Content-Type": "application/json",
      uid,
      client,
      "access-token": accessToken,
    };

    try {
      const response = await fetch(url, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      if (data.message) {
        throw new Error(data.message);
      } else {
        setDogProfilesData(data.data);
      }
    } catch (error) {
      console.error("Checking Dog Profiles:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([checkDogProfiles(), checkBookings()]);
      } catch (error) {
        console.error("Error when fetching data:", error);
      } finally {
        setIsLoading(false); // Ensure isLoading is set to false even if there's an error
      }
    };

    // Using a timeout to delay fetching slightly
    const timer = setTimeout(fetchData, 0);

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
              {userData.kind == 1 && (
                <>
                  {dashTab == "Home" && (
                    <>
                      <div className="flex flex-col">
                        <div className="">
                          <ActiveBookings
                            userData={userData}
                            setDashTab={setDashTab}
                            bookingsData={bookingsData}
                            setBookingDash={setBookingDash}
                          />
                        </div>
                        <div className="flex flex-col">
                          {/* <ActiveDogProfiles
                            setDogProfile={setDogProfile}
                            setDashTab={setDashTab}
                            dogProfilesData={dogProfilesData}
                          /> */}
                          <Job />
                          <div className="text-md text-slate-700 font-medium pb-2">
                            <>Setting up a Job</>
                          </div>
                          <div className="bg-white rounded-md p-6 border-slate-300 border-[1px]">
                            {/* <DogProfileForm
                              checkDogProfiles={checkDogProfiles}
                              setDogProfile={setDogProfile}
                              setDashTab={setDashTab}
                            /> */}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {dashTab == "Booking Dash" && (
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

              {/* dashboard for dog owners */}
              {userData.kind == 2 && (
                <>
                  {dashTab == "Home" && (
                    <>
                      <div className="flex justify-between space-x-20">
                        <div className="basis-1/3 flex flex-col">
                          <ActiveBookings
                            userData={userData}
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
                        <div className="basis-2/3 flex flex-col">
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
                  {dashTab == "Handler Profile" && (
                    <>
                      <HandlerProfile
                        setBookingDash={setBookingDash}
                        setDashTab={setDashTab}
                        dogProfilesData={dogProfilesData}
                        handlerProfile={handlerProfile}
                      />
                    </>
                  )}
                  {dashTab == "Booking Dash" && (
                    <>
                      <BookingDash
                        checkBookings={checkBookings}
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
