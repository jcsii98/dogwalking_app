import { BsChevronDown } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import DogProfileThumbnail from "./DogProfileThumbnail";
export default function ActiveDogProfiles(props) {
  const { dogProfilesData, setDashTab, setDogProfile } = props;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        className={`mb-4 bg-white rounded-md p-6 border-slate-300 border-[1px] 
                            ${dogProfilesData?.length && "cursor-pointer"}
                            `}
        tabIndex="0"
        onClick={() => {
          if (dogProfilesData?.length > 0) {
            setIsOpen(!isOpen);
          }
        }}
      >
        <div className="flex items-center justify-between w-full">
          <div className="font-bold text-xl flex">
            <div>Active Dog Profiles</div>
            <div className="text-slate-500 pl-2">
              - {dogProfilesData?.length || 0}
            </div>
          </div>
          {dogProfilesData && dogProfilesData.length == 1 && (
            <>
              <BsChevronDown
                className={`h-6 w-6 transition-all duration-500 text-black ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </>
          )}
        </div>
        <div
          className={`transition-all ${
            isOpen
              ? "visible max-h-screen opacity-100 pt-4"
              : "invisible max-h-0 opacity-0"
          } duration-500`}
        >
          <div className="h-[150px] bg-slate-100 rounded-md p-6 flex items-center">
            <div className="flex overflow-x-auto items-center space-x-10">
              {dogProfilesData &&
                dogProfilesData.map((dog) => (
                  <DogProfileThumbnail
                    key={dog.id}
                    setDashTab={setDashTab}
                    setDogProfile={setDogProfile}
                    dog={dog}
                  />
                ))}
            </div>
          </div>
          {/* dog profiles here */}
        </div>
      </div>
    </>
  );
}
