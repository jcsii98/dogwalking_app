export default function HeaderNav(props) {
  const {
    userData,
    setShowForm,
    isLoggedIn,
    setIsLoggedIn,
    setActiveNavTab,
    activeNavTab,
  } = props;

  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    console.log("signed out successfully");
  };

  return (
    <>
      <div className="py-4 px-8 flex justify-center border-b-[1.5px]">
        <div className="max-w-screen-xl w-full flex justify-between items-center">
          <div className="text-black font-extrabold text-3xl">Fido.</div>
          <nav>
            <ul className="text-md font-medium flex space-x-12 items-center">
              {!isLoggedIn && (
                <>
                  <li>
                    <button className="w-full hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-slate-600 py-2 my-2 rounded-lg border-slate-600 border-[1px] px-4">
                      Home
                    </button>
                  </li>
                  <li>
                    <button className="w-full hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-slate-600 py-2 my-2 rounded-lg border-slate-600 border-[1px] px-4">
                      Become a Dog Walker
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => setShowForm(true)}
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
                        setActiveNavTab(2);
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
        </div>
      </div>
    </>
  );
}
