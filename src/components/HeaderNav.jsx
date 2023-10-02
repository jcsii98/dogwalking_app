export default function HeaderNav(props) {
  const {
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
      <div className="py-6 flex justify-center">
        <div className="w-[1400px] flex justify-between items-center">
          <div className="text-black font-extrabold text-3xl">Fido.</div>
          <nav>
            <ul className="text-md font-medium xl flex space-x-12 items-center">
              {!isLoggedIn && (
                <>
                  <li>
                    <a
                      href="#"
                      className="w-full hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 my-2 rounded-lg border-black border-[1px] px-4"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="w-full hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 my-2 rounded-lg border-black border-[1px] px-4"
                    >
                      Become a Dog Walker
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => setShowForm(true)}
                      href="#"
                      className="w-full hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 my-2 rounded-lg border-black border-[1px] px-4"
                    >
                      Get Started
                    </a>
                  </li>
                </>
              )}
              {isLoggedIn && (
                <>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveNavTab(2);
                      }}
                      href="#"
                      className="w-full hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 my-2 rounded-lg border-black border-[1px] px-4"
                    >
                      My Account
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setActiveNavTab(1);
                      }}
                      type="button"
                      href="#"
                      className="w-full hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 my-2 rounded-lg border-black border-[1px] px-4"
                    >
                      Dashboard
                    </button>
                  </li>
                  <li>
                    <a
                      onClick={handleSignOut}
                      href="#"
                      className="w-full hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 my-2 rounded-lg border-black border-[1px] px-4"
                    >
                      Sign Out
                    </a>
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
