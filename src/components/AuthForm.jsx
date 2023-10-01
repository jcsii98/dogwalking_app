import dog1 from "../assets/dog1.jpg";
import React, { useState } from "react";
export default function AuthPage(props) {
  const { setShowForm } = props;
  const [toggleAuth, setToggleAuth] = useState(false);

  const handleToggleAuth = () => {
    setToggleAuth((prevToggle) => !prevToggle);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div
        id="main-container"
        className="bg-white rounded-lg flex overflow-hidden h-[645px] w-[875px]"
      >
        <div
          id="container-left"
          className="flex-1 bg-cover bg-center"
          style={{ backgroundImage: `url(${dog1})` }}
        ></div>
        <div id="container-right" className="flex-1 flex flex-col px-10">
          <div className="text-sm font-bold py-6">
            <p className="cursor-pointer" onClick={() => setShowForm(false)}>
              Go Back
            </p>
          </div>
          <div className="text-3xl font-medium pb-6">
            {toggleAuth ? (
              <>Sign up</>
            ) : (
              <>Sign in with your email or username</>
            )}
          </div>
          {toggleAuth ? (
            <>
              <div className="">
                <form className="flex flex-col">
                  <div className="pb-4">
                    <div className="font-medium pb-2 text-slate-700">Email</div>
                    <input
                      type="text"
                      className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-2 px-2"
                    ></input>
                  </div>
                  <div className="pb-4">
                    <div className="font-medium pb-2 text-slate-700">
                      Username
                    </div>
                    <input
                      type="text"
                      className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-2 px-2"
                    ></input>
                  </div>
                  <div className="pb-4">
                    <div className="font-medium pb-2 text-slate-700">
                      Password
                    </div>
                    <input
                      type="text"
                      className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-2 px-2"
                    ></input>
                  </div>
                  <div className="pb-4">
                    <div className="font-medium pb-2 text-slate-700">
                      Confirm Password
                    </div>
                    <input
                      type="text"
                      className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-2 px-2"
                    ></input>
                  </div>
                  <div className="pt-2 w-full">
                    <button
                      onClick={handleSubmit}
                      className="w-full hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 my-2 rounded-lg border-black border-[1px] px-4"
                      type="submit"
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <>
              <div className="">
                <form className="flex flex-col">
                  <div className="pb-4">
                    <div className="font-medium pb-2 text-slate-700">
                      Email or Username
                    </div>
                    <input
                      type="text"
                      className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-2 px-2"
                    ></input>
                  </div>
                  <div className="pb-4">
                    <div className="font-medium pb-2 text-slate-700">
                      Password
                    </div>
                    <input
                      type="text"
                      className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-2 px-2"
                    ></input>
                  </div>
                  <div className="pt-2 w-full">
                    <button
                      onClick={handleSubmit}
                      className="w-full hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 my-2 rounded-lg border-black border-[1px] px-4"
                      type="submit"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}

          <div className="text-sm">
            <div className="flex">
              Or {toggleAuth ? <>sign in</> : <>sign up</>}{" "}
              <div
                onClick={handleToggleAuth}
                className="cursor-pointer pl-[4px] underline"
              >
                here
              </div>
              .
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
