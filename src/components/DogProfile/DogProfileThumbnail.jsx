import React, { useState } from "react";
import DogPng from "../../assets/dog.png";

export default function DogProfileThumbnail(props) {
  const { dog, setDogProfile, setDashTab, apiUrl } = props;
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setDogProfile(dog);
    setDashTab("Dog Profile");
    console.log("Setting Dash Tab to Dog Profile");
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer font-medium text-sm flex-shrink-0 flex flex-col justify-center items-center space-y-4"
      key={dog.id}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`bg-${
          isHovered ? "slate-400" : "white"
        } rounded-full h-16 w-16 flex items-center justify-center`}
      >
        <img
          className="place-self-center w-14 h-14 rounded-full"
          src={DogPng}
          alt="Profile"
        />
      </div>
      <div>{dog.name}</div>
    </div>
  );
}
