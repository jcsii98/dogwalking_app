import { useState } from "react";
import Dog3 from "../assets/dog3.png";
import ResourceRestricted from "./ResourceRestricted";

export default function DogHandlerForm(props) {
  const { userData } = props;
  const [activeTab, setActiveTab] = useState(1);
  const [searchRange, setSearchRange] = useState("");
  const [message, setMessage] = useState();
  const [error, setError] = useState();
  const handleBegin = () => {
    setActiveTab(2);
  };

  const handleBack = () => {
    setActiveTab(1);
  };

  const handleInputChange = (event) => {
    setSearchRange(event.target.value);
  };

  async function submitSearchRange(event) {
    event.preventDefault();

    const uid = localStorage.getItem("uid");
    const client = localStorage.getItem("client");
    const accessToken = localStorage.getItem("access-token");

    setMessage(`Searching for dog handlers within ${searchRange}km`);
    setError();

    try {
      const response = await fetch(
        `http://localhost:3000/user_search?radius=${searchRange}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            uid: uid,
            client: client,
            "access-token": accessToken,
          },
        }
      );
      if (!response.ok) {
        // Handle non-200 response codes here, maybe set an error message
        setError("Failed to fetch data. Please try again.");
        return;
      }

      const data = await response.json();

      if (data.length === 0) {
        // If the data array is empty, set a message or error state
        setMessage("No dog handlers found within the search range.");
      } else {
        // Handle non-empty data array here
        console.log(data);
        setMessage(`${data.length} handler/s found in your search range`);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while fetching data.");
    }
  }
  return (
    <>
      <div className="bg-white rounded-md p-6 border-slate-300 border-[1px] flex justify-center items-center">
        {activeTab == 1 && (
          <>
            <button
              onClick={handleBegin}
              className="font-medium hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 my-2 rounded-lg border-black border-[1px] px-4"
            >
              Begin
            </button>
          </>
        )}
        {activeTab == 2 && (
          <>
            <div className="flex flex-col">
              <form onSubmit={submitSearchRange}>
                <div className="font-bold text-3xl pb-6 text-center">
                  Search Range:
                </div>
                <input
                  className="w-full focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md py-2 px-2"
                  type="text"
                  placeholder="Enter range"
                  value={searchRange}
                  onChange={handleInputChange}
                />
                {message && (
                  <div className="pt-4 text-slate-400">{message}</div>
                )}
                <div className="pt-4 flex space-x-4">
                  <button
                    onClick={handleBack}
                    className="w-full hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 my-2 rounded-lg border-black border-[1px] px-4"
                    type="button"
                  >
                    Go back
                  </button>
                  <button
                    className="w-full hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 my-2 rounded-lg border-black border-[1px] px-4"
                    type="submit"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
      {/* {userData.cached_geocode ? (
        <>
          <div className="bg-white rounded-md p-6 border-slate-300 border-[1px] flex justify-center items-center">
            {activeTab == 1 && (
              <>
                <button
                  onClick={handleBegin}
                  className="font-medium hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 my-2 rounded-lg border-black border-[1px] px-4"
                >
                  Begin
                </button>
              </>
            )}
            {activeTab == 2 && (
              <>
                <form className="flex justify-between flex-col items-center">
                  <div className="font-bold text-3xl pb-6 text-center">
                    Search Range:
                  </div>
                  <input
                    className="w-full focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md py-2 px-2"
                    type="text"
                    placeholder=""
                  />
                  <div className="flex justify-center space-x-12 pt-6 w-full">
                    <button
                      onClick={handleBack}
                      className="w-full hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 my-2 rounded-lg border-black border-[1px] px-4"
                      type="button"
                    >
                      Go back
                    </button>
                    <button
                      className="w-full hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 my-2 rounded-lg border-black border-[1px] px-4"
                      type="submit"
                    >
                      Search
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <ResourceRestricted resource={true} />
        </>
      )} */}
    </>
  );
}
