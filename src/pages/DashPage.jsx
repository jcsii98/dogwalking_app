import React, { useState, useEffect } from "react";
import DogProfileForm from "../components/DogProfile/DogProfileForm";
import LoadingComponent from "../components/General/LoadingComponent";
import DogProfile from "../components/DogProfile/DogProfile";
import DogHandlerSearchForm from "../components/Handler/DogHandlerSearchForm";
import HandlerProfile from "../components/Handler/HandlerProfile";
import ActiveBookings from "../components/General/ActiveBookings";
import BookingDash from "../components/Booking/BookingDash";
import ActiveDogProfiles from "../components/DogProfile/ActiveDogProfiles";
import Job from "../components/Job/Job";
import JobForm from "../components/Job/JobForm";
import Restricted from "../components/General/Restricted";

export default function DashPage(props) {
  const { userData, job, fetchJob, apiUrl, dashTab, setDashTab } = props;

  // active dog profiles & bookings
  const [dogProfilesData, setDogProfilesData] = useState();
  const [bookingsData, setBookingsData] = useState([]);

  // page UI states
  const [isLoading, setIsLoading] = useState(true);

  // focus dogProfile and Booking and handlerProfile
  const [dogProfile, setDogProfile] = useState();
  const [bookingDash, setBookingDash] = useState();
  const [bookingChat, setBookingChat] = useState();
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

    let url = `${apiUrl}/bookings`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.message) {
        setBookingsData([]);
      } else {
        setBookingsData(data);
      }
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

    const url = `${apiUrl}/dog_profiles`;
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

  const fetchBooking = async (bookingId) => {
    const uid = localStorage.getItem("uid");
    const client = localStorage.getItem("client");
    const accessToken = localStorage.getItem("access-token");

    try {
      const response = await fetch(`${apiUrl}/bookings/${bookingId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          uid: uid,
          client: client,
          "access-token": accessToken,
        },
      });
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        setBookingDash(responseData);
      } else {
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const fetchChat = async (bookingId) => {
    console.log("BookingId in fetchChat:", bookingId);

    const uid = localStorage.getItem("uid");
    const client = localStorage.getItem("client");
    const accessToken = localStorage.getItem("access-token");

    try {
      const response = await fetch(`${apiUrl}/bookings/${bookingId}/chatroom`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          uid: uid,
          client: client,
          "access-token": accessToken,
        },
      });
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        setBookingChat(responseData);
      } else {
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // If userData.kind is "2", await checkDogProfiles, otherwise resolve immediately
        const dogProfilesPromise =
          userData.kind === "2" ? checkDogProfiles() : Promise.resolve();

        await Promise.all([dogProfilesPromise, checkBookings()]);
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

  useEffect(() => {
    console.log("Updated bookingDash value:", bookingDash);
  }, [bookingDash]);
  useEffect(() => {
    console.log("Updated bookingChat value:", bookingChat);
  }, [bookingChat]);
  return (
    <>
      {isLoading ? (
        <>
          {/* <LoadingComponent /> */}
          <LoadingComponent />
        </>
      ) : (
        <>
          <div className="flex-grow mx-auto px-8 py-4 overflow-y-auto max-w-screen-xl w-full scroll-container">
            {/* dashboard for dog walkers */}
            {userData.kind == 1 && (
              <>
                {dashTab == "Home" && (
                  <>
                    <div className="flex justify-between space-x-20">
                      {job && (
                        <>
                          <div className="basis-1/3">
                            <Job
                              apiUrl={apiUrl}
                              job={job}
                              fetchJob={fetchJob}
                            />{" "}
                          </div>
                          <div className="flex flex-col basis-2/3">
                            <ActiveBookings
                              apiUrl={apiUrl}
                              fetchChat={fetchChat}
                              fetchBooking={fetchBooking}
                              userData={userData}
                              setDashTab={setDashTab}
                              bookingsData={bookingsData}
                              setBookingDash={setBookingDash}
                            />
                          </div>
                        </>
                      )}

                      {!job && (
                        <>
                          <div className="w-full bg-white rounded-md p-6 border-slate-300 border-[1px]">
                            <JobForm
                              apiUrl={apiUrl}
                              fetchJob={fetchJob}
                              userData={userData}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}
                {dashTab == "Booking Dash" && (
                  <>
                    <BookingDash
                      apiUrl={apiUrl}
                      dogProfilesData={dogProfilesData}
                      bookingChat={bookingChat}
                      fetchChat={fetchChat}
                      fetchBooking={fetchBooking}
                      checkBookings={checkBookings}
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
                    <div className="flex flex-col">
                      <div className="text-md text-slate-700 font-medium pb-2">
                        <>Setting up Dog Profiles</>
                      </div>
                      <div className="bg-white rounded-md p-6 mb-4 border-slate-300 border-[1px]">
                        <DogProfileForm
                          editing={false}
                          apiUrl={apiUrl}
                          checkDogProfiles={checkDogProfiles}
                          setDogProfile={setDogProfile}
                          setDashTab={setDashTab}
                        />
                      </div>
                      <ActiveDogProfiles
                        apiUrl={apiUrl}
                        setDogProfile={setDogProfile}
                        setDashTab={setDashTab}
                        dogProfilesData={dogProfilesData}
                      />
                    </div>
                    <div className="flex flex-col">
                      {userData.status == "approved" && (
                        <>
                          <div className="text-md text-slate-700 font-medium pb-2">
                            <>Finding nearby dog walkers</>
                          </div>
                          <DogHandlerSearchForm
                            apiUrl={apiUrl}
                            dogProfilesData={dogProfilesData}
                            setHandlerProfile={setHandlerProfile}
                            setDashTab={setDashTab}
                            userData={userData}
                          />
                        </>
                      )}
                      <ActiveBookings
                        apiUrl={apiUrl}
                        fetchChat={fetchChat}
                        fetchBooking={fetchBooking}
                        userData={userData}
                        setDashTab={setDashTab}
                        bookingsData={bookingsData}
                        setBookingDash={setBookingDash}
                      />
                      {/* {userData.status !== "approved" && (
                        <>
                          <Restricted resource={true} />
                        </>
                      )} */}
                    </div>
                  </>
                )}
                {dashTab == "Dog Profile" && (
                  <>
                    <DogProfile
                      apiUrl={apiUrl}
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
                      apiUrl={apiUrl}
                      fetchBooking={fetchBooking}
                      fetchChat={fetchChat}
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
                      apiUrl={apiUrl}
                      dogProfilesData={dogProfilesData}
                      bookingChat={bookingChat}
                      fetchChat={fetchChat}
                      fetchBooking={fetchBooking}
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
        </>
      )}
    </>
  );
}
