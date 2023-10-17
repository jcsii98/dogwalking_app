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
      <div className="py-4 px-8 flex justify-center">
        <div className="flex max-w-screen-xl max-[1024px]:flex-col h-full overflow-y-auto">
          <div
            id="c-1"
            style={{ backgroundImage: `url(${dog2})` }}
            className="max-[1024px]:hidden basis-1/2 lg:bg-bottom lg:bg-no-repeat lg:bg-cover bg-flip-x px-8 py-4"
          ></div>
          <div
            id="c-2"
            style={{ backgroundImage: `url(${dog2})` }}
            className="basis-1/2 max-[1024px]:bg-bottom max-[1024px]:bg-no-repeat max-[1024px]:bg-cover flex-grow px-8 py-4 flex items-center"
          >
            <div className="flex flex-col space-y-4">
              <p className="font-bold text-5xl pb-4">Welcome to Fido!</p>
              <p className="text-2xl font-medium">
                Need help walking your dog? Whether you're a busy professional,
                a loving dog parent, or just need an extra hand, Fido is your
                go-to platform for all your dog-walking needs.
              </p>
              <p className="font-bold text-4xl pb-2">Why Fido?</p>
              <div className="flex max-[1024px]:flex-col min-[1024px]:space-x-4">
                <div className="max-[1024px]:mt-4 p-4 rounded-md bg-slate-600/[.7] text-white">
                  <p className="text-md font-medium">Trusted Dog Walkers:</p>
                  <p className="font-light">
                    We've handpicked a community of reliable and passionate dog
                    walkers in your area who are ready to give your furry friend
                    the attention and exercise they deserve.
                  </p>
                </div>
                <div className="max-[1024px]:mt-4 p-4 rounded-md bg-slate-600/[.7] text-white">
                  <p className="text-md font-medium">Personalized Matches:</p>
                  <p className="font-light mr-4">
                    We understand that every dog is unique. Fido's advanced
                    algorithm matches you with dog walkers who align with your
                    dog's specific needs and personality.
                  </p>
                </div>
                <div className="max-[1024px]:mt-4 p-4 rounded-md bg-slate-600/[.7] text-white">
                  <p className="text-md font-medium">Peace of Mind:</p>
                  <p className="font-light mr-4">
                    Safety is our top priority. All our dog walkers undergo
                    thorough background checks, ensuring your pet is in caring
                    and capable hands.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
