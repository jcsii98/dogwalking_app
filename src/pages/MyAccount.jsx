import ProfileCard from "../components/General/ProfileCard";
import React, { useState, useEffect } from "react";
import LoadingComponent from "../components/General/LoadingComponent";

export default function MyAccount(props) {
  const { userData, setUserData, setIsLoggedIn, apiUrl } = props;

  const [isLoading, setIsLoading] = useState(true);

  const checkUserData = async (event) => {
    const uid = localStorage.getItem("uid");
    const client = localStorage.getItem("client");
    const accessToken = localStorage.getItem("access-token");
    if (uid && client && accessToken) {
      try {
        const response = await fetch(`${apiUrl}/user`, {
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

  useEffect(() => {
    const timer = setTimeout(() => {
      checkUserData();
    }, 0);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <div className="py-4 px-8 flex justify-center">
          <div className="max-w-screen-xl w-full flex justify-between space-x-20">
            <ProfileCard
              userData={userData}
              setUserData={setUserData}
              apiUrl={apiUrl}
            />
          </div>
        </div>
      )}
    </>
  );
}
