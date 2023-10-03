import React, { useState, useEffect } from "react";
import HomePage from "../pages/HomePage";
import LoadingPage from "../pages/LoadingPage";
import DashPage from "../pages/DashPage";
import HeaderNav from "../components/HeaderNav";
import MyAccount from "../pages/MyAccount";
export default function Root() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [activeNavTab, setActiveNavTab] = useState(1);
  const rememberMe = async () => {
    const uid = localStorage.getItem("uid");
    const client = localStorage.getItem("client");
    const accessToken = localStorage.getItem("access-token");

    if (uid && client && accessToken) {
      try {
        const response = await fetch(
          "https://dogwalking-api.onrender.com/user/",
          {
            method: "GET",
            headers: {
              uid: uid,
              client: client,
              "access-token": accessToken,
            },
          }
        );
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

  useEffect(() => {
    const timer = setTimeout(() => {
      rememberMe();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {isLoading ? (
        <>
          <LoadingPage />
        </>
      ) : (
        <>
          <div className="bg-[#f4f2f3] w-screen h-screen overflow-hidden">
            <div className="w-full h-full flex flex-col justify-center items-center">
              <HeaderNav
                setIsLoggedIn={setIsLoggedIn}
                isLoggedIn={isLoggedIn}
                setShowForm={setShowForm}
                setActiveNavTab={setActiveNavTab}
              />
              {isLoggedIn ? (
                <>
                  {activeNavTab == 1 && (
                    <>
                      <DashPage userData={userData} />
                    </>
                  )}
                  {activeNavTab == 2 && (
                    <>
                      <MyAccount
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
          </div>
        </>
      )}
    </>
  );
}
