import Boy from "../../assets/boy.png";
import Woman from "../../assets/woman.png";

export default function BookingThumbnail(props) {
  const {
    apiUrl,
    fetchChat,
    booking,
    setBookingDash,
    setDashTab,
    userData,
    fetchBooking,
  } = props;

  const isGirl = () => {
    if (userData.kind == "2") {
      return booking.user_walker_id % 2 === 0;
    } else {
      return booking.user_owner_id % 2 === 0;
    }
  };

  const handleClick = async () => {
    console.log("Booking ID:", booking.id);

    // Wait for both fetchBooking and fetchChat to complete
    await Promise.all([fetchBooking(booking.id), fetchChat(booking.id)]);

    setDashTab("Booking Dash");
  };

  return (
    <>
      <div
        className="cursor-pointer font-medium text-sm flex-shrink-0 flex flex-col justify-center items-center space-y-4"
        key={booking.id}
      >
        {" "}
        <div
          onClick={handleClick}
          className="hover:bg-slate-400 bg-white rounded-full w-16 h-16 flex justify-center items-center"
        >
          <img
            src={isGirl() ? Woman : Boy}
            alt={isGirl() ? "Girl" : "Boy"}
            className="place-self-center w-14 h-14 rounded-full"
          />
        </div>
        <div className="">
          {userData.kind == "1" ? (
            <>{booking.user_owner_name}</>
          ) : (
            <>{booking.user_walker_name}</>
          )}
        </div>
      </div>
    </>
  );
}
