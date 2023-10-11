import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
export default function HeaderNav(props) {
  const {
    setIsOwnerSignup,
    userData,
    setShowForm,
    isLoggedIn,
    setIsLoggedIn,
    setActiveNavTab,
    activeNavTab,
    apiUrl,
    setDashTab,
  } = props;

  const [nav, setNav] = useState(false);
  const handleOwnerSignup = () => {
    setIsOwnerSignup(true);
    setShowForm(true);
  };

  const handleWalkerSignup = () => {
    setIsOwnerSignup(false);
    setShowForm(true);
  };
  const handleSignOut = () => {
    setIsLoggedIn(false);
    setNav(!nav);
    localStorage.clear();
    console.log("signed out successfully");
  };

  const handleNav = () => {
    setNav(!nav);
  };

  const handleNavClicked = (tabIndex) => {
    setNav(!nav);
    setActiveNavTab(tabIndex);
  };
  const handleDashboardClicked = () => {
    setDashTab("Home");
    setActiveNavTab(2);
    setNav(!nav);
    console.log("dashboard clicked");
  };

  return (
    <>
      <div className="py-4 px-8 flex justify-center border-b-[1.5px]">
        <div className="max-w-screen-xl w-full flex justify-between items-center">
          <div className="text-black font-extrabold text-3xl">Fido.</div>
          <nav>
            <ul className="hidden md:flex text-md font-medium space-x-12 items-center">
              {!isLoggedIn && (
                <>
                  <li>
                    <button className="w-full hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-slate-600 py-2 my-2 rounded-lg border-slate-600 border-[1px] px-4">
                      Home
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => handleWalkerSignup()}
                      className="w-full hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-slate-600 py-2 my-2 rounded-lg border-slate-600 border-[1px] px-4"
                    >
                      Become a Dog Walker
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => handleOwnerSignup()}
                      className="w-full hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-slate-600 py-2 my-2 rounded-lg border-slate-600 border-[1px] px-4"
                    >
                      Get Started
                    </button>
                  </li>
                </>
              )}
              {isLoggedIn && (
                <>
                  {userData.kind == "2" && <></>}
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveNavTab(1);
                      }}
                      href=""
                      className="w-full hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-slate-600 py-2 my-2 rounded-lg border-slate-600 border-[1px] px-4"
                    >
                      My Account
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleDashboardClicked();
                      }}
                      type="button"
                      className="w-full hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-slate-600 py-2 my-2 rounded-lg border-slate-600 border-[1px] px-4"
                    >
                      Dashboard
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="w-full hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-slate-600 py-2 my-2 rounded-lg border-slate-600 border-[1px] px-4"
                    >
                      Sign Out
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>
          <div onClick={handleNav} className="block md:hidden">
            {!nav ? <AiOutlineMenu size={20} /> : <AiOutlineClose size={20} />}
          </div>
          <div
            className={
              !nav
                ? "fixed left-[-100%]"
                : "text-[#003049] md:hidden fixed left-0 top-0 w-[50%] border-r border-b rounded-md border-b-gray-900 border-r-gray-900 bg-[#f4f2f3] ease-in-out duration-500"
            }
          >
            <div className="py-4 px-8 border-b-[1.5px]">
              <div className="text-black font-extrabold text-3xl">Fido.</div>
            </div>
            <div className="py-4 px-8">
              <ul className="uppercase">
                {!isLoggedIn && (
                  <>
                    <li>
                      <button className="w-full hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-slate-600 py-2 my-2 rounded-lg border-slate-600 border-[1px] px-4">
                        Home
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleOwnerSignup()}
                        className="w-full hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-slate-600 py-2 my-2 rounded-lg border-slate-600 border-[1px] px-4"
                      >
                        Get Started
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleWalkerSignup()}
                        className="w-full hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-slate-600 py-2 my-2 rounded-lg border-slate-600 border-[1px] px-4"
                      >
                        Become a Dog Walker
                      </button>
                    </li>
                  </>
                )}
                {isLoggedIn && (
                  <>
                    {userData.kind == "2" && <></>}
                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          handleNavClicked(1);
                        }}
                        href=""
                        className="w-full hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-slate-600 py-2 my-2 rounded-lg border-slate-600 border-[1px] px-4"
                      >
                        My Account
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          handleDashboardClicked();
                        }}
                        type="button"
                        className="w-full hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-slate-600 py-2 my-2 rounded-lg border-slate-600 border-[1px] px-4"
                      >
                        Dashboard
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleSignOut}
                        className="w-full hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-slate-600 py-2 my-2 rounded-lg border-slate-600 border-[1px] px-4"
                      >
                        Sign Out
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
