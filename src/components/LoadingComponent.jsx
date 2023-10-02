import { AiOutlineLoading } from "react-icons/ai";
import DogPng from "../assets/dog.png";

export default function LoadingComponent() {
  return (
    <>
      <div className="bg-white rounded-md p-6 flex items-center justify-center">
        <div className="relative h-[200px] w-[200px]">
          <AiOutlineLoading
            style={{ color: "#94a3b8" }}
            size={100}
            className="absolute inset-0 m-auto loading-icon"
          />
          <img
            className="absolute inset-0 m-auto w-14 h-14 rounded-full"
            src={DogPng}
            alt="Profile"
          />
        </div>
      </div>
    </>
  );
}
