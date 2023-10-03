import UserPng from "../assets/user.png";
import Paw from "../assets/paw.png";
import Dog3 from "../assets/dog3.png";
import { TbEdit } from "react-icons/tb";
import { TbEditOff } from "react-icons/tb";
import React, { useState, useEffect } from "react";

export default function ProfileCard(props) {
  const { userData } = props;

  const [isEditing, setIsEditing] = useState(false);

  const toggleIsEditing = () => {
    setIsEditing((prev) => !prev);
  };
  return (
    <>
      <div className="flex justify-between space-x-[100px]">
        <div className="w-[330px] bg-white rounded-md p-6">
          <div className="flex items-start justify-between font-medium text-md text-slate-700 pb-4 border-b-[1px]">
            <div className="flex items-center">
              <img
                className="place-self-center w-14 h-14 rounded-full mr-4"
                src={UserPng}
                alt="Profile"
              />
              <div className="text-lg font-medium">{userData.name}</div>
              {userData.status == "approved" && (
                <>
                  <img className="ml-4 w-3 h-3 place-self-center" src={Paw} />
                </>
              )}
            </div>
            {isEditing ? (
              <TbEditOff className="cursor-pointer" onClick={toggleIsEditing} />
            ) : (
              <TbEdit onClick={toggleIsEditing} className="cursor-pointer" />
            )}
          </div>
          {isEditing ? (
            <>
              <div className="pt-2">
                <div className="text-base font-medium text-slate-600">
                  Street Address
                </div>
                <div className="text-base font-medium">
                  {userData.street_address || "N/A"}
                </div>
              </div>
              <div className="pt-4">
                <div className="text-base font-medium text-slate-600">City</div>
                <div className="text-base font-medium">
                  {userData.city || "N/A"}
                </div>
              </div>
              <div className="pt-4">
                <div className="text-base font-medium text-slate-600">
                  State
                </div>
                <div className="text-base font-medium">
                  {userData.state || "N/A"}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="pt-2">
                <div className="text-base font-medium text-slate-600">
                  Street Address
                </div>
                <div className="text-base font-medium">
                  {userData.street_address || "N/A"}
                </div>
              </div>
              <div className="pt-4">
                <div className="text-base font-medium text-slate-600">City</div>
                <div className="text-base font-medium">
                  {userData.city || "N/A"}
                </div>
              </div>
              <div className="pt-4">
                <div className="text-base font-medium text-slate-600">
                  State
                </div>
                <div className="text-base font-medium">
                  {userData.state || "N/A"}
                </div>
              </div>
            </>
          )}
          <div className="pt-4">
            <div className="text-base font-medium text-slate-600">Email</div>
            <div className="text-base font-medium">{userData.email}</div>
          </div>
          <div className="pt-4">
            <div className="text-base font-medium text-slate-600">Contact</div>
            <div className="text-base font-medium">0919 509 3049</div>
          </div>
          <div className="pt-4">
            <div className="text-lg font-medium text-slate-600">Address</div>
          </div>
        </div>
        <div className="w-[1000px] bg-white rounded-md p-6">
          {userData.status == "pending" && (
            <>
              <div className="pb-6 text-3xl font-bold">
                Hi, {userData.name}!
              </div>
              <div className="flex items-center space-x-4">
                <img src={Dog3} className="h-40" />
                <div className="text-lg font-normal">
                  Looks like your profile is not yet verified. To complete the
                  verification process and ensure a smooth experience, please
                  update your profile with the necessary information, including
                  your address. This will help us verify your account and
                  provide you with the best possible service. Thank you for your
                  cooperation!
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
