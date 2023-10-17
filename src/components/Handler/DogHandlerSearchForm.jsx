import { useState } from "react";
import LoadingComponent from "../General/LoadingComponent";
import DogHandlerThumbnail from "./DogHandlerThumbnail";

export default function DogHandlerSearchForm(props) {
  const { userData, setDashTab, setHandlerProfile, dogProfilesData, apiUrl } =
    props;
  const [activeTab, setActiveTab] = useState(1);
  const [message, setMessage] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [handlersFound, setHandlersFound] = useState([]);

  const handleBegin = () => {
    setMessage();
    setError();
    setActiveTab(2);
    setHandlersFound(false);
  };

  const handleBack = () => {
    setMessage();
    setError();
    setActiveTab(1);
  };

  async function submitSearch(event) {
    event.preventDefault();

    const uid = localStorage.getItem("uid");
    const client = localStorage.getItem("client");
    const accessToken = localStorage.getItem("access-token");
    const searchRange = 30;
    setMessage();
    setError();
    setIsLoading(true);

    setTimeout(async () => {
      try {
        const response = await fetch(
          `${apiUrl}/user_search?radius=${searchRange}`,
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
          const errorData = await response.json();
          console.log(errorData);
          setError(errorData.message);
          setIsLoading(false);
          return;
        }
        const data = await response.json();

        if (data.length === 0) {
          setMessage("No dog handlers found within the search range.");
          setIsLoading(false);
        } else {
          console.log(data);
          setHandlersFound(data); // Store the data in the handlersFound state
          setMessage(`${data.length || 0} handler/s found in your vicinity`);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error:", error);
        setError("An error occurred while fetching data.");
        setIsLoading(false);
      }
    }, 1000);
  }
  return (
    <>
      <div className="mb-4 bg-white rounded-md p-6 border-slate-300 border-[1px] flex justify-center items-center">
        {isLoading ? (
          <>
            <LoadingComponent />
          </>
        ) : (
          <>
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
                <div className="flex flex-col w-full items-center">
                  <div className="w-full flex items-center flex-col">
                    <div className="max-w-[300px]">
                      <div className="font-bold text-3xl pb-6 text-center">
                        Begin Search
                      </div>
                    </div>
                    {handlersFound && (
                      <>
                        <div className="mt-6 h-[150px] w-full bg-slate-100 rounded-md p-6 flex items-center">
                          <div className="flex overflow-x-auto items-center space-x-10">
                            {handlersFound.length > 0 &&
                              handlersFound.map((handler) => (
                                <DogHandlerThumbnail
                                  setHandlerProfile={setHandlerProfile}
                                  setDashTab={setDashTab}
                                  key={handler.id}
                                  handler={handler}
                                />
                              ))}
                          </div>
                        </div>
                      </>
                    )}
                    {error && <div className="pt-6 text-red-400">{error}</div>}
                    {message && (
                      <div className="pt-6 text-slate-400">{message}</div>
                    )}
                    <div className="pt-4 grid grid-cols-2 gap-4">
                      <button
                        onClick={handleBack}
                        className="w-full hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 rounded-lg border-black border-[1px] px-4"
                        type="button"
                      >
                        Go back
                      </button>
                      <button
                        onClick={submitSearch}
                        className="w-full hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 rounded-lg border-black border-[1px] px-4"
                        type="button"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
