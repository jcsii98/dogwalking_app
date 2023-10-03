import ProfileCard from "../components/ProfileCard";
import React, { useState, useEffect } from "react";
import LoadingComponent from "../components/LoadingComponent";

export default function MyAccount(props) {
  const { userData, setUserData, setIsLoggedIn } = props;

  const [isLoading, setIsLoading] = useState(true);

  const checkUserData = async (event) => {
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
      checkUserData();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div className="py-6 px-8 flex justify-center">
        <div className="max-w-screen-xl w-full flex justify-between space-x-20">
          {" "}
          {/* Added max-width, margin auto and padding */}
          {isLoading ? (
            <LoadingComponent />
          ) : userData.kind == 2 ? (
            <ProfileCard userData={userData} setUserData={setUserData} />
          ) : null}
        </div>
      </div>
    </>
  );
}
