import React, { useState } from "react";
import AuthForm from "../components/General/AuthForm";

import dog2 from "../assets/dog2.jpg";

export default function HomePage(props) {
  const {} = props;

  return (
    <>
      {" "}
      <div className="h-full flex justify-center overflow-y-auto">
        <div className="max-w-screen-xl flex flex-col ">
          <div
            id="c-2"
            style={{ backgroundImage: `url(${dog2})` }}
            className="basis-1/2 bg-bottom bg-no-repeat bg-cover flex-grow px-8 py-4 flex items-center"
          >
            <div className="h-full flex flex-col space-y-4 min-[1024px]:justify-evenly">
              <div className="">
                <p className="font-bold text-5xl pb-4">Welcome to Fido!</p>
                <p className="text-2xl font-medium p-4 rounded-md bg-slate-600/[.7] text-white">
                  Need help walking your dog? Whether you're a busy
                  professional, a loving dog parent, or just need an extra hand,
                  Fido is your go-to platform for all your dog-walking needs.
                </p>
              </div>
              <div className="">
                <p className="font-bold text-4xl pb-2 pt-4">Why Fido?</p>
                <div className="flex max-[1024px]:flex-col min-[1024px]:space-x-4">
                  <div className="max-[1024px]:mt-4 p-4 rounded-md bg-slate-600/[.7] text-white">
                    <p className="text-md font-medium">Trusted Dog Walkers:</p>
                    <p className="font-light">
                      We've handpicked a community of reliable and passionate
                      dog walkers in your area who are ready to give your furry
                      friend the attention and exercise they deserve.
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
      </div>
    </>
  );
}
