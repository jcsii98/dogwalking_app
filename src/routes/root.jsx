import React, { useState, useEffect } from "react";
import HomePage from "../pages/HomePage";
import LoadingPage from "../pages/LoadingPage";
import DashPage from "../pages/DashPage";
import HeaderNav from "../components/General/HeaderNav";
import MyAccount from "../pages/MyAccount";
import AuthForm from "../components/General/AuthForm";

export default function Root() {
  console.log("Rendering Root...");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isOwnerSignup, setIsOwnerSignup] = useState();
  const [dashTab, setDashTab] = useState("Home");

  const [job, setJob] = useState();

  const [activeNavTab, setActiveNavTab] = useState(1);

  const apiUrl = "http://localhost:3000";
  // http://localhost:3000
  // https://dogwalking-api.onrender.com

  const rememberMe = async () => {
    const uid = localStorage.getItem("uid");
    const client = localStorage.getItem("client");
    const accessToken = localStorage.getItem("access-token");

    if (uid && client && accessToken) {
      try {
        const response = await fetch(`${apiUrl}/user/`, {
          method: "GET",
          headers: {
            uid: uid,
            client: client,
            "access-token": accessToken,
          },
        });
        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData);
          setUserData(responseData);
          setIsLoggedIn(true);
          setIsLoading(false);
        } else {
          setIsLoggedIn(false);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
        setIsLoading(false);
      }
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
    }
  };

  const fetchJob = async (event) => {
    const uid = localStorage.getItem("uid");
    const client = localStorage.getItem("client");
    const accessToken = localStorage.getItem("access-token");
    if (userData.kind == "1") {
      try {
        const response = await fetch(`${apiUrl}/dog_walking_jobs`, {
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
          if (data.message) {
            console.log(data.message);
            setJob(null);
          } else {
            setJob(data.data);
          }
        } else {
        }
      } catch (error) {
        console.log("Error:", error);
      }
    } else {
      return;
    }
  };

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     rememberMe();
  //   }, 1500);

  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    if (userData && userData.kind === "1") {
      fetchJob();
    }
  }, [userData]);
  return (
    <>
      {isLoading ? (
        <>
          <LoadingPage />
        </>
      ) : (
        <>
          {showForm && (
            <AuthForm
              apiUrl={apiUrl}
              isOwnerSignup={isOwnerSignup}
              setUserData={setUserData}
              setIsLoggedIn={setIsLoggedIn}
              setShowForm={setShowForm}
            />
          )}
          <div className="flex flex-col bg-[#f4f2f3] w-full h-full overflow-y-hidden">
            <HeaderNav
              setDashTab={setDashTab}
              apiUrl={apiUrl}
              setIsOwnerSignup={setIsOwnerSignup}
              userData={userData}
              setIsLoggedIn={setIsLoggedIn}
              isLoggedIn={isLoggedIn}
              setShowForm={setShowForm}
              setActiveNavTab={setActiveNavTab}
            />
            {isLoggedIn ? (
              <>
                {activeNavTab == 2 && (
                  <>
                    <DashPage
                      dashTab={dashTab}
                      setDashTab={setDashTab}
                      apiUrl={apiUrl}
                      fetchJob={fetchJob}
                      job={job}
                      userData={userData}
                    />
                  </>
                )}
                {activeNavTab == 1 && (
                  <>
                    <MyAccount
                      apiUrl={apiUrl}
                      setUserData={setUserData}
                      userData={userData}
                      setIsLoggedIn={setIsLoggedIn}
                    />
                  </>
                )}
              </>
            ) : (
              <>
                <HomePage
                  apiUrl={apiUrl}
                  isOwnerSignup={isOwnerSignup}
                  showForm={showForm}
                  setShowForm={setShowForm}
                  userData={userData}
                  setUserData={setUserData}
                  setIsLoggedIn={setIsLoggedIn}
                  isLoggedIn={isLoggedIn}
                />
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
