import Boy from "../assets/boy.png";
import Woman from "../assets/woman.png";

export default function BookingThumbnail(props) {
  const { booking, setBookingDash, setDashTab } = props;
  const isGirl = booking.user_walker_id % 2 === 0;

  const handleClick = () => {
    setBookingDash(booking);
    setDashTab(4);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="cursor-pointer font-medium text-sm flex-shrink-0 flex flex-col justify-center items-center space-y-4"
        key={booking.id}
      >
        {" "}
        <div className="bg-white rounded-full">
          <img
            src={isGirl ? Woman : Boy}
            alt={isGirl ? "Girl" : "Boy"}
            className="place-self-center w-14 h-14 rounded-full"
          />
        </div>
        <div className="">{booking.user_walker_name}</div>
      </div>
    </>
  );
}
