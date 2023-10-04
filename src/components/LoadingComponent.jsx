import { AiOutlineLoading } from "react-icons/ai";
import DogPng from "../assets/dog.png";
import Dog4 from "../assets/dog4.png";
export default function LoadingComponent() {
  return (
    <>
      <div className="h-full flex items-center justify-center">
        <div className="relative h-[300px] w-[300px]">
          <AiOutlineLoading
            style={{ color: "#94a3b8" }}
            size={300}
            className="absolute inset-0 m-auto loading-icon"
          />
          <img
            className="absolute inset-0 m-auto w-40 h-40 rounded-full"
            src={Dog4}
          />
        </div>
      </div>
    </>
  );
}
