import { useState } from "react";

export default function DogHandlerForm() {
  const [activeTab, setActiveTab] = useState(1);
  const handleBegin = () => {
    setActiveTab(2);
  };

  const handleBack = () => {
    setActiveTab(1);
  };
  return (
    <>
      <div className="text-md text-slate-700 font-medium pb-2">
        Finding the perfect dog handler
      </div>
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
  );
}
