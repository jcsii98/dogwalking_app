import Boy from "../../assets/boy.png";
import Woman from "../../assets/woman.png";
export default function DogHandlerThumbnail(props) {
  const { handler, setDashTab, setHandlerProfile, apiUrl } = props;

  const isGirl = handler.id % 2 === 0;

  const handleClick = () => {
    setHandlerProfile(handler);
    setDashTab("Handler Profile");
  };
  const distanceAway = () => {
    return Math.round(handler.distance);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="cursor-pointer font-medium text-sm flex-shrink-0 flex flex-col justify-center items-center space-y-2"
        key={handler.id}
      >
        <div className="">{handler.name}</div>
        <div className="bg-white rounded-full">
          <img
            src={isGirl ? Woman : Boy}
            alt={isGirl ? "Girl" : "Boy"}
            className="place-self-center w-14 h-14 rounded-full"
          />
        </div>
        <div className="text-sm font-light">{distanceAway()} kms away</div>
      </div>
    </>
  );
}
