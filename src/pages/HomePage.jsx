import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import HeaderNav from "../components/HeaderNav";
import dog2 from "../assets/dog2.jpg";

export default function HomePage() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      {" "}
      <div className="bg-[#f4f2f3] w-screen h-screen overflow-hidden">
        <div className="w-full h-full flex flex-col justify-center items-center">
          <HeaderNav setShowForm={setShowForm} />
          {showForm && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="z-10">
                <AuthForm setShowForm={setShowForm} />
              </div>
            </div>
          )}
          <div className="w-[1400px] h-full grid grid-cols-2">
            <div className="flex flex-col justify-center items-center">
              <div className="pb-6">
                <p className="font-bold text-5xl pb-4">Welcome to Fido!</p>
                <p className="text-2xl font-medium">
                  Connecting with the perfect dog walker has never been easier.
                  Whether you're a busy professional, a loving dog parent, or
                  just need an extra hand, Fido is your go-to platform for all
                  your dog-walking needs.
                </p>
              </div>
              <div className="">
                <p className="font-bold text-4xl pb-4">Why Fido?</p>
                <div className="grid grid-cols-3">
                  <div className="mr-4 p-4 rounded-md bg-slate-200">
                    <p className="text-md font-medium">
                      Trusted Dog Walkers:
                      <p className="font-light">
                        We've handpicked a community of reliable and passionate
                        dog walkers in your area who are ready to give your
                        furry friend the attention and exercise they deserve.
                      </p>
                    </p>
                  </div>
                  <div className="mr-4 p-4 rounded-md bg-slate-200">
                    <p className="text-md font-medium">
                      Personalized Matches:
                      <p className="font-light mr-4">
                        We understand that every dog is unique. Fido's advanced
                        algorithm matches you with dog walkers who align with
                        your dog's specific needs and personality.
                      </p>
                    </p>
                  </div>
                  <div className="mr-4 p-4 rounded-md bg-slate-200">
                    <p className="text-md font-medium">
                      Peace of Mind:
                      <p className="font-light mr-4">
                        Safety is our top priority. All our dog walkers undergo
                        thorough background checks, ensuring your pet is in
                        caring and capable hands.
                      </p>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{ backgroundImage: `url(${dog2})` }}
              className="bg-center bg-no-repeat bg-cover"
            ></div>
          </div>

          {/* <div className="h-full p-4 flex flex-col justify-evenly items-center">
            <div className="container">
              <p className="font-bold text-5xl text-white pb-4">
                Welcome to Fido!
              </p>
              <p className="text-2xl text-white font-medium">
                Connecting with the perfect dog walker has never been easier.
                Whether you're a busy professional, a loving dog parent, or just
                need an extra hand, Fido is your go-to platform for all your
                dog-walking needs.
              </p>
            </div>
            <div className="container">
              <p>Why Fido?</p>
              <div className="flex justify-evenly">
                <p>
                  🐾 Find Trusted Dog Walkers: We've handpicked a community of
                  reliable and passionate dog walkers in your area who are ready
                  to give your furry friend the attention and exercise they
                  deserve.
                </p>
                <p>
                  🐾 Personalized Matches: We understand that every dog is
                  unique. Fido's advanced algorithm matches you with dog walkers
                  who align with your dog's specific needs and personality.
                </p>
                <p>
                  🐾 Peace of Mind: Safety is our top priority. All our dog
                  walkers undergo thorough background checks, ensuring your pet
                  is in caring and capable hands.
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
