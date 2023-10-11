import { useState, useEffect } from "react";
import DogPng from "../../assets/dog.png";
import { FaRegWindowMinimize } from "react-icons/fa";

export default function BookingDogProfile(props) {
  const { focusedDog, setFocusedDog, apiUrl } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [focusedDogData, setFocusedDogData] = useState();
  const fetchFocusedDog = async () => {
    const uid = localStorage.getItem("uid");
    const client = localStorage.getItem("client");
    const accessToken = localStorage.getItem("access-token");

    const url = `${apiUrl}/dog_profiles/${focusedDog}`;

    const headers = {
      "Content-Type": "application/json",
      uid,
      client,
      "access-token": accessToken,
    };

    try {
      const response = await fetch(url, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new Error(`Http error! Status: ${response.status}`);
      }

      const data = await response.json();

      console.log(data);
      setFocusedDogData(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = () => {
    setFocusedDog();
  };

  useEffect(() => {
    fetchFocusedDog();
  }, []);

  return (
    <>
      {isLoading && <></>}
      {!isLoading && (
        <>
          <div className="p-6 border-[1px] rounded-md bg-white">
            <div className="flex flex-col items-center">
              <div className="grid grid-cols-3">
                <div className="bg-slate-400 rounded-full w-24 h-24 flex justify-center items-center col-start-2">
                  <img
                    className="place-self-center w-20 h-20 rounded-full"
                    src={DogPng}
                    alt="Profile"
                  />
                </div>
                <FaRegWindowMinimize
                  className="col-start-3 place-self-start justify-self-end cursor-pointer"
                  onClick={handleBack}
                />
              </div>
              <div className="py-4 text-slate-700 font-bold text-6xl">
                {focusedDogData.name}
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="basis-1/2">
                <div className="pt-2">
                  <div className="text-base font-medium text-slate-600">
                    Age
                  </div>
                  <div className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-2 px-2">
                    {focusedDogData.age || "N/A"}
                  </div>
                </div>
                <div className="pt-2">
                  <div className="text-base font-medium text-slate-600">
                    Weight
                  </div>
                  <div className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-2 px-2">
                    {focusedDogData.weight || "N/A"}
                  </div>
                </div>
              </div>

              <div className="basis-1/2">
                <div className="pt-2">
                  <div className="text-base font-medium text-slate-600">
                    Breed
                  </div>
                  <div className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-2 px-2">
                    {focusedDogData.breed || "N/A"}
                  </div>
                </div>
                <div className="pt-2">
                  <div className="text-base font-medium text-slate-600">
                    Sex
                  </div>
                  <div className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-2 px-2">
                    {focusedDogData.sex || "N/A"}
                  </div>
                </div>
              </div>
            </div>
            {/* <table className="border-separate border-spacing-4">
              <thead>
                <tr>
                  <th className="px-4">Age</th>
                  <th className="px-4">Weight (lbs)</th>
                  <th className="px-4">Breed</th>
                  <th className="px-4">Sex</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-600 py-2 px-4 rounded-md text-center">
                    {focusedDogData.age || ""}
                  </td>
                  <td className="border border-slate-600 py-2 px-4 rounded-md text-center">
                    {focusedDogData.weight || ""}
                  </td>
                  <td className="border border-slate-600 py-2 px-4 rounded-md text-center">
                    {focusedDogData.breed || ""}
                  </td>
                  <td className="border border-slate-600 py-2 px-4 rounded-md text-center">
                    {focusedDogData.sex || ""}
                  </td>
                </tr>
              </tbody>
            </table> */}
          </div>
        </>
      )}
    </>
  );
}
