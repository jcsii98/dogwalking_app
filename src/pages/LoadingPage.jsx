import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function LoadingPage() {
  return (
    <>
      <div className="bg-[#f4f2f3] w-screen h-screen flex flex-col items-center justify-center text-center text-white">
        <h1 className={"ml-4 pb-10 text-black font-extrabold text-5xl"}>
          Fido.
        </h1>
        <AiOutlineLoading3Quarters
          size={100}
          style={{ color: "black" }}
          className="my-7 loading-icon"
        />
      </div>
    </>
  );
}
