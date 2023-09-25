import AuthPage from "../components/authPage";
export default function Root() {
  return (
    <>
      {/* <div className="bg-slate-400 w-screen h-screen flex flex-col justify-between px-6">
        <div className="h-[10%]"></div>
        <div className="">
          <div className="py-4 flex justify-center text-2xl">
            <div className="font-light">Pack</div>
            <div className="font-normal">Walk</div>
          </div>
          <div className="flex flex-col">
            <button className="hover:bg-white hover:shadow-black hover:text-black text-white py-2 my-2 rounded-lg border-white border-2 text-xl">
              Login
            </button>
            <button className="hover:bg-white hover:shadow-black hover:text-black text-white py-2 my-2 rounded-lg border-white border-2 text-xl">
              Sign Up
            </button>
          </div>
        </div>
        <div className="h-[10%]"></div>
      </div> */}
      <div className="bg-slate-400 w-screen h-screen overflow-hidden">
        <div className="w-full h-full flex justify-center items-center">
          <AuthPage />
        </div>
      </div>
    </>
  );
}
