import React, { useState } from "react";
import AuthForm from "../components/General/AuthForm";

import dog2 from "../assets/dog2.jpg";

export default function HomePage(props) {
  const {
    apiUrl,
    isOwnerSignup,
    showForm,
    setShowForm,
    userData,
    setIsLoggedIn,
    isLoggedIn,
    setUserData,
  } = props;

  return (
    <>
      {" "}
      {showForm && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="z-10">
            <AuthForm
              apiUrl={apiUrl}
              isOwnerSignup={isOwnerSignup}
              setUserData={setUserData}
              setIsLoggedIn={setIsLoggedIn}
              setShowForm={setShowForm}
            />
          </div>
        </div>
      )}
      <div className="px-8 flex justify-center h-full">
        <div className="max-w-screen-xl w-full flex justify-between space-x-20">
          <div className="basis-2/3 flex flex-col items-center">
            <div className="py-4">
              <p className="font-bold text-5xl pb-4">Welcome to Fido!</p>
              <p className="text-2xl font-medium">
                Need help walking your dog? Whether you're a busy professional,
                a loving dog parent, or just need an extra hand, Fido is your
                go-to platform for all your dog-walking needs.
              </p>
            </div>
            <div className="py-4">
              <p className="font-bold text-4xl pb-6">Why Fido?</p>
              <div className="grid grid-cols-3">
                <div className="mr-4 p-4 rounded-md bg-slate-200">
                  <p className="text-md font-medium">
                    Trusted Dog Walkers:
                    <p className="font-light">
                      We've handpicked a community of reliable and passionate
                      dog walkers in your area who are ready to give your furry
                      friend the attention and exercise they deserve.
                    </p>
                  </p>
                </div>
                <div className="mr-4 p-4 rounded-md bg-slate-200">
                  <p className="text-md font-medium">
                    Personalized Matches:
                    <p className="font-light mr-4">
                      We understand that every dog is unique. Fido's advanced
                      algorithm matches you with dog walkers who align with your
                      dog's specific needs and personality.
                    </p>
                  </p>
                </div>
                <div className="mr-4 p-4 rounded-md bg-slate-200">
                  <p className="text-md font-medium">
                    Peace of Mind:
                    <p className="font-light mr-4">
                      Safety is our top priority. All our dog walkers undergo
                      thorough background checks, ensuring your pet is in caring
                      and capable hands.
                    </p>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{ backgroundImage: `url(${dog2})` }}
            className="basis-1/3 bg-bottom bg-no-repeat bg-cover"
          ></div>
        </div>
      </div>
    </>
  );
}
