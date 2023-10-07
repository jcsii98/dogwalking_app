import Paw from "../assets/paw.png";
import Boy from "../assets/boy.png";
import Woman from "../assets/woman.png";
import HandlerJobs from "./HandlerJobs";

export default function HandlerProfile(props) {
  const { handlerProfile, dogProfilesData, setDashTab, setBookingDash } = props;

  const isGirl = handlerProfile.id % 2 === 0;
  return (
    <>
      <div className="max-w-screen-xl w-full flex justify-between space-x-20">
        <div className="basis-1/3">
          <div className="bg-white rounded-md p-6 border-slate-300 border-[1px]">
            <div className="font-medium text-md text-slate-700 pb-6 border-b-[1px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={isGirl ? Woman : Boy}
                    alt={isGirl ? "Girl" : "Boy"}
                    className="place-self-center w-14 h-14 rounded-full"
                  />
                  <div className="text-lg font-medium">
                    {handlerProfile.name}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="basis-2/3 flex flex-col">
          <HandlerJobs
            setBookingDash={setBookingDash}
            setDashTab={setDashTab}
            handlerProfile={handlerProfile}
            dogProfilesData={dogProfilesData}
          />
        </div>
      </div>
    </>
  );
}
