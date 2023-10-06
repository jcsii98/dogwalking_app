import DogPng from "../assets/dog.png";

export default function DogProfileThumbnail(props) {
  const { dog, setDogProfile, setDashTab } = props;

  const handleClick = () => {
    setDogProfile(dog);
    setDashTab("Dog Profile");
    console.log("Setting Dash Tab to Dog Profile");
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="cursor-pointer font-medium text-sm flex-shrink-0 flex flex-col justify-center items-center space-y-4"
        key={dog.id}
      >
        {" "}
        <div className="bg-white rounded-full">
          <img
            className="place-self-center w-14 h-14 rounded-full"
            src={DogPng}
            alt="Profile"
          />
        </div>
        <div className="">{dog.name}</div>
      </div>
    </>
  );
}
